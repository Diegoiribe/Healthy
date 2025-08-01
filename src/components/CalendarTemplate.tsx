import type { WeekMeals, WeekDay } from '../pages/Dashboard';
import { useEffect, useState } from 'react';

interface CalendarTemplateProps {
  weekMeals?: WeekMeals | null;
}

export const CalendarTemplate = ({ weekMeals }: CalendarTemplateProps) => {
  const meals = [
    { label: 'Desayuno', key: 'desayuno' },
    { label: 'Snack', key: 'snackManana' },
    { label: 'Comida', key: 'almuerzo' },
    { label: 'Snack', key: 'snackTarde' },
    { label: 'Cena', key: 'cena' }
  ];

  const orderedDays: WeekDay[] = [
    'lunes',
    'martes',
    'miercoles',
    'jueves',
    'viernes',
    'sabado',
    'domingo'
  ];

  const [transposed, setTransposed] = useState<string[][]>([]);

  useEffect(() => {
    console.log('🐞 weekMeals received in CalendarTemplate:', weekMeals);
    if (!weekMeals?.plan) return;

    const normalizeDay = (day: string): string =>
      day
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();

    const normalizedPlan = Object.entries(weekMeals.plan).reduce(
      (acc, [day, value]) => {
        acc[normalizeDay(day)] = value;
        return acc;
      },
      {} as Record<string, any>
    );

    const result = meals.map((meal) =>
      orderedDays.map((day) => {
        const entry = normalizedPlan[day];
        return entry?.[meal.key] ?? '';
      })
    );

    console.log('✅ Transposed generated:', result);
    setTransposed(result);
  }, [weekMeals]);

  return (
    <div className="w-full max-w-5xl pt-5 pb-10 mx-auto px-13 ">
      {/* tabla */}

      <div className="w-full border shadow-xl min-5-xl border-neutral-300 rounded-xl">
        <div className="flex justify-between w-full bg-neutral-100 rounded-t-xl">
          <div className="p-2 text-xs font-semibold border-r border-neutral-200 text-neutral-500 w-1/8">
            <p>Meals</p>
          </div>
          <div className="p-2 text-xs font-semibold border-r border-neutral-200 text-neutral-500 w-1/8">
            <p>Monday</p>
          </div>
          <div className="p-2 text-xs font-semibold border-r border-neutral-200 text-neutral-500 w-1/8">
            <p>Tuesday</p>
          </div>
          <div className="p-2 text-xs font-semibold border-r border-neutral-200 text-neutral-500 w-1/8">
            <p>Wednesday</p>
          </div>
          <div className="p-2 text-xs font-semibold border-r border-neutral-200 text-neutral-500 w-1/8">
            <p>Thursday</p>
          </div>
          <div className="p-2 text-xs font-semibold border-r border-neutral-200 text-neutral-500 w-1/8">
            <p>Friday</p>
          </div>
          <div className="p-2 text-xs font-semibold border-r border-neutral-200 text-neutral-500 w-1/8">
            <p>Saturday</p>
          </div>
          <div className="p-2 text-xs font-semibold border-neutral-200 text-neutral-500 w-1/8">
            <p>Sunday</p>
          </div>
        </div>
        {/* Filas por comida */}
        {transposed.map((mealRow, i) => (
          <div
            key={i}
            className="flex text-xs border-t last:rounded-b-xl border-neutral-200 "
          >
            <div
              className={` p-2   border-r border-neutral-200  w-1/8   ${
                i % 2 === 0 ? 'bg-white rounded-bl-xl' : 'bg-neutral-100 '
              }`}
            >
              <p className="inline-block px-2 py-1 text-xs font-bold text-center text-blue-400 bg-blue-100 border rounded-lg ">
                {meals[i].label}
              </p>
            </div>
            {mealRow.map((meal, j) => (
              <div
                key={j}
                className={` p-2 pb-4 text-xs font-semibold  border-r last:border-0 border-neutral-200   text-neutral-500 w-1/8 min-h-20 ${
                  i % 2 === 0
                    ? 'bg-white last:rounded-br-xl'
                    : 'bg-neutral-100 '
                } ${i === transposed.length - 1 ? 'pb-10' : ''}`}
              >
                {meal}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
