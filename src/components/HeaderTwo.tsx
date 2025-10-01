import { Link } from 'react-router-dom';
import logo from '../assets/Logo.webp';

export const HeaderTwo = () => {
  return (
    <div className="flex items-center justify-between w-full max-w-4xl py-5 ">
      <div className="flex items-center cursor-pointer">
        <img src={logo} alt="" className="object-contain w-10 h-10" />
        <p className="text-2xl font-semibold ">Plan4Me</p>
      </div>

      <div className="flex items-center gap-3">
        <Link
          to={'/login'}
          className="px-4 py-2 text-sm font-medium rounded-full cursor-pointer text-neutral-400 "
        >
          Log In
        </Link>
        <Link
          to={'/register'}
          className="px-4 py-2 text-sm font-medium text-white bg-black rounded-full cursor-pointer "
        >
          Registro
        </Link>
      </div>
    </div>
  );
};
