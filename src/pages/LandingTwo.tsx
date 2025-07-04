import { Header } from '../components/Header';
import banner from '../assets/Banner.png';
import { Plans } from '../components/Plans';
import { Footer } from '../components/Footer';
import { InputBottom } from '../components/TypeInputs';

export const Landing = () => {
  return (
    <div className="flex flex-col max-w-4xl mx-auto">
      <Header isAdmin={false} />
      <div className="flex flex-col max-w-3xl mx-auto ">
        <div className="flex flex-col items-center justify-center w-full h-screen ">
          <h1 className="mb-5 text-6xl font-bold text-center">
            Welcome to <span className="text-orange-300">Broccoli</span>
          </h1>
          <div
            className="w-full h-[500px] flex items-center justify-center "
            style={{
              backgroundImage: `url(${banner})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="p-5">
              <p className="px-4 py-2 font-semibold text-white bg-orange-300 rounded-full shadow-xl cursor-pointer hover:bg-orange-400">
                Empieza tu plan ahora
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center h-screen gap-5 ">
          <h1 className="text-4xl font-semibold">¿Que hace Plan4Me?</h1>
          <p className="text-sm text-neutral-500">
            <span className="font-semibold text-neutral-800">
              Broccoli genera planes alimenticios totalmente personalizados,
              diseñados para adaptarse a tus objetivos, necesidades y estilo de
              vida.
            </span>
            <br />
            Ya sea que estés buscando bajar de peso, mantener tu estado actual o
            ganar masa muscular, nuestra plataforma utiliza la información que
            nos proporcionas —como tu edad, sexo, nivel de actividad física y
            preferencias alimenticias— para crear un plan nutricional
            estructurado por semanas.
          </p>
          <h1 className="text-2xl font-semibold">Beneficios</h1>
          <div className="flex flex-wrap gap-5 p-5">
            <div className="w-[48%] p-5 bg-[#56cbf952] rounded-2xl">
              <p className="pb-3 font-semibold">
                📊 Planes por objetivo (bajar, mantener, subir)
              </p>
              <p className="text-sm font-medium text-blue-400">
                Define si deseas perder peso, mantener tu estado actual o
                aumentar masa. Broccoli ajusta tus porciones, calorías y tipos
                de alimentos según tu meta personal.
              </p>
            </div>
            <div className="w-[48%] p-5 bg-[#f9565652] rounded-2xl">
              <p className="pb-3 font-semibold">
                🚫 Elimina alimentos que no te gustan
              </p>

              <p className="text-sm font-medium text-red-400">
                Si no te agrada un ingrediente (como cebolla, pescado, huevo,
                etc.), simplemente indícalo. El sistema evita incluirlos en tus
                menús semanales.
              </p>
            </div>
            <div className="w-[48%] p-5 bg-[#61f95652] rounded-2xl">
              <p className="pb-3 font-semibold">
                🔄 Cambia comidas con un clic
              </p>
              <p className="text-sm font-medium text-green-500">
                ¿No quieres repetir comida o prefieres otra opción hoy? Toca el
                botón de cambio y Broccoli te sugiere otra receta que se adapta
                a tu plan.
              </p>
            </div>
            <div className="w-[48%] p-5 bg-[#f9f35652] rounded-2xl">
              <p className="pb-3 font-semibold">
                📱 Diseño pensado para celulares
              </p>
              <p className="text-sm font-medium text-yellow-500">
                Toda la interfaz está optimizada para móviles. Puedes acceder
                fácilmente desde tu teléfono para revisar tu plan diario o
                modificarlo en cualquier momento.
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center w-full p-5 mb-15">
            <InputBottom
              name="Comienza ahora"
              className="w-48 p-3 text-orange-400 bg-orange-100"
            />
          </div>
        </div>
        <Plans />
      </div>
      <Footer />
    </div>
  );
};
