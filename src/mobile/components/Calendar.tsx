type CalendarProps = {
  setOpenCalendar: (value: boolean) => void;
};

export const Calendar = ({ setOpenCalendar }: CalendarProps) => {
  return (
    <div className="w-[325px]" onClick={() => setOpenCalendar(true)}>
      <div className="flex flex-col w-full gap-3 p-3 bg-white rounded-3xl">
        <div className="flex items-center justify-between px-4 pt-2 ">
          <p className="text-lg font-light">
            Wed <span className="font-bold">25</span>
          </p>
          <div className="flex items-center justify-center gap-2 ">
            <div className="text-lg font-light cursor-pointer">←</div>
            <div className="text-lg font-light cursor-pointer">→</div>
          </div>
        </div>
        <div className="w-full px-4 py-2 cursor-pointer rounded-xl">
          <div className="flex gap-1">
            <p className="px-2 py-1 text-xs text-white bg-purple-300 rounded-lg">
              Now
            </p>
            <p className="p-1 px-2 text-xs font-medium rounded-lg bg-black/10">
              Desayuno
            </p>
          </div>
          <div className="flex gap-20 mt-3 ">
            <div className="flex items-center gap-2 ">
              <div className="w-[7px] bg-blue-300 rounded-full min-h-10 h-full max-h-34"></div>
              <p className="text-sm font-light text-neutral-500">
                Pechuga de pollo a la plancha con brócoli al vapor y ensalada de
                aguacate
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
