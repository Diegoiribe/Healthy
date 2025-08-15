import { useState, useEffect, createContext, useContext, useMemo } from 'react';
import { HomeMobile } from '../components/HomeMobile';
import { CalendarMobile } from '../components/CalendarMobile';
import type { WeekMeals, UserDataProps } from '../../pages/Dashboard';
import { List } from '../components/List';
import { post } from '../../api/http';
import { Config } from '../components/Config';
import { Referrals } from '../components/Referrals';
import { Loading } from '../components/Loading';
import { ChoosePlan } from '../components/ChoosePlan';
import icon from '../../assets/appleBlue.png';

// ===== Context local SOLO para este componente rojo =====
type LocalBgAPI = { pushWhite: () => void; popWhite: () => void };
const LocalBgCtx = createContext<LocalBgAPI | null>(null);
export const useLocalBg = () => {
  const ctx = useContext(LocalBgCtx);
  if (!ctx) throw new Error('useLocalBg must be used within DashboardMobile');
  return ctx;
};
// =======================================================

type DashboardMobileProps = {
  exportPDF: (weekMeals: WeekMeals | null) => void;
  weekMeals: WeekMeals | null;
  setWeekMeal: (data: WeekMeals) => void;
  userData?: UserDataProps;
  setUserData: (data: UserDataProps) => void;
  isMobile: boolean;
};

export const DashboardMobile = ({
  exportPDF,
  weekMeals,
  setWeekMeal,
  userData,
  setUserData,
  isMobile
}: DashboardMobileProps) => {
  // Estados propios del dashboard
  const [isList, setIsList] = useState(false);
  const [isGeneratePlan, setIsGeneratePlan] = useState(false);
  const [active, setActive] = useState<'links' | 'calendar'>('links');
  const [isConfig, setIsConfig] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [isPayment, setIsPayment] = useState<boolean>(false);
  const [isReferrals, setIsReferrals] = useState(false);

  // ===== Contador de “peticiones de blanco” desde cualquier hijo =====
  const [whiteRefs, setWhiteRefs] = useState(0);
  const api = useMemo<LocalBgAPI>(
    () => ({
      pushWhite: () => setWhiteRefs((n) => n + 1),
      popWhite: () => setWhiteRefs((n) => Math.max(0, n - 1))
    }),
    []
  );
  const isWhite = whiteRefs > 0; // si >0, fondo blanco
  // ===================================================================

  const logOut = () => {
    localStorage.removeItem('token');
    window.location.replace('/login');
  };

  useEffect(() => {
    if (userData?.plan === 'FREE') {
      setIsPayment(true);
    }
  }, [userData?.plan]);

  // 🔴 Un SOLO efecto para pintar fondo según isWhite (no según cada modal)
  useEffect(() => {
    const html = isWhite ? '#ffffff' : '#ffffff';
    const body = isWhite ? '#ffffff' : '#dc2626';
    document.documentElement.style.setProperty('--page-bg-html', html);
    document.documentElement.style.setProperty('--page-bg-body', body);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', body);
  }, [isWhite]);

  const createPlan = async (u?: UserDataProps): Promise<void> => {
    const user = u ?? userData;
    if (!user || !user.dietType) return;

    setIsLoading(true);
    setIsGeneratePlan(false);

    try {
      const data = { dietType: user.dietType };
      const res = await post('/user/plan/generate', data);
      const fixedRes = {
        plan: res.plan ?? res.Plan ?? {},
        shoppingList: res.shoppingList ?? res.listaDeCompras ?? {}
      };
      setWeekMeal(fixedRes);
    } catch (error) {
      console.error('Error generating plan:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LocalBgCtx.Provider value={api}>
      {userData?.plan == 'FREE' && <ChoosePlan setIsPayment={setIsPayment} />}
      {isConfig && !isList && !isReferrals && !isPayment && (
        <Config
          setIsConfig={setIsConfig}
          userData={userData}
          setUserData={setUserData}
        />
      )}
      {isList && !isConfig && !isReferrals && !isPayment && (
        <List setIsList={setIsList} weekMeals={weekMeals} />
      )}
      {isReferrals && !isList && !isConfig && !isPayment && (
        <Referrals setIsReferrals={setIsReferrals} />
      )}
      {isLoading && <Loading />}{' '}
      {!isList && !isConfig && !isReferrals && !isPayment && (
        <div
          className=" bg-red-600 w-full min-h-viewport
      pt-[env(safe-area-inset-top)] 
      pb-[env(safe-area-inset-bottom)]
      pl-[env(safe-area-inset-left)] 
      pr-[env(safe-area-inset-right)]
      text-white"
        >
          <div className="flex flex-col items-center max-w-2xl p-10 mx-auto ">
            <div className="flex justify-end w-full">
              <div
                className="flex items-center justify-center w-10 h-10 text-lg font-bold text-white bg-red-400 rounded-full cursor-pointer hover:bg-red-700"
                onClick={logOut}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-log-out-icon lucide-log-out"
                >
                  <path d="m16 17 5-5-5-5" />
                  <path d="M21 12H9" />
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                </svg>
              </div>
            </div>
            <div
              className="w-24 h-24 mb-5 bg-white rounded-full"
              style={{
                backgroundImage: `url(${icon})`,
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
                  setIsGeneratePlan={setIsGeneratePlan}
                  isGeneratePlan={isGeneratePlan}
                  isMobile={isMobile}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </LocalBgCtx.Provider>
  );
};
