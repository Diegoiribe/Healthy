import { Information } from './Information';
import { useState } from 'react';
import type { UserDataProps } from '../pages/Dashboard';

interface ConfigUserProps {
  setIsConfig: (value: boolean) => void;
  userData?: UserDataProps;
  setUserData: (data: UserDataProps) => void;
}

export const ConfigUser = ({
  setIsConfig,
  userData,
  setUserData
}: ConfigUserProps) => {
  const [IsSelected, setIsSelected] = useState<string>('information');

  return (
    <div className="w-full h-screen mt-10">
      <div className="flex items-center justify-between max-w-3xl mx-auto ">
        <p
          className="items-center justify-center text-2xl font-semibold text-black rounded-full cursor-pointer lex hover:text-red-300"
          onClick={() => setIsConfig(false)}
        >
          ←
        </p>
        <div className="flex items-center justify-between gap-10 py-5 ">
          <p
            className={` text-lg cursor-pointer  ${
              IsSelected === 'information'
                ? 'text-black font-semibold border-black border-b '
                : 'text-neutral-400'
            }`}
            onClick={() => setIsSelected('information')}
          >
            Ajustes
          </p>
        </div>
      </div>

      {IsSelected === 'information' && (
        <Information userData={userData} setUserData={setUserData} />
      )}
    </div>
  );
};
