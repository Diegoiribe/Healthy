export const Information = () => {
  return (
    <div className="flex flex-col max-w-3xl gap-10 mx-auto py-15">
      <div>
        <p className="text-5xl font-semibold">Diego Iribe</p>
        <p className="mt-1 text-sm font-light text-neutral-400">
          iribecarrazcodiego@gmail.com
        </p>
      </div>
      <div
        className="w-full h-52"
        style={{
          borderRadius: '20px',
          background: 'linear-gradient(135deg, #fff0e0, #feb15f, #ffe5cc)',

          color: 'white',
          fontFamily: 'sans-serif',
          padding: '24px',
          position: 'relative'
        }}
      >
        <h2 style={{ margin: '0 0 20px 0' }} className="text-5xl font-semibold">
          Plan4Meᐩ
        </h2>
        <div style={{ lineHeight: '1.8' }}>
          <div>
            <p
              className="cursor-pointer"
              style={{ color: 'white', textDecoration: 'none' }}
            >
              Plan →
            </p>
          </div>
          <div>
            <p
              className="cursor-pointer"
              style={{ color: 'white', textDecoration: 'none' }}
            >
              Information →
            </p>
          </div>
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: '20px',
            right: '20px',
            background: 'rgba(255,255,255,0.2)',
            padding: '5px 10px',
            borderRadius: '10px',

            fontSize: '18px'
          }}
          className="font-medium"
        >
          5 de Mayo de 2024
        </div>
      </div>
      <p className="text-3xl font-semibold">Information</p>
      <div className="">
        <div className="flex flex-wrap justify-between mb-2">
          <div>
            <p className="text-xl font-medium">Pais</p>
            <p className="ml-1 text-lg font-light text-neutral-400">Mexico</p>
          </div>
          <div>
            <p className="text-xl font-medium">Ciudad</p>
            <p className="ml-1 text-lg font-light text-neutral-400 ">
              Culiacan
            </p>
          </div>
          <div>
            <p className="text-xl font-medium">Peso</p>
            <p className="ml-1 text-lg font-light text-neutral-400">86 kg</p>
          </div>
          <div>
            <p className="text-xl font-medium">Altura</p>
            <p className="ml-1 text-lg font-light text-neutral-400 ">180 cm</p>
          </div>
          <div>
            <p className="text-xl font-medium">Sexo</p>
            <p className="ml-1 text-lg font-light text-neutral-400">
              Masculino
            </p>
          </div>
          <div>
            <p className="text-xl font-medium">Edad</p>
            <p className="ml-1 text-lg font-light text-neutral-400">22 años</p>
          </div>
        </div>
        <p className="text-lg font-medium text-orange-300 cursor-pointer ">
          Editar →
        </p>
      </div>
      <div>
        <p className="text-xl font-medium">Tipo de persona</p>
        <p className="text-lg font-light text-neutral-400">Sedentario</p>
        <p className="text-lg font-medium text-orange-300 cursor-pointer ">
          Editar →
        </p>
      </div>
      <div>
        <p className="text-xl font-medium">Objetivo</p>
        <p className="text-lg font-light text-neutral-400">Bajar de peso</p>
        <p className="text-lg font-medium text-orange-300 cursor-pointer ">
          Editar Objetivo →
        </p>
      </div>
      <div>
        <p className="text-xl font-medium">Alimentos no deseados</p>
        <p className="text-lg font-light text-neutral-400">
          Aguacate, Camarones, Pescado, Atún, Cereal, Pan, Pizza, Pastas, Queso.
        </p>
        <p className="text-lg font-medium text-orange-300 cursor-pointer ">
          Editar Alimentos →
        </p>
      </div>
      <div>
        <p className="text-xl font-medium">Alimentos favoritos</p>
        <p className="text-lg font-light text-neutral-400">
          Salmon, Pollo, Carne, Frutas, Verduras, Legumbres, Frutos secos,
          Cereales integrales.
        </p>
        <p className="text-lg font-medium text-orange-300 cursor-pointer ">
          Editar Alimentos →
        </p>
      </div>
    </div>
  );
};
