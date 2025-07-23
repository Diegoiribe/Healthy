import { List } from './List';
import { useState } from 'react';
import type { WeekMeals } from '../pages/Dashboard';

interface ListProps {
  weekMeals?: WeekMeals | null;
  setIsList: (value: boolean) => void;
}

export const ListUser = ({ setIsList, weekMeals }: ListProps) => {
  const [IsSelected, setIsSelected] = useState<string>('list');

  return (
    <div className="w-full h-screen mt-25">
      <div className="flex items-center justify-between max-w-3xl mx-auto min-w-3xl">
        <div className="flex items-center justify-between gap-10 py-5 ">
          <p
            className={` text-lg cursor-pointer  ${
              IsSelected === 'list'
                ? 'text-black font-semibold border-black border-b'
                : 'text-neutral-400'
            }`}
            onClick={() => setIsSelected('list')}
          >
            List
          </p>
        </div>

        <p
          className="text-2xl cursor-pointer text-neutral-300 hover:text-black"
          onClick={() => setIsList(false)}
        >
          🆇
        </p>
      </div>

      {IsSelected === 'list' && <List weekMeals={weekMeals} />}
    </div>
  );
};
