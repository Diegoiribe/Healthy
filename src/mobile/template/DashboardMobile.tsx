import { useState } from 'react';
import { HomeMobile } from '../components/HomeMobile';
import { CalendarMobile } from '../components/CalendarMobile';
import type { WeekMeals, UserDataProps } from '../../pages/Dashboard';
import { List } from '../components/List';
import { Config } from '../components/Config';

type DashboardMobileProps = {
  exportPDF: (weekMeals: WeekMeals | null) => void;
  weekMeals: WeekMeals | null;
  createPlan: () => void;
  userData?: UserDataProps;
  setIsGenerate: (value: boolean) => void;
  setUserData: (data: UserDataProps) => void;
  setIsGeneratePlan: (value: boolean) => void;
  isGeneratePlan: boolean;
  isGenerate: boolean;
  isMobile: boolean;
};

export const DashboardMobile = ({
  exportPDF,
  weekMeals,
  userData,
  setUserData,
  setIsGenerate,
  setIsGeneratePlan,
  isGeneratePlan,
  isGenerate,
  isMobile,
  createPlan
}: DashboardMobileProps) => {
  const [isList, setIsList] = useState(false);
  const [active, setActive] = useState<'links' | 'calendar'>('links');
  const [isConfig, setIsConfig] = useState(false);
  const [openCalendar, setOpenCalendar] = useState(false);
  console.log('🐞 weekMeals in DashboardMobile:', weekMeals);

  const logOut = () => {
    localStorage.removeItem('token'); // o sessionStorage
    window.location.replace('/login'); // reemplaza historial
  };

  return (
    <>
      {isConfig && !isList && (
        <Config
          setIsConfig={setIsConfig}
          userData={userData}
          setUserData={setUserData}
        />
      )}
      {isList && !isConfig && (
        <List setIsList={setIsList} weekMeals={weekMeals} />
      )}
      {!isList && !isConfig && (
        <div className="w-full min-h-screen bg-red-600">
          <div className="flex flex-col items-center max-w-2xl p-10 mx-auto ">
            <div className="flex justify-end w-full">
              <div
                className="flex items-center justify-center w-10 h-10 text-xl font-bold text-white bg-red-400 rounded-full cursor-pointer hover:bg-red-700"
                onClick={logOut}
              >
                Ｘ
              </div>
            </div>
            <div
              className="w-24 h-24 mb-5 bg-white rounded-full"
              style={{
                backgroundImage:
                  'url(https://p19-common-sign-sg.tiktokcdn-us.com/tos-alisg-avt-0068/f4c9191f1c76929b98fec24bdfd2fb37~tplv-tiktokx-cropcenter:168:168.jpeg?dr=9638&refresh_token=e4c6e3c1&x-expires=1754431200&x-signature=yHY8ZjfdW%2FaxYC6l4kXAqyC7YCw%3D&t=4d5b0474&ps=13740610&shp=a5d48078&shcp=8aecc5ac&idc=useast5)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            ></div>
            <div className="flex items-center gap-1 mb-5">
              <p className="text-3xl font-black text-white ">Diego</p>
              <p className="flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-blue-500 rounded-full">
                ✓
              </p>
            </div>
            <div className="flex items-center justify-center gap-4 pr-2 mb-7">
              <p
                className="flex items-center justify-center w-12 h-12 p-2 text-4xl font-semibold text-blue-500 rounded-full cursor-pointer hover:bg-red-400 "
                onClick={() => exportPDF(weekMeals)}
              >
                ↓
              </p>
              <p
                className="flex items-center justify-center w-12 h-12 p-2 text-3xl rounded-full cursor-pointer hover:bg-red-400"
                onClick={() => setIsConfig(true)}
              >
                ⚙️
              </p>
              <p
                className="flex items-center justify-center w-12 h-12 text-2xl rounded-full cursor-pointer hover:bg-red-400"
                onClick={() => setIsList(true)}
              >
                📋
              </p>
            </div>
            <div className="flex p-[2px] overflow-hidden rounded-full bg-red-400 ">
              <button
                onClick={() => setActive('links')}
                className={`w-24 h-13 font-black transition-all duration-300 cursor-pointer ${
                  active === 'links'
                    ? 'bg-black text-white rounded-full'
                    : ' text-white'
                }`}
              >
                Links
              </button>

              <button
                onClick={() => setActive('calendar')}
                className={`w-26 h-13 font-black transition-all duration-300 cursor-pointer ${
                  active === 'calendar'
                    ? 'bg-black text-white rounded-full'
                    : ' text-white'
                }`}
              >
                Calendar
              </button>
            </div>
            <div className="w-full mt-10">
              {/* Links y Shop */}
              {active === 'links' && <HomeMobile />}
              {active === 'calendar' && (
                <CalendarMobile
                  openCalendar={openCalendar}
                  setOpenCalendar={setOpenCalendar}
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
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
