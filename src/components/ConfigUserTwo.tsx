import { X, Pencil } from 'lucide-react';
import { useState } from 'react';

interface ConfigUserTwoProps {
  setIsConfig: (value: boolean) => void;
}

export const ConfigUserTwo = ({ setIsConfig }: ConfigUserTwoProps) => {
  const [formData, setFormData] = useState({
    peso: '',
    estatura: '',
    edad: '',
    objetivo: '',
    sexo: '',
    nivelActividad: '',
    AlimentosNoDeseados: '',
    AlimentosDeseados: ''
  });

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div className="flex items-center justify-center w-full min-h-screen px-20 py-20 shadow-lg bg-black/5 backdrop-blur-3xl">
      <div className="flex flex-col justify-between h-[79.5dvh] p-8 bg-white rounded-4xl w-full max-w-6xl">
        <div className="flex items-center justify-between w-full bg-white ">
          <div className="flex items-center gap-2 cursor-pointer">
            <p className="text-2xl font-semibold ">Configuracion</p>
          </div>

          <button
            className="px-2 py-2 text-xs transition-all duration-300 bg-black rounded-full cursor-pointer hover:text-white hover:bg-red-400 "
            onClick={() => setIsConfig(false)}
          >
            <X color="#ffffff" size={18} strokeWidth={3} />
          </button>
        </div>
        <div className="flex flex-col gap-5 bg-white  h-[60dvh]">
          <div>
            <div className="">
              <p className="mb-5 text-6xl">Diego Iribe Carrazco</p>
              <div className="flex items-center gap-2">
                <div className=" inline-flex px-3 py-[5px] h-8 text-sm   transition-all duration-300 text-white bg-black font-medium cursor-pointer rounded-2xl items-center gap-2">
                  <p>Cancelar Suscripcion</p>
                </div>
                <div className=" inline-flex px-2 py-[5px] h-8 text-sm   transition-all duration-300 text-orange-400 bg-orange-100 font-medium cursor-pointer rounded-2xl items-center gap-2">
                  <Pencil size={18} />
                </div>
              </div>
            </div>

            <p className="my-5 mt-10 text-3xl font-light ">
              Informacion personal
            </p>
          </div>
          <div className="flex items-center justify-between">
            <div className="w-3/4 space-y-3">
              <div>
                <p className="text-lg font-light text-neutral-400 ">Objetivo</p>
                <p className="text-lg font-light text-black">
                  Perder peso, ganar masa muscular
                </p>
              </div>
              <div>
                <p className="text-lg font-light text-neutral-400 ">
                  Nivel de actividad
                </p>
                <p className="text-lg font-light ">Moderado</p>
              </div>

              <div>
                <p className="text-lg font-light text-neutral-400 ">
                  Alimentos no deseados
                </p>
                <p className="text-lg font-light ">
                  Alimentos fritos, comida rápida
                </p>
              </div>
              <div>
                <p className="text-lg font-light text-neutral-400 ">
                  Alimentos deseados
                </p>
                <p className="text-lg font-light ">
                  Alimentos fritos, comida rápida
                </p>
              </div>
            </div>
            <div className="w-1/4 space-y-3">
              <div>
                <p className="text-lg font-light text-neutral-400">Peso</p>
                <p className="text-lg font-light ">86 kg</p>
              </div>
              <div>
                <p className="text-lg font-light text-neutral-400 ">Altura</p>
                <p className="text-lg font-light ">189 cm</p>
              </div>
              <div>
                <p className="text-lg font-light text-neutral-400 ">Sexo</p>
                <p className="text-lg font-light "> Masculino</p>
              </div>
              <div>
                <p className="text-lg font-light text-neutral-400 ">Edad</p>
                <p className="text-lg font-light ">22 años</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
