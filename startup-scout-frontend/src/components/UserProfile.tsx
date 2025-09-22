import React from 'react';
import { useAuthStore } from '../store/auth';
import { Button } from './ui/Button';

export const UserProfile: React.FC = () => {
    const { user, logout } = useAuthStore();

    if (!user) {
        return null;
    }

    const handleLogout = () => {
        logout();
    };

    return (
        <div className="flex items-center space-x-4">
            <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                    {user.first_name && user.last_name
                        ? `${user.first_name} ${user.last_name}`
                        : user.username
                    }
                </p>
                <p className="text-xs text-gray-500">{user.email}</p>
            </div>
            <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-gray-600 hover:text-gray-900"
            >
                Logout
            </Button>
        </div>
    );
};
