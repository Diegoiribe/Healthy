import { useState } from 'react';
import { InputBottom } from './TypeInputs';
import { GeneratePlan } from './GeneratePlan';
import type { UserDataProps } from '../pages/Dashboard';

type Option = {
  label: string;
  value: string;
  description: string;
};

interface CreatePlanProps {
  userData?: UserDataProps;
  setIsGenerate: (value: boolean) => void;
  setUserData: (data: UserDataProps) => void;
  createPlan: () => void;
  weekMeals?: any;
  setIsGeneratePlan: (value: boolean) => void;
}

export const CreateFirstPlan = ({
  userData,
  setUserData,
  setIsGenerate,
  weekMeals,
  setIsGeneratePlan,
  createPlan
}: CreatePlanProps) => {
  const [step, setStep] = useState<number>(1);
  const [dietPage, setDietPage] = useState<number>(0);
  const [dietSelect, setDietSelect] = useState<string>('');
  const [dietType] = useState<Option[]>([
    {
      label: 'Alta proteina',
      value: 'altaproteina',
      description:
        'Enfocada en aumentar la ingesta de proteínas para favorecer el desarrollo muscular y la saciedad.'
    },
    {
      label: 'Baja en carbohidratos',
      value: 'bajacarbohidratos',
      description:
        'Reduce el consumo de azúcares y harinas, ideal para perder grasa o controlar la glucosa.'
    },
    {
      label: 'Diabética',
      value: 'diabetica',
      description:
        'Controla los niveles de azúcar en sangre con alimentos de bajo índice glucémico.'
    },
    {
      label: 'Equilibrada',
      value: 'equilibrada',
      description:
        'Proporción balanceada de carbohidratos, proteínas y grasas para una nutrición completa.'
    },
    {
      label: 'Hipercalórica',
      value: 'hipercalorica',
      description:
        'Aporta más calorías de las necesarias para aumentar de peso o masa muscular.'
    },
    {
      label: 'Hipocalórica',
      value: 'hipocalorica',
      description:
        'Contiene menos calorías de las que se consumen para promover la pérdida de peso.'
    },
    {
      label: 'Hipertensión',
      value: 'hipertension',
      description:
        'Reduce sodio y grasas, enfocada en controlar la presión arterial.'
    },
    {
      label: 'Keto',
      value: 'keto',
      description:
        'Alta en grasas, muy baja en carbohidratos. Favorece la cetosis para quemar grasa como energía.'
    },
    {
      label: 'Mediterránea',
      value: 'mediterranea',
      description:
        'Rica en vegetales, granos enteros, aceite de oliva, pescados y frutos secos. Muy saludable.'
    },
    {
      label: 'Paleo',
      value: 'paleo',
      description:
        'Basada en alimentos que se consumían en la era paleolítica: carnes, vegetales, frutas y nueces.'
    },
    {
      label: 'Vegana',
      value: 'vegana',
      description:
        'Elimina todos los productos de origen animal. Basada en vegetales, legumbres y granos.'
    },
    {
      label: 'Vegetariana',
      value: 'vegetariana',
      description:
        'Excluye carnes pero permite derivados animales como huevos, leche o queso.'
    }
  ]);

  const visibleDiets = dietType.slice(dietPage * 6, dietPage * 6 + 6);

  const handleSelect = (item: string) => {
    setDietSelect(item);
    if (userData) {
      setUserData({
        ...userData,
        dietType: item
      });
    }
  };

  return (
    <>
      {step === 1 && (
        <div className="fixed bottom-0 left-0 z-50 flex items-center justify-center w-full h-[100vh] backdrop-blur-sm bg-black/30">
          <div className="max-w-4xl px-10 pt-10 bg-white shadow-2xl pb-15 rounded-2xl">
            <div className="flex justify-end w-full mb-5">
              <p
                className="text-xl cursor-pointer text-neutral-300 hover:text-black"
                onClick={() => {
                  setIsGenerate(false);
                  setIsGeneratePlan(false);
                }}
              >
                🅇
              </p>
            </div>
            <div className="flex flex-col items-center justify-center mb-10 text-center">
              <p className="mb-1 text-4xl">Create a new Plan</p>
              <p className="text-lg text-neutral-400">
                Start crating your contract by selecting the most relevant type
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center w-full gap-5">
              {visibleDiets.map((item, index) => (
                <div
                  key={index}
                  className={`w-1/4 p-4 border rounded-2xl min-h-32 cursor-pointer transition-all
                ${
                  dietSelect === item.value
                    ? 'border-green-600 bg-green-50 shadow-sm'
                    : 'border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50'
                }`}
                  onClick={() => handleSelect(item.value)}
                >
                  <p className="text-sm font-semibold">{item.label}</p>
                  <p className="text-xs text-neutral-400">{item.description}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-center w-full gap-3 mt-5">
              {[0, 1].map((page) => (
                <div
                  key={page}
                  onClick={() => setDietPage(page)}
                  className={`w-2 h-2 border rounded-full cursor-pointer transition-all
        ${
          dietPage === page
            ? 'bg-neutral-300 border-neutral-300 '
            : 'border-neutral-300 hover:border-black'
        }`}
                ></div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-5 mt-5">
              <div></div>
              <div></div>
              <div className="flex justify-end w-3/4">
                {weekMeals ? (
                  <InputBottom
                    name="Crear Plan"
                    onClick={() => {
                      createPlan();
                    }}
                    className="px-5 py-2 text-sm font-semibold transition-all duration-300 border border-neutral-300 hover:text-green-600 hover:bg-[#D0EACD]  text-neutral-400 hover:border-green-600 rounded-xl"
                  />
                ) : (
                  <InputBottom
                    name="Continuar"
                    onClick={() => {
                      setStep(2);
                    }}
                    className="px-5 py-2 text-sm font-semibold transition-all duration-300 border border-neutral-300 hover:text-green-600 hover:bg-[#D0EACD]  text-neutral-400 hover:border-green-600 rounded-xl"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {!weekMeals && step === 2 && (
        <GeneratePlan
          userData={userData}
          setIsGenerate={setIsGenerate}
          setUserData={setUserData}
          setStep={setStep}
          step={step}
          dietSelect={dietSelect}
          createPlan={createPlan}
          weekMeals={weekMeals}
        />
      )}
      ,
    </>
  );
};
