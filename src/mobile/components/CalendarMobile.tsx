import type { WeekMeals } from '../../pages/Dashboard';
import { Calendar } from './Calendar';
import { useEffect } from 'react';

type CalendarMobileProps = {
  setOpenCalendar: (value: boolean) => void;
  openCalendar: boolean;
  weekMeals?: WeekMeals | null;
  setIsGeneratePlan: (value: boolean) => void;
};

export const CalendarMobile = ({
  setOpenCalendar,
  openCalendar,
  weekMeals,
  setIsGeneratePlan
}: CalendarMobileProps) => {
  useEffect(() => {
    if (!weekMeals) {
      setIsGeneratePlan(true);
    } else {
      setIsGeneratePlan(false);
    }
  }, [weekMeals]);
  return (
    <div className="flex flex-col items-center ">
      <Calendar
        setOpenCalendar={setOpenCalendar}
        openCalendar={openCalendar}
        weekMeals={weekMeals}
        setIsGeneratePlan={setIsGeneratePlan}
      />
    </div>
  );
};
