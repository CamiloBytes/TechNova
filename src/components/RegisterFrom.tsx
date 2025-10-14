import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';

export const RegisterFrom = () => {
    const [userData, setUserData] = useState({ name: '', user_name: '', password: '' });
    const [error, setError] = useState('');
    const register = useAuthStore((state) => state.register);
    const isLoading = useAuthStore((state) => state.isLoading);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await register(userData);
            navigate('/dashboard');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8 sm:mt-10 px-4 sm:px-0">
            <h2 className="text-xl sm:text-2xl font-bold mb-4">Register</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="p-field">
                    <InputText
                        type="text"
                        placeholder="Name"
                        value={userData.name}
                        onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                        required
                        className="w-full"
                    />
                </div>
                <div className="p-field">
                    <InputText
                        type="text"
                        placeholder="Username"
                        value={userData.user_name}
                        onChange={(e) => setUserData({ ...userData, user_name: e.target.value })}
                        required
                        className="w-full"
                    />
                </div>
                <div className="p-field">
                    <Password
                        placeholder="Password"
                        value={userData.password}
                        onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                        required
                        className="w-full"
                        feedback={false}
                        toggleMask
                    />
                </div>
                {error && <p className="text-red-500">{error}</p>}
                <Button
                    type="submit"
                    label={isLoading ? 'Registering...' : 'Register'}
                    disabled={isLoading}
                    size="small"
                    className="w-full px-4 py-2 text-sm"
                />
            </form>
            <p className="mt-4 text-sm sm:text-base">
                Already have an account? <a href="/login" className="text-blue-500">Login</a>
            </p>
        </div>
    );
};
