import { useState, useEffect } from 'react';
import type { UserDataProps } from '../../pages/Dashboard';
import { patch, get } from '../../api/http';
import type { WeekMeals } from '../../pages/Dashboard';

type Option = {
  label: string;
  value: string;
  description: string;
};

interface CreatePlanProps {
  userData?: UserDataProps;
  setUserData: (data: UserDataProps) => void;
  createPlan: (u?: UserDataProps) => Promise<void> | void;
  setIsGeneratePlan: (value: boolean) => void;
  isMobile: boolean;
  weekMeals?: WeekMeals | null;
}

export const GeneratePlan = ({
  userData,
  setUserData,
  setIsGeneratePlan,
  createPlan,
  weekMeals,
  isMobile
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

  const [formData, setFormData] = useState({
    weight: '',
    height: '',
    goal: '',
    likedFoods: '',
    dislikedFoods: ''
  });

  useEffect(() => {
    if (userData) {
      setFormData({
        weight: userData.weight?.toString() || '',
        height: userData.height?.toString() || '',
        goal: userData.goal || '',
        likedFoods: userData.likedFoods?.join(', ') || '',
        dislikedFoods: userData.dislikedFoods?.join(', ') || ''
      });
    }
  }, [userData]);

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (): Promise<UserDataProps | null> => {
    try {
      const payload = {
        goal: formData.goal.trim(),
        weightKg: Number(formData.weight),
        heightCm: Number(formData.height),
        likedFoods: formData.likedFoods
          .split(/[,;]/)
          .map((f) => f.trim())
          .filter((f) => f.length > 0),
        dislikedFoods: formData.dislikedFoods
          .split(/[,;]/)
          .map((f) => f.trim())
          .filter((f) => f.length > 0),
        activityLevel: 'Moderado',
        dietType: dietSelect
      };

      if (Number.isNaN(payload.weightKg) || Number.isNaN(payload.heightCm)) {
        console.error('Weight/height inválidos');
        return null;
      }

      await patch('/user/profile', payload);
      console.log('🐞 User data updated successfully:', payload);
      const updatedData = await get('/user/me');
      console.log('🐞 Updated user data:', updatedData);
      setUserData(updatedData);
      return updatedData; // ← devuélvelo
    } catch (err) {
      console.error('Error updating plan:', err);
      return null;
    }
  };

  return (
    <div
      className={`
      fixed inset-0 z-[9999] text-black min-h-[100svh]
      ${isMobile ? 'bg-white' : 'bg-black/30 backdrop-blur-sm'}
      overflow-y-auto overscroll-contain
    `}
    >
      <div
        className={`${
          isMobile
            ? 'flex flex-col items-center max-w-2xl p-10 mx-auto justify-between min-h-[100svh]'
            : 'shadow-2xl pb-15 max-w-4xl px-10 pt-10 bg-white  rounded-2xl'
        }`}
      >
        <div className="flex flex-col justify-center w-full gap-2">
          <div
            className="flex items-center gap-2 "
            onClick={() => {
              if (!weekMeals) return;
              setIsGeneratePlan(false);
            }}
          >
            <div
              className={`${
                !weekMeals ? 'hidden' : step === 1 ? '' : 'hidden'
              } text-2xl font-black cursor-pointer text-black hover:text-red-300`}
            >
              ←
            </div>
            <p className="text-2xl font-black text-black">
              {step === 1
                ? 'Elige un tipo de dieta'
                : 'Mantén tus datos actualizados'}
            </p>
          </div>
          <p className="text-xs font-medium text-neutral-400 ">
            {step === 1
              ? 'Con tantos estilos de alimentación disponibles, elegir el adecuado depende de tus objetivos personales, condiciones de salud y estilo de vida. Ya sea que busques perder peso, ganar músculo, comer de forma más consciente o manejar una condición médica, cada dieta ofrece un enfoque único.'
              : 'Mantener tu información al día nos ayuda a ofrecerte recomendaciones precisas y una mejor experiencia. Ya sea tu peso, objetivos, preferencias o detalles de salud, actualizar tus datos asegura que tu plan se mantenga adaptado a tus necesidades. Pequeños cambios pueden marcar una gran diferencia.'}
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center w-full gap-5 mt-5">
          {step === 1 && (
            <>
              <div className="flex flex-wrap items-center justify-between w-full mt-5 gap-y-5">
                {visibleDiets.map((item, index) => (
                  <div
                    key={index}
                    className={`w-[48%] p-4 border rounded-2xl min-h-44 cursor-pointer transition-all
                ${
                  dietSelect === item.value
                    ? 'border-green-600 bg-green-50 shadow-sm'
                    : 'border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50'
                }`}
                    onClick={() => handleSelect(item.value)}
                  >
                    <p className="text-sm font-semibold">{item.label}</p>
                    <p className="text-xs text-neutral-400">
                      {item.description}
                    </p>
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
            ? 'bg-neutral-200 border-neutral-200 '
            : 'border-neutral-300 hover:border-black'
        }`}
                  ></div>
                ))}
              </div>{' '}
            </>
          )}

          {step === 2 && (
            <div className="flex flex-col w-full gap-10">
              <div className="flex flex-wrap justify-between w-full">
                <div className="w-[40%]">
                  <p className="font-medium ">Peso</p>
                  <div className="flex items-center w-full border-b border-neutral-300">
                    <input
                      onChange={(e) => handleChange('weight', e.target.value)}
                      placeholder="90"
                      type="text"
                      className="w-full px-1 py-2 text-xs focus:outline-none"
                      value={formData.weight}
                    />
                    <span className="text-xs">kg</span>
                  </div>
                </div>
                <div className="w-[40%]">
                  <p className="font-medium ">Altura</p>
                  <div className="flex items-center w-full border-b border-neutral-300">
                    <input
                      onChange={(e) => handleChange('height', e.target.value)}
                      placeholder="180"
                      type="text"
                      className="w-full px-1 py-2 text-xs focus:outline-none"
                      value={formData.height}
                    />
                    <span className="text-xs">cm</span>
                  </div>
                </div>
              </div>
              <div>
                <p className="font-medium ">Objetivo</p>
                <div className="flex items-center w-full border-b border-neutral-300">
                  <select
                    onChange={(e) => handleChange('goal', e.target.value)}
                    value={formData.goal}
                    className="w-full px-1 py-2 text-xs appearance-none cursor-pointer focus:outline-none"
                  >
                    <option value="" disabled>
                      Selecciona tu objetivo
                    </option>
                    <option value="Bajar peso">Bajar peso</option>
                    <option value="Mantener tu masa">Mantener tu masa</option>
                    <option value="Ganar músculo">Ganar músculo</option>
                  </select>
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="lucide lucide-chevron-down-icon lucide-chevron-down"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </div>
                </div>
              </div>
              <div>
                <p className="font-medium ">Comida favorita</p>
                <div className="flex items-center w-full border-b border-neutral-300">
                  <input
                    onChange={(e) => handleChange('likedFoods', e.target.value)}
                    placeholder="Eje: Pollo, Pescado"
                    type="text"
                    className="w-full px-1 py-2 text-xs focus:outline-none"
                    value={formData.likedFoods}
                  />
                </div>
              </div>
              <div>
                <p className="font-medium ">Comida que no te gusta</p>
                <div className="flex items-center w-full border-b border-neutral-300">
                  <input
                    onChange={(e) =>
                      handleChange('dislikedFoods', e.target.value)
                    }
                    placeholder="Eje: Salmon, Huevo"
                    type="text"
                    className="w-full px-1 py-2 text-xs focus:outline-none"
                    value={formData.dislikedFoods}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center justify-end w-full gap-2">
          {step === 1 && (
            <p
              className="flex items-center justify-center w-12 h-12 p-2 text-2xl font-semibold text-black rounded-full cursor-pointer bg-black/5 hover:bg-black hover:text-white "
              onClick={() => setStep(2)}
            >
              →
            </p>
          )}
          {step === 2 && (
            <>
              <p
                className="flex items-center justify-center w-12 h-12 p-2 mt-5 text-2xl font-semibold text-black rounded-full cursor-pointer bg-black/5 hover:bg-black hover:text-white"
                onClick={() => setStep(1)}
              >
                ←
              </p>
              <p
                className="px-8 py-3 mt-5 font-semibold text-black rounded-full cursor-pointer bg-black/5 hover:bg-black hover:text-white "
                onClick={async () => {
                  const updated = await handleSubmit(); // devuelve UserDataProps | null
                  if (updated) {
                    await createPlan(updated);
                  }
                }}
              >
                Enviar
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
