import { InputBottom, InputText, InputSelect } from '../components/TypeInputs';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { post } from '../api/http';

export const Register = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    lastName: '',
    gender: '',
    phone: '',
    birthday: ''
  });
  const [isTerms, setIsTerms] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    const data = {
      firstName: formData.name,
      lastName: formData.lastName,
      email: formData.email,
      gender: formData.gender,
      phoneNumber: formData.phone,
      password: formData.password,
      birthDate: formData.birthday
    };

    post('/auth/register', data)
      .then((res) => {
        console.log('User data fetched:', res);

        setStep(3);
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      })
      .catch((error) => console.error('Error fetching user data:', error));
  };

  return (
    <div className="flex items-center justify-center w-screen min-h-screen p-10">
      {step === 1 && (
        <div className="flex items-center ">
          <div className="flex flex-col items-center justify-center max-w-[400px] ">
            <div className="w-full ">
              <h1 className="text-5xl font-black text-center mb-15">
                Register to{' '}
                <span className="relative inline-block before:absolute before:-inset-x-2 before:-bottom-[0.01em] before:h-[1em] before:bg-red-200 before:-z-10">
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

            <div className="flex items-center justify-between w-full">
              <InputSelect
                label="Gender"
                name="gender"
                value={formData.gender}
                className="w-1/2 mb-5"
                onChange={handleChange}
                options={[
                  { label: 'Hombre', value: 'hombre' },
                  { label: 'Mujer', value: 'mujer' }
                ]}
              />
              <InputText
                value={formData.birthday}
                onChange={handleChange}
                placeholder="Eje. Culican "
                label="Birthday"
                type="Date"
                name="birthday"
                required={true}
                className="w-1/2 mb-5"
              />
            </div>

            <InputText
              value={formData.phone}
              onChange={handleChange}
              placeholder="Eje. 6674507062"
              label="Phone"
              type="number"
              name="phone"
              required={true}
              className="w-full mb-10"
            />

            <div className="flex justify-end w-full px-1">
              <InputBottom
                name="Next Step"
                onClick={() => setStep(2)}
                className="px-10 py-2 text-black bg-red-200 border rounded-2xl "
              />
            </div>

            <p className="mt-10 font-light text-normal">
              Already have an account?{' '}
              <Link to={'/login'} className="text-blue-400 underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      )}
      {step === 2 && (
        <form onSubmit={handleSubmit} className="flex items-center ">
          <div className="flex flex-col items-center justify-center max-w-[400px]   ">
            <div className="w-full">
              <h1 className="text-5xl font-black text-center mb-15">
                Register to{' '}
                <span className="relative inline-block before:absolute before:-inset-x-2 before:-bottom-[0.01em] before:h-[1em] before:bg-red-200 before:-z-10">
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
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Enter your password"
                label="Confirm password"
                type="password"
                name="confirmPassword"
                required={true}
                className="w-full mb-10"
              />
            </div>
            <div className="flex gap-3 p-1 mb-10">
              <div onClick={() => setIsTerms(!isTerms)}>
                <div
                  className={`flex items-center w-6 h-6 text-center text-xl cursor-pointer ${
                    !isTerms && 'border-neutral-200 border'
                  }`}
                >
                  {isTerms && '✅'}
                </div>
              </div>

              <p className="font-light text-normal">
                I agree with Plan4Me's{' '}
                <span className="text-blue-400 underline">
                  Terms of Service
                </span>
                ,{' '}
                <span className="text-blue-400 underline">Privacy Policy</span>,
                and{' '}
                <span className="text-blue-400 underline">
                  default Notification Settings
                </span>
              </p>
            </div>

            <div className="flex justify-end w-full gap-2 px-1">
              <div className="">
                <p
                  className="flex items-center justify-center w-10 h-10 text-xl font-bold border rounded-full cursor-pointer bg-black/5 hover:bg-black/15"
                  onClick={() => {
                    return step <= 1 ? setStep(1) : setStep(step - 1);
                  }}
                >
                  {step === 2 && '←'}
                </p>
              </div>
              <InputBottom
                type="submit"
                name="Register"
                className="px-10 py-2 text-black bg-red-200 border rounded-2xl"
              />
            </div>
          </div>
        </form>
      )}
      {step === 3 && (
        <div className="h-full ">
          <div className="flex flex-col items-center justify-center w-[400px] h-full">
            <div className="w-full ">
              <h1 className="text-5xl font-black text-center mb-25">
                Register to{' '}
                <span className="relative inline-block before:absolute before:-inset-x-2 before:-bottom-[0.01em] before:h-[1em] before:bg-red-200 before:-z-10">
                  Plan4Me
                </span>
              </h1>
            </div>
            <div className="flex flex-col items-center justify-center gap-10 text-center">
              <p className="flex items-center justify-center w-10 h-10 text-2xl font-black text-white bg-red-300 rounded-full">
                ✓
              </p>
              <p className="text-2xl font-light">
                ¡Bienvenido! Tu cuenta se ha creado correctamente. Seras
                redirigido automaticamente...
              </p>
            </div>

            <p className="font-light mt-25 text-normal">
              Ir directo a{' '}
              <Link to={'/login'} className="text-blue-400 underline">
                Iniciar sesion
              </Link>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
