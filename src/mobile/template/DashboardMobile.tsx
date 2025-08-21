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
import imgUser from '../../assets/steveSuit.jpg';
import { GeneratePlan } from '../components/GeneratePlan';

// palettes.ts
export type Palette = {
  '--bg': string;
  '--fg': string;
  '--primary': string;
  '--secondary': string;
};

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
};

export const DashboardMobile = ({
  exportPDF,
  weekMeals,
  setWeekMeal,
  userData,
  setUserData
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
  const [idx, setIdx] = useState<number>(userData?.style ?? 0); // índice de paleta de colores
  console.log(idx);
  console.log(userData?.style);

  useEffect(() => {
    if (userData?.style !== undefined) {
      setIdx(userData.style);
    }
  }, [userData]);

  const palettes: Palette[] = [
    {
      '--bg': '#ffedd5',
      '--fg': '#854d0e',
      '--primary': '#000000',
      '--secondary': '#FFFFFF99'
    },
    {
      '--bg': '#f7fee7',
      '--fg': '#3f6212',
      '--primary': '#000000',
      '--secondary': '#FFFFFF99'
    },
    {
      '--bg': '#000000',
      '--fg': '#ffffff',
      '--primary': '#000000',
      '--secondary': '#FFFFFF1A'
    },
    {
      '--bg': '#dbeafe',
      '--fg': '#155e75',
      '--primary': '#000000',
      '--secondary': '#FFFFFF99'
    },
    {
      '--bg': '#ffffff',
      '--fg': '#000000',
      '--primary': '#1E50D0',
      '--secondary': '#0000000D'
    },
    {
      '--bg': '#fecdd3',
      '--fg': '#9f1239',
      '--primary': '#000000',
      '--secondary': '#FFFFFF99'
    }
  ];

  const palette = palettes[idx];

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
    const palette = palettes[idx] ?? palettes[0];
    const body = isWhite ? '#ffffff' : palette['--bg'];
    document.documentElement.style.setProperty('--page-bg-html', html);
    document.documentElement.style.setProperty('--page-bg-body', body);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', body);
  }, [isWhite, idx]);

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
    <div
      style={palette as React.CSSProperties}
      className="min-h-dvh bg-[var(--bg)] text-[var(--fg)]"
    >
      <LocalBgCtx.Provider value={api}>
        {userData?.plan == 'FREE' && <ChoosePlan setIsPayment={setIsPayment} />}
        {isConfig && !isList && !isReferrals && !isPayment && (
          <Config
            setIsConfig={setIsConfig}
            userData={userData}
            setUserData={setUserData}
            idx={idx}
            setIdx={setIdx}
          />
        )}
        {isList && !isConfig && !isReferrals && !isPayment && (
          <List setIsList={setIsList} weekMeals={weekMeals} />
        )}
        {isReferrals && !isList && !isConfig && !isPayment && (
          <Referrals setIsReferrals={setIsReferrals} />
        )}
        {isLoading && <Loading />}{' '}
        {isGeneratePlan && !isLoading && (
          <GeneratePlan
            userData={userData}
            setIsGeneratePlan={setIsGeneratePlan}
            setUserData={setUserData}
            createPlan={createPlan}
            weekMeals={weekMeals}
          />
        )}
        {!isList &&
          !isConfig &&
          !isReferrals &&
          !isPayment &&
          !isGeneratePlan &&
          !isLoading && (
            <section
              className={`w-full min-h-viewport
      pt-[env(safe-area-inset-top)] 
      pb-[env(safe-area-inset-bottom)]
      pl-[env(safe-area-inset-left)] 
      pr-[env(safe-area-inset-right)]
      text-white bg-[var(--bg)]  ${
        useHeroBg ? 'relative isolate overflow-hidden' : ''
      }`}
            >
              {useHeroBg && (
                <>
                  {/* FOTO del usuario ocupando solo el header */}
                  <div
                    className="absolute inset-x-0 top-0 h-[460px] -z-10 bg-top bg-cover "
                    style={{ backgroundImage: `url(${bgImageUrl})` }}
                  />
                  {/* Oscurecer la foto para legibilidad */}
                  <div className="absolute inset-x-0 top-0 h-[460px] -z-10  bg-black/15" />
                  {/* Degradado de la foto hacia el fondo actual de la página */}
                  <div
                    className="pointer-events-none absolute inset-x-0 top-0 h-[460px] -z-10 
  bg-[linear-gradient(to_bottom,rgba(0,0,0,0.05)_40%,var(--bg)_100%)]"
                  />
                </>
              )}
              {useHeroBg && (
                <button
                  onClick={logOut}
                  className={` ${
                    idx === 2 ? 'hover:bg-black' : 'hover:bg-white'
                  } absolute z-30 flex items-center justify-center w-10 h-10 text-lg font-bold text-[var(--fg)] rounded-full cursor-pointer top-10 right-10 backdrop-blur-md bg-[var(--secondary)] `}
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
                      className="flex items-center justify-center w-10 h-10 text-lg font-bold text-black rounded-full cursor-pointer backdrop-blur-md bg-[var(--secondary)] hover:bg-white"
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
                   text-[var(--fg)]
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
                    className="flex items-center justify-center w-12 h-12 p-2 text-4xl font-semibold text-blue-400 rounded-full cursor-pointer hover:backdrop-blur-md hover:bg-[var(--secondary)] "
                    onClick={() => exportPDF(weekMeals)}
                  >
                    ↓
                  </p>
                  <p
                    className="flex items-center justify-center w-12 h-12 p-2 text-3xl rounded-full cursor-pointer hover:backdrop-blur-md hover:bg-[var(--secondary)]"
                    onClick={() => setIsConfig(true)}
                  >
                    ⚙️
                  </p>
                  <p
                    className="flex items-center justify-center w-12 h-12 text-3xl rounded-full cursor-pointer hover:backdrop-blur-md hover:bg-[var(--secondary)]"
                    onClick={() => setIsList(true)}
                  >
                    📋
                  </p>

                  <p
                    className="flex items-center justify-center w-12 h-12 p-2 text-3xl font-semibold rounded-full cursor-pointer hover:backdrop-blur-md hover:bg-[var(--secondary)]"
                    onClick={() => setIsReferrals(true)}
                  >
                    🗂️
                  </p>
                </div>
                <div className="flex p-[4px] overflow-hidden rounded-full backdrop-blur-md bg-[var(--secondary)] ">
                  <button
                    onClick={() => setActive('links')}
                    className={`w-24 h-13 font-black transition-all duration-300 cursor-pointer ${
                      active === 'links'
                        ? 'bg-[var(--primary)] text-white  rounded-full'
                        : ' text-[var(--fg)] '
                    }`}
                  >
                    Inicio
                  </button>

                  <button
                    onClick={() => setActive('calendar')}
                    className={`w-24 h-13 font-black transition-all duration-300 cursor-pointer ${
                      active === 'calendar'
                        ? 'bg-[var(--primary)] text-white  rounded-full'
                        : ' text-[var(--fg)] '
                    }`}
                  >
                    Plan
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
                      setIsGeneratePlan={setIsGeneratePlan}
                    />
                  )}
                </div>
              </div>
            </section>
          )}
      </LocalBgCtx.Provider>
    </div>
  );
};
