import { useMemo, useState } from 'react';
import type { WeekMeals } from '../../pages/Dashboard';

interface ListProps {
  weekMeals?: WeekMeals | null;
  setIsList: (value: boolean) => void;
}

export const List = ({ weekMeals, setIsList }: ListProps) => {
  // Aplanar la lista una sola vez
  const flatItems = useMemo(() => {
    if (!weekMeals) return [];
    return Object.values(weekMeals.shoppingList).flat();
  }, [weekMeals]);

  // Estado booleano por ítem
  const [checked, setChecked] = useState<boolean[]>(() =>
    Array(flatItems.length).fill(false)
  );

  // Toggle de ítem individual
  const toggleItem = (index: number) => {
    setChecked((prev) => prev.map((val, i) => (i === index ? !val : val)));
  };
  return (
    <div>
      <div className="flex flex-col items-center max-w-2xl p-10 mx-auto ">
        <div className="flex justify-end w-full">
          <div
            className="flex items-center justify-center w-10 h-10 text-xl font-bold text-white rounded-full cursor-pointer bg-black/10 hover:bg-red-300"
            onClick={() => setIsList(false)}
          >
            Ｘ
          </div>
        </div>
        <p className="mt-5 text-3xl font-black">Lista de compras</p>
        <div className="w-full mt-10 border border-neutral-300 rounded-3xl">
          {flatItems.map((item, index) => (
            <div
              key={index}
              className={`flex items-center border-b last:border-0 last:rounded-b-3xl border-neutral-300 first:rounded-t-3xl justify-between w-full ${
                index % 2 === 0 ? 'bg-white' : 'bg-neutral-100'
              } p-5  `}
            >
              <p className="text-sm truncate">{item}</p>

              <div className="cursor-pointer" onClick={() => toggleItem(index)}>
                <p className="text-xl">{checked[index] ? '✅' : '✓'}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
