import type { UserDataProps } from '../../pages/Dashboard';
import { useState, useEffect } from 'react';
import { patch, get, post } from '../../api/http';
import { useLocalBg } from '../template/DashboardMobile';

interface ConfigProps {
  setIsConfig: (value: boolean) => void;
  userData?: UserDataProps;
  setUserData: (data: UserDataProps) => void;
}

export const Config = ({ setIsConfig, userData, setUserData }: ConfigProps) => {
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
    const payload = {
      goal: formData.goal,
      weightKg: parseFloat(formData.weight),
      heightCm: parseFloat(formData.height),
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
        setEditStep(0); // Regresa al paso de visualización
        console.log('Plan updated successfully:', updatedData);
      })
      .catch((error) => {
        console.error('Error updating plan:', error);
      });
  };
  const [editStep, setEditStep] = useState(0);

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
    return () => popWhite();
  }, [pushWhite, popWhite]);

  return (
    <div>
      <div className="flex flex-col max-w-2xl gap-5 bg-white min-h-[100dvh] p-10 mx-auto ">
        <div className="flex justify-end w-full">
          <div
            className="flex items-center justify-center w-10 h-10 text-xl font-bold text-white rounded-full cursor-pointer bg-black/10 hover:bg-red-300 "
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
          <p className="text-sm font-light capitalize">{userData?.plan}</p>
          <div className="w-full mt-4">
            <p
              className="inline px-4 py-2 text-sm text-white bg-red-400 rounded-full cursor-pointer"
              onClick={() =>
                handleSubscription('/api/payments/cancel-at-period-end')
              }
            >
              Cancelar suscripcion
            </p>
          </div>
        </div>

        <p className="mt-5 text-xl font-semibold">Informacion</p>
        <div className="flex flex-col gap-10">
          <div className="">
            <div className="flex flex-wrap justify-between ">
              <div className="w-[24%]">
                <p className="font-medium ">Peso</p>
                {editStep === 1 ? (
                  <div className="flex items-center w-full border-b">
                    <input
                      onChange={(e) => handleChange('weight', e.target.value)}
                      placeholder="90"
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
              <div className="w-[24%]">
                <p className="font-medium ">Altura</p>
                {editStep === 1 ? (
                  <div className="flex items-center w-full border-b">
                    <input
                      onChange={(e) => handleChange('height', e.target.value)}
                      placeholder="129"
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
              <div className="w-[24%]">
                <p className="font-medium ">Sexo</p>
                {editStep === 1 ? (
                  <div className="flex items-center w-full">
                    <input
                      onChange={(e) => handleChange('gender', e.target.value)}
                      placeholder="M"
                      type="text"
                      className="w-full px-1 py-2 text-xs border-b focus:outline-none"
                    />
                  </div>
                ) : (
                  <p className="text-sm font-light capitalize text-neutral-400">
                    {userData?.gender || '-'}
                  </p>
                )}
              </div>
              <div className="w-[24%]">
                <p className="font-medium ">Edad</p>
                {editStep === 1 ? (
                  <div className="flex items-center w-full border-b">
                    <input
                      onChange={(e) => handleChange('age', e.target.value)}
                      placeholder="25"
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
            {editStep === 1 ? (
              <button
                type="button"
                onClick={handleSubmit}
                className="
    inline-flex items-center justify-center
    px-4 py-2 rounded-full
    text-xs font-bold text-green-600
    ring-1 ring-green-600/40
    hover:bg-green-50 active:scale-95
    select-none touch-manipulation cursor-pointer
    min-h-[44px] min-w-[44px]
    relative z-10 pointer-events-auto
  "
              >
                Actualizar
              </button>
            ) : (
              <p
                className="mt-2 text-xs font-bold cursor-pointer "
                onClick={() => setEditStep(1)}
              >
                Editar →
              </p>
            )}
          </div>
          <div>
            <div>
              <p className="font-medium ">Nivel de actividad</p>
              <div className="flex items-center w-full border-b border-neutral-300">
                <select
                  onChange={(e) =>
                    handleChange('activityLevel', e.target.value)
                  }
                  value={formData.activityLevel}
                  className="w-full px-1 py-2 text-xs appearance-none cursor-pointer focus:outline-none"
                >
                  <option value="" disabled>
                    Selecciona tu nivel de actividad
                  </option>
                  <option value="Bajar peso">Bajo</option>
                  <option value="Mantener tu masa">Moderado</option>
                  <option value="Ganar músculo">Alto</option>
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

            <button
              type="button"
              onClick={handleSubmit}
              className="
    inline-flex items-center justify-center
    px-4 py-2 rounded-full
    text-xs font-bold text-green-600
    ring-1 ring-green-600/40
    hover:bg-green-50 active:scale-95
    select-none touch-manipulation cursor-pointer
    min-h-[44px] min-w-[44px]
    relative z-10 pointer-events-auto
  "
            >
              Actualizar
            </button>
          </div>
          <div>
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

            <button
              type="button"
              onClick={handleSubmit}
              className="
    inline-flex items-center justify-center
    px-4 py-2 rounded-full
    text-xs font-bold text-green-600
    ring-1 ring-green-600/40
    hover:bg-green-50 active:scale-95
    select-none touch-manipulation cursor-pointer
    min-h-[44px] min-w-[44px]
    relative z-10 pointer-events-auto
  "
            >
              Actualizar
            </button>
          </div>
          <div>
            <p className="text-lg font-medium">Alimentos no deseados</p>

            {editStep === 4 ? (
              <div className="flex items-center w-full">
                <input
                  onChange={(e) => handleChange('country', e.target.value)}
                  placeholder="Pollo, Camarones, Aguacate"
                  type="text"
                  className="w-full px-1 py-2 text-xs border-b focus:outline-none"
                />
              </div>
            ) : (
              <p className="text-sm font-light capitalize text-neutral-400">
                {userData?.dislikedFoods?.join(', ') || '-'}
              </p>
            )}

            {editStep === 4 ? (
              <button
                type="button"
                onClick={handleSubmit}
                className="
    inline-flex items-center justify-center
    px-4 py-2 rounded-full
    text-xs font-bold text-green-600
    ring-1 ring-green-600/40
    hover:bg-green-50 active:scale-95
    select-none touch-manipulation cursor-pointer
    min-h-[44px] min-w-[44px]
    relative z-10 pointer-events-auto
  "
              >
                Actualizar
              </button>
            ) : (
              <p
                className="mt-2 text-xs font-bold cursor-pointer "
                onClick={() => setEditStep(4)}
              >
                Editar Alimentos →
              </p>
            )}
          </div>
          <div>
            <p className="font-medium">Alimentos favoritos</p>
            {editStep === 5 ? (
              <div className="flex items-center w-full">
                <input
                  onChange={(e) => handleChange('country', e.target.value)}
                  placeholder="Pollo, Camarones, Aguacate"
                  type="text"
                  className="w-full px-1 py-2 text-xs border-b focus:outline-none"
                />
              </div>
            ) : (
              <p className="text-sm font-light capitalize text-neutral-400">
                {userData?.likedFoods?.join(', ') || '-'}
              </p>
            )}

            {editStep === 5 ? (
              <button
                type="button"
                onClick={handleSubmit}
                className="
    inline-flex items-center justify-center
    px-4 py-2 rounded-full
    text-xs font-bold text-green-600
    ring-1 ring-green-600/40
    hover:bg-green-50 active:scale-95
    select-none touch-manipulation cursor-pointer
    min-h-[44px] min-w-[44px]
    relative z-10 pointer-events-auto
  "
              >
                Actualizar
              </button>
            ) : (
              <p
                className="mt-2 text-xs font-bold cursor-pointer "
                onClick={() => setEditStep(5)}
              >
                Editar Alimentos →
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
