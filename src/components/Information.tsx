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

        <p className="mt-5 text-xl font-semibold">Informacion</p>
        <div className="flex flex-col gap-10">
          <div className="">
            <div className="flex flex-wrap justify-between ">
              <div className="w-[16%]">
                <p className="font-medium ">Pais</p>
                {editStep === 1 ? (
                  <div className="flex items-center w-full">
                    <input
                      onChange={(e) => handleChange('country', e.target.value)}
                      placeholder="Mexico"
                      type="text"
                      className="w-full px-1 py-2 text-xs border-b focus:outline-none"
                    />
                  </div>
                ) : (
                  <p className="text-sm font-light capitalize text-neutral-400">
                    {userData?.country || '-'}
                  </p>
                )}
              </div>
              <div className="w-[16%]">
                <p className="font-medium ">Ciudad</p>
                {editStep === 1 ? (
                  <div className="flex items-center w-full">
                    <input
                      onChange={(e) => handleChange('city', e.target.value)}
                      placeholder="Culiacan"
                      type="text"
                      className="w-full px-1 py-2 text-xs border-b focus:outline-none"
                    />
                  </div>
                ) : (
                  <p className="text-sm font-light capitalize text-neutral-400">
                    {userData?.city || '-'}
                  </p>
                )}
              </div>
              <div className="w-[12%]">
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
              <div className="w-[12%]">
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
              <div className="w-[12%]">
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
              <div className="w-[12%]">
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
              <p
                className="mt-2 text-xs font-bold text-green-600 rounded-full cursor-pointer"
                onClick={() => handleSubmit()}
              >
                Actualizar
              </p>
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
            <p className="font-medium ">Tipo de persona</p>
            {editStep === 2 ? (
              <div className="flex items-center w-full border-b">
                <input
                  onChange={(e) =>
                    handleChange('activityLevel', e.target.value)
                  }
                  placeholder="Moderado"
                  type="text"
                  className="w-full px-1 py-2 text-xs focus:outline-none"
                />
              </div>
            ) : (
              <p className="text-sm font-light capitalize text-neutral-400">
                {userData?.activityLevel || '-'}
              </p>
            )}

            {editStep === 2 ? (
              <p
                className="mt-2 text-xs font-bold text-green-600 rounded-full cursor-pointer"
                onClick={() => handleSubmit()}
              >
                Actualizar
              </p>
            ) : (
              <p
                className="mt-2 text-xs font-bold cursor-pointer "
                onClick={() => setEditStep(2)}
              >
                Editar →
              </p>
            )}
          </div>
          <div>
            <p className="font-medium ">Objetivo</p>
            {editStep === 3 ? (
              <div className="flex items-center w-full border-b">
                <input
                  onChange={(e) => handleChange('goal', e.target.value)}
                  placeholder="Bajar de peso"
                  type="text"
                  className="w-full px-1 py-2 text-xs focus:outline-none"
                />
              </div>
            ) : (
              <p className="text-sm font-light capitalize text-neutral-400">
                {userData?.goal || '-'}
              </p>
            )}

            {editStep === 3 ? (
              <p
                className="mt-2 text-xs font-bold text-green-600 rounded-full cursor-pointer"
                onClick={() => handleSubmit()}
              >
                Actualizar
              </p>
            ) : (
              <p
                className="mt-2 text-xs font-bold cursor-pointer "
                onClick={() => setEditStep(3)}
              >
                Editar →
              </p>
            )}
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
              <p
                className="mt-2 text-xs font-bold text-green-600 rounded-full cursor-pointer"
                onClick={() => handleSubmit()}
              >
                Actualizar
              </p>
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
              <p
                className="mt-2 text-xs font-bold text-green-600 rounded-full cursor-pointer"
                onClick={() => handleSubmit()}
              >
                Actualizar
              </p>
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
