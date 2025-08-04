import type { UserDataProps } from '../../pages/Dashboard';
import { useState, useEffect } from 'react';
import { patch, get } from '../../api/http';

interface ConfigProps {
  setIsConfig: (value: boolean) => void;
  userData?: UserDataProps;
  setUserData: (data: UserDataProps) => void;
}

export const Config = ({ setIsConfig, userData, setUserData }: ConfigProps) => {
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

  return (
    <div>
      <div className="flex flex-col max-w-2xl gap-5 p-10 mx-auto ">
        <div className="flex justify-end w-full">
          <div
            className="flex items-center justify-center w-10 h-10 text-xl font-bold text-white rounded-full cursor-pointer bg-black/10 hover:bg-red-300"
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
        </div>

        <p className="mt-5 text-xl font-semibold">Information</p>
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
                    {userData?.country || 'Null'}
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
                    {userData?.city || 'Null'}
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
                    {userData?.weight || 'Null'} kg
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
                    {userData?.height || 'Null'} cm
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
                    {userData?.gender || 'Null'}
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
                    {userData?.age || 'Null'} años
                  </p>
                )}
              </div>
            </div>
            {editStep === 1 ? (
              <p
                className="mt-2 text-xs font-bold text-green-600 rounded-full cursor-pointer"
                onClick={() => handleSubmit()}
              >
                Done
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
                {userData?.activityLevel || 'Null'}
              </p>
            )}

            {editStep === 2 ? (
              <p
                className="mt-2 text-xs font-bold text-green-600 rounded-full cursor-pointer"
                onClick={() => handleSubmit()}
              >
                Done
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
                {userData?.goal || 'Null'}
              </p>
            )}

            {editStep === 3 ? (
              <p
                className="mt-2 text-xs font-bold text-green-600 rounded-full cursor-pointer"
                onClick={() => handleSubmit()}
              >
                Done
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
                {userData?.dislikedFoods || 'Null'}
              </p>
            )}

            {editStep === 4 ? (
              <p
                className="mt-2 text-xs font-bold text-green-600 rounded-full cursor-pointer"
                onClick={() => handleSubmit()}
              >
                Done
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
                {userData?.likedFoods || 'Null'}
              </p>
            )}

            {editStep === 5 ? (
              <p
                className="mt-2 text-xs font-bold text-green-600 rounded-full cursor-pointer"
                onClick={() => handleSubmit()}
              >
                Done
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
