type OpenCalendarProps = {
  setOpenCalendar: (value: boolean) => void;
};

export const OpenCalendar = ({ setOpenCalendar }: OpenCalendarProps) => {
  const items = Array.from({ length: 5 }, (_, i) => ({
    id: i,
    name: `Item ${i + 1}`
  }));

  return (
    <div className="fixed inset-0 z-30 overflow-y-auto backdrop-blur-sm bg-black/10">
      <div className="min-h-screen px-4 py-10">
        <div className="flex justify-end gap-2">
          <div
            className="flex items-center justify-center w-10 h-10 text-xl font-light text-black bg-white rounded-full cursor-pointer hover:text-white hover:bg-red-400/70"
            onClick={() => setOpenCalendar(false)}
          >
            Ｘ
          </div>
        </div>

        <div className="flex flex-col items-center w-full gap-8 mt-10 ">
          {items.map(() => (
            <div
              className="w-[325px] bg-white border border-neutral-50 rounded-3xl"
              key={Math.random()}
            >
              <div className="flex flex-col w-full gap-3 p-5 rounded-3xl">
                <div className="w-full cursor-pointer rounded-xl">
                  <div className="flex gap-1">
                    <p className="p-1 px-2 text-xs font-medium text-white bg-purple-300 rounded-lg">
                      2:00 PM
                    </p>
                    <p className="p-1 px-2 text-xs font-medium text-white bg-blue-300 rounded-lg">
                      Desayuno
                    </p>
                  </div>

                  <div className="flex gap-20 mt-3 ">
                    <div className="flex items-center gap-2 ">
                      <div className="w-[7px] bg-black/10 rounded-full min-h-10 h-full max-h-34"></div>
                      <p className="text-sm font-light text-neutral-500 ">
                        Pechuga de pollo a la plancha con brócoli al vapor y
                        ensalada de aguacate
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
