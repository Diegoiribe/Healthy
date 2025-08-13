import { post } from '../api/http';

interface ChoosePlanProps {
  setIsPayment: (value: boolean) => void;
}

export const ChoosePlan = ({ setIsPayment }: ChoosePlanProps) => {
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

  return (
    <div className="fixed bottom-0 top-30 left-0 z-100 flex items-center justify-center w-full h-[100vh] bg-white ">
      <div className="flex flex-col items-center justify-center w-[400px] h-full -mt-50">
        <div className="w-full ">
          <h1 className="text-5xl font-black text-center mb-15">
            Suscribete a{' '}
            <span className="relative inline-block before:absolute before:-inset-x-2 before:-bottom-[0.01em] before:h-[1em] before:bg-red-200 before:-z-10">
              Plan4Me
            </span>
          </h1>
        </div>
        <div className="flex flex-col items-center justify-center gap-5">
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
