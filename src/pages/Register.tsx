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
              <h1 className="text-4xl font-bold mb-15">
                Sing in to <span className="text-orange-300">Plan4Me</span>
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
              className="w-full mb-10"
            />

            <div className="w-full px-1" onClick={() => setStep(2)}>
              <InputBottom
                name="Next Step"
                className="w-full p-4 text-lg text-orange-400 bg-orange-100"
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
              <h1 className="text-4xl font-bold mb-15">
                Sing in to <span className="text-orange-300">BeHealthy</span>
              </h1>
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
            <div className="flex items-center justify-between">
              <InputText
                value={formData.weight}
                onChange={handleChange}
                placeholder="Eje. 80 kg "
                label="Weight"
                type="number"
                name="weight"
                required={true}
                className="w-1/2 mb-5"
              />
              <InputText
                value={formData.height}
                onChange={handleChange}
                placeholder="Eje. 180 cm "
                label="Height"
                type="number"
                name="height"
                required={true}
                className="w-1/2 mb-5"
              />
            </div>
            <div className="flex items-center w-full">
              <InputText
                value={formData.sex}
                onChange={handleChange}
                placeholder="Eje. Masculine "
                label="Sex"
                type="text"
                name="sex"
                required={true}
                className="mb-10 w-6/8"
              />
              <InputText
                value={formData.age}
                onChange={handleChange}
                placeholder="Eje. 25 "
                label="Age"
                type="number"
                name="age"
                required={true}
                className="mb-10 w-2/8"
              />
            </div>

            <div className="w-full px-1" onClick={() => setStep(3)}>
              <InputBottom
                name="Next Step"
                className="w-full p-4 text-lg text-orange-400 bg-orange-100"
              />
            </div>
          </div>
        </div>
      )}
      {step === 3 && (
        <form onSubmit={handleSubmit} className="h-full pl-20 ">
          <div className="flex flex-col items-center justify-center w-[475px] h-full ">
            <div className="w-full">
              <h1 className="text-4xl font-bold mb-15">
                Sing in to <span className="text-orange-300">BeHealthy</span>
              </h1>
            </div>
            <div className="flex items-center justify-between w-full">
              <InputSelect
                label="Type of Person"
                name="diet"
                value={type}
                className="w-1/2 mb-5"
                onChange={(e) => setType(e.target.value)}
                options={[
                  { label: 'Vegetarian', value: 'vegetarian' },
                  { label: 'Keto', value: 'keto' },
                  { label: 'Mediterranean', value: 'mediterranean' }
                ]}
              />
              <InputSelect
                label="Objective"
                name="diet"
                value={objective}
                className="w-1/2 mb-5"
                onChange={(e) => setObjective(e.target.value)}
                options={[
                  { label: 'Vegetarian', value: 'vegetarian' },
                  { label: 'Keto', value: 'keto' },
                  { label: 'Mediterranean', value: 'mediterranean' }
                ]}
              />
            </div>

            <InputText
              value={formData.favoriteFoods}
              onChange={handleChange}
              placeholder="Eje. Tacos, Pizza, Sushi"
              label="Favorite Foods"
              type="text"
              name="favoriteFoods"
              required={true}
              className="w-full mb-5"
            />
            <InputText
              value={formData.foodsToAvoid}
              onChange={handleChange}
              placeholder="Eje. Fast food, Sweets, Alcohol"
              label="Foods to avoid"
              type="text"
              name="foodsToAvoid"
              required={true}
              className="w-full mb-10"
            />

            <button className="w-full px-1" type="submit">
              <InputBottom
                name="Register"
                className="w-full p-4 text-lg text-orange-400 bg-orange-100"
              />
            </button>
          </div>
        </form>
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
