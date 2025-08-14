import { post } from '../../api/http';
import { useEffect } from 'react';
import { useLocalBg } from '../template/DashboardMobile';

interface ChoosePlanProps {
  setIsPayment: (value: boolean) => void;
}

export const ChoosePlan = ({ setIsPayment }: ChoosePlanProps) => {
  const { pushWhite, popWhite } = useLocalBg();
  const handleSubscription = async (endpoint: string) => {
    try {
      const { url } = await post(endpoint); // 👈 tu post ya devuelve data
      window.location.replace(url);
    } catch (err) {
      console.error('Checkout error:', err);
      // opcional: mostrar toast
    } finally {
      setTimeout(() => {
        setIsPayment(false);
      }, 2000); // espera un segundo antes de cerrar
    }
  };

  useEffect(() => {
    pushWhite();
    return () => popWhite();
  }, [pushWhite, popWhite]);

  return (
    <div
      className={` flex flex-col  min-h-[100dvh]  max-w-2xl p-10  bg-white `}
    >
      <div className={`flex flex-col   h-full   max-w-[400px] `}>
        <div className="w-full ">
          <h1 className="text-5xl font-black text-center mb-15">
            Suscribete a{' '}
            <span
              className="
     relative inline-block isolate
    before:content-[''] before:absolute
    before:-inset-x-[6px] before:-bottom-[0.01em]
    before:h-[1em] before:bg-blue-200
    before:z-0
  "
            >
              <span className="relative z-10">Plan4Me</span>
            </span>{' '}
          </h1>
        </div>
        <div className="flex flex-col items-center justify-center gap-5 ">
          <div
            onClick={() => handleSubscription('/api/payments/checkout-trial')}
            className="items-center p-3 bg-white border cursor-pointer border-neutral-200 rounded-xl hover:bg-neutral-100"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center justify-center w-4 h-4 bg-white rounded-full border-neutral-200">
                <div className="w-3 h-3 bg-red-300 rounded-full"></div>
              </div>
              <p className="text-sm font-bold">Prueba Gratis</p>
              <p className="text-xs text-neutral-500">7 dias gratuitos</p>
            </div>
            <p className="text-xs text-neutral-500">
              Acceso a todas las funciones de Plan4Me durante el periodo de
              prueba, con planes de alimentación personalizados y herramientas
              fáciles de usar para gestionar tu dieta y progreso.
            </p>
          </div>
          <div
            onClick={() => handleSubscription('/api/payments/checkout-premium')}
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
              Acceso ilimitado a todas las funciones de Plan4Me, con planes de
              alimentación personalizados, seguimiento avanzado de progreso,
              recomendaciones exclusivas y soporte prioritario para alcanzar tus
              metas más rápido.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
