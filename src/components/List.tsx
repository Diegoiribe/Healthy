import { useState, useMemo } from 'react';
import type { WeekMeals } from '../pages/Dashboard';

interface ListProps {
  weekMeals?: WeekMeals | null;
}

export const List = ({ weekMeals }: ListProps) => {
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
    <div className="flex flex-col max-w-3xl gap-10 mx-auto py-15">
      <p className="mb-5 text-5xl font-semibold text-red-300">
        Lista de compras
      </p>

      <div>
        <div className="flex w-full">
          <p className="w-full mb-4 text-neutral-400">Productos</p>
        </div>
        <div className="flex w-full">
          <div className="w-full">
            {flatItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-2 h-2 bg-red-300 rounded-full"></div>
                  <p className="text-lg font-light truncate">{item}</p>
                </div>
                <div
                  className="cursor-pointer"
                  onClick={() => toggleItem(index)}
                >
                  <p className="text-2xl text-neutral-400">
                    {checked[index] ? '✅' : '✓'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
