import { useState } from 'react';
import { CalendarTemplate } from '../components/CalendarTemplate';
import { ConfigUser } from '../components/ConfigUser';
import { Header } from '../components/Header';
import { GeneratePlan } from '../components/GeneratePlan';
import { ListUser } from '../components/ListUser';

export const Dashboard = () => {
  const [isConfig, setIsConfig] = useState<boolean>(false);
  const [isList, setIsList] = useState<boolean>(false);
  const weekMeals: string[][] = [
    // ['', '', '', '', ''],
    // ['', '', '', '', ''],
    // ['', '', '', '', ''],
    // ['', '', '', '', ''],
    // ['', '', '', '', '']
  ];

  return (
    <div className="flex flex-col ">
      <Header isAdmin={true} />
      <div className="flex flex-col items-center justify-center min-h-[95vh] mx-auto gap-10 max-w-5xl mt-[80px]">
        {isConfig && <ConfigUser setIsConfig={setIsConfig} />}
        {isList && <ListUser setIsList={setIsList} />}
        {!isConfig && !isList && (
          <>
            <div className="flex items-center justify-between mx-auto min-w-4xl ">
              <p className="font-black text-7xl">
                <span className="relative inline-block before:absolute before:-inset-x-2 before:-bottom-[0.01em] before:h-[.4em] before:bg-orange-200 before:-z-10">
                  Welcome,
                </span>{' '}
                Diego
              </p>
              <div className="flex items-center justify-center gap-4 pr-2">
                <p
                  className="flex items-center justify-center w-12 h-12 p-2 text-3xl rounded-full cursor-pointer hover:bg-black/5"
                  onClick={() => setIsConfig(true)}
                >
                  ⚙️
                </p>
                <p
                  className="flex items-center justify-center w-12 h-12 text-2xl rounded-full cursor-pointer hover:bg-black/5"
                  onClick={() => setIsList(true)}
                >
                  📋
                </p>
              </div>
            </div>
            {weekMeals.length === 0 ? (
              <GeneratePlan />
            ) : (
              <CalendarTemplate weekMeals={weekMeals} />
            )}
          </>
        )}
      </div>
    </div>
  );
};
