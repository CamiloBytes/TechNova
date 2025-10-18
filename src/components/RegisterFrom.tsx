import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { useForm, Controller } from 'react-hook-form';
import { Package } from 'lucide-react';

export const RegisterFrom = () => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      user_name: '',
      password: ''
    }
  });
  const [error, setError] = useState('');
  const register = useAuthStore((state) => state.register);
  const isLoading = useAuthStore((state) => state.isLoading);
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    setError('');
    try {
      await register(data);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-8">
      <div className="max-w-md w-full flex items-center flex-col bg-white rounded-lg shadow-sm border border-gray-200 p-6 sm:p-8">
        <header className="text-center mb-6 sm:mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
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
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Register</h2>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>

            <div className="p-field">
              <Controller
                name="name"
                control={control}
                rules={{ required: 'Name is required' }}
                render={({ field }) => (
                  <InputText
                    {...field}
                    placeholder="Name"
                    className={`w-[17.5rem] ${errors.name ? 'p-invalid' : ''}`}
                  />
                )}
              />
              {errors.name && <p className="text-red-600 text-sm">{errors.name.message}</p>}
            </div>


            <div className="p-field">
              <Controller
                name="user_name"
                control={control}
                rules={{ required: 'Username is required' }}
                render={({ field }) => (
                  <InputText
                    {...field}
                    placeholder="Username"
                    className={`w-[17.5rem] ${errors.user_name ? 'p-invalid' : ''}`}
                  />
                )}
              />
              {errors.user_name && <p className="text-red-600 text-sm">{errors.user_name.message}</p>}
            </div>

            <div className="p-field">
              <Controller
                name="password"
                control={control}
                rules={{ required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } }}
                render={({ field }) => (
                  <Password
                    {...field}
                    placeholder="Password"
                    className={`w-full! ${errors.password ? 'p-invalid' : ''}`}
                    feedback={false}
                    toggleMask
                  />
                )}
              />
              {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}
            </div>


            {error && <p className="text-red-600 text-sm">{error}</p>}

            <Button
              type="submit"
              label={isLoading ? 'Registering...' : 'Register'}
              className="w-full bg-black! border-none!  text-white hover:bg-gray-800! px-4 py-2 text-sm"
              size="small"
              disabled={isLoading}
            />
          </form>

          <p className="mt-4 text-center text-sm sm:text-base text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-500 hover:text-blue-600">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
