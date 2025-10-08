import { X, Check } from 'lucide-react';
import { useState } from 'react';

interface ListTwoProps {
  setIsList: (value: boolean) => void;
}

export const ListTwo = ({ setIsList }: ListTwoProps) => {
  const [diet, setDiet] = useState<DietKey>('');

  type DietKey = '' | 'todo' | 'pendiente' | 'comprada';

  interface DietInfo {
    label: string;
  }

  const dietInfo: Record<DietKey, DietInfo> = {
    '': {
      label: 'Todo'
    },
    todo: {
      label: 'Todo'
    },
    pendiente: {
      label: 'Pendiente'
    },
    comprada: {
      label: 'Comprada'
    }
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen px-8 py-8 bg-white shadow-lg sm:px-20 sm:py-20 backdrop-blur-3xl">
      <div className="flex flex-col justify-between h-[91.5dvh] p-8 bg-black/5 rounded-4xl max-w-6xl w-full">
        <div className="flex items-center justify-between w-full ">
          <div className="flex items-center gap-2 cursor-pointer">
            <p className="text-2xl font-semibold ">Lista de compras</p>
          </div>

          <button
            className="px-2 py-2 text-xs transition-all duration-300 bg-black rounded-full cursor-pointer hover:text-white hover:bg-red-400 "
            onClick={() => setIsList(false)}
          >
            <X color="#ffffff" size={18} strokeWidth={3} />
          </button>
        </div>
        <div className="flex flex-col justify-between   min-h-[67dvh] sm:min-h-[60dvh]">
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
                  <option value="" disabled>
                    Todo
                  </option>
                  <option value="todo">Todo</option>
                  <option value="pendiente">Pendiente</option>
                  <option value="comprada">Comprada</option>
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
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <p className="text-3xl font-light">Lentejas</p>

                <div className="flex items-center justify-center w-6 h-6 p-1 bg-green-600 cursor-pointer rounded-xl">
                  <Check strokeWidth={4} color="#fff" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-3xl font-light">Leche entera</p>

                <div className="flex items-center justify-center w-6 h-6 p-1 bg-green-600 cursor-pointer rounded-xl">
                  <Check strokeWidth={4} color="#fff" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-3xl font-light">Arroz blanco</p>

                <div className="flex items-center justify-center w-6 h-6 p-1 bg-green-600 cursor-pointer rounded-xl">
                  <Check strokeWidth={4} color="#fff" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-3xl font-light">Tostadas</p>

                <div className="flex items-center justify-center w-6 h-6 p-1 bg-green-600 cursor-pointer rounded-xl">
                  <Check strokeWidth={4} color="#fff" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-3xl font-light">Naranja</p>

                <div className="flex items-center justify-center w-6 h-6 p-1 bg-green-600 cursor-pointer rounded-xl">
                  <Check strokeWidth={4} color="#fff" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
