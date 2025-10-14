export interface Product {
    id: string;
    sku: string;
    name: string;
    brand: string;
    quantity: number;
    price: number;
    is_active: boolean;
    category: 'laptops' | 'monitors' | 'peripherals' | 'accessories';
    image_url?: string;
    created_at: string;
    updated_at?: string;
}

export interface ProductFormData {
    sku: string;
    name: string;
    brand: string;
    quantity: number;
    price: number;
    is_active: boolean;
    category: 'laptops' | 'monitors' | 'peripherals' | 'accessories';
    image_url?: string;
}

export interface User {
    id: number;
    name: string;
    user_name: string;
    password:string
    role: string;
}

export interface UserSummary {
    user_name: string;
    password: string;
}


export interface UserFormData {
    name: string;
    user_name: string;
    password: string;
    role?: string;
}

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}

export interface LoginCredentials {
    user_name: string;
    password: string;
}

export type ProductCategory = Product['category'];

