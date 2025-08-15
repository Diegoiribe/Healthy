import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const Success = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login'); // Cambia a la ruta que quieras
    }, 2000);

    return () => clearTimeout(timer); // Limpia el timeout si el componente se desmonta
  }, [navigate]);

  return (
    <div className="flex items-center justify-center w-screen min-h-screen p-10">
      <div className="h-full ">
        <div className="flex flex-col items-center justify-center w-[400px] h-full">
          <div className="w-full ">
            <h1 className="text-5xl font-black text-center mb-25">
              Bienvenido a{' '}
              <span
                className="
relative inline-block isolate
before:content-[''] before:absolute
before:-inset-x-2 before:-bottom-[0.01em]
before:h-[1em] before:bg-red-200
before:z-0
"
              >
                <span className="relative z-10">Plan4Me</span>
              </span>
            </h1>
          </div>
          <div className="flex flex-col items-center justify-center gap-10 text-center">
            <p className="flex items-center justify-center w-10 h-10 text-2xl font-black text-white bg-red-300 rounded-full">
              ✓
            </p>
            <p className="text-2xl font-light">
              ¡Bienvenido! Tu cuenta se ha creado correctamente. Seras
              redirigido automaticamente...
            </p>
          </div>

          <p className="font-light mt-25 text-normal">
            Ir directo a{' '}
            <Link to={'/login'} className="text-blue-400 underline">
              Iniciar sesion
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
