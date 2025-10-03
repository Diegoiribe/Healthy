import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { login } from '../api/auth';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/Logo.webp';

export const LoginTwo = () => {
  const [showPassword, setShowPassword] = useState(false);
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
      setIsLoading(false);
    }
    console.log('Form data:', formData);
  };

  return (
    <div className="w-full min-h-screen p-8 ">
      <Link to={'/'} className="flex items-center text-2xl font-semibold ">
        <img src={logo} alt="" className="object-contain w-10 h-10" />
        Plan4Me
      </Link>

      <div className="flex items-center justify-center h-[87dvh] ">
        <div className="flex flex-col items-center">
          <h1 className="mb-5 text-4xl font-medium text-center">
            Iniciar sesión
          </h1>
          <p className="mb-10 font-light text-center text-black/80 w-82">
            Accede a planes más inteligentes, recibe consejos personalizados y
            guarda tu progreso.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="relative mb-5">
              <input
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                type="email"
                id="email"
                required
                className="px-4 py-3 border rounded-full outline-none border-black/30 peer w-82 focus:border-blue-400"
              />
              <label
                htmlFor="email"
                className="absolute px-1 transition-all duration-200 -translate-y-1/2 bg-white text-black/40 left-4 top-1/2 peer-focus:-top-[1px] peer-focus:text-sm peer-valid:-top-[1px] peer-valid:text-sm peer-focus:text-blue-400"
              >
                Email address
              </label>
            </div>
            <div className="relative mb-5 w-82">
              <input
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
                type={showPassword ? 'text' : 'password'}
                id="password"
                required
                className="w-full px-4 py-3 border rounded-full outline-none pr-15 border-black/30 peer focus:border-blue-500"
              />
              <label
                htmlFor="password"
                className="absolute px-1 transition-all duration-200 -translate-y-1/2 bg-white text-black/40 left-4 top-1/2 peer-focus:-top-[1px] peer-focus:text-sm peer-valid:-top-[1px] peer-valid:text-sm peer-focus:text-blue-500"
              >
                Contraseña
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute p-2 -translate-y-1/2 rounded-full cursor-pointer right-4 top-1/2 text-black/60 hover:bg-black/5"
              >
                {showPassword ? (
                  <EyeOff size={20} strokeWidth={2.5} />
                ) : (
                  <Eye size={20} strokeWidth={2.5} />
                )}
              </button>
            </div>
            <button
              className={`px-4 py-3 mb-5 text-white bg-black rounded-full cursor-pointer w-82 ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={isLoading}
            >
              Continuar
            </button>
          </form>
          <div className="flex items-center justify-between gap-5 mb-5">
            <div className="w-34 h-[1px] bg-black/30"></div>
            <p className="text-sm font-medium">O</p>
            <div className="w-34 h-[1px] bg-black/30"></div>
          </div>
          <div className="flex items-center gap-5 px-4 py-3 mb-20 text-black bg-white border rounded-full cursor-pointer w-82 border-black/30">
            <div
              style={{
                backgroundImage: `url(https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Google_Favicon_2025.svg/330px-Google_Favicon_2025.svg.png)`,
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                width: '20px',
                height: '20px',
                display: 'inline-block'
              }}
            ></div>
            <p>Continuar con Google</p>
          </div>
          <div className="flex items-center justify-center gap-3">
            <p className="text-sm underline text-neutral-500">
              Terminos de Uso
            </p>
            <div className="w-[1.5px] h-4 bg-black"></div>
            <p className="text-sm underline text-neutral-500">
              Politica de privacidad
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
