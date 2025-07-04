import { InputBottom, InputText } from '../components/TypeInputs';
import { useState } from 'react';

export const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="flex items-center justify-center w-screen h-screen p-5">
      <div className="h-full ">
        <div className="flex flex-col items-center justify-center w-[475px] h-full ">
          <div className="w-full">
            <h1 className="text-4xl font-bold mb-15">
              Sing in to <span className="text-orange-300">BeHealthy</span>
            </h1>
          </div>

          <InputText
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            label="Email"
            type="email"
            name="email"
            required={true}
            className="w-full mb-10"
          />
          <InputText
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            label="Password"
            type="password"
            name="password"
            required={true}
            className="w-full mb-5"
          />
          <div className="flex gap-3 p-1 mb-10">
            <div>
              <div className="w-6 h-6 border border-neutral-200"></div>
            </div>

            <p className="font-light text-normal">
              I agree with Dribble's{' '}
              <span className="text-blue-400 underline">Terms of Service</span>,{' '}
              <span className="text-blue-400 underline">Privacy Policy</span>,
              and{' '}
              <span className="text-blue-400 underline">
                default Notification Settings
              </span>
            </p>
          </div>
          <div className="w-full px-1">
            <InputBottom
              name="Log In"
              className="w-full p-4 text-lg text-orange-400 bg-orange-100"
            />
          </div>

          <p className="mt-5 font-light text-normal">
            Already have an account?{' '}
            <span className="text-blue-400 underline">Sign In</span>
          </p>
        </div>
      </div>
    </div>
  );
};
