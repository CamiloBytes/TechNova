import  { createContext, useContext, useState, ReactNode } from "react";


interface User {
    id: number;
    email: string;
    password: string;
}


interface AuthContextType {
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
}


const AuthContext = createContext<AuthContextType | null>(null);


export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe usarse dentro de un AuthProvider");
    }
    return context;
};


interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);

    const login = (userData: User) => setUser(userData);
    const logout = () => setUser(null);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
