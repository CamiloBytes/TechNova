
import { useAuthStore } from '../store/authStore';
import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Button } from 'primereact/button';
import { toast } from 'react-toastify';
import { api } from '../service';
import { UserSummary } from '../types';
import { useNavigate } from 'react-router-dom';
import { FloatLabel } from 'primereact/floatlabel';


type Inputs = {
    user_name: string;
    password: string;
};

export const LoginFrom = () => {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false);

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();
    const login = useAuthStore((state) => state.login);



    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        setIsLoading(true);
        try {
            console.log(data);

            const response = await api.post("http://localhost:3001/login", data);
            const { user } = response.data;
            const safeUser : UserSummary ={
                user_name: user.user_name,
                password: user.password
            }
            login(safeUser);
            toast.success("Login successful!");
            navigate("/dashboard");
        } catch (error) {
            toast.error("The credentials are incorrect");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-white rounded-lg shadow-sm border border-gray-200 p-6 sm:p-8">
                <div className="text-center mb-6">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Login</h2>
                    <p className="text-sm text-gray-600 mt-1">Welcome back to TechNova</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="p-field">
                        <FloatLabel>
                        <InputText
                            id="user_name"
                            {...register("user_name", { required: "Username is required" })}
                            className="w-75"
                        />
                        <label htmlFor="user_name">Username</label>
                        </FloatLabel>
                        {errors.user_name && <p className="text-red-500 text-sm mt-1">{errors.user_name.message}</p>}
                    </div>
                    <div className="p-field">
                        <FloatLabel>
                        <Controller
                            name="password"
                            control={control}
                            rules={{ required: "Password is required" }}
                            render={({ field }) => (
                                <Password
                                    inputId="password"
                                    value={field.value || ""}
                                    onChange={(e) => field.onChange(e.target.value)}
                                    feedback={false}
                                    toggleMask
                                    className='w-full!'
                                />
                            )}
                        />
                        <label htmlFor="password" className='absolute left-3 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-600'>Password</label>
                        </FloatLabel>
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                    </div>
                    <Button
                        type="submit"
                        label={isLoading ? 'Logging in...' : 'Login'}
                        disabled={isLoading}
                        size="small"
                        className="w-full px-4 py-2 text-sm"
                    />
                </form>
                <p className="mt-6 text-center text-sm sm:text-base text-gray-600">
                    Don't have an account? <a href="/register" className="text-blue-500 hover:text-blue-600">Register</a>
                </p>
            </div>
        </div>
    );
};
