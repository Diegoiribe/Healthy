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
import imgUser from '../../assets/steveRed.jpg';

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
    const body = isWhite ? '#ffffff' : '#ffedd5';
    document.documentElement.style.setProperty('--page-bg-html', html);
    document.documentElement.style.setProperty('--page-bg-body', body);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', body);
  }, [isWhite]);

  // ===== Fondo tipo "hero" controlado localmente (sin userData) =====
  // Cambia este flag a false para activar el hero con imagen de usuario.
  const imgDefault = false;
  const useHeroBg = imgDefault === false;
  // Imagen de fondo: primero la "del usuario" importada, si no, el icono por defecto.
  const bgImageUrl: string =
    (imgUser as unknown as string) || (icon as unknown as string);
  // ==================================================================

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
        <section
          className={`w-full min-h-viewport
      pt-[env(safe-area-inset-top)] 
      pb-[env(safe-area-inset-bottom)]
      pl-[env(safe-area-inset-left)] 
      pr-[env(safe-area-inset-right)]
      text-white bg-orange-100 ${
        useHeroBg ? 'relative isolate overflow-hidden' : ''
      }`}
        >
          {useHeroBg && (
            <>
              {/* FOTO del usuario ocupando solo el header */}
              <div
                className="absolute inset-x-0 top-0 h-[460px] -z-10 bg-top bg-cover rounded-b-[28px]"
                style={{ backgroundImage: `url(${bgImageUrl})` }}
              />
              {/* Oscurecer la foto para legibilidad */}
              <div className="absolute inset-x-0 top-0 h-[460px] -z-10 rounded-b-[28px] bg-black/15" />
              {/* Degradado de la foto hacia el fondo actual de la página */}
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-[460px] -z-10 rounded-b-[28px]
                              bg-[linear-gradient(to_bottom,rgba(0,0,0,0.05)_40%,#FFEDD5_100%)]"
              />
            </>
          )}
          {useHeroBg && (
            <button
              onClick={logOut}
              className="absolute z-30 flex items-center justify-center w-10 h-10 text-lg font-bold text-black rounded-full top-10 right-10 backdrop-blur-md bg-white/60 hover:bg-white"
              aria-label="Log out"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-log-out-icon lucide-log-out"
              >
                <path d="m16 17 5-5-5-5" />
                <path d="M21 12H9" />
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              </svg>
            </button>
          )}
          <div
            className={`flex flex-col items-center max-w-2xl p-10 mx-auto ${
              useHeroBg ? 'pt-[380px]' : ''
            }`}
          >
            {!useHeroBg && (
              <div className="flex justify-end w-full">
                <div
                  className="flex items-center justify-center w-10 h-10 text-lg font-bold text-black rounded-full cursor-pointer backdrop-blur-md bg-white/60 hover:bg-white"
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
            )}
            {!useHeroBg && (
              <div
                className="w-24 h-24 mb-5 bg-white rounded-full"
                style={{
                  backgroundImage: `url(${icon})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              />
            )}
            <div className="flex items-center gap-1 mb-5">
              <p
                className={`text-3xl font-black 
                   text-yellow-800
                `}
              >
                {userData?.firstName}
              </p>
              <p className="flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white  bg-blue-400 rounded-full">
                ✓
              </p>
            </div>
            <div className="flex items-center justify-center gap-2 pr-2 mb-7">
              <p
                className="flex items-center justify-center w-12 h-12 p-2 text-4xl font-semibold text-blue-400 rounded-full cursor-pointer backdrop-blur-md hover:bg-white/60 "
                onClick={() => exportPDF(weekMeals)}
              >
                ↓
              </p>
              <p
                className="flex items-center justify-center w-12 h-12 p-2 text-3xl rounded-full cursor-pointer backdrop-blur-md hover:bg-white/60"
                onClick={() => setIsConfig(true)}
              >
                ⚙️
              </p>
              <p
                className="flex items-center justify-center w-12 h-12 text-3xl rounded-full cursor-pointer backdrop-blur-md hover:bg-white/60"
                onClick={() => setIsList(true)}
              >
                📋
              </p>

              <p
                className="flex items-center justify-center w-12 h-12 p-2 text-3xl font-semibold rounded-full cursor-pointer backdrop-blur-md hover:bg-white/60"
                onClick={() => setIsReferrals(true)}
              >
                🗂️
              </p>
            </div>
            <div className="flex p-[2px] overflow-hidden rounded-full backdrop-blur-md bg-white/60 ">
              <button
                onClick={() => setActive('links')}
                className={`w-24 h-13 font-black transition-all duration-300 cursor-pointer ${
                  active === 'links'
                    ? 'bg-black text-white  rounded-full'
                    : ' text-yellow-800 '
                }`}
              >
                Links
              </button>

              <button
                onClick={() => setActive('calendar')}
                className={`w-28 h-13 font-black transition-all duration-300 cursor-pointer ${
                  active === 'calendar'
                    ? 'bg-black text-white  rounded-full'
                    : ' text-yellow-800 '
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
        </section>
      )}
    </LocalBgCtx.Provider>
  );
};
