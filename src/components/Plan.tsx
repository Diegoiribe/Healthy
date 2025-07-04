export const Plan = () => {
  return (
    <div className="flex flex-col max-w-3xl gap-10 mx-auto py-15">
      <div>
        <p className="mb-5 text-5xl font-semibold text-orange-300">
          Your Plan4Me
        </p>
        <p className="text-3xl font-semibold">Plan4Me+</p>
        <p className="mt-1 text-sm font-light text-neutral-400">$8.99/month</p>
      </div>

      <div>
        <p className="mb-8 text-xl font-semibold text-neutral-400">Includes</p>
        <p className="mb-4 text-neutral-400">Premium</p>
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 bg-orange-300 rounded-full"></div>
            <p className="text-lg font-light ">
              Inteligencia Artificial Personalizada
            </p>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 bg-orange-300 rounded-full"></div>
            <p className="text-lg font-light ">
              Visualización Avanzada del Progreso
            </p>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 bg-orange-300 rounded-full"></div>
            <p className="text-lg font-light ">
              Integración con Calendarios y Apps Externas
            </p>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 bg-orange-300 rounded-full"></div>
            <p className="text-lg font-light ">
              Rutas y Objetivos Personalizados
            </p>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 bg-orange-300 rounded-full"></div>
            <p className="text-lg font-light ">
              Modo “Enfócate” con Técnicas de Productividad
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
