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
    <div className="flex flex-col max-w-5xl mx-auto">
      <Header isAdmin={true} />
      <div className="flex flex-col items-center justify-center min-h-[90vh]  gap-10 ">
        {isConfig && <ConfigUser setIsConfig={setIsConfig} />}
        {isList && <ListUser setIsList={setIsList} />}
        {!isConfig && !isList && (
          <>
            <div className="flex items-center justify-between mx-auto min-w-3xl mt-[80px] ">
              <p className="text-6xl font-bold">
                Welcome, <span className="text-orange-300">Diego</span>
              </p>
              <div className="flex items-center justify-center gap-4 pr-2">
                <p
                  className="flex items-center justify-center w-10 h-10 p-2 text-2xl rounded-full cursor-pointer bg-black/5 hover:bg-black/15"
                  onClick={() => setIsConfig(true)}
                >
                  ⚙️
                </p>
                <p
                  className="flex items-center justify-center w-10 h-10 text-xl rounded-full cursor-pointer bg-black/5 hover:bg-black/15"
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
