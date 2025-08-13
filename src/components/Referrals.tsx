import { useEffect, useState } from 'react';
import { get } from '../api/http';
import type { UserDataProps } from '../pages/Dashboard';

type Referral = {
  email: string;
  firstName: string;
  lastName: string;
  plan: string;
  id: string;
};

interface ReferralProps {
  userData?: UserDataProps;
  setIsReferrals: (value: boolean) => void;
}

export const Referrals = ({ userData, setIsReferrals }: ReferralProps) => {
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [earnings, setEarnings] = useState<number>(0);

  useEffect(() => {
    get('/user/referrals')
      .then((res: Referral[]) => {
        setReferrals(res);
        const calc =
          res.filter((r) => r.plan?.toLowerCase() === 'premium').length * 50;
        setEarnings(calc); // guarda número
      })
      .catch(console.error);
  }, []);

  const formatter = new Intl.NumberFormat('es-MX', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  return (
    <div>
      <div className="flex flex-col max-w-4xl min-h-screen gap-5 p-10 mx-auto bg-white">
        <div className="flex items-center justify-between w-full">
          <div
            className="flex items-center justify-center text-2xl font-semibold text-black rounded-full cursor-pointer hover:text-red-300"
            onClick={() => setIsReferrals(false)}
          >
            ←
          </div>
          <div className="flex items-center gap-2">
            <p className="px-4 py-2 text-xs text-black rounded-full cursor-pointer bg-black/5 hover:bg-black hover:text-white">
              Agregar datos de facturacion
            </p>
            <p
              onClick={() => {
                navigator.clipboard.writeText(
                  `https://www.plan4me.com/register?ref=${userData?.refCode}`
                );
                alert('¡Copiado al portapapeles!');
              }}
              className="px-4 py-2 text-xs text-black rounded-full cursor-pointer bg-black/5 hover:bg-black hover:text-white"
            >
              {`plan4me.com/register?ref=${userData?.refCode}`}
            </p>
          </div>
        </div>
        <div className="w-full">
          <div className="inline-flex items-center justify-center w-full py-5 mb-4">
            <div className="w-full">
              <div className="w-full ">
                <p className="text-2xl font-light">Ganancias</p>
                <p className="text-xs text-neutral-400">Del mes aproximado</p>
              </div>
              <p className="w-full mt-4 text-6xl font-light">
                <span className="text-3xl font-light">$</span>
                {formatter.format(earnings)}
              </p>
            </div>
          </div>

          {/* Tabla de referidos */}
          <div className="w-full mt-10 border shadow-xl border-neutral-300 rounded-xl">
            <div className="flex justify-between w-full bg-neutral-100 rounded-t-xl">
              <div className="w-1/3 p-2 text-xs font-semibold border-r border-neutral-200 text-neutral-500">
                <p>Nombre</p>
              </div>
              <div className="w-1/3 p-2 text-xs font-semibold border-r border-neutral-200 text-neutral-500">
                <p>Correo</p>
              </div>

              <div className="w-1/3 p-2 text-xs font-semibold border-neutral-200 text-neutral-500">
                <p>Premium</p>
              </div>
            </div>

            {referrals.map((item, j) => (
              <div
                key={j}
                className={`flex w-full ${
                  j % 2 === 0 ? 'bg-white' : 'bg-neutral-100'
                } last:rounded-b-xl`}
              >
                <div className="w-1/3 p-2 text-xs truncate border-r text-neutral-700 border-neutral-200 last:rounded-bl-xl">
                  {item.firstName} {item.lastName}
                </div>
                <div className="w-1/3 p-2 text-xs truncate border-r text-neutral-700 border-neutral-200">
                  {item.email}
                </div>
                <div className="w-1/3 p-2 text-xs text-neutral-700 border-neutral-200 last:rounded-br-xl">
                  {item.plan === 'PREMIUM' ? 'Activo' : 'Inactivo'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
