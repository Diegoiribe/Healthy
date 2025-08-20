import { InputBottom, InputText } from '../components/TypeInputs';
import { useState, useEffect } from 'react';
import { login } from '../api/auth';
import { Link, useNavigate } from 'react-router-dom';

export const LogIn = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    // Evita el comportamiento por defecto del formulario
    e.preventDefault();
    try {
      const response = await login(formData);
      setIsLoading(false);
      if (response) {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error al generar plan:', error);
      alert('Error al iniciar sesión. Por favor, verifica tus credenciales.');
    }
    console.log('Form data:', formData);
  };

  useEffect(() => {
    document.documentElement.style.setProperty('--page-bg-html', '#fffff');
    document.documentElement.style.setProperty('--page-bg-body', '#fffff'); // rojo
    return () => {
      document.documentElement.style.removeProperty('--page-bg-html');
      document.documentElement.style.removeProperty('--page-bg-body');
    };
  }, []);

  return (
    <div className="flex items-center justify-center w-screen h-screen p-10">
      <div className="h-full ">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center max-w-[400px] h-full "
        >
          <div className="w-full">
            <h1 className="text-5xl font-black text-center mb-15">
              Iniciar sesion{' '}
              <Link
                to={'/'}
                className="
    relative inline-block isolate
    before:content-[''] before:absolute
    before:-inset-x-2 before:-bottom-[0.01em]
    before:h-[1em] before:bg-orange-100
    before:z-0
  "
              >
                <span className="relative z-10 text-yellow-800">Plan4Me</span>
              </Link>
            </h1>
          </div>

          <InputText
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="Enter your email"
            label="Correo electronico"
            type="email"
            name="email"
            required={true}
            className="w-full mb-5"
          />
          <InputText
            value={formData.password}
            onChange={(e) => handleChange('password', e.target.value)}
            placeholder="Enter your password"
            label="Contraseña"
            type="password"
            name="password"
            required={true}
            className="w-full mb-10"
          />

          <div
            className={`flex ${
              isLoading ? 'justify-center' : 'justify-end'
            }  w-full px-1`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <div className="w-8 h-8 border-4 border-neutral-200 border-t-orange-200 rounded-full animate-[spin_0.5s_linear_infinite]"></div>
              </div>
            ) : (
              <InputBottom
                type="submit"
                name="Iniciar Sesión"
                className="px-10 py-2 text-yellow-800 bg-orange-100 border rounded-2xl "
              />
            )}
          </div>

          <Link to={'/register'} className="mt-10 font-light text-normal">
            No tienes una cuenta?{' '}
            <span className="text-blue-400 underline">Registrate</span>
          </Link>
        </form>
      </div>
    </div>
  );
};
