import React, { useState } from 'react';

interface CalendarTemplateProps {
  weekMeals?: string[][];
}

export const CalendarTemplate = ({ weekMeals }: CalendarTemplateProps) => {
  const [activeIndex, setActiveIndex] = useState<string | null>(null);
  const today = new Date();
  const currentDay = (today.getDay() + 6) % 7;

  const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ];

  const meals = ['Desayuno', 'Merienda', 'Comida', 'Merienda', 'Cena'];

  const hourToMealIndex: Record<number, number> = {
    0: 0, // Desayuno
    11: 1, // Merienda
    13: 2, // Comida
    17: 3, // Merienda
    19: 4 // Cena
  };

  const currentHour = new Date().getHours();
  const closestHour = Object.keys(hourToMealIndex)
    .map(Number)
    .reverse()
    .find((h) => currentHour >= h);

  const currentMealIndex =
    closestHour !== undefined ? hourToMealIndex[closestHour] : null;

  const handleClick = (i: number, j: number) => {
    const index = `${i}-${j}`;
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-20">
      <table className="w-full border-separate table-auto border-spacing-x-2 border-spacing-y-3">
        <thead>
          <tr>
            <th className="flex items-center justify-around text-sm font-semibold text-left text-gray-700 ">
              <p className="flex items-center justify-center w-8 h-8 transition bg-white border rounded-full cursor-pointer border-neutral-300 hover:bg-black/5">
                ←
              </p>
              <p className="flex items-center justify-center w-8 h-8 transition bg-white border rounded-full cursor-pointer border-neutral-300 hover:bg-black/5">
                →
              </p>
            </th>
            <th
              className={`py-2 text-sm text-center  rounded-lg  ${
                currentDay === 2
                  ? 'bg-black/5  font-bold'
                  : 'bg-black/5 font-medium'
              }`}
            >
              {days[2]}
            </th>
          </tr>
        </thead>
        <tbody className="w-full">
          {weekMeals?.map((week, i) => (
            <React.Fragment key={i}>
              <tr className="w-full">
                <td className="p-4 text-sm font-bold text-center bg-black/5 rounded-2xl ">
                  {meals[i]}
                </td>
                {week.map((meal, j) => {
                  const index = `${i}-${j}`;
                  const isActive = activeIndex === index;

                  return (
                    j === currentDay && (
                      <td
                        key={j}
                        className={`px-3 pt-2 pb-3 rounded-2xl cursor-pointer  w-full ${
                          currentMealIndex === i
                            ? 'bg-orange-100'
                            : 'bg-[#56cbf952]'
                        }`}
                        onClick={() => handleClick(i, j)}
                      >
                        <div className="flex flex-col justify-between min-h-18">
                          <div
                            className={` text-lg font-semibold text-center  ${
                              j === currentDay ? 'text-black' : 'text-blue-400'
                            }`}
                          >
                            {meal}
                          </div>
                          <div className="flex justify-end">
                            <div className="flex items-center justify-center w-3 h-3 transition bg-white rounded-full">
                              <div
                                className={`w-2 h-2 rounded-full transition ${
                                  isActive ? 'bg-green-500' : 'bg-white'
                                }`}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </td>
                    )
                  );
                })}
              </tr>
            </React.Fragment>
          ))}
          {activeIndex && (
            <tr className="w-full">
              <td /> {/* celda vacía para alinear */}
              <td className="w-full">
                <div className="flex flex-col bg-white">
                  <div className="flex items-center justify-end gap-3">
                    <p
                      className="p-2 rounded-full cursor-pointer bg-black/5 hover:bg-black/15"
                      title="Cambiar Comida"
                    >
                      🔄
                    </p>
                    <p
                      className="p-2 rounded-full cursor-pointer bg-black/5 hover:bg-black/15"
                      title="Agregar a no Favoritos"
                    >
                      👎🏼
                    </p>
                    <p
                      className="p-2 rounded-full cursor-pointer bg-black/5 hover:bg-black/15"
                      title="Añadir a Favoritos"
                    >
                      ⭐️
                    </p>
                  </div>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
