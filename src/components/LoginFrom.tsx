import { useAuthStore } from '../store/authStore';
import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Button } from 'primereact/button';
import { toast } from 'react-toastify';
import { api } from '../service';
import { UserSummary } from '../types';
import { useNavigate, Link } from 'react-router-dom';
import { FloatLabel } from 'primereact/floatlabel';
import { Package } from 'lucide-react';

type Inputs = {
  user_name: string;
  password: string;
};

export const LoginFrom = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
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
      const safeUser: UserSummary = {
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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center flex-col px-4 sm:px-6 lg:px-8">

      <div className="max-w-md w-full flex items-center flex-col bg-white rounded-lg shadow-sm border border-gray-200 p-6 sm:p-8">
        
         <header className="text-center mb-6 sm:mb-8">
          <div className="flex items-center justify-center gap-3 ">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <div className="w-10 h-10 bg-black  rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-white" />
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">TechNova</h1>
          </div>
          <p className="text-sm sm:text-base text-gray-600">Inventory Management System</p>
        </header>

        <div className='flex flex-col justify-center items-center'>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Login</h2>
          <form className="space-y-4 flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <div className="p-field">
            <FloatLabel>
              <Controller
                name="user_name"
                control={control}
                rules={{ required: 'Username is required' }}
                render={({ field }) => (
                  <InputText
                    id="user_name"
                    {...field}
                    className={`w-[17.4rem] ${errors.user_name ? 'p-invalid' : ''}`}
                  />
                )}
              />
              <label htmlFor="user_name">Username</label>
            </FloatLabel>
            {errors.user_name && <p className="text-red-600 text-sm">{errors.user_name.message}</p>}
          </div>


          <div className="p-field">
            <FloatLabel>
              <Controller
                name="password"
                control={control}
                rules={{ required: 'Password is required' }}
                render={({ field }) => (
                  <Password
                    inputId="password"
                    {...field}
                    feedback={false}
                    toggleMask
                    className={`w-full ${errors.password ? 'p-invalid' : ''}`}
                  />
                )}
              />
              <label htmlFor="password">Password</label>
            </FloatLabel>
            {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}
          </div>



          <div className="flex justify-center ">
            <Button type="submit" 
            label={isLoading ? 'Logging in...' : 'Login'} 
            size="small" 
            className="bg-black! border-none! hover:bg-gray-700! px-6 py-2 text-sm w-2xs" 
            disabled={isLoading}
            />
          </div>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
        </div>


        <p className="mt-6 text-center text-sm sm:text-base text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-500 hover:text-blue-600">
            Register
          </Link>
        </p>
        </div>

        
      </div>
    </div>

  );
};
