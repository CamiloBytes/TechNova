import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";


interface User {
    id?: number;
    email: string;
    name?: string;
}


interface AuthState {
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
}


export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,

            login: (userData) => {
                set({ user: userData });
            },

            logout: () => {
                set({ user: null });
            },
        }),
        {
            name: "auth-storage", 
            storage: createJSONStorage(() => localStorage), 
        }
    )
);
