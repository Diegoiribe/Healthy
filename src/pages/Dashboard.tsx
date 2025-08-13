import { useEffect, useState } from 'react';
import { CalendarTemplate } from '../components/CalendarTemplate';
import { ConfigUser } from '../components/ConfigUser';
import { Header } from '../components/Header';
import { ListUser } from '../components/ListUser';
import { get, post } from '../api/http';
import { InputBottom } from '../components/TypeInputs';
import { Loading } from '../components/Loading';
import { CreateFirstPlan } from '../components/CreateFirstPlan';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { GeneratePlan } from '../components/GeneratePlan';
import { DashboardMobile } from '../mobile/template/DashboardMobile';
import Heart from '../assets/HeartPNG.png';
import { ChoosePlan } from '../components/ChoosePlan';
import { Referrals } from '../components/Referrals';
// Días de la semana
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
}

export const Dashboard = () => {
  const [userData, setUserData] = useState<UserDataProps>();
  const [isPayment, setIsPayment] = useState<boolean>(false);
  const [isConfig, setIsConfig] = useState<boolean>(false);
  const [isList, setIsList] = useState<boolean>(false);
  const [isGenerate, setIsGenerate] = useState<boolean>(false);
  const [isGeneratePlan, setIsGeneratePlan] = useState<boolean>(false);
  const [isReferrals, setIsReferrals] = useState<boolean>(false);
  const [weekMeals, setWeekMeal] = useState<WeekMeals | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 1000);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1000);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    get('/user/me')
      .then((res) => {
        if (res.plan == 'FREE') {
          setIsPayment(true);
          console.log('Plan is FREE, setting isGeneratePlan to true');
        }
        setUserData(res);
        console.log('User data fetched:', res);
      })
      .catch((error) => console.error('Error fetching user data:', error));

    // Traer plan alimenticio
    get('/user/plan')
      .then((res) => {
        const fixedRes = {
          plan: res.plan ?? res.Plan ?? {},
          shoppingList: res.shoppingList ?? res.listaDeCompras ?? {}
        };
        setWeekMeal(fixedRes);

        console.log('Week meals fetched:', res);
      })
      .catch((error) => console.error('Error fetching week meals:', error));
  }, []);

  const createPlan = async (u?: UserDataProps): Promise<void> => {
    // Si no se pasa un usuario, usar el del estado
    const user = u ?? userData;

    if (!user) {
      console.error('No user data available');
      return;
    }

    if (isUserDataIncomplete(user)) {
      setIsGenerate(true);
      console.error('Please complete your profile before generating a plan.');
      return;
    }

    if (!user.dietType) {
      console.error('Please select a diet type before generating the plan.');
      return;
    }

    console.log('Creating plan with diet type:', user.dietType);
    setIsLoading(true);
    setIsGeneratePlan(false);
    setIsGenerate(false);

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

  const meals = [
    { label: 'Desayuno', key: 'desayuno' },
    { label: 'Merienda', key: 'snackManana' },
    { label: 'Comida', key: 'almuerzo' },
    { label: 'Merienda', key: 'snackTarde' },
    { label: 'Cena', key: 'cena' }
  ];

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
    image.src = Heart;

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

  return isMobile ? (
    <>
      {userData?.plan == 'FREE' && <ChoosePlan setIsPayment={setIsPayment} />}
      {isLoading && <Loading isMobile={isMobile} />}{' '}
      <DashboardMobile
        exportPDF={exportPDF}
        weekMeals={weekMeals}
        userData={userData}
        setUserData={setUserData}
        createPlan={createPlan}
        isMobile={isMobile}
      />
    </>
  ) : (
    <>
      {userData?.plan == 'FREE' && <ChoosePlan setIsPayment={setIsPayment} />}
      <div className="flex flex-col ">
        <Header isAdmin={true} />
        {isReferrals && (
          <Referrals setIsReferrals={setIsReferrals} userData={userData} />
        )}
        {isConfig && (
          <ConfigUser
            setIsConfig={setIsConfig}
            userData={userData}
            setUserData={setUserData}
          />
        )}
        {isList && <ListUser setIsList={setIsList} weekMeals={weekMeals} />}
        <div className="flex flex-col items-center justify-center gap-10 mx-auto mt-40">
          {!isConfig && !isList && (
            <>
              <div className="flex items-center justify-between max-w-5xl mx-auto min-w-4xl">
                <p className="font-black text-7xl">
                  <span className="relative inline-block before:absolute before:-inset-x-2 before:-bottom-[0.01em] before:h-[.4em] before:bg-red-200 before:-z-10">
                    Hola,
                  </span>{' '}
                  {userData ? userData.firstName : 'User'}
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
                  <p
                    className="flex items-center justify-center w-12 h-12 text-3xl rounded-full cursor-pointer hover:bg-black/5"
                    onClick={() => setIsReferrals(true)}
                  >
                    🗂️
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
        {isLoading && <Loading isMobile={isMobile} />}

        {!weekMeals && !isPayment && (
          <CreateFirstPlan
            userData={userData}
            setUserData={setUserData}
            setIsGenerate={setIsGenerate}
            setIsGeneratePlan={setIsGeneratePlan}
            createPlan={createPlan}
            weekMeals={weekMeals}
            isMobile={isMobile}
          />
        )}

        {isGenerate && !isPayment && (
          <GeneratePlan
            userData={userData}
            setIsGenerate={setIsGenerate}
            setUserData={setUserData}
            createPlan={createPlan}
            weekMeals={weekMeals}
            isMobile={isMobile}
          />
        )}

        {isGeneratePlan && !isPayment && (
          <CreateFirstPlan
            userData={userData}
            setUserData={setUserData}
            setIsGenerate={setIsGenerate}
            setIsGeneratePlan={setIsGeneratePlan}
            createPlan={createPlan}
            weekMeals={weekMeals}
            isMobile={isMobile}
          />
        )}

        {!isConfig && !isList && (
          <>
            <div className="flex items-center justify-between w-full max-w-5xl gap-3 mx-auto mt-20 px-13">
              <p className="text-lg font-medium text-neutral-400">
                {matchText(userData?.dietType ?? '')}
              </p>
              <div className="flex items-center gap-2">
                <InputBottom
                  name="Crear Plan"
                  onClick={() => setIsGeneratePlan(true)}
                  className="px-5 py-2 text-xs font-semibold transition-all duration-300 border text-green-600 bg-[#D0EACD]  border-green-600 rounded-xl"
                />
                <InputBottom
                  name="✏️"
                  onClick={() => setIsGenerate(true)}
                  className="px-2 py-2 text-xs font-semibold transition-all duration-300 border border-neutral-300 hover:text-black hover:bg-red-200 bg-neutral-50 text-neutral-400 hover:border-red-300 rounded-xl"
                />
              </div>
            </div>

            <CalendarTemplate weekMeals={weekMeals} />
          </>
        )}
      </div>
    </>
  );
};
