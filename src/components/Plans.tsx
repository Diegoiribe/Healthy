import { InputBottom } from './TypeInputs';

export const Plans = (props: { isMobile: boolean }) => {
  const { isMobile } = props;
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <p
        className={`mb-5  font-semibold text-center ${
          isMobile ? 'text-3xl' : 'text-6xl'
        }`}
      >
        Planes Simples, <span className="text-red-300">Probar</span> Gratis
      </p>
      <p
        className={`mb-20 text-2xl text-center text-neutral-600 ${
          isMobile ? 'text-lg' : 'text-2xl'
        }`}
      >
        Sin comisiones ocultas, sin juegos, sin sorpresas.
        <br />
        {isMobile ? '' : 'Cambiar tu vida '}
      </p>
      <div className={`${isMobile && 'mt-20'} w-full`}>
        <div className="flex w-full px-4 py-2">
          <div className="w-[30%] flex flex-col items-center"></div>
          <div className="w-[70%] flex flex-col items-center">
            <p
              className={`font-semibold text-center text-red-300 uppercase ${
                isMobile ? 'text-2xl' : 'text-4xl'
              }`}
            >
              Premium
            </p>
          </div>
        </div>
        <div className="flex items-center w-full px-4 py-2">
          <p className="w-[30%] text-sm text-neutral-500 font-semibold">
            Tarifa mensual
          </p>

          <p
            className={`w-[70%]  text-center  ${
              isMobile ? 'text-2xl' : 'text-4xl'
            }`}
          >
            <span className="mr-1 text-lg">$</span>149
          </p>
        </div>
        <div className="flex w-full px-4 py-2 rounded-lg bg-neutral-50">
          <p className={`w-[30%] ${isMobile ? 'text-xs' : ''}`}>
            No. de planes por mes
          </p>

          <p className="w-[70%] text-center font-semibold">20</p>
        </div>
        <div className="flex w-full px-4 py-4 ">
          <p className={`w-[30%] ${isMobile ? 'text-xs' : ''}`}>
            No. de comidas por dia
          </p>

          <p className="w-[70%] text-center font-semibold">5</p>
        </div>
        <div className="flex items-center w-full px-4 py-2 rounded-lg bg-neutral-100">
          <p className={`w-[30%] ${isMobile ? 'text-xs' : ''}`}>
            No. de dietas
          </p>

          <p className="w-[70%] text-center font-semibold">12</p>
        </div>
        <div className="flex w-full px-4 pt-4 pb-4 border-b border-neutral-300">
          <p className={`w-[30%] ${isMobile ? 'text-xs' : ''}`}>
            Planes personalizados
          </p>

          <p className="w-[70%] text-center font-semibold">✅</p>
        </div>
        <div className="flex w-full py-5">
          <div className="w-[30%]"></div>

          <div className="flex items-center justify-center w-[70%]">
            <InputBottom
              name="Empezar Plan4Me"
              className={`px-4 py-2  text-white bg-black border ${
                isMobile ? 'hidden' : 'text-sm'
              }`}
              to="/Register"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
