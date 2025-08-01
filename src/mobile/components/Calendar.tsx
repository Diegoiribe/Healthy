import type { WeekDay, WeekMeals } from '../../pages/Dashboard';
import { useEffect, useState } from 'react';
import { CreateFirstPlan } from '../../components/CreateFirstPlan';
import { GeneratePlan } from '../../components/GeneratePlan';
import type { UserDataProps } from '../../pages/Dashboard';

type CalendarProps = {
  setOpenCalendar: (value: boolean) => void;
  openCalendar: boolean;
  weekMeals?: WeekMeals | null;
  createPlan: () => void;
  userData?: UserDataProps;
  setIsGenerate: (value: boolean) => void;
  setUserData: (data: UserDataProps) => void;
  setIsGeneratePlan: (value: boolean) => void;
  isGeneratePlan: boolean;
  isGenerate: boolean;
  isMobile: boolean;
};

export const Calendar = ({
  setOpenCalendar,
  openCalendar,
  weekMeals,
  createPlan,
  userData,
  setUserData,
  setIsGenerate,
  setIsGeneratePlan,
  isGeneratePlan,
  isGenerate,
  isMobile
}: CalendarProps) => {
  const meals = [
    { label: 'Desayuno', key: 'desayuno' },
    { label: 'Snack', key: 'snackManana' },
    { label: 'Comida', key: 'almuerzo' },
    { label: 'Snack', key: 'snackTarde' },
    { label: 'Cena', key: 'cena' }
  ];

  const time = [
    { label: '08:00', key: 'desayuno' },
    { label: '11:00', key: 'snackManana' },
    { label: '14:00', key: 'almuerzo' },
    { label: '17:00', key: 'snackTarde' },
    { label: '20:00', key: 'cena' }
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
    console.log('🐞 weekMeals received in Calendar:', weekMeals);
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

  const dias = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

  // Lunes = 0, Domingo = 6
  const getTodayOffset = () => {
    const today = new Date().getDay(); // 0 (Dom) - 6 (Sáb)
    return today === 0 ? 6 : today - 1;
  };

  // Estado que inicia en el offset real del día actual
  const [offset, setOffset] = useState(getTodayOffset());

  // Esta función toma el offset (0 = lunes, ..., 6 = domingo) y te da el nombre y el número de ese día
  function obtenerDiaConOffset(offset: number): {
    dia: string;
    numero: number;
  } {
    const hoy = new Date();
    const todayOffset = getTodayOffset(); // Por ejemplo, hoy es jueves → 3
    const diferencia = offset - todayOffset;

    const diaMostrado = new Date();
    diaMostrado.setDate(hoy.getDate() + diferencia); // Avanza o retrocede según el offset

    return {
      dia: dias[offset],
      numero: diaMostrado.getDate()
    };
  }

  // Usar así
  const { dia, numero } = obtenerDiaConOffset(offset);

  function getMealIndexMasCercano(): number {
    const ahora = new Date();
    const minutosActuales = ahora.getHours() * 60 + ahora.getMinutes();

    let indexCercano = 0;
    let diferenciaMin = Infinity;

    time.forEach((item, i) => {
      const [hora, minuto] = item.label.split(':').map(Number);
      const minutosComparar = hora * 60 + minuto;
      const diferencia = Math.abs(minutosActuales - minutosComparar);

      if (diferencia < diferenciaMin) {
        diferenciaMin = diferencia;
        indexCercano = i;
      }
    });

    return indexCercano;
  }

  const index = getMealIndexMasCercano();

  return (
    <div className="w-[325px]">
      <div className="flex flex-col w-full gap-3 p-3 bg-white rounded-3xl">
        <div className="flex items-center justify-between px-4 pt-2 ">
          <p className="text-lg font-light">
            {dia} <span className="font-bold">{numero}</span>
          </p>
          <div className="flex items-center justify-center gap-2 ">
            <div
              className="text-lg font-light cursor-pointer"
              onClick={() => setOffset((prev) => (prev - 1 + 7) % 7)}
            >
              ←
            </div>
            <div
              className="text-lg font-light cursor-pointer"
              onClick={() => setOffset((prev) => (prev + 1) % 7)}
            >
              →
            </div>
          </div>
        </div>
        <div
          className="w-full px-4 py-2 cursor-pointer rounded-xl hover:bg-black/5"
          onClick={() => setOpenCalendar(!openCalendar)}
        >
          {openCalendar ? (
            <div className="flex flex-col ">
              {transposed.map((mealRow, i) => (
                <div
                  key={i}
                  className="py-5 last-of-type:border-0 border-neutral-300"
                >
                  <div className="flex gap-1">
                    <p className="px-2 py-1 text-[10px] font-bold text-purple-400 bg-purple-100 rounded-lg">
                      {time[i].label}
                    </p>
                    <p className="p-1 px-2 text-[10px] font-bold text-blue-400 bg-blue-100 rounded-lg">
                      {meals[i].label}
                    </p>
                  </div>
                  <div className="flex flex-col gap-20 mt-3 ">
                    <div className="flex items-center w-full gap-2 pl-2">
                      <p className="w-auto text-sm font-medium text-neutral-500">
                        {mealRow[offset]}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col ">
              {transposed.slice(index, index + 1).map((mealRow, i) => (
                <div key={i} className="py-2 border-b last-of-type:border-0 ">
                  <div className="flex gap-1">
                    <p className="px-2 py-1 text-[10px] font-bold text-purple-400 bg-purple-100 rounded-lg">
                      Now
                    </p>
                    <p className="p-1 px-2 text-[10px] font-bold text-blue-400 bg-blue-100 rounded-lg">
                      {meals[index].label}
                    </p>
                  </div>
                  <div className="flex flex-col gap-20 mt-3 ">
                    <div className="flex items-center w-full gap-2 pl-2">
                      <p className="w-auto text-sm font-medium text-neutral-500">
                        {transposed[index][offset]}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="flex w-full gap-1 py-5 mt-10 bg-white px-7 rounded-3xl">
        <div
          className="w-full py-2 text-sm font-semibold text-center text-white transition-all duration-300 bg-blue-400 cursor-pointer rounded-xl hover:bg-blue-300"
          onClick={() => setIsGeneratePlan(true)}
        >
          Create Plan
        </div>
        <div
          className="px-2 py-2 text-sm font-semibold transition-all duration-300 cursor-pointer hover:text-black hover:bg-orange-500/50 bg-black/5 text-neutral-400 rounded-xl"
          onClick={() => setIsGenerate(true)}
        >
          <p>✏️</p>
        </div>
      </div>

      {!weekMeals && (
        <CreateFirstPlan
          userData={userData}
          setUserData={setUserData}
          setIsGenerate={setIsGenerate}
          setIsGeneratePlan={setIsGeneratePlan}
          createPlan={createPlan}
          weekMeals={weekMeals}
          isMobile={isMobile}
        />
      )}

      {isGenerate && (
        <GeneratePlan
          userData={userData}
          setIsGenerate={setIsGenerate}
          setUserData={setUserData}
          createPlan={createPlan}
          weekMeals={weekMeals}
          isMobile={isMobile}
        />
      )}

      {isGeneratePlan && (
        <CreateFirstPlan
          userData={userData}
          setUserData={setUserData}
          setIsGenerate={setIsGenerate}
          setIsGeneratePlan={setIsGeneratePlan}
          createPlan={createPlan}
          weekMeals={weekMeals}
          isMobile={isMobile}
        />
      )}
    </div>
  );
};
