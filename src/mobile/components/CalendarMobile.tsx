import type { WeekMeals } from '../../pages/Dashboard';
import { Calendar } from './Calendar';
import type { UserDataProps } from '../../pages/Dashboard';
import { useEffect } from 'react';

type CalendarMobileProps = {
  setOpenCalendar: (value: boolean) => void;
  openCalendar: boolean;
  weekMeals?: WeekMeals | null;
  createPlan: () => Promise<void>;
  userData?: UserDataProps;

  setUserData: (data: UserDataProps) => void;
  setIsGeneratePlan: (value: boolean) => void;
  isGeneratePlan: boolean;

  isMobile: boolean;
};

export const CalendarMobile = ({
  setOpenCalendar,
  openCalendar,
  weekMeals,
  createPlan,
  userData,
  setUserData,
  setIsGeneratePlan,
  isGeneratePlan,
  isMobile
}: CalendarMobileProps) => {
  useEffect(() => {
    if (!weekMeals) {
      setIsGeneratePlan(true);
    }
  }, []);
  return (
    <div className="flex flex-col items-center ">
      <Calendar
        setOpenCalendar={setOpenCalendar}
        openCalendar={openCalendar}
        weekMeals={weekMeals}
        createPlan={createPlan}
        userData={userData}
        setUserData={setUserData}
        setIsGeneratePlan={setIsGeneratePlan}
        isGeneratePlan={isGeneratePlan}
        isMobile={isMobile}
      />
    </div>
  );
};
