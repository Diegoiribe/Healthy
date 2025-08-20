import { InputBottom, InputText, InputSelect } from '../components/TypeInputs';
import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { post } from '../api/http';

export const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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
  const [searchParams] = useSearchParams();
  const ref = searchParams.get('ref'); // devuelve el valor de ?ref=...
  console.log('Referrer code:', ref);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (!isTerms) {
      setIsLoading(false);
      alert('Debes aceptar los Términos y la Política de Privacidad');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setIsLoading(false);
      alert('Las contraseñas no coinciden');

      return;
    }

    const data = {
      firstName: formData.name.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim(),
      gender: formData.gender,
      phoneNumber: formData.phone.trim(),
      password: formData.password,
      birthDate: formData.birthday, // ISO (yyyy-mm-dd) con type="date"
      referralCode: ref ?? ''
    };

    try {
      await post('/auth/register', data);

      // auto-login (si tu backend no devuelve token en register)
      const loginRes = await post('/auth/login', {
        email: formData.email,
        password: formData.password
      });
      localStorage.setItem('token', loginRes.token);
      setIsLoading(false);
      setStep(3);
    } catch (error) {
      setIsLoading(false);
      console.error('Error registering/logging in:', error);
    }
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

  // Función para validar campos del paso 1
  const validateStep = () => {
    // Lista de campos requeridos
    const requiredFields = [
      { name: 'name', label: 'Nombre' },
      { name: 'lastName', label: 'Apellido' },
      { name: 'gender', label: 'Género' },
      { name: 'birthday', label: 'Nacimiento' },
      { name: 'phone', label: 'Teléfono' }
    ];

    for (const field of requiredFields) {
      if (!formData[field.name as keyof typeof formData]?.trim()) {
        alert(`Por favor, completa el campo: ${field.label}`);
        return false; // Detiene validación si hay un campo vacío
      }
    }

    // Si todo está bien
    return true;
  };

  return (
    <div className="flex items-center justify-center w-screen min-h-screen p-10">
      {step === 1 && (
        <div className="flex items-center ">
          <div className="flex flex-col items-center justify-center max-w-[400px] ">
            <div className="w-full ">
              <h1 className="text-5xl font-black text-center mb-15">
                Registrate en{' '}
                <Link
                  to={'/'}
                  className="
    relative inline-block isolate
    before:content-[''] before:absolute
    before:-inset-x-2 before:-bottom-[0.01em]
    before:h-[1em] before:bg-orange-100
    before:z-0
  "
                >
                  <span className="relative z-10 text-yellow-800">Plan4Me</span>
                </Link>
              </h1>
            </div>
            <div className="flex items-center justify-between">
              <InputText
                value={formData.name}
                onChange={handleChange}
                placeholder="Eje. Steve "
                label="Nombre"
                type="text"
                name="name"
                required={true}
                className="w-1/2 mb-5"
              />
              <InputText
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Eje. Smith "
                label="Apellido"
                type="text"
                name="lastName"
                required={true}
                className="w-1/2 mb-5"
              />
            </div>

            <div className="flex items-center justify-between w-full">
              <InputSelect
                label="Genero"
                name="gender"
                value={formData.gender}
                className="w-1/2 mb-5"
                onChange={handleChange}
                options={[
                  { label: 'Hombre', value: 'hombre' },
                  { label: 'Mujer', value: 'mujer' }
                ]}
              />
              <div
                className={`flex flex-col mb-5 w-1/2  gap-1 p-1 overflow-hidden`}
              >
                <label className="text-lg font-semibold">Nacimiento</label>
                <div className="p-4 bg-white border-2 border-neutral-100 rounded-2xl">
                  <input
                    defaultValue="2003-04-12"
                    value={formData.birthday}
                    onChange={handleChange}
                    placeholder="Eje. 12-04-2003 "
                    type="date"
                    name="birthday"
                    required={true}
                    className="w-full "
                  />
                </div>
              </div>
            </div>

            <InputText
              value={formData.phone}
              onChange={handleChange}
              placeholder="Eje. 6674507062"
              label="Telefono"
              type="tel"
              name="phone"
              required={true}
              className="w-full mb-10"
            />

            <div className="flex justify-end w-full px-1">
              <InputBottom
                name="Siguiente paso"
                onClick={() => {
                  if (validateStep()) {
                    setStep(2);
                  }
                }}
                className="px-10 py-2 text-yellow-800 bg-orange-100 border rounded-2xl "
              />
            </div>

            <p className="mt-10 font-light text-normal">
              Ya tienes una cuenta?{' '}
              <Link to={'/login'} className="text-blue-400 underline">
                Inicia sesion
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
                Registrate en{' '}
                <span
                  className="
    relative inline-block isolate
    before:content-[''] before:absolute
    before:-inset-x-2 before:-bottom-[0.01em]
    before:h-[1em] before:bg-orange-100
    before:z-0
  "
                >
                  <span className="relative z-10 text-yellow-800">Plan4Me</span>
                </span>
              </h1>
              <InputText
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                label="Correo electronico"
                type="email"
                name="email"
                required={true}
                className="w-full mb-5"
              />

              <div className={`flex flex-col  gap-1 p-1 overflow-hidden`}>
                <label className="text-lg font-semibold ">Contraseña</label>
                <div className="flex w-full p-4 mb-2 bg-white border-2 border-neutral-100 rounded-2xl focus:outline-2 outline-orange-300/5">
                  <input
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    required={true}
                    className="w-full focus:outline-none"
                  />
                  <span
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                    className="cursor-pointer"
                    title="Mostrar contraseña"
                  >
                    👁️
                  </span>
                </div>
              </div>

              {/* Password requirements */}
              {(() => {
                const password = formData.password;
                const hasUppercase = /[A-Z]/.test(password);
                const hasNumber = /[0-9]/.test(password);
                const hasSymbol = /[^A-Za-z0-9]/.test(password);
                return (
                  <div className="px-1 mb-2">
                    {!hasUppercase && (
                      <div className="flex items-center gap-2 ">
                        <p className="mb-[3px] text-xl text-red-300">▸</p>
                        <p className="text-xs text-neutral-500">
                          Falta una mayúscula
                        </p>
                      </div>
                    )}
                    {!hasNumber && (
                      <div className="flex items-center gap-2 ">
                        <p className="text-xl mb-[3px] text-red-300">▸</p>
                        <p className="text-xs text-neutral-500">
                          Falta un número
                        </p>
                      </div>
                    )}
                    {!hasSymbol && (
                      <div className="flex items-center gap-2 ">
                        <p className="text-xl mb-[3px] text-red-300">▸</p>
                        <p className="text-xs text-neutral-500">
                          Falta un símbolo
                        </p>
                      </div>
                    )}
                  </div>
                );
              })()}

              <div className={`flex flex-col mt-3  gap-1 p-1 overflow-hidden`}>
                <label className="text-lg font-semibold ">
                  Confirmar contraseña
                </label>
                <div className="flex w-full p-4 bg-white border-2 border-neutral-100 rounded-2xl focus:outline-2 outline-orange-300/5">
                  <input
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    required={true}
                    className="w-full focus:outline-none"
                  />
                  <span
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                    className="cursor-pointer"
                    title="Mostrar contraseña"
                  >
                    👁️
                  </span>
                </div>
              </div>
              {/* Password mismatch notice */}
              {(() => {
                const p = formData.password ?? '';
                const c = formData.confirmPassword ?? '';
                const showMismatch = c.length > 0 && p !== c;

                return (
                  <div
                    className="px-1 mt-2 mb-5"
                    aria-live="polite"
                    role="status"
                  >
                    {showMismatch && (
                      <div className="flex items-center gap-2 ">
                        <p className="mb-[3px] text-xl text-red-300">▸</p>
                        <p className="text-xs text-neutral-500">
                          Las contraseñas no coinciden
                        </p>
                      </div>
                    )}
                  </div>
                );
              })()}
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
                Estoy de acuerdo con Plan4Me en{' '}
                <Link
                  to={'/terminos-y-servicios'}
                  className="text-blue-400 underline"
                >
                  Los Terminos de Servicios
                </Link>{' '}
                y{' '}
                <Link to={'/privacidad'} className="text-blue-400 underline">
                  Politica de Privacidad
                </Link>
              </p>
            </div>

            <div
              className={`flex ${
                isLoading ? 'justify-center' : 'justify-end'
              }  justify-end w-full gap-2 px-1`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="w-8 h-8 border-4 border-neutral-200 border-t-red-300 rounded-full animate-[spin_0.5s_linear_infinite]"></div>
                </div>
              ) : (
                <>
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
                    name="Registrarse"
                    className="px-10 py-2 text-yellow-800 bg-orange-100 border rounded-2xl"
                  />
                </>
              )}
            </div>
          </div>
        </form>
      )}

      {step === 3 && (
        <div className="h-full ">
          <div className="flex flex-col items-center justify-center max-w-[400px] px-10 h-full">
            <div className="w-full ">
              <h1 className="text-5xl font-black text-center mb-15">
                Suscribete a{' '}
                <span
                  className="
    relative inline-block isolate
    before:content-[''] before:absolute
    before:-inset-x-2 before:-bottom-[0.01em]
    before:h-[1em] before:bg-orange-100
    before:z-0
  "
                >
                  <span className="relative z-10 text-yellow-800">Plan4Me</span>
                </span>
              </h1>
            </div>
            <div className="flex flex-col items-center justify-center gap-5 ">
              <div
                onClick={() =>
                  handleSubscription('/api/payments/checkout-trial')
                }
                className="items-center p-3 bg-white border cursor-pointer border-neutral-200 rounded-xl hover:bg-neutral-100"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center justify-center w-4 h-4 bg-white rounded-full border-neutral-200">
                    <div className="w-3 h-3 bg-red-300 rounded-full"></div>
                  </div>
                  <p className="text-sm font-bold">Prueba Gratis</p>
                  <p className="text-xs text-neutral-500">Primer mes</p>
                </div>
                <p className="text-xs text-neutral-500">
                  Acceso a todas las funciones de Plan4Me durante el periodo de
                  prueba, con planes de alimentación personalizados y
                  herramientas fáciles de usar para gestionar tu dieta y
                  progreso.
                </p>
              </div>
              <div
                onClick={() =>
                  handleSubscription('/api/payments/checkout-premium')
                }
                className="items-center p-3 bg-white border cursor-pointer border-neutral-200 rounded-xl hover:bg-neutral-100"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center justify-center w-4 h-4 bg-white rounded-full border-neutral-200">
                    <div className="w-3 h-3 bg-red-300 rounded-full"></div>
                  </div>
                  <p className="text-sm font-bold">Premium</p>
                  <p className="text-xs text-neutral-500">$149/mes</p>
                </div>
                <p className="text-xs text-neutral-500">
                  Acceso ilimitado a todas las funciones de Plan4Me, con planes
                  de alimentación personalizados, seguimiento avanzado de
                  progreso, recomendaciones exclusivas y soporte prioritario
                  para alcanzar tus metas más rápido.
                </p>
              </div>
            </div>
            <p
              className="font-light text-blue-400 underline cursor-pointer mt-15 text-normal"
              onClick={() => {
                setStep(4);
                setTimeout(() => {
                  navigate('/login');
                }, 2000);
              }}
            >
              Hacerlo mas <span className="">tarde →</span>
            </p>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="h-full ">
          <div className="flex flex-col items-center justify-center w-[400px] h-full">
            <div className="w-full ">
              <h1 className="text-5xl font-black text-center mb-25">
                Bienvenido a{' '}
                <span
                  className="
    relative inline-block isolate
    before:content-[''] before:absolute
    before:-inset-x-2 before:-bottom-[0.01em]
    before:h-[1em] before:bg-orange-100
    before:z-0
  "
                >
                  <span className="relative z-10 text-yellow-800">Plan4Me</span>
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
