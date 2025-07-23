import { Calendar } from './Calendar';

type CalendarMobileProps = {
  openCalendar: boolean;
  setOpenCalendar: (value: boolean) => void;
};

export const CalendarMobile = ({ setOpenCalendar }: CalendarMobileProps) => {
  return (
    <div className="flex flex-col items-center ">
      <Calendar setOpenCalendar={setOpenCalendar} />

      <div className="flex flex-col items-center justify-center pt-15">
        <div className="flex items-center gap-4 ">
          <p className="text-xs font-light text-black cursor-pointer hover:font-semibold">
            Cookie Preferences
          </p>
          <p className="text-xs font-black text-black">·</p>
          <p className="text-xs font-light text-black cursor-pointer hover:font-semibold">
            Report
          </p>
          <p className="text-xs font-black text-black">·</p>
          <p className="text-xs font-light text-black cursor-pointer hover:font-semibold">
            Privacy
          </p>
        </div>
      </div>
    </div>
  );
};
