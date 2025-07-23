import logo from '../assets/Logo.webp';
import { InputBottom } from './TypeInputs';
import { useEffect, useState } from 'react';

export const Header = (props: { isAdmin: boolean }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const { isAdmin } = props;

  const logOut = () => {
    localStorage.removeItem('token'); // o sessionStorage
    window.location.replace('/login'); // reemplaza historial
  };

  return (
    <div
      className={` z-10 w-full mx-auto max-w-6xl flex items-center justify-between py-3 transition-all duration-300 ${
        scrolled ? 'bg-white  ' : 'bg-transparent'
      } ${scrolled && !isAdmin ? 'shadow ' : ''} ${
        isAdmin ? 'flex ' : 'fixed '
      }`}
    >
      <div className="flex items-center justify-center">
        <div
          className="w-[50px] h-[50px] flex items-center justify-center "
          style={{
            backgroundImage: `url(${logo})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
        <p className="text-2xl font-bold">Plan4Me</p>
      </div>

      {isAdmin ? (
        <InputBottom
          name="Log out"
          className="px-5 py-2 text-xs font-semibold transition-all duration-300 border border-neutral-300 hover:text-black hover:bg-red-200 bg-neutral-50 text-neutral-400 hover:border-black rounded-xl"
          to="/login"
          onClick={logOut}
        />
      ) : (
        <>
          <div className="flex items-center gap-20">
            <p className="">Reviews</p>
            <p>Princing</p>
            <p>FAQ</p>
          </div>
          <div className="flex items-center gap-5">
            <InputBottom
              name="Sign in"
              className="px-4 py-2 text-sm border"
              to="/login"
            />
            <InputBottom
              name="Get Plan4Me"
              className="px-4 py-2 text-sm text-orange-300 bg-black border"
            />
          </div>
        </>
      )}
    </div>
  );
};
