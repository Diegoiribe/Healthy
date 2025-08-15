import type { UserDataProps } from '../pages/Dashboard';
import { useState, useEffect } from 'react';
import { patch, get, post } from '../api/http';

interface ConfigProps {
  userData?: UserDataProps;
  setUserData: (data: UserDataProps) => void;
}

export const Information = ({ userData, setUserData }: ConfigProps) => {
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

  return (
    <div>
      <div className="flex flex-col max-w-3xl gap-5 mx-auto py-15">
        <div>
          <p className="text-4xl font-semibold text-red-300 capitalize">{`${userData?.firstName} ${userData?.lastName}`}</p>
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

        <div className="flex items-center justify-between">
          <p className="mt-5 text-xl font-semibold">Informacion</p>
          {editStep ? (
            <button
              type="button"
              onClick={handleSubmit}
              className="relative z-10 inline-flex items-center justify-center py-2 text-xs font-bold text-green-600 rounded-full cursor-pointer pointer-events-auto select-none active:scale-95 touch-manipulation"
              aria-busy={false}
            >
              Actualizar
            </button>
          ) : (
            <p
              className="mt-2 text-xs font-bold cursor-pointer "
              onClick={() => setEditStep(true)}
            >
              Editar →
            </p>
          )}
        </div>
        <div className="flex flex-col gap-10">
          <div className="">
            <div className="flex flex-wrap justify-between ">
              <div className="w-[24%]">
                <p className="font-medium ">Peso</p>
                {editStep ? (
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
                {editStep ? (
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
                <div
                  className={`flex ${
                    editStep ? 'border-b border-black' : ''
                  } items-center w-full `}
                >
                  <select
                    onChange={(e) => handleChange('gender', e.target.value)}
                    value={formData.goal}
                    className="w-full px-1 py-2 text-sm appearance-none cursor-pointer text-neutral-400 focus:outline-none"
                  >
                    <option value="" disabled>
                      Selecciona tu sexo
                    </option>
                    <option value="M">Masculino</option>
                    <option value="F">Femenino</option>
                  </select>
                  {editStep && (
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
                  )}
                </div>
              </div>
              <div className="w-[24%]">
                <p className="font-medium ">Edad</p>
                {editStep ? (
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
          </div>
          <div>
            <div>
              <p className="font-medium ">Nivel de actividad</p>
              <div
                className={`flex ${
                  editStep ? 'border-b border-black' : ''
                } items-center w-full `}
              >
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
                {editStep && (
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
                )}
              </div>
            </div>
          </div>
          <div>
            <div>
              <p className="font-medium ">Objetivo</p>
              <div
                className={`flex ${
                  editStep ? 'border-b border-black' : ''
                } items-center w-full `}
              >
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
                {editStep && (
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
                )}
              </div>
            </div>
          </div>
          <div>
            <p className="text-lg font-medium">Alimentos no deseados</p>

            {editStep ? (
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
          </div>
          <div>
            <p className="font-medium">Alimentos favoritos</p>
            {editStep ? (
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
          </div>
        </div>
      </div>
    </div>
  );
};
