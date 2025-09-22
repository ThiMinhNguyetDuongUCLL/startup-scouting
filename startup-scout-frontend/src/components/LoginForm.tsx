import React, { useState } from 'react';
import { useAuthStore } from '../store/auth';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Card } from './ui/Card';

interface LoginFormProps {
    onSuccess?: () => void;
    onSwitchToRegister?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess, onSwitchToRegister }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const { login, isLoading, error, clearError } = useAuthStore();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
        if (error) {
            clearError();
        }
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.username.trim()) {
            newErrors.username = 'Username is required';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            await login(formData);
            onSuccess?.();
        } catch (error) {
            // Error is handled by the store
        }
    };

    return (
        <Card className="w-full max-w-md mx-auto">
            <div className="p-6">
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
                    <p className="text-gray-600 mt-2">Sign in to your account</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        label="Username"
                        name="username"
                        type="text"
                        value={formData.username}
                        onChange={handleChange}
                        error={errors.username}
                        placeholder="Enter your username"
                        required
                    />

                    <Input
                        label="Password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        error={errors.password}
                        placeholder="Enter your password"
                        required
                    />

                    {error && (
                        <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
                            {error}
                        </div>
                    )}

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Signing in...' : 'Sign In'}
                    </Button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-gray-600">
                        Don't have an account?{' '}
                        <button
                            type="button"
                            onClick={onSwitchToRegister}
                            className="text-blue-600 hover:text-blue-700 font-medium"
                        >
                            Sign up
                        </button>
                    </p>
                </div>
            </div>
        </Card>
    );
};
