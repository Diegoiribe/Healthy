import type { WeekMeals } from '../../pages/Dashboard';
import { Calendar } from './Calendar';
import type { UserDataProps } from '../../pages/Dashboard';

type CalendarMobileProps = {
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

export const CalendarMobile = ({
  setOpenCalendar,
  openCalendar,
  weekMeals,
  createPlan,
  userData,
  setUserData,
  setIsGenerate,
  setIsGeneratePlan,
  isGeneratePlan,
  isMobile,
  isGenerate
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
        setIsGenerate={setIsGenerate}
        setIsGeneratePlan={setIsGeneratePlan}
        isGeneratePlan={isGeneratePlan}
        isGenerate={isGenerate}
        isMobile={isMobile}
      />

      <div className="flex flex-col items-center justify-center pt-15">
        <div className="flex items-center gap-4 ">
          <p className="text-xs font-light text-white cursor-pointer hover:font-semibold">
            Cookie Preferences
          </p>
          <p className="text-xs font-black text-white">·</p>
          <p className="text-xs font-light text-white cursor-pointer hover:font-semibold">
            Report
          </p>
          <p className="text-xs font-black text-white">·</p>
          <p className="text-xs font-light text-white cursor-pointer hover:font-semibold">
            Privacy
          </p>
        </div>
      </div>
    </div>
  );
};
