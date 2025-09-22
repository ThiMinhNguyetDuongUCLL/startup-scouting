import React from 'react';
import { cn } from '../../utils/cn';

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'default' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

const variantClasses = {
    default: 'bg-gray-100 text-gray-800 border-gray-200',
    secondary: 'bg-gray-200 text-gray-700 border-gray-300',
    success: 'bg-green-100 text-green-800 border-green-200',
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    danger: 'bg-red-100 text-red-800 border-red-200',
    info: 'bg-blue-100 text-blue-800 border-blue-200',
};

const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base',
};

export const Badge: React.FC<BadgeProps> = ({
    children,
    variant = 'default',
    size = 'md',
    className = '',
}) => {
    return (
        <span
            className={cn(
                'inline-flex items-center rounded-full border font-medium',
                variantClasses[variant],
                sizeClasses[size],
                className
            )}
        >
            {children}
        </span>
    );
};
