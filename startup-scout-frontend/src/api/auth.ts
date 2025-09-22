import { apiClient } from './client';

export interface LoginRequest {
    username: string;
    password: string;
}

export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
    password_confirm: string;
    first_name?: string;
    last_name?: string;
}

export interface AuthResponse {
    user: {
        id: number;
        username: string;
        email: string;
        first_name: string;
        last_name: string;
        date_joined: string;
    };
    tokens: {
        access: string;
        refresh: string;
    };
}

export interface User {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    date_joined: string;
}

export const authApi = {
    login: async (credentials: LoginRequest): Promise<AuthResponse> => {
        const response = await apiClient.post('/auth/login/', credentials);
        return response.data;
    },

    register: async (userData: RegisterRequest): Promise<AuthResponse> => {
        const response = await apiClient.post('/auth/register/', userData);
        return response.data;
    },

    refreshToken: async (refreshToken: string): Promise<{ access: string }> => {
        const response = await apiClient.post('/auth/token/refresh/', {
            refresh: refreshToken,
        });
        return response.data;
    },

    getProfile: async (): Promise<User> => {
        const response = await apiClient.get('/auth/profile/');
        return response.data;
    },
};
