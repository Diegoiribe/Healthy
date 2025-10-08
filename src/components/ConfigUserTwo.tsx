import { X, Pencil, Save } from 'lucide-react';
import { useState, useEffect } from 'react';
import { get, patch, post } from '../api/http';
import type { UserDataProps } from '../pages/DashboardTwo';

interface ConfigUserTwoProps {
  setIsConfig: (value: boolean) => void;
  userData?: UserDataProps;
  setUserData: (data: UserDataProps) => void;
}

export const ConfigUserTwo = ({
  setIsConfig,
  userData,
  setUserData
}: ConfigUserTwoProps) => {
  const [formData, setFormData] = useState({
    peso: '',
    estatura: '',
    edad: '',
    objetivo: '',
    sexo: '',
    nivelActividad: '',
    alimentosNoDeseados: '',
    alimentosDeseados: ''
  });
  const [isEdit, setIsEdit] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (userData) {
      setFormData({
        peso: userData.weight?.toString() || '',
        estatura: userData.height?.toString() || '',
        objetivo: userData.goal || '',
        alimentosDeseados: userData.likedFoods?.join(', ') || '',
        alimentosNoDeseados: userData.dislikedFoods?.join(', ') || '',
        sexo: userData.gender || '',
        edad: userData.age?.toString() || '',
        nivelActividad: userData.activityLevel || ''
      });
    }
  }, [userData]);

  const handleSubmit = async () => {
    const payload = {
      goal: formData.objetivo || 'Mantener tu masa',
      weightKg: parseFloat(formData.peso),
      heightCm: parseFloat(formData.estatura),
      likedFoods:
        formData.alimentosDeseados
          .split(',')
          .map((f) => f.trim())
          .filter((f) => f.length > 0) || [],
      dislikedFoods:
        formData.alimentosNoDeseados
          .split(',')
          .map((f) => f.trim())
          .filter((f) => f.length > 0) || [],
      gender: formData.sexo,
      age: parseInt(formData.edad, 10) || 0,
      activityLevel: formData.nivelActividad || 'Moderado'
    };

    // Aquí puedes hacer la petición PATCH a tu API
    await patch('/user/profile', payload)
      .then(() => {
        return get('/user/me'); // vuelve a pedir los datos actualizados
      })
      .then((updatedData) => {
        setUserData(updatedData);
        console.log('Plan updated successfully:', updatedData);
      })
      .catch((error) => {
        console.error('Error updating plan:', error);
      });
  };

  const handleSubscription = async (endpoint: string) => {
    try {
      const { url } = await post(endpoint); // 👈 tu post ya devuelve data
      window.location.replace(url);
    } catch (err) {
      console.error('Checkout error:', err);
      // opcional: mostrar toast
    }
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
                <div
                  className=" inline-flex px-3 py-[5px] h-8 text-sm   transition-all duration-300 text-white bg-black font-medium cursor-pointer rounded-2xl items-center gap-2"
                  onClick={() =>
                    handleSubscription('/api/payments/cancel-at-period-end')
                  }
                >
                  <p>Cancelar Suscripcion</p>
                </div>
                {isEdit ? (
                  <div
                    className=" inline-flex px-2 py-[5px] h-8 text-sm   transition-all duration-300 text-green-500 bg-green-100 font-medium cursor-pointer rounded-2xl items-center gap-2"
                    onClick={() => {
                      handleSubmit();
                      setIsEdit(false);
                    }}
                  >
                    <Save size={18} />
                  </div>
                ) : (
                  <div
                    className=" inline-flex px-2 py-[5px] h-8 text-sm   transition-all duration-300 text-orange-400 bg-orange-100 font-medium cursor-pointer rounded-2xl items-center gap-2"
                    onClick={() => setIsEdit(true)}
                  >
                    <Pencil size={18} />
                  </div>
                )}
              </div>
            </div>

            <p className="my-5 mt-10 text-3xl font-light ">
              Informacion personal
            </p>
          </div>
          {isEdit ? (
            <div className="flex items-center justify-between">
              <div className="w-3/4 space-y-3">
                <div className="relative mb-5 w-82">
                  <select
                    name="objetivo"
                    value={formData.objetivo}
                    onChange={handleChange}
                    id="objetivo"
                    required
                    defaultValue=""
                    className="w-full px-4 py-3 pr-10 bg-white border rounded-full outline-none appearance-none peer border-black/30 focus:border-orange-200"
                  >
                    <option value="" disabled>
                      {' '}
                    </option>
                    <option value="Bajar peso">Bajar peso</option>
                    <option value="Mantener tu masa">Mantener tu masa</option>
                    <option value="Ganar musculo">Ganar músculo</option>
                  </select>

                  <label
                    htmlFor="objetivo"
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white px-1
               text-black/40 transition-all duration-200
               peer-focus:-top-[1px] peer-focus:text-sm peer-focus:text-orange-300
               peer-valid:-top-[1px] peer-valid:text-sm"
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
                <div className="relative mb-5 w-82">
                  <select
                    name="nivelActividad"
                    value={formData.nivelActividad}
                    onChange={handleChange}
                    id="nivelActividad"
                    required
                    defaultValue=""
                    className="w-full px-4 py-3 pr-10 bg-white border rounded-full outline-none appearance-none peer border-black/30 focus:border-orange-200"
                  >
                    <option value="" disabled>
                      {''}
                    </option>
                    <option value="Nada">Nada</option>
                    <option value="Ligero">Ligero</option>
                    <option value="Moderado">Moderado</option>
                    <option value="Activo">Activo</option>
                    <option value="Intenso">Intenso</option>
                  </select>

                  <label
                    htmlFor="nivelActividad"
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white px-1
               text-black/40 transition-all duration-200
               peer-focus:-top-[1px] peer-focus:text-sm peer-focus:text-orange-300
               peer-valid:-top-[1px] peer-valid:text-sm"
                  >
                    Nivel de actividad
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

                <div className="relative mb-5 w-82">
                  <input
                    value={formData.alimentosNoDeseados}
                    onChange={handleChange}
                    type="text"
                    name="alimentosNoDeseados"
                    id="alimentosNoDeseados"
                    required
                    className="w-full px-4 py-3 border rounded-full outline-none border-black/30 peer focus:border-orange-300"
                  />
                  <label
                    htmlFor="alimentosNoDeseados"
                    className="absolute px-1 transition-all duration-200 -translate-y-1/2 bg-white text-black/40 left-4 top-1/2 peer-focus:-top-[1px] peer-focus:text-sm peer-valid:-top-[1px] peer-valid:text-sm peer-focus:text-orange-300 "
                  >
                    Alimentos no deseados
                  </label>
                </div>
                <div className="relative mb-5 w-82">
                  <input
                    value={formData.alimentosDeseados}
                    onChange={handleChange}
                    type="text"
                    name="alimentosDeseados"
                    id="alimentosDeseados"
                    required
                    className="w-full px-4 py-3 border rounded-full outline-none border-black/30 peer focus:border-orange-300"
                  />
                  <label
                    htmlFor="alimentosDeseados"
                    className="absolute px-1 transition-all duration-200 -translate-y-1/2 bg-white text-black/40 left-4 top-1/2 peer-focus:-top-[1px] peer-focus:text-sm peer-valid:-top-[1px] peer-valid:text-sm peer-focus:text-orange-300 "
                  >
                    Alimentos deseados
                  </label>
                </div>
              </div>
              <div className="w-1/3 space-y-3">
                <div className="relative mb-5 w-82">
                  <input
                    value={formData.peso}
                    onChange={handleChange}
                    type="number"
                    name="peso"
                    id="peso"
                    required
                    className="w-full px-4 py-3 border rounded-full outline-none border-black/30 peer focus:border-orange-300"
                  />
                  <label
                    htmlFor="peso"
                    className="absolute px-1 transition-all duration-200 -translate-y-1/2 bg-white text-black/40 left-4 top-1/2 peer-focus:-top-[1px] peer-focus:text-sm peer-valid:-top-[1px] peer-valid:text-sm peer-focus:text-orange-300 "
                  >
                    Peso
                  </label>
                </div>
                <div className="relative mb-5 w-82">
                  <input
                    value={formData.estatura}
                    onChange={handleChange}
                    type="number"
                    name="estatura"
                    id="estatura"
                    required
                    className="w-full px-4 py-3 border rounded-full outline-none border-black/30 peer focus:border-orange-300"
                  />
                  <label
                    htmlFor="estatura"
                    className="absolute px-1 transition-all duration-200 -translate-y-1/2 bg-white text-black/40 left-4 top-1/2 peer-focus:-top-[1px] peer-focus:text-sm peer-valid:-top-[1px] peer-valid:text-sm peer-focus:text-orange-300 "
                  >
                    Estatura
                  </label>
                </div>
                <div className="relative mb-5 w-82">
                  <select
                    name="sexo"
                    value={formData.sexo}
                    onChange={handleChange}
                    id="sexo"
                    required
                    defaultValue=""
                    className="w-full px-4 py-3 pr-10 bg-white border rounded-full outline-none appearance-none peer border-black/30 focus:border-orange-200"
                  >
                    <option value="" disabled>
                      {' '}
                    </option>
                    <option value="masculino">Masculino</option>
                    <option value="femenino">Femenino</option>
                  </select>

                  <label
                    htmlFor="sexo"
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white px-1
               text-black/40 transition-all duration-200
               peer-focus:-top-[1px] peer-focus:text-sm peer-focus:text-orange-300
               peer-valid:-top-[1px] peer-valid:text-sm"
                  >
                    Sexo
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
                <div className="relative mb-5 w-82">
                  <input
                    value={formData.edad}
                    onChange={handleChange}
                    type="number"
                    name="edad"
                    id="edad"
                    required
                    className="w-full px-4 py-3 border rounded-full outline-none border-black/30 peer focus:border-orange-300"
                  />
                  <label
                    htmlFor="edad"
                    className="absolute px-1 transition-all duration-200 -translate-y-1/2 bg-white text-black/40 left-4 top-1/2 peer-focus:-top-[1px] peer-focus:text-sm peer-valid:-top-[1px] peer-valid:text-sm peer-focus:text-orange-300 "
                  >
                    Edad
                  </label>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div className="w-3/4 space-y-3">
                <div>
                  <p className="text-lg font-light text-neutral-400 ">
                    Objetivo
                  </p>
                  <p className="text-lg font-light text-black">
                    {formData.objetivo || '-'}
                  </p>
                </div>
                <div>
                  <p className="text-lg font-light text-neutral-400 ">
                    Nivel de actividad
                  </p>
                  <p className="text-lg font-light ">
                    {formData.nivelActividad || '-'}
                  </p>
                </div>

                <div>
                  <p className="text-lg font-light text-neutral-400 ">
                    Alimentos no deseados
                  </p>
                  <p className="text-lg font-light ">
                    {formData.alimentosNoDeseados || '-'}
                  </p>
                </div>
                <div>
                  <p className="text-lg font-light text-neutral-400 ">
                    Alimentos deseados
                  </p>

                  <p className="text-lg font-light ">
                    {formData.alimentosDeseados || '-'}
                  </p>
                </div>
              </div>
              <div className="w-1/4 space-y-3">
                <div>
                  <p className="text-lg font-light text-neutral-400">Peso</p>
                  <p className="text-lg font-light ">
                    {formData.peso || '-'} kg
                  </p>
                </div>
                <div>
                  <p className="text-lg font-light text-neutral-400 ">Altura</p>
                  <p className="text-lg font-light ">
                    {formData.estatura || '-'} cm
                  </p>
                </div>
                <div>
                  <p className="text-lg font-light text-neutral-400 ">Sexo</p>
                  <p className="text-lg font-light capitalize ">
                    {formData.sexo || '-'}{' '}
                  </p>
                </div>
                <div>
                  <p className="text-lg font-light text-neutral-400 ">Edad</p>
                  <p className="text-lg font-light ">
                    {formData.edad || '-'} años
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
