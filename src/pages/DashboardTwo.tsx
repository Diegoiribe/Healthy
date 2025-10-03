import { Repeat } from 'lucide-react';
import logo from '../assets/Logo.webp';
import { useState, useEffect } from 'react';
import { ListTwo } from '../components/ListTwo';
import { CrearPlanTwo } from '../components/CrearPlanTwo';
import { ConfigUserTwo } from '../components/ConfigUserTwo';
import { Ajustar } from '../components/Ajustar';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { get, post } from '../api/http';
import { LoadingTwo } from '../components/LoadingTwo';

export type WeekDay =
  | 'lunes'
  | 'martes'
  | 'miercoles'
  | 'jueves'
  | 'viernes'
  | 'sabado'
  | 'domingo';

// Tipos de comida que puede tener cada día
export type MealType =
  | 'desayuno'
  | 'almuerzo'
  | 'cena'
  | 'snackManana'
  | 'snackTarde';

// Entrada individual por día
export type MealEntry = {
  desayuno: string;
  almuerzo: string;
  cena: string;
  snackManana: string;
  snackTarde: string;
  totalCalorico: number;
};

// Plan de toda la semana
export type Plan = {
  [day in WeekDay]: MealEntry;
};

// Categorías del shopping list
export type ShoppingList = {
  proteinas: string[];
  lacteos: string[];
  frutasYVerduras: string[];
  frutosSecos: string[];
  otros: string[];
};

// Objeto general que usas
export type WeekMeals = {
  plan: Plan;
  shoppingList: ShoppingList;
};

export interface UserDataProps {
  activityLevel?: string;
  age?: string;
  city?: string;
  country?: string;
  dislikedFoods?: string[];
  email?: string;
  firstName?: string;
  gender?: string;
  goal?: string;
  height?: number;
  lastName?: string;
  likedFoods?: string[];
  nationality?: string;
  phoneNumber?: string;
  plan?: string;
  weight?: number;
  dietType?: string;
  refCode?: string;
  style?: number;
}

export const DashboardTwo = () => {
  const [isList, setIsList] = useState<boolean>(false);
  const [isCreate, setIsCreate] = useState<boolean>(false);
  const [isConfig, setIsConfig] = useState<boolean>(false);
  const [isAjustar, setIsAjustar] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserDataProps>();
  const [weekMeals, setWeekMeal] = useState<WeekMeals | null>(null);
  const [selectedDay, setSelectedDay] = useState<WeekDay>('lunes');
  const [userReady, setUserReady] = useState<boolean>(false);
  const [weekMealsReady, setWeekMealsReady] = useState<boolean>(false);

  const logOut = () => {
    localStorage.removeItem('token'); // o sessionStorage
    window.location.replace('/login'); // reemplaza historial
  };

  const isUserDataIncomplete = (userData?: UserDataProps): boolean => {
    if (!userData) return true;

    return (
      !userData.weight ||
      !userData.height ||
      !userData.goal ||
      !userData.gender ||
      !userData.age ||
      !userData.likedFoods?.length ||
      !userData.dislikedFoods?.length
      // Agrega más campos si quieres verificar otros también
    );
  };

  useEffect(() => {
    setUserReady(false);
    get('/user/me')
      .then((res) => {
        setUserData(res);
        console.log('User data fetched:', res);
      })
      .catch((error) => console.error('Error fetching user data:', error))
      .finally(() => setUserReady(true));

    // Traer plan alimenticio
    setWeekMealsReady(false);
    get('/user/plan')
      .then((res) => {
        const fixedRes = {
          plan: res.plan ?? res.Plan ?? {},
          shoppingList: res.shoppingList ?? res.listaDeCompras ?? {}
        };
        setWeekMeal(fixedRes);
        console.log('Week meals fetched:', res);
      })
      .catch((error) => console.error('Error fetching week meals:', error))
      .finally(() => setWeekMealsReady(true));
  }, []);

  const createPlan = async (u?: UserDataProps): Promise<void> => {
    // Si no se pasa un usuario, usar el del estado
    const user = u ?? userData;

    if (!user) {
      console.error('No user data available');
      return;
    }

    if (isUserDataIncomplete(user)) {
      setIsCreate(true);
      console.error('Please complete your profile before generating a plan.');
      return;
    }

    if (!user.dietType) {
      console.error('Please select a diet type before generating the plan.');
      return;
    }

    console.log('Creating plan with diet type:', user.dietType);
    setIsCreate(false);
    setIsLoading(true);

    try {
      const data = { dietType: user.dietType };
      const res = await post('/user/plan/generate', data);

      const fixedRes = {
        plan: res.plan ?? res.Plan ?? {},
        shoppingList: res.shoppingList ?? res.listaDeCompras ?? {}
      };

      setWeekMeal(fixedRes);
    } catch (error) {
      alert('Se a producido un error');
      console.error('Error generating plan:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const dietNames: Record<string, string> = {
    altaproteina: 'Alta Proteína',
    bajacarbohidratos: 'Baja en Carbohidratos',
    diabetica: 'Diabética',
    equilibrada: 'Equilibrada',
    hipercalorica: 'Hipercalórica',
    hipocalorica: 'Hipocalórica',
    hipertension: 'Hipertensión',
    keto: 'Keto',
    mediterranea: 'Mediterránea',
    paleo: 'Paleo',
    vegana: 'Vegana',
    vegetariana: 'Vegetariana'
  };

  const matchText = (text: string): string => dietNames[text] ?? text;

  const normalize = (str: string): string =>
    str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();

  const orderedDays: WeekDay[] = [
    'lunes',
    'martes',
    'miercoles',
    'jueves',
    'viernes',
    'sabado',
    'domingo'
  ];

  const meals: { label: string; key: keyof MealEntry }[] = [
    { label: 'Desayuno', key: 'desayuno' },
    { label: 'Merienda', key: 'snackManana' },
    { label: 'Comida', key: 'almuerzo' },
    { label: 'Merienda', key: 'snackTarde' },
    { label: 'Cena', key: 'cena' }
  ];

  const Skeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
    <div className={`bg-neutral-200/80 animate-pulse rounded ${className}`} />
  );

  const exportPDF = (
    weekMeals: WeekMeals | null,
    checked: boolean[] = []
  ): void => {
    if (!weekMeals?.plan) return;

    // Normaliza claves de días (sin usar `any`)
    const normalizedPlan = Object.entries(weekMeals.plan).reduce<
      Record<string, MealEntry>
    >((acc, [day, entry]) => {
      acc[normalize(day)] = entry;
      return acc;
    }, {});

    // Tipamos los keys de comidas contra MealEntry
    const mealsTyped = meals as Array<{ label: string; key: keyof MealEntry }>;

    // ---------- Tabla del plan (página 1) ----------
    const bodyPlan: (string | number)[][] = mealsTyped.map((meal) => {
      const row: (string | number)[] = [meal.label];
      orderedDays.forEach((day) => {
        const entry = normalizedPlan[day];
        const val = entry?.[meal.key];
        row.push(typeof val === 'number' ? String(val) : val ?? '');
      });
      return row;
    });

    const headPlan: (string | number)[][] = [
      [
        'Meals',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
      ]
    ];

    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'pt',
      format: 'a4'
    });

    const image = new Image();
    image.src = logo;

    image.onload = () => {
      // Encabezado + logo
      doc.addImage(image, 'PNG', 40, 30, 50, 50);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(18);
      doc.text('Plan4Me', 100, 60);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(12);
      const pageWidth = doc.internal.pageSize.getWidth();
      const urlTxt = 'www.plan4me.com';
      doc.text(urlTxt, pageWidth - doc.getTextWidth(urlTxt) - 40, 60);

      // Tabla del plan
      autoTable(doc, {
        startY: 100,
        head: headPlan,
        body: bodyPlan,
        styles: {
          fontSize: 8,
          cellPadding: 9,
          overflow: 'linebreak',
          valign: 'top'
        },
        headStyles: {
          fillColor: [100, 149, 237],
          textColor: 255,
          halign: 'center'
        },
        columnStyles: { 0: { fontStyle: 'bold', textColor: [33, 150, 243] } }
      });

      // ---------- Lista de compras (página 2) ----------
      doc.addPage('a4', 'landscape');

      // Encabezado + logo
      doc.addImage(image, 'PNG', 40, 30, 50, 50);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(18);
      doc.text('Lista de compras', 100, 60);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(12);
      doc.text(urlTxt, pageWidth - doc.getTextWidth(urlTxt) - 40, 60);

      const headShop: (string | number)[][] = [['Categoría', 'Artículo', '✔']];
      const rowsShop: (string | number)[][] = [];
      let idx = 0;

      const pushItems = (categoria: string, items: string[]) => {
        items.forEach((item) => {
          rowsShop.push([categoria, item, checked[idx] ? '✓' : '']);
          idx += 1;
        });
      };

      const sl = weekMeals.shoppingList;
      pushItems('Proteínas', sl.proteinas);
      pushItems('Lácteos', sl.lacteos);
      pushItems('Frutas y Verduras', sl.frutasYVerduras);
      pushItems('Frutos Secos', sl.frutosSecos);
      pushItems('Otros', sl.otros);

      autoTable(doc, {
        startY: 100,
        head: headShop,
        body: rowsShop,
        styles: {
          fontSize: 9,
          cellPadding: 6,
          overflow: 'linebreak',
          valign: 'top'
        },
        headStyles: {
          fillColor: [33, 150, 243],
          textColor: 255,
          halign: 'center'
        },
        columnStyles: { 0: { fontStyle: 'bold' }, 2: { halign: 'center' } }
      });

      doc.save('Plan4Me_Plan_y_Lista.pdf');
    };
  };

  const entry = weekMeals?.plan?.[selectedDay];

  return (
    <>
      {isLoading && !isList && !isCreate && !isConfig && !isAjustar && (
        <LoadingTwo />
      )}
      {isList && !isCreate && !isConfig && !isAjustar && (
        <ListTwo setIsList={setIsList} />
      )}
      {isCreate && !isList && !isConfig && !isAjustar && (
        <CrearPlanTwo
          createPlan={createPlan}
          setIsCreate={setIsCreate}
          userData={userData}
          setUserData={setUserData}
        />
      )}
      {isConfig && !isCreate && !isList && !isAjustar && (
        <ConfigUserTwo setIsConfig={setIsConfig} />
      )}
      {isAjustar && !isCreate && !isList && !isConfig && (
        <Ajustar setIsAjustar={setIsAjustar} />
      )}
      {!isList && !isCreate && !isConfig && !isAjustar && !isLoading && (
        <div className="flex flex-col w-full min-h-screen p-8 gap-30">
          <div className="flex items-center justify-between w-full px-20">
            <div className="flex items-center cursor-pointer">
              <img src={logo} alt="" className="object-contain w-10 h-10" />
              <p className="text-2xl font-semibold ">Plan4Me</p>
            </div>

            <button
              className="px-5 py-2 text-xs font-bold transition-all duration-300 cursor-pointer text-neutral-400 hover:text-red-500 hover:bg-red-100 bg-black/5 rounded-xl"
              onClick={logOut}
            >
              Salir
            </button>
          </div>
          <div className="mt-10">
            <div className="flex items-center justify-between px-20 transition-opacity duration-300 opacity-100 mb-15">
              <p className="text-6xl font-semibold">
                <span
                  className="
    relative inline-block isolate
    before:content-[''] before:absolute
    before:-inset-x-2 before:-bottom-[0.01em]
    before:h-[.4em] before:bg-orange-100
    before:z-0
  "
                >
                  <span className="relative z-10">Hola,</span>
                </span>{' '}
                {userData?.firstName ?? 'Usuario'}
              </p>
              <div className="flex items-center justify-center gap-4 pr-2">
                <p
                  className="flex items-center justify-center w-12 h-12 p-2 text-4xl font-semibold text-blue-400 rounded-full cursor-pointer hover:bg-black/5"
                  onClick={() => exportPDF(weekMeals)}
                >
                  ↓
                </p>
                <p
                  className="flex items-center justify-center w-12 h-12 p-2 text-3xl rounded-full cursor-pointer hover:bg-black/5"
                  onClick={() => {
                    setIsList(false);
                    setIsCreate(false);
                    setIsConfig(true);
                    setIsAjustar(false);
                  }}
                >
                  ⚙️
                </p>
                <p
                  className="flex items-center justify-center w-12 h-12 text-2xl rounded-full cursor-pointer hover:bg-black/5"
                  onClick={() => {
                    setIsList(true);
                    setIsCreate(false);
                    setIsConfig(false);
                    setIsAjustar(false);
                  }}
                >
                  📋
                </p>
              </div>
            </div>
            <div>
              <p className="px-20 text-2xl font-semibold">Lunes </p>
              <div className="flex justify-between px-20 mt-3">
                <div className=" px-3 py-[5px] h-8 text-sm  text-neutral-400 transition-all duration-300 bg-neutral-100  cursor-pointer rounded-xl font-medium flex items-center gap-2">
                  <div className="w-[6px]  h-[6px] bg-neutral-400 rounded-full"></div>
                  <p>{matchText(userData?.dietType ?? '')}</p>
                </div>
                <div className="flex items-center gap-1">
                  <div
                    className=" px-3 py-[5px] h-8 text-sm   transition-all duration-300 text-orange-400 bg-orange-100 font-medium cursor-pointer rounded-xl flex items-center gap-2"
                    onClick={() => {
                      setIsList(false);
                      setIsCreate(false);
                      setIsConfig(false);
                      setIsAjustar(true);
                    }}
                  >
                    <p>Ajustar</p>
                  </div>
                  <div
                    className=" px-3 py-[5px] h-8 text-sm   transition-all duration-300 text-white bg-black font-medium cursor-pointer rounded-xl flex items-center gap-2"
                    onClick={() => {
                      setIsList(false);
                      setIsCreate(true);
                      setIsConfig(false);
                      setIsAjustar(false);
                    }}
                  >
                    <p>Crear Plan</p>
                  </div>
                  <div
                    className=" px-2 py-[5px] h-8
               transition-all duration-300 text-black bg-black/5  cursor-pointer rounded-xl flex items-center "
                  >
                    <Repeat size={14} strokeWidth={3} />
                  </div>
                </div>
              </div>

              {/* Calendario */}
              <div className="flex gap-3 p-20 pt-5">
                {entry ? (
                  meals.map((meal) => (
                    <div
                      key={meal.key}
                      className="flex flex-col justify-between w-full gap-5 p-5 pb-3 pr-3 bg-white border shadow-lg rounded-2xl border-neutral-100"
                    >
                      <div>
                        <p className="inline font-semibold">{meal.label}</p>
                        <p className="pt-2 text-sm text-neutral-400">
                          {entry[meal.key] || '—'}
                        </p>
                      </div>
                      <div className="flex items-end justify-end">
                        <div className="flex items-center justify-center px-3 py-2 text-4xl text-black cursor-pointer bg-black/5 rounded-xl">
                          <p className="text-[10px] font-semibold">
                            {entry.totalCalorico} kcal
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-neutral-400">
                    No hay comidas para este día
                  </p>
                )}
              </div>
            </div>
            {/* <div className="flex w-full gap-2 px-20">
          <div className=" px-3 py-[5px] text-sm  text-black transition-all duration-300 border border-neutral-300 cursor-pointer rounded-lg flex items-center gap-2">
            <div className="w-[6px] h-[6px] bg-black rounded-full"></div>
            <p>Hipocalorica</p>
          </div>

          <div className=" px-3 py-[5px] text-sm  text-neutral-400 transition-all duration-300 bg-neutral-100 cursor-pointer rounded-lg flex items-center gap-2">
            <div className="w-[6px] h-[6px] bg-green-500 rounded-full"></div>
            <p>Crear</p>
          </div>

          <div className=" px-3 py-[5px] text-sm  text-neutral-400 transition-all duration-300 bg-neutral-100 cursor-pointer rounded-lg flex items-center gap-2">
            <div className="w-[6px] h-[6px] bg-neutral-400 rounded-full"></div>
            <p>Configuracion</p>
          </div>
          <div className=" px-3 py-[5px] text-sm  text-neutral-400 transition-all duration-300 bg-neutral-100 cursor-pointer rounded-lg flex items-center gap-2">
            <div className="w-[6px] h-[6px] bg-blue-500 rounded-full"></div>
            <p>Descargar</p>
          </div>
          <p className="inline px-3 py-[5px] text-sm  text-neutral-400 transition-all duration-300 bg-neutral-100 cursor-pointer rounded-lg">
            Lista
          </p>
        </div> */}
          </div>
        </div>
      )}
    </>
  );
};
