import { useMemo, useState, useEffect } from 'react';
import type { WeekMeals } from '../../pages/Dashboard';
import { useLocalBg } from '../template/DashboardMobile';

interface ListProps {
  weekMeals?: WeekMeals | null;
  setIsList: (value: boolean) => void;
}

export const List = ({ weekMeals, setIsList }: ListProps) => {
  const { pushWhite, popWhite } = useLocalBg();

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

  useEffect(() => {
    pushWhite(); // pide blanco al abrirse
    return () => popWhite(); // vuelve a soltar al cerrarse
  }, [pushWhite, popWhite]);

  return (
    <div>
      <div className="flex flex-col items-center min-h-[100dvh]  max-w-2xl p-10 mx-auto bg-orange-100">
        <div className="flex justify-end w-full">
          <div
            className="flex items-center justify-center w-10 h-10 text-xl font-bold text-black rounded-full cursor-pointer backdrop-blur-md bg-white/60 hover:bg-white"
            onClick={() => setIsList(false)}
          >
            Ｘ
          </div>
        </div>
        <p className="mt-5 text-3xl font-black text-yellow-800">
          Lista de compras
        </p>
        <div className="w-full mt-10 border border-white/60 backdrop-blur-md rounded-3xl">
          {flatItems.map((item, index) => (
            <div
              key={index}
              className={`flex items-center border-b last:border-0 last:rounded-b-3xl backdrop-blur-md bg-white/60 first:rounded-t-3xl justify-between w-full ${
                index % 2 === 0 ? 'bg-orange-100' : 'bg-white'
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
