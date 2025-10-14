import { ReactNode } from 'react';

interface CardProps {
    children: ReactNode;
    className?: string;
    hover?: boolean;
}

export function Card({ children, className = '', hover = false }: CardProps) {
    const baseStyles = 'bg-white rounded-lg shadow-md overflow-hidden';
    const hoverStyles = hover ? 'transition-all duration-200 hover:shadow-lg hover:scale-[1.02]' : '';

    return (
        <div className={`${baseStyles} ${hoverStyles} ${className}`}>
            {children}
        </div>
    );
}

interface CardHeaderProps {
    children: ReactNode;
    className?: string;
}

export function CardHeader({ children, className = '' }: CardHeaderProps) {
    return (
        <div className={`p-4 border-b border-gray-200 ${className}`}>
            {children}
        </div>
    );
}

interface CardBodyProps {
    children: ReactNode;
    className?: string;
}

export function CardBody({ children, className = '' }: CardBodyProps) {
    return (
        <div className={`p-4 ${className}`}>
            {children}
        </div>
    );
}

interface CardFooterProps {
    children: ReactNode;
    className?: string;
}

export function CardFooter({ children, className = '' }: CardFooterProps) {
    return (
        <div className={`p-4 border-t border-gray-200 bg-gray-50 ${className}`}>
            {children}
        </div>
    );
}
