import { InputBottom, InputText, InputSelect } from '../components/TypeInputs';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
  const navigate = useNavigate();
  const [type, setType] = useState('');
  const [objective, setObjective] = useState('');

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    country: '',
    city: '',
    lastName: '',
    nacionality: '',
    weight: '',
    height: '',
    sex: '',
    age: '',
    favoriteFoods: '',
    foodsToAvoid: '',
    type: type,
    objective: objective
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    console.log('Form submitted successfully!');
  };

  return (
    <div className="flex justify-center w-screen h-screen p-5">
      {step === 1 && (
        <div className="h-full pl-20 ">
          <div className="flex flex-col items-center justify-center w-[475px] h-full ">
            <div className="w-full">
              <h1 className="font-black text-center text-7xl mb-15">
                Register to{' '}
                <span className="relative inline-block before:absolute before:-inset-x-2 before:-bottom-[0.01em] before:h-[1em] before:bg-orange-200 before:-z-10">
                  Plan4Me
                </span>
              </h1>
            </div>
            <div className="flex items-center justify-between">
              <InputText
                value={formData.name}
                onChange={handleChange}
                placeholder="Eje. Steve "
                label="Name"
                type="text"
                name="name"
                required={true}
                className="w-1/2 mb-5"
              />
              <InputText
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Eje. Smith "
                label="Last Name"
                type="text"
                name="lastName"
                required={true}
                className="w-1/2 mb-5"
              />
            </div>

            <div className="flex items-center justify-between">
              <InputText
                value={formData.country}
                onChange={handleChange}
                placeholder="Eje. Mexico "
                label="Country"
                type="text"
                name="country"
                required={true}
                className="w-1/2 mb-5"
              />
              <InputText
                value={formData.city}
                onChange={handleChange}
                placeholder="Eje. Culican "
                label="City"
                type="text"
                name="city"
                required={true}
                className="w-1/2 mb-5"
              />
            </div>

            <InputText
              value={formData.nacionality}
              onChange={handleChange}
              placeholder="Eje. Mexicana"
              label="Nacionality"
              type="text"
              name="nacionality"
              required={true}
              className="w-full mb-5"
            />

            <div className="w-full px-1" onClick={() => setStep(2)}>
              <InputBottom
                name="Next Step"
                className="w-full p-4 text-lg text-black bg-orange-200 border"
              />
            </div>

            <p className="mt-5 font-light text-normal">
              Already have an account?{' '}
              <span className="text-blue-400 underline">Sign In</span>
            </p>
          </div>
        </div>
      )}
      {step === 2 && (
        <div className="h-full pl-20 ">
          <div className="flex flex-col items-center justify-center w-[475px] h-full ">
            <div className="w-full">
              <h1 className="font-black text-center text-7xl mb-15">
                Register to{' '}
                <span className="relative inline-block before:absolute before:-inset-x-2 before:-bottom-[0.01em] before:h-[1em] before:bg-orange-200 before:-z-10">
                  Plan4Me
                </span>
              </h1>
              <InputText
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                label="Email"
                type="email"
                name="email"
                required={true}
                className="w-full mb-5"
              />
              <InputText
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                label="Password"
                type="password"
                name="password"
                required={true}
                className="w-full mb-5"
              />
              <InputText
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                label="Confirm password"
                type="password"
                name="password"
                required={true}
                className="w-full mb-10"
              />
            </div>

            <div className="w-full px-1" onClick={() => setStep(3)}>
              <InputBottom
                name="Next Step"
                className="w-full p-4 text-lg text-black bg-orange-200 border"
              />
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-end h-full px-5 py-15">
        <p
          className="flex items-center justify-center w-10 h-10 text-2xl font-bold rounded-full cursor-pointer hover:bg-black/5"
          onClick={() => {
            return step <= 1 ? navigate('/login') : setStep(step - 1);
          }}
        >
          ←
        </p>
      </div>
    </div>
  );
};
