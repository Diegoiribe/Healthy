import { X } from 'lucide-react';
import { useState } from 'react';

interface AjustarProps {
  setIsAjustar: (value: boolean) => void;
}

export const Ajustar = ({ setIsAjustar }: AjustarProps) => {
  const [formData, setFormData] = useState({
    comida: ''
  });

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="w-full min-h-screen px-20 py-20 shadow-lg bg-black/5 backdrop-blur-3xl ">
      <div className="flex flex-col justify-between h-[79.5dvh] p-8 bg-white rounded-4xl">
        <div className="flex items-center justify-between w-full bg-white ">
          <div className="flex items-center gap-2 cursor-pointer">
            <p className="text-2xl font-semibold ">Ajustar</p>
          </div>

          <button
            className="px-2 py-2 text-xs transition-all duration-300 bg-black rounded-full cursor-pointer hover:text-white hover:bg-red-400 "
            onClick={() => setIsAjustar(false)}
          >
            <X color="#ffffff" size={18} strokeWidth={3} />
          </button>
        </div>
        <div className="flex flex-col justify-between bg-white  h-[60dvh]">
          <div>
            <div className="flex items-center justify-between">
              <p className="mb-10 text-6xl">Ajusta tu comida</p>
              <div>
                <p className="mb-3 text-sm text-neutral-400">
                  Selecciona una comida
                </p>
                <div className="relative w-48 mb-5">
                  <select
                    name="gender"
                    id="gender"
                    required
                    defaultValue=""
                    className="w-full px-4 py-2 pr-10 bg-white border outline-none appearance-none rounded-xl peer border-black/30 focus:border-blue-500"
                  >
                    <option value="" disabled>
                      {' '}
                    </option>
                    <option value="masculino">Desayuno</option>
                    <option value="femenino">Snack</option>
                    <option value="femenino">Comida</option>
                    <option value="femenino">Snack</option>
                    <option value="femenino">Cena</option>
                  </select>

                  <label
                    htmlFor="gender"
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white px-1
               text-black/40 transition-all duration-200
               peer-focus:-top-[1px] peer-focus:text-xs peer-focus:text-blue-500
               peer-valid:-top-[1px] peer-valid:text-xs"
                  >
                    Comida
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
            </div>
            <p className="mt-5 text-lg font-light text-neutral-400">
              Aquí puedes{' '}
              <span className="font-medium text-black">
                ajustar tu plan semanal
              </span>{' '}
              de manera sencilla. Sabemos que a veces la vida no siempre sigue
              el plan al pie de la letra: puede que hayas comido algo distinto,
              te hayas saltado una comida o simplemente hayas elegido otra
              opción. No te preocupes, este espacio está diseñado para ti. Solo
              selecciona la comida que quieras modificar y ajusta tu plan para
              mantener el balance, sin culpa y sin perder el rumbo. Lo
              importante no es la perfección, sino seguir avanzando día a día.
            </p>
          </div>
          <div className="p-10 pb-5 bg-black/5 rounded-2xl">
            <p className="text-3xl font-light ">¿Cuentanos que comiste?</p>
            <div className="relative w-full mt-10 mb-5">
              <input
                type="text"
                name="ajuste"
                value={formData.comida}
                onChange={(e) => handleChange('comida', e.target.value)}
                id="ajuste"
                required
                placeholder="Escribe aquí..."
                className="w-full px-4 py-3 border-b border-black outline-none pr-15 peer "
              />

              <button
                type="button"
                className="absolute p-2 text-sm font-medium text-white -translate-y-1/2 bg-black cursor-pointer right-2 rounded-xl top-7/16"
              >
                Ajustar Plan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
