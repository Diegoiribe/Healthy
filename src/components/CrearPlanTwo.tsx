import { X } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { UserDataProps } from '../pages/Dashboard';
import { patch, get } from '../api/http';

interface CrearPlanTwoProps {
  setIsCreate: (value: boolean) => void;
  userData?: UserDataProps;
  setUserData: (data: UserDataProps) => void;
  createPlan: (u?: UserDataProps) => Promise<void> | void;
}

export const CrearPlanTwo = ({
  setIsCreate,
  userData,
  setUserData,
  createPlan
}: CrearPlanTwoProps) => {
  const [diet, setDiet] = useState<DietKey>('altaproteina');
  const [formData, setFormData] = useState({
    weight: '',
    height: '',
    goal: ''
  });

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  type DietKey =
    | 'altaproteina'
    | 'bajacarbohidratos'
    | 'diabetica'
    | 'equilibrada'
    | 'hipercalorica'
    | 'hipocalorica'
    | 'keto'
    | 'hipertension'
    | 'mediterranea'
    | 'paleo'
    | 'vegana'
    | 'vegetariana';

  interface DietInfo {
    label: string;
    description: string;
  }

  const dietInfo: Record<DietKey, DietInfo> = {
    altaproteina: {
      label: 'Alta proteína',
      description: `Se enfoca en alimentos ricos en proteínas para favorecer la construcción y mantenimiento de masa muscular. También ayuda a controlar el apetito. 
      Ejemplos de comidas: pechuga de pollo a la plancha con verduras, salmón con ensalada de espinacas y aguacate, omelette de claras con champiñones, batido de proteína con leche de almendra. 
      Promedio de calorías: 450–650 kcal por comida.`
    },
    bajacarbohidratos: {
      label: 'Baja en carbohidratos',
      description: `Limita la ingesta de carbohidratos como pan, pasta, arroz o azúcares. Se centra en proteínas y grasas saludables para mantener energía estable. 
      Ejemplos de comidas: carne asada con ensalada de hojas verdes, huevos revueltos con aguacate, pescado al horno con brócoli y aceite de oliva. 
      Promedio de calorías: 400–600 kcal por comida.`
    },
    diabetica: {
      label: 'Diabética',
      description: `Diseñada para controlar los niveles de azúcar en sangre, prioriza carbohidratos de bajo índice glucémico y alto contenido en fibra. 
      Ejemplos de comidas: avena con manzana y canela sin azúcar, pollo con ensalada de garbanzos, filete de pescado con quinoa y espinacas. 
      Promedio de calorías: 350–550 kcal por comida.`
    },
    equilibrada: {
      label: 'Equilibrada',
      description: `Mantiene una distribución balanceada de carbohidratos (50%), proteínas (20%) y grasas saludables (30%). Adecuada para la mayoría de personas sin restricciones. 
      Ejemplos de comidas: arroz integral con pollo y verduras, pasta integral con salsa de tomate y atún, ensalada mixta con huevo y aguacate. 
      Promedio de calorías: 450–700 kcal por comida.`
    },
    hipercalorica: {
      label: 'Hipercalórica',
      description: `Busca un superávit calórico para aumentar peso o masa muscular, incluyendo comidas densas en energía. 
      Ejemplos de comidas: pasta con salsa de carne y queso, batido de avena con mantequilla de maní y plátano, arroz con pollo, aguacate y aceite de oliva extra. 
      Promedio de calorías: 600–900 kcal por comida.`
    },
    hipocalorica: {
      label: 'Hipocalórica',
      description: `Genera un déficit calórico controlado para promover pérdida de peso sin comprometer nutrientes esenciales. 
      Ejemplos de comidas: ensalada de pollo a la parrilla con vegetales, sopa de verduras con tofu, pescado blanco al vapor con calabacín. 
      Promedio de calorías: 300–500 kcal por comida.`
    },
    keto: {
      label: 'Keto',
      description: `Muy baja en carbohidratos (5–10%), alta en grasas (70–75%) y moderada en proteínas. Lleva al cuerpo a usar la grasa como fuente principal de energía (cetosis). 
      Ejemplos de comidas: huevos con tocino y aguacate, salmón con espárragos y mantequilla, queso, nueces y aceitunas como snack. 
      Promedio de calorías: 500–700 kcal por comida.`
    },
    hipertension: {
      label: 'Hipertensión',
      description: `Reduce el sodio y favorece frutas, verduras, granos integrales y alimentos ricos en potasio y magnesio para controlar la presión arterial. 
      Ejemplos de comidas: ensalada de lentejas con tomate y aguacate, filete de pescado al vapor con espinacas, avena con frutos rojos y nueces sin sal. 
      Promedio de calorías: 400–600 kcal por comida.`
    },
    mediterranea: {
      label: 'Mediterránea',
      description: `Basada en frutas, verduras, pescado, aceite de oliva, frutos secos y cereales integrales. Es reconocida por sus beneficios para la salud cardiovascular. 
      Ejemplos de comidas: ensalada griega con queso feta y aceitunas, pescado a la plancha con verduras y aceite de oliva, pan integral con hummus y tomate. 
      Promedio de calorías: 450–700 kcal por comida.`
    },
    paleo: {
      label: 'Paleo',
      description: `Imita la dieta de cazadores-recolectores. Incluye carnes, pescado, frutas, verduras, nueces y semillas. Excluye lácteos, granos y procesados. 
      Ejemplos de comidas: bistec con ensalada de vegetales, salmón con batata asada, ensalada de frutas con almendras. 
      Promedio de calorías: 450–700 kcal por comida.`
    },
    vegana: {
      label: 'Vegana',
      description: `Excluye todos los productos de origen animal. Se centra en frutas, verduras, cereales, legumbres, semillas y frutos secos. Requiere especial atención en vitamina B12 y proteínas vegetales. 
      Ejemplos de comidas: curry de garbanzos con arroz integral, hamburguesa de lentejas con ensalada, tofu salteado con vegetales. 
      Promedio de calorías: 400–650 kcal por comida.`
    },
    vegetariana: {
      label: 'Vegetariana',
      description: `Excluye carne y pescado, pero puede incluir lácteos y huevos según el tipo (ovolacto, lacto o ovo). 
      Ejemplos de comidas: pasta integral con queso y verduras, tortilla española con ensalada, ensalada de garbanzos con huevo duro. 
      Promedio de calorías: 400–650 kcal por comida.`
    }
  };

  useEffect(() => {
    if (userData) {
      setFormData({
        weight: userData.weight?.toString() || '',
        height: userData.height?.toString() || '',
        goal: userData.goal || ''
      });
    }
  }, [userData]);

  // ✅ Devuelve true si todo ok, false si falló
  console.log(diet);
  const handleSubmit = async (): Promise<UserDataProps | null> => {
    try {
      const payload = {
        goal: formData.goal.trim(),
        weightKg: Number(formData.weight),
        heightCm: Number(formData.height),
        activityLevel: 'Moderado',
        dietType: diet
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
    <div className="w-full min-h-screen px-20 py-20 shadow-lg bg-black/5 backdrop-blur-3xl ">
      <div className="flex flex-col justify-between h-[79.5dvh] p-8 bg-white rounded-4xl">
        <div className="flex items-center justify-between w-full bg-white ">
          <div className="flex items-center gap-2 cursor-pointer">
            <p className="text-2xl font-semibold ">Crear dieta</p>
          </div>

          <button
            className="px-2 py-2 text-xs transition-all duration-300 bg-black rounded-full cursor-pointer hover:text-white hover:bg-red-400 "
            onClick={() => setIsCreate(false)}
          >
            <X color="#ffffff" size={18} strokeWidth={3} />
          </button>
        </div>
        <div className="flex flex-col justify-between bg-white  h-[60dvh]">
          <div>
            <div className="flex items-center justify-between mb-10">
              <div className="relative ">
                {/* Texto grande visible */}
                <p className="pr-8 text-6xl leading-tight pointer-events-none">
                  {dietInfo[diet].label}
                </p>

                {/* Select real, sin estilos de fuente, invisible pero clickeable */}
                <label htmlFor="diet" className="sr-only">
                  Tipo de dieta
                </label>
                <select
                  id="diet"
                  name="diet"
                  required
                  value={diet}
                  onChange={(e) => setDiet(e.target.value as DietKey)}
                  className="absolute inset-0 w-full opacity-0"
                >
                  <option value="altaproteina" disabled>
                    Alta proteina
                  </option>
                  <option value="bajacarbohidratos">
                    Baja en carbohidratos
                  </option>
                  <option value="diabetica">Diabetica</option>
                  <option value="equilibrada">Equilibrada</option>
                  <option value="hipercalorica">Hipercalorica</option>
                  <option value="hipocalorica">Hipocalorica</option>
                  <option value="keto">Keto</option>
                  <option value="hipertension">Hipertension</option>
                  <option value="mediterranea">Mediterranea</option>
                  <option value="paleo">Paleo</option>
                  <option value="vegana">Vegana</option>
                  <option value="vegetariana">Vegetariana</option>
                </select>

                {/* Flechita propia (opcional) */}
                <svg
                  className="absolute w-6 h-6 -translate-y-1/2 pointer-events-none -right-2 top-10/16"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M5 7l5 5 5-5" />
                </svg>
              </div>
            </div>
            <p className="text-lg font-light text-neutral-400">
              {dietInfo[diet].description}
            </p>
          </div>

          <div className="pt-10 pb-5 ">
            <p className="mb-5 text-3xl font-light ">Actualiza tus datos</p>
            <div className="flex items-center gap-10">
              <div className="relative w-1/3 mb-5">
                <input
                  value={formData.weight}
                  onChange={(e) => handleChange('weight', e.target.value)}
                  type="number"
                  name="weight"
                  id="weight"
                  required
                  className="w-full px-4 py-3 border rounded-full outline-none border-black/30 peer focus:border-blue-500"
                />
                <label
                  htmlFor="weight"
                  className="absolute px-1 transition-all duration-200 -translate-y-1/2 bg-white text-black/40 left-4 top-1/2 peer-focus:-top-[1px] peer-focus:text-sm peer-valid:-top-[1px] peer-valid:text-sm peer-focus:text-blue-500"
                >
                  Peso
                </label>
              </div>

              <div className="relative w-1/3 mb-5">
                <input
                  value={formData.height}
                  onChange={(e) => handleChange('height', e.target.value)}
                  type="number"
                  name="height"
                  id="height"
                  required
                  className="w-full px-4 py-3 border rounded-full outline-none border-black/30 peer focus:border-blue-500"
                />
                <label
                  htmlFor="height"
                  className="absolute px-1 transition-all duration-200 -translate-y-1/2 bg-white text-black/40 left-4 top-1/2 peer-focus:-top-[1px] peer-focus:text-sm peer-valid:-top-[1px] peer-valid:text-sm peer-focus:text-blue-500"
                >
                  Estatura
                </label>
              </div>
              <div className="relative w-1/3 mb-5">
                <select
                  name="goal"
                  id="goal"
                  required
                  onChange={(e) => handleChange('goal', e.target.value)}
                  defaultValue=""
                  className="w-full px-4 py-3 pr-10 bg-white border rounded-full outline-none appearance-none peer border-black/30 focus:border-blue-500"
                >
                  <option value="" disabled>
                    {' '}
                  </option>
                  <option value="Bajar peso">Bajar de peso</option>
                  <option value="Mantener tu masa">Mantener tu masa</option>
                  <option value="Ganar músculo">Ganar músculo</option>
                </select>

                <label
                  htmlFor="goal"
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white px-1
               text-black/40 transition-all duration-200
               peer-focus:-top-[1px] peer-focus:text-xs peer-focus:text-blue-500
               peer-valid:-top-[1px] peer-valid:text-xs"
                >
                  Objetivo
                </label>

                {/* Flecha del select */}
                <svg
                  className="absolute w-4 h-4 -translate-y-1/2 pointer-events-none right-3 top-1/2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M5.5 7.5l4.5 5 4.5-5" />
                </svg>
              </div>
            </div>
            <div className="flex justify-end w-full">
              <button
                type="button"
                className="w-full py-3 font-medium text-orange-400 bg-orange-100 rounded-full cursor-pointer "
                onClick={async () => {
                  const updated = await handleSubmit(); // devuelve UserDataProps | null
                  if (updated) {
                    await createPlan(updated); // si tienes el user actualizado, lo pasas
                  }
                }}
              >
                Crear dieta
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
