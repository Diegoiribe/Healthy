import { Information } from './Information';
import { Plan } from './Plan';
import { useState } from 'react';

export const ConfigUser = (props: {
  setIsConfig: (value: boolean) => void;
}) => {
  const { setIsConfig } = props;
  const [IsSelected, setIsSelected] = useState<string>('information');

  return (
    <div className="w-full h-screen ">
      <div className="flex items-center justify-between max-w-3xl mx-auto min-w-3xl ">
        <div className="flex items-center justify-between gap-10 py-5 ">
          <p
            className={` text-lg cursor-pointer  ${
              IsSelected === 'plan'
                ? 'text-black font-semibold border-black border-b'
                : 'text-neutral-400'
            }`}
            onClick={() => setIsSelected('plan')}
          >
            Your Plan
          </p>
          <p
            className={` text-lg cursor-pointer  ${
              IsSelected === 'information'
                ? 'text-black font-semibold border-black border-b '
                : 'text-neutral-400'
            }`}
            onClick={() => setIsSelected('information')}
          >
            Settings
          </p>
        </div>

        <p
          className="text-2xl cursor-pointer text-neutral-300 hover:text-black"
          onClick={() => setIsConfig(false)}
        >
          🆇
        </p>
      </div>

      {IsSelected === 'plan' && <Plan />}
      {IsSelected === 'information' && <Information />}
    </div>
  );
};
