import type { UserDataProps } from '../../pages/Dashboard';
import { useState, useEffect } from 'react';
import { patch, get, post } from '../../api/http';
import { useLocalBg } from '../template/DashboardMobile';
import imgUser from '../../assets/steveSuit.jpg';

interface ConfigProps {
  setIsConfig: (value: boolean) => void;
  userData?: UserDataProps;
  setUserData: (data: UserDataProps) => void;
  idx: number;
  setIdx: (value: number) => void;
}

interface StyleResponse {
  style: number;
}

export const Config = ({
  setIsConfig,
  userData,
  setUserData,
  idx,
  setIdx
}: ConfigProps) => {
  const { pushWhite, popWhite } = useLocalBg();
  const [formData, setFormData] = useState({
    weight: '',
    height: '',
    goal: '',
    likedFoods: '',
    dislikedFoods: '',
    country: '',
    city: '',
    gender: '',
    age: '',
    activityLevel: ''
  });

  useEffect(() => {
    if (userData) {
      setFormData({
        weight: userData.weight?.toString() || '',
        height: userData.height?.toString() || '',
        goal: userData.goal || '',
        likedFoods: userData.likedFoods?.join(', ') || '',
        dislikedFoods: userData.dislikedFoods?.join(', ') || '',
        country: userData.country || '',
        city: userData.city || '',
        gender: userData.gender || '',
        age: userData.age?.toString() || '',
        activityLevel: userData.activityLevel || ''
      });
    }
  }, [userData]);

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const weightParsed = parseFloat(formData.weight);
    const heightParsed = parseFloat(formData.height);
    const payload = {
      goal: formData.goal,
      weightKg: Number.isFinite(weightParsed) ? weightParsed : 0,
      heightCm: Number.isFinite(heightParsed) ? heightParsed : 0,
      likedFoods:
        formData.likedFoods
          .split(',')
          .map((f) => f.trim())
          .filter((f) => f.length > 0) || [],
      dislikedFoods:
        formData.dislikedFoods
          .split(',')
          .map((f) => f.trim())
          .filter((f) => f.length > 0) || [],
      country: formData.country,
      city: formData.city,
      gender: formData.gender,
      age: parseInt(formData.age, 10) || 0,
      activityLevel: formData.activityLevel || 'Moderado'
    };

    // Aquí puedes hacer la petición PATCH a tu API
    await patch('/user/profile', payload)
      .then(() => {
        return get('/user/me'); // vuelve a pedir los datos actualizados
      })
      .then((updatedData) => {
        setUserData(updatedData);
        setEditStep(false); // Regresa al paso de visualización
        console.log('Plan updated successfully:', updatedData);
      })
      .catch((error) => {
        console.error('Error updating plan:', error);
      });
  };
  const [editStep, setEditStep] = useState(false);

  const handleSubscription = async (endpoint: string) => {
    try {
      const { url } = await post(endpoint); // 👈 tu post ya devuelve data
      window.location.replace(url);
    } catch (err) {
      console.error('Checkout error:', err);
      // opcional: mostrar toast
    }
  };

  useEffect(() => {
    pushWhite();
    window.scrollTo(0, 0);
    return () => popWhite();
  }, [pushWhite, popWhite]);

  const updateStyle = async (styleIdx: number) => {
    if (!userData) return;

    // Guarda el estado anterior para rollback
    const prevUser = userData;
    const prevIdx = idx;

    // Optimistic UI
    setIdx(styleIdx);
    setUserData({ ...userData, style: styleIdx });

    try {
      const res = (await patch('/user/style', {
        style: styleIdx
      })) as Partial<StyleResponse>;

      // Si vino { style }, sincroniza con lo que diga el server
      if (res && typeof res.style === 'number') {
        setUserData({ ...prevUser, style: res.style });
        setIdx(res.style);
        console.log(res);
      }
      // Si no regresó nada útil, ya quedamos con el optimistic update
    } catch (e) {
      console.error('Error updating style:', e);
      // Rollback
      setUserData(prevUser);
      setIdx(prevIdx);
    }
  };

  return (
    <div>
      <div className="flex flex-col max-w-2xl gap-5 bg-white min-h-[100dvh] p-10 mx-auto text-black">
        <div className="flex justify-end w-full">
          <div
            className="flex items-center justify-center w-10 h-10 text-xl font-bold text-black rounded-full cursor-pointer backdrop-blur-md bg-black/5 hover:bg-black hover:text-white "
            onClick={() => setIsConfig(false)}
          >
            Ｘ
          </div>
        </div>
        <div>
          <p className="text-4xl font-semibold capitalize">{`${userData?.firstName} ${userData?.lastName}`}</p>
          <p className="text-sm font-light text-neutral-400">
            {userData?.email}
          </p>
          <p className="text-sm font-light capitalize truncate">
            {userData?.plan}
          </p>
          <div className="w-full mt-4">
            <p
              className="inline px-4 py-2 text-sm text-[var(--fg)] bg-[var(--bg)] rounded-full font-bold cursor-pointer"
              onClick={() =>
                handleSubscription('/api/payments/cancel-at-period-end')
              }
            >
              Cancelar suscripcion
            </p>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-3 mt-5 mb-5">
            <div className="flex items-center justify-center w-6 h-6 bg-[var(--bg)] rounded-full cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="text-[var(--fg)] lucide lucide-upload-icon lucide-upload"
              >
                <path d="M12 3v12" />
                <path d="m17 8-5-5-5 5" />
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              </svg>
            </div>
            <p className="text-xl font-semibold ">Foto de perfil</p>
          </div>

          <div className="flex items-end gap-3 ">
            <div
              className="flex border-2 rounded-full h-28 w-28  p-[2px] hover:border-neutral-300 bg-cover  border-neutral-100"
              style={{ backgroundImage: `url(${imgUser})` }}
            ></div>
          </div>
        </div>

        <div>
          <p className="mt-5 mb-5 text-xl font-semibold">Temas</p>
          <div className="flex items-center justify-between ">
            <button
              onClick={() => updateStyle(0)}
              className={`flex border-2 rounded-full h-12 w-12  p-[2px] hover:border-neutral-300 ${
                idx === 0 ? 'border-neutral-300' : 'border-neutral-100'
              }`}
            >
              <div className="w-1/2 h-full bg-[#854d03] rounded-l-full"></div>
              <div className="w-1/2 h-full bg-[#ffedd5]  rounded-r-full"></div>
            </button>
            <button
              onClick={() => updateStyle(1)}
              className={`flex border-2 rounded-full h-12 w-12  p-[2px] hover:border-neutral-300 ${
                idx === 1 ? 'border-neutral-300' : 'border-neutral-100'
              }`}
            >
              <div className="w-1/2 h-full bg-[#f7fee7] rounded-l-full"></div>
              <div className="w-1/2 h-full bg-[#3f6212]  rounded-r-full"></div>
            </button>
            <button
              onClick={() => updateStyle(2)}
              className={`flex border-2 rounded-full h-12 w-12  p-[2px] hover:border-neutral-300 ${
                idx === 2 ? 'border-neutral-300' : 'border-neutral-100'
              }`}
            >
              <div className="w-1/2 h-full bg-[#000000] rounded-l-full"></div>
              <div className="w-1/2 h-full bg-[#ffffff]  rounded-r-full"></div>
            </button>
            <button
              onClick={() => updateStyle(3)}
              className={`flex border-2 rounded-full h-12 w-12  p-[2px] hover:border-neutral-300 ${
                idx === 3 ? 'border-neutral-300' : 'border-neutral-100'
              }`}
            >
              <div className="w-1/2 h-full bg-[#dbeafe] rounded-l-full"></div>
              <div className="w-1/2 h-full bg-[#155e75]  rounded-r-full"></div>
            </button>
            <button
              onClick={() => updateStyle(4)}
              className={`flex border-2 rounded-full h-12 w-12  p-[2px] hover:border-neutral-300 ${
                idx === 4 ? 'border-neutral-300' : 'border-neutral-100'
              }`}
            >
              <div className="w-1/2 h-full bg-[#ffffff] rounded-l-full"></div>
              <div className="w-1/2 h-full bg-[#000000]  rounded-r-full"></div>
            </button>
            <button
              onClick={() => updateStyle(5)}
              className={`flex border-2 rounded-full h-12 w-12  p-[2px] hover:border-neutral-300 ${
                idx === 5 ? 'border-neutral-300' : 'border-neutral-100'
              }`}
            >
              <div className="w-1/2 h-full bg-[#fecdd3] rounded-l-full"></div>
              <div className="w-1/2 h-full bg-[#9f1239]  rounded-r-full"></div>
            </button>
          </div>
        </div>

        <div className="items-center justify-between ">
          <p className="mt-5 text-xl font-semibold">Informacion</p>
          {editStep ? (
            <button
              type="button"
              onClick={handleSubmit}
              className="relative z-10 inline-flex items-center justify-center mt-2 py-1 px-3 text-xs font-bold text-[var(--fg)] rounded-full cursor-pointer pointer-events-auto select-none active:scale-95 bg-[var(--bg)] touch-manipulation"
              aria-busy={false}
            >
              Actualizar
            </button>
          ) : (
            <p
              className="mt-2 text-xs font-bold cursor-pointer "
              onClick={() => setEditStep(true)}
            >
              Editar
            </p>
          )}
        </div>

        <div className="flex flex-col gap-10 ">
          <div className="">
            <div className="flex flex-wrap justify-between ">
              <div className="w-[22%]">
                <p className="font-medium ">Peso</p>
                {editStep ? (
                  <div className="flex items-center w-full border-b border-neutral-100">
                    <input
                      value={formData.weight}
                      onChange={(e) => handleChange('weight', e.target.value)}
                      placeholder="90"
                      inputMode="decimal"
                      type="text"
                      className="w-full px-1 py-2 text-xs focus:outline-none"
                    />
                    <span className="text-xs">kg</span>
                  </div>
                ) : (
                  <p className="text-sm font-light text-neutral-400">
                    {userData?.weight || '-'} kg
                  </p>
                )}
              </div>
              <div className="w-[22%]">
                <p className="font-medium ">Altura</p>
                {editStep ? (
                  <div className="flex items-center w-full border-b border-neutral-100">
                    <input
                      value={formData.height}
                      onChange={(e) => handleChange('height', e.target.value)}
                      placeholder="129"
                      inputMode="decimal"
                      type="text"
                      className="w-full px-1 py-2 text-xs focus:outline-none"
                    />
                    <span className="text-xs">cm</span>
                  </div>
                ) : (
                  <p className="text-sm font-light text-neutral-400">
                    {userData?.height || '-'} cm
                  </p>
                )}
              </div>
              <div className="w-[22%]">
                <p className="font-medium truncate">Sexo</p>
                <div
                  className={`flex ${
                    editStep ? 'border-b border-neutral-100 py-1 ' : ''
                  } items-center w-full `}
                >
                  {editStep ? (
                    <>
                      <select
                        onChange={(e) => handleChange('gender', e.target.value)}
                        value={formData.gender}
                        className="w-full text-sm appearance-none cursor-pointer text-neutral-400 focus:outline-none"
                      >
                        <option value="" disabled>
                          Genero
                        </option>
                        <option value="M">Masculino</option>
                        <option value="F">Femenino</option>
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
                    </>
                  ) : (
                    <p className="text-xs text-neutral-400">
                      {userData?.gender || '-'}
                    </p>
                  )}
                </div>
              </div>
              <div className="w-[22%]">
                <p className="font-medium ">Edad</p>
                {editStep ? (
                  <div className="flex items-center w-full border-b border-neutral-100">
                    <input
                      value={formData.age}
                      onChange={(e) => handleChange('age', e.target.value)}
                      placeholder="25"
                      inputMode="numeric"
                      type="text"
                      className="w-full px-1 py-2 text-xs focus:outline-none"
                    />
                    <span className="text-xs">años</span>
                  </div>
                ) : (
                  <p className="text-sm font-light text-neutral-400 ">
                    {userData?.age || '-'} años
                  </p>
                )}
              </div>
            </div>
          </div>
          <div>
            <div>
              <p className="font-medium ">Nivel de actividad</p>
              <div
                className={`flex ${
                  editStep ? 'border-b border-neutral-100' : ''
                } items-center w-full `}
              >
                {editStep ? (
                  <>
                    <select
                      onChange={(e) =>
                        handleChange('activityLevel', e.target.value)
                      }
                      value={formData.activityLevel}
                      className="w-full px-1 py-2 text-sm appearance-none cursor-pointer text-neutral-400 focus:outline-none"
                    >
                      <option value="" disabled>
                        Selecciona tu nivel de actividad
                      </option>
                      <option value="Nada">Nada</option>
                      <option value="Ligero">Ligero</option>
                      <option value="Moderado">Moderado</option>
                      <option value="Activo">Activo</option>
                      <option value="Intenso">Intenso</option>
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
                  </>
                ) : (
                  <p className="text-xs text-neutral-400">
                    {userData?.activityLevel || '-'}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div>
            <div>
              <p className="font-medium ">Objetivo</p>
              <div
                className={`flex ${
                  editStep ? 'border-b border-neutral-100' : ''
                } items-center w-full `}
              >
                {editStep ? (
                  <>
                    <select
                      onChange={(e) => handleChange('goal', e.target.value)}
                      value={formData.goal}
                      className="w-full px-1 py-2 text-sm appearance-none cursor-pointer text-neutral-400 focus:outline-none"
                    >
                      <option value="" disabled>
                        Selecciona tu objetivo
                      </option>
                      <option value="Bajar peso">Bajar peso</option>
                      <option value="Mantener tu masa">Mantener tu masa</option>
                      <option value="Ganar musculo">Ganar músculo</option>
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
                  </>
                ) : (
                  <p className="text-xs text-neutral-400">
                    {userData?.goal || '-'}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div>
            <p className="text-lg font-medium">Alimentos no deseados</p>

            {editStep ? (
              <div className="flex items-center w-full">
                <input
                  value={formData.dislikedFoods}
                  onChange={(e) =>
                    handleChange('dislikedFoods', e.target.value)
                  }
                  placeholder="Pollo, Camarones, Aguacate"
                  type="text"
                  className="w-full px-1 py-2 text-xs border-b border-neutral-100 focus:outline-none"
                />
              </div>
            ) : (
              <p className="text-sm font-light capitalize text-neutral-400">
                {userData?.dislikedFoods?.join(', ') || '-'}
              </p>
            )}
          </div>
          <div>
            <p className="font-medium">Alimentos favoritos</p>
            {editStep ? (
              <div className="flex items-center w-full">
                <input
                  value={formData.likedFoods}
                  onChange={(e) => handleChange('likedFoods', e.target.value)}
                  placeholder="Pollo, Camarones, Aguacate"
                  type="text"
                  className="w-full px-1 py-2 text-xs border-b border-neutral-100 focus:outline-none"
                />
              </div>
            ) : (
              <p className="text-sm font-light capitalize text-neutral-400">
                {userData?.likedFoods?.join(', ') || '-'}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
