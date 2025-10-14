import { create } from 'zustand';
import type {  UserFormData, AuthState, UserSummary, User } from '../types';
import { api } from '../service';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AuthStore extends AuthState {
    login: (userData: UserSummary) => void;
    register: (userData: UserFormData) => Promise<void>;
    logout: () => void;
    setLoading: (isLoading: boolean) => void;
}


export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            isLoading: false,

            login: (userData: UserSummary) => {
                set({ user: userData as User, isAuthenticated: true });
            },

            register: async (userData: UserFormData) => {
                try {
                    set({ isLoading: true });
                    const loginResponse = await api.post("http://localhost:3001/login", {
                        user_name: userData.user_name,
                        password: userData.password,
                    });
                    const user = loginResponse.data.user;
                    set({
                        user,
                        isAuthenticated: true,
                        isLoading: false,
                    });
                } catch (error: any) {
                    set({ isLoading: false });
                    throw error;
                }
            },

            logout: () => {
                set({
                    user: null,
                    isAuthenticated: false,
                    isLoading: false,
                });
            },

            setLoading: (isLoading: boolean) => set({ isLoading }),
        }),
        {
            name: "auth-storage",
            storage: createJSONStorage(() => localStorage),
        }
    )
);
