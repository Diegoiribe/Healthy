import { useState } from 'react';
import { HomeMobile } from '../components/HomeMobile';
import { CalendarMobile } from '../components/CalendarMobile';
import type { WeekMeals, UserDataProps } from '../../pages/Dashboard';
import { List } from '../components/List';
import { Config } from '../components/Config';
import { Referrals } from '../components/Referrals';
import imgProfile from '../../assets/icon.jpeg'; // Asegúrate de que la ruta sea correcta

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
  const [isReferrals, setIsReferrals] = useState(false);
  console.log('🐞 weekMeals in DashboardMobile:', weekMeals);

  const logOut = () => {
    localStorage.removeItem('token'); // o sessionStorage
    window.location.replace('/login'); // reemplaza historial
  };

  return (
    <>
      {isConfig && !isList && !isReferrals && (
        <Config
          setIsConfig={setIsConfig}
          userData={userData}
          setUserData={setUserData}
        />
      )}
      {isList && !isConfig && !isReferrals && (
        <List setIsList={setIsList} weekMeals={weekMeals} />
      )}

      {isReferrals && !isList && !isConfig && (
        <Referrals setIsReferrals={setIsReferrals} />
      )}

      {!isList && !isConfig && !isReferrals && (
        <div className="w-full min-h-[100svh] bg-red-600 vh-fit safe">
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
                backgroundImage: `url(${imgProfile})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            ></div>
            <div className="flex items-center gap-1 mb-5">
              <p className="text-3xl font-black text-white ">
                {userData?.firstName}
              </p>
              <p className="flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-blue-500 rounded-full">
                ✓
              </p>
            </div>
            <div className="flex items-center justify-center gap-2 pr-2 mb-7">
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
                className="flex items-center justify-center w-12 h-12 text-3xl rounded-full cursor-pointer hover:bg-red-400"
                onClick={() => setIsList(true)}
              >
                📋
              </p>

              <p
                className="flex items-center justify-center w-12 h-12 p-2 text-3xl font-semibold text-blue-500 rounded-full cursor-pointer hover:bg-red-400"
                onClick={() => setIsReferrals(true)}
              >
                🗂️
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
                className={`w-28 h-13 font-black transition-all duration-300 cursor-pointer ${
                  active === 'calendar'
                    ? 'bg-black text-white rounded-full'
                    : ' text-white'
                }`}
              >
                Calendario
              </button>
            </div>
            <div className="w-full mt-10">
              {/* Links y Shop */}
              {active === 'links' && <HomeMobile userData={userData} />}
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
