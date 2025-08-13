import type { WeekMeals } from '../../pages/Dashboard';
import { Calendar } from './Calendar';
import type { UserDataProps } from '../../pages/Dashboard';

type CalendarMobileProps = {
  setOpenCalendar: (value: boolean) => void;
  openCalendar: boolean;
  weekMeals?: WeekMeals | null;
  createPlan: () => Promise<void>;
  userData?: UserDataProps;
  setIsGenerate: (value: boolean) => void;
  setUserData: (data: UserDataProps) => void;
  setIsGeneratePlan: (value: boolean) => void;
  isGeneratePlan: boolean;
  isGenerate: boolean;
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
