export const List = () => {
  return (
    <div className="flex flex-col max-w-3xl gap-10 mx-auto py-15">
      <p className="mb-5 text-5xl font-semibold text-orange-300">
        Lista de compras
      </p>

      <div>
        <div className="flex w-full">
          <p className="w-5/6 mb-4 text-neutral-400">Productos</p>
          <p className="w-1/6 mb-4 text-center text-neutral-400">Cantidad</p>
        </div>
        <div className="flex w-full">
          <div className="w-5/6">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-orange-300 rounded-full"></div>
              <p className="text-lg font-light truncate">
                Inteligencia Artificial Personalizada
              </p>
            </div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-orange-300 rounded-full"></div>
              <p className="text-lg font-light truncate">
                Visualización Avanzada del Progreso
              </p>
            </div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-orange-300 rounded-full"></div>
              <p className="text-lg font-light truncate">
                Integración con Calendarios y Apps Externas
              </p>
            </div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-orange-300 rounded-full"></div>
              <p className="text-lg font-light truncate">
                Rutas y Objetivos Personalizados
              </p>
            </div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-orange-300 rounded-full"></div>
              <p className="text-lg font-light truncate">
                Modo “Enfócate” con Técnicas de Productividad
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center w-1/6">
            <p className="mb-3 text-lg font-light truncate">250 Kg.</p>
            <p className="mb-3 text-lg font-light truncate">1 Kg. </p>
            <p className="mb-3 text-lg font-light truncate">5 Paquetes. </p>
            <p className="mb-3 text-lg font-light truncate">6 Cartones.</p>
            <p className="mb-3 text-lg font-light truncate">5 Lts.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
