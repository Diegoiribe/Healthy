import { InputBottom, InputText } from '../components/TypeInputs';
import { useState } from 'react';
import { login } from '../api/auth';
import { Link, useNavigate } from 'react-router-dom';

export const LogIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // Evita el comportamiento por defecto del formulario
    e.preventDefault();
    try {
      const response = await login(formData);
      if (response) {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error al generar plan:', error);
    }
    console.log('Form data:', formData);
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen p-5">
      <div className="h-full ">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center w-[400px] h-full "
        >
          <div className="w-full">
            <h1 className="text-5xl font-black text-center mb-15">
              Sing in to{' '}
              <span className="relative inline-block before:absolute before:-inset-x-2 before:-bottom-[0.01em] before:h-[1em] before:bg-orange-200 before:-z-10">
                Plan4Me
              </span>
            </h1>
          </div>

          <InputText
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="Enter your email"
            label="Email"
            type="email"
            name="email"
            required={true}
            className="w-full mb-5"
          />
          <InputText
            value={formData.password}
            onChange={(e) => handleChange('password', e.target.value)}
            placeholder="Enter your password"
            label="Password"
            type="password"
            name="password"
            required={true}
            className="w-full mb-10"
          />

          <div className="flex justify-end w-full px-1">
            <InputBottom
              type="submit"
              name="Log In"
              className="px-10 py-2 text-black bg-orange-200 border rounded-2xl "
            />
          </div>

          <Link to={'/register'} className="mt-10 font-light text-normal">
            Don't have an account?{' '}
            <span className="text-blue-400 underline">Sign Up</span>
          </Link>
        </form>
      </div>
    </div>
  );
};
