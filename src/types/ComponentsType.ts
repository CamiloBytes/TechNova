import { ButtonHTMLAttributes, ReactNode } from "react";

export type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info';
export type Size = 'sm' | 'md' | 'lg';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success' | 'outline';



export interface BadgeProps {
    variant?: BadgeVariant;
    size?: Size;
    children: ReactNode;
    className?: string;
}


export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: Size;
    children: ReactNode;
    isLoading?: boolean;
}