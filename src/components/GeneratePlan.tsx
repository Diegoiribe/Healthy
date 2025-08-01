import { InputText, InputSelect, InputBottom } from './TypeInputs';
import { useState, useEffect } from 'react';
import type { UserDataProps } from '../pages/Dashboard';
import { patch, get } from '../api/http';

interface GeneratePlanProps {
  userData?: UserDataProps;
  setIsGenerate: (value: boolean) => void;
  setUserData: (data: UserDataProps) => void;
  setStep?: (step: number) => void;
  step?: number;
  createPlan: () => void;
  dietSelect?: string;
  weekMeals?: any;
  isMobile: boolean;
}

export const GeneratePlan = ({
  userData,
  setUserData,
  setIsGenerate,
  setStep,
  step,
  createPlan,
  dietSelect,
  weekMeals,
  isMobile
}: GeneratePlanProps) => {
  const [formData, setFormData] = useState({
    weight: '',
    height: '',
    goal: '',
    likedFoods: '',
    dislikedFoods: ''
  });

  useEffect(() => {
    if (userData) {
      setFormData({
        weight: userData.weight?.toString() || '',
        height: userData.height?.toString() || '',
        goal: userData.goal || '',
        likedFoods: userData.likedFoods?.join(', ') || '',
        dislikedFoods: userData.dislikedFoods?.join(', ') || ''
      });
    }
  }, [userData]);

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    console.log(dietSelect);
    const payload = {
      goal: formData.goal,
      weightKg: parseFloat(formData.weight),
      heightCm: parseFloat(formData.height),
      likedFoods: formData.likedFoods
        .split(',')
        .map((f) => f.trim())
        .filter((f) => f.length > 0),
      dislikedFoods: formData.dislikedFoods
        .split(',')
        .map((f) => f.trim())
        .filter((f) => f.length > 0),
      activityLevel: 'Moderado',
      dietType: dietSelect
    };

    // Aquí puedes hacer la petición PATCH a tu API
    await patch('/user/profile', payload)
      .then(() => {
        return get('/user/me'); // vuelve a pedir los datos actualizados
      })
      .then((updatedData) => {
        setUserData(updatedData); // actualiza el estado global
        setIsGenerate(false); // cierra el modal
      })
      .catch((error) => {
        console.error('Error updating plan:', error);
      });
  };

  return (
    <div
      className={`fixed bottom-0 top-0 right-0 left-0 z-50 flex ${
        isMobile
          ? 'bg-white w-full '
          : ' items-center justify-center w-full h-[100vh] backdrop-blur-sm bg-black/30'
      } `}
    >
      <div
        className={`${
          isMobile
            ? 'flex flex-col items-center max-w-2xl p-10 mx-auto '
            : 'shadow-2xl pb-15 max-w-4xl px-10 pt-10 bg-white  rounded-2xl'
        }`}
      >
        <div
          className={`flex ${
            step ? 'justify-between ' : 'justify-end'
          } w-full mb-5`}
        >
          {step && (
            <p
              onClick={() => setStep?.(1)}
              className="text-xl cursor-pointer text-neutral-300 hover:text-black"
            >
              ←
            </p>
          )}
          {isMobile ? (
            <div
              className="flex items-center justify-center w-10 h-10 text-xl font-bold text-white rounded-full cursor-pointer bg-black/10 hover:bg-red-400"
              onClick={() => {
                setIsGenerate(false);
              }}
            >
              Ｘ
            </div>
          ) : (
            <p
              onClick={() => setIsGenerate(false)}
              className="text-xl cursor-pointer text-neutral-300 hover:text-black"
            >
              🅇
            </p>
          )}
        </div>
        <div className="flex flex-col items-center justify-center mb-10 text-center">
          <p
            className={`${
              isMobile ? ' text-3xl font-black mt-5' : 'mb-1 text-4xl'
            }`}
          >
            Completa tu perfil
          </p>
          {!isMobile && (
            <p className="text-lg text-neutral-400">
              Start crating your contract by selecting the most relevant type
            </p>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-5">
          <div
            className={`flex  ${isMobile ? 'w-full flex-col' : 'w-3/4 '} gap-5`}
          >
            <InputText
              label="Weight"
              type="number"
              value={formData.weight}
              onChange={(e) => handleChange('weight', e.target.value)}
              placeholder="70 kg"
              name="Weight"
              required={true}
              classNameInput={`p-2 ${
                isMobile ? 'w-full' : 'w-1/3'
              } border border-neutral-200 rounded-lg focus:outline  focus:outline-green-600/60`}
              classNameLabel=" text-sm font-semibold "
            />
            {/* height */}
            <InputText
              label="Height"
              type="number"
              value={formData.height}
              onChange={(e) => handleChange('height', e.target.value)}
              placeholder="180 cm"
              name="Height"
              required={true}
              classNameInput={`p-2 ${
                isMobile ? 'w-full' : 'w-1/3'
              } border border-neutral-200 rounded-lg focus:outline  focus:outline-green-600/60`}
              classNameLabel=" text-sm font-semibold"
            />
            <InputSelect
              label="Goal"
              name="Goal"
              value={formData.goal}
              className={isMobile ? 'w-full' : 'w-1/3'}
              classNameInput={`p-2 ${
                isMobile ? 'w-full' : 'w-1/3'
              } border border-neutral-200 rounded-lg focus:outline  focus:outline-green-600/60`}
              classNameLabel=" text-sm font-semibold"
              onChange={(e) => handleChange('goal', e.target.value)}
              options={[
                { label: 'Bajar peso', value: 'Bajar peso' },
                { label: 'Mantener tu masa', value: 'Mantener tu masa' },
                { label: 'Ganar músculo', value: 'Ganar músculo' }
              ]}
            />
          </div>
          <div
            className={`flex ${
              isMobile ? 'flex-col w-full gap-3' : 'w-3/4 gap-5'
            }  `}
          >
            <InputText
              label="Liked Foods"
              type="text"
              value={formData.likedFoods}
              onChange={(e) => handleChange('likedFoods', e.target.value)}
              placeholder="Chicken, Rice, Broccoli"
              name="likedFoods"
              required={true}
              className={isMobile ? 'w-full' : 'w-1/2'}
              classNameInput={`p-2 ${
                isMobile ? 'w-full' : 'w-1/3'
              } border border-neutral-200 rounded-lg focus:outline  focus:outline-green-600/60`}
              classNameLabel="text-sm font-semibold "
            />
            {isMobile && <div></div>}

            <InputText
              label="Disliked Foods"
              type="text"
              value={formData.dislikedFoods}
              onChange={(e) => handleChange('dislikedFoods', e.target.value)}
              placeholder="Almonds, Eggs"
              name="dislikedFoods"
              required={true}
              className={isMobile ? 'w-full' : 'w-1/2'}
              classNameInput={`p-2 ${
                isMobile ? 'w-full' : 'w-1/3'
              } border border-neutral-200 rounded-lg focus:outline  focus:outline-green-600/60`}
              classNameLabel="text-sm font-semibold"
            />
          </div>
          <div
            className={` ${
              isMobile ? 'w-full justify-center' : 'w-3/4 justify-end'
            } flex items-center   gap-2 mt-5`}
          >
            {!weekMeals ? (
              <InputBottom
                name="Crear"
                onClick={async () => {
                  await handleSubmit();
                  createPlan();
                }}
                className="px-5 py-2 text-sm font-semibold transition-all duration-300 border text-green-600 bg-[#D0EACD]   border-green-600 rounded-xl"
              />
            ) : (
              <InputBottom
                name="Guardar"
                onClick={() => {
                  handleSubmit();
                  setIsGenerate(false);
                }}
                className="px-5 py-2 text-sm font-semibold transition-all duration-300 border border-neutral-300 hover:text-orange-300 hover:bg-orange-100 bg-neutral-50 text-neutral-400 hover:border-orange-300 rounded-xl"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
