
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
        <div className="max-w-md mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="p-field">
                    <FloatLabel>
                    <InputText
                        id="user_name"
                        {...register("user_name", { required: "Username is required" })}
                        className="border-gray-100! w-full"
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
                            />
                        )}
                    />
                    <label htmlFor="password">Password</label>
                </FloatLabel>
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                </div>
                <Button
                    type="submit"
                    label={isLoading ? 'Logging in...' : 'Login'}
                    disabled={isLoading}
                    className="w-full"
                />
            </form>
            <p className="mt-4">
                Don't have an account? <a href="/register" className="text-blue-500">Register</a>
            </p>
        </div>
    );
};
