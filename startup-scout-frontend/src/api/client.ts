import axios from 'axios';

import { config } from '../config/env';
import { authApi } from './auth';

const API_BASE_URL = config.apiUrl;

export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

// Request interceptor
apiClient.interceptors.request.use(
    (config) => {
        // Get token from localStorage
        const authData = localStorage.getItem('auth-storage');
        if (authData) {
            try {
                const parsed = JSON.parse(authData);
                const token = parsed.state?.accessToken;
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
            } catch (error) {
                console.error('Error parsing auth data:', error);
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Try to refresh the token
                const authData = localStorage.getItem('auth-storage');
                if (authData) {
                    const parsed = JSON.parse(authData);
                    const refreshToken = parsed.state?.refreshToken;

                    if (refreshToken) {
                        const response = await authApi.refreshToken(refreshToken);
                        const newToken = response.access;

                        // Update the token in localStorage
                        const updatedAuthData = {
                            ...parsed,
                            state: {
                                ...parsed.state,
                                accessToken: newToken,
                            },
                        };
                        localStorage.setItem('auth-storage', JSON.stringify(updatedAuthData));

                        // Retry the original request with the new token
                        originalRequest.headers.Authorization = `Bearer ${newToken}`;
                        return apiClient(originalRequest);
                    }
                }
            } catch (refreshError) {
                // If refresh fails, redirect to login
                localStorage.removeItem('auth-storage');
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }

        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export default apiClient;
