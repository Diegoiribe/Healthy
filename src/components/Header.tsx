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
  return (
    <div
      className={`fixed z-10 w-full flex items-center justify-between py-3 px-50 transition-all duration-300 ${
        scrolled ? 'bg-white/80 backdrop-blur-sm shadow-sm' : 'bg-transparent'
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
      <div className="flex items-center gap-20">
        <p className="">Reviews</p>
        <p>Princing</p>
        <p>FAQ</p>
      </div>

      <div className="flex items-center gap-5">
        <InputBottom name="Sign in" className="px-4 py-2 text-sm border" />
        <InputBottom
          name="Get Plan4Me"
          className="px-4 py-2 text-sm text-orange-300 bg-black border"
        />
      </div>
    </div>
  );
};
