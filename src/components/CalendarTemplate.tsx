import React, { useState } from 'react';

export const CalendarTemplate: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<string | null>(null);
  const [moreInfo, setMoreInfo] = useState<boolean | null>(null);
  const today = new Date();
  const currentDay = (today.getDay() + 6) % 7; // Ajuste para que el lunes sea el primer día (0)

  const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ];

  const weekMeals: string[][] = [
    [
      'Pollo a la plancha',
      'Pollo a la plancha',
      'Pollo a la plancha',
      'Pollo a la plancha',
      'Pollo a la plancha',
      'Pollo a la plancha',
      'Pollo a la plancha'
    ],
    [
      'Arroz con atún',
      'Pollo a la plancha',
      'Ensalada',
      'Tacos',
      'Huevos',
      'Sopa',
      'Carne'
    ],
    [
      'Arroz con atún',
      'Pollo a la plancha',
      'Ensalada',
      'Tacos',
      'Huevos',
      'Sopa',
      'Carne'
    ],
    ['Arroz con atún', 'Pollo a la plancha', 'Ensalada', 'Tacos', 'Huevos']
  ];

  const handleClick = (i: number, j: number) => {
    const index = `${i}-${j}`;
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="max-w-3xl mx-auto">
      <table className="w-full border-separate table-auto border-spacing-x-2 border-spacing-y-3">
        <thead className="">
          <tr>
            {days.map((day, i) => {
              return (
                <th
                  key={i}
                  className={`py-2 text-sm  text-center rounded-t-lg  ${
                    i === currentDay
                      ? 'bg-green-100 text-green-600 font-bold'
                      : 'bg-black/5 font-medium'
                  }`}
                >
                  {day}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {weekMeals.map((week, i) => (
            <React.Fragment key={i}>
              <tr>
                {week.map((meal, j) => {
                  const index = `${i}-${j}`;
                  const isActive = activeIndex === index;

                  return (
                    <td
                      key={j}
                      className={`p-2 pb-3  rounded-2xl cursor-pointer ${
                        j === currentDay ? 'bg-green-100' : 'bg-blue-100'
                      } `}
                      onClick={() => handleClick(i, j)}
                    >
                      <div className="flex flex-col justify-between min-h-18">
                        <div
                          className={`p-2 text-sm font-bold text-center  ${
                            j === currentDay
                              ? 'text-green-600'
                              : 'text-blue-400'
                          } $`}
                        >
                          {meal}
                        </div>
                        <div className="flex justify-end w-full">
                          <div
                            className={`w-3 h-3 rounded-full transition flex items-center justify-center bg-white`}
                          >
                            <div
                              className={`w-2 h-2 rounded-full transition ${
                                isActive ? 'bg-green-500' : 'bg-white'
                              }`}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </td>
                  );
                })}
              </tr>

              {/* activa mas informacion sobre la comida */}
              {activeIndex && activeIndex.startsWith(`${i}-`) && (
                <tr>
                  <td colSpan={7} className="p-4">
                    <div className="flex flex-col py-2 bg-white ">
                      <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-semibold text-gray-800">
                          {week[parseInt(activeIndex.split('-')[1], 10)]}
                        </h3>
                        <div className="flex items-center">
                          <p
                            className="p-2 ml-1 rounded-full cursor-pointer bg-black/5 hover:bg-black/15"
                            title="Abrir"
                            onClick={() => setMoreInfo(!moreInfo)}
                          >
                            {moreInfo ? '🔒' : '🔓'}
                          </p>
                        </div>
                      </div>
                      <p className="max-w-sm mt-3 text-sm text-gray-500">
                        Pechuga de pollo cocinada sin aceite o con muy poca
                        grasa sobre una plancha caliente. Es una opción baja en
                        calorías, alta en proteínas y perfecta para dietas
                        equilibradas y saludables.
                      </p>
                      {moreInfo && (
                        <>
                          <h1 className="mt-6 mb-3 text-2xl font-semibold text-gray-800">
                            Receta
                          </h1>
                          <div className="flex justify-between w-full ">
                            <div className="w-1/2">
                              <h3 className="mb-3 font-medium">
                                🧑🏼‍🍳 Preparación
                              </h3>
                              <ol className="space-y-1 text-sm text-gray-500 list-decimal list-inside">
                                <li>
                                  Limpia la pechuga de pollo y elimina cualquier
                                  exceso de grasa.
                                </li>
                                <li>
                                  Si lo deseas, marina el pollo con limón, ajo,
                                  sal y pimienta durante al menos 15 minutos.
                                </li>
                                <li>
                                  Calienta una sartén o plancha a fuego
                                  medio-alto.
                                </li>
                                <li>
                                  Agrega un poco de aceite de oliva si no usas
                                  una sartén antiadherente.
                                </li>
                                <li>
                                  Coloca la pechuga en la plancha caliente.
                                </li>
                                <li>
                                  Cocina durante 4–5 minutos por lado, o hasta
                                  que esté dorada por fuera y completamente
                                  cocida por dentro.
                                </li>
                                <li>
                                  Retira del fuego y deja reposar un minuto
                                  antes de servir.
                                </li>
                              </ol>
                            </div>
                            <div className="">
                              <h3 className="mb-3 font-medium">
                                🧂 Ingredientes
                              </h3>
                              <ul className="space-y-1 text-sm text-gray-500 list-disc list-inside">
                                <li>Pechuga de pollo (sin piel, fileteada)</li>
                                <li>Sal al gusto</li>
                                <li>Pimienta negra molida</li>
                                <li>
                                  1 cucharadita de aceite de oliva (opcional)
                                </li>
                                <li>Limón (opcional, para marinar)</li>
                                <li>Ajo en polvo o fresco (opcional)</li>
                              </ul>
                            </div>
                          </div>
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
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};
