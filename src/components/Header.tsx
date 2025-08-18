import { Link } from 'react-router-dom';
import Heart from '../assets/Logo.webp';
import { InputBottom } from './TypeInputs';
import { useEffect, useState } from 'react';

interface HeaderProps {
  isMobile?: boolean;
  isAdmin?: boolean;
}

export const Header = ({ isAdmin, isMobile }: HeaderProps) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const logOut = () => {
    localStorage.removeItem('token'); // o sessionStorage
    window.location.replace('/login'); // reemplaza historial
  };

  return (
    <div
      className={` z-10 w-full flex items-center justify-center   border-neutral-200   py-3 px-5 transition-all duration-300 ${
        scrolled ? 'bg-white  ' : 'bg-transparent'
      } ${scrolled && !isAdmin ? 'border-b-[.5px]' : ''} ${
        isAdmin ? 'flex ' : 'fixed '
      }`}
    >
      <div className="flex items-center justify-between w-full max-w-6xl">
        {isAdmin ? (
          <div className="flex items-center justify-center ">
            <div
              className="w-[50px] h-[50px] flex items-center justify-center "
              style={{
                backgroundImage: `url(${Heart})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            ></div>
            <p className="text-2xl font-bold">Plan4Me</p>
          </div>
        ) : (
          <Link to={'/'} className="flex items-center justify-center ">
            <div
              className="w-[50px] h-[50px] flex items-center justify-center "
              style={{
                backgroundImage: `url(${Heart})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            ></div>
            <p className="text-2xl font-bold text-yellow-800">Plan4Me</p>
          </Link>
        )}

        {isAdmin && (
          <InputBottom
            name="Salir"
            className="px-5 py-2 text-xs font-semibold transition-all duration-300 border border-neutral-300 hover:text-black hover:bg-orange-100 bg-neutral-50 text-neutral-400 hover:border-black rounded-xl"
            to="/login"
            onClick={logOut}
          />
        )}
        {!isAdmin && !isMobile && (
          // Opciones en header
          <>
            <div className="flex items-center gap-20">
              <p className=""></p>
              <p></p>
              <p></p>
            </div>
            <div className="flex items-center gap-5">
              <InputBottom
                name="Iniciar sesion"
                className="px-4 py-2 text-sm border"
                to="/login"
              />
              <InputBottom
                name="Empezar Plan4Me"
                className="px-4 py-2 text-sm text-yellow-800 bg-orange-100 border"
                to="/register"
              />
            </div>
          </>
        )}

        {isMobile && (
          <>
            <div className="flex items-center gap-5">
              <InputBottom
                name="Iniciar sesion"
                className="px-4 py-2 text-sm text-yellow-800 bg-orange-100 border"
                to="/login"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
