import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const phrases = [
  'Cargando productos...',
  'Analizando tus preferencias...',
  'Preparando tu dieta ideal...',
  'Organizando tus alimentos favoritos...',
  'Optimizando tu semana saludable...',
  'Casi listo...',
  'Asando el salmón virtual...',
  'Contando aguacates...',
  'Buscando la espinaca perfecta...',
  'Cazando proteínas salvajes...',
  'Eliminando carbohidratos tóxicos...',
  'Calculando el índice de antojo...',
  'Poniendo a hervir el brócoli...',
  'Consultando con el chef interno...',
  'Sacando el hummus del refri...',
  'Empacando tus snacks...',
  'Verificando la frescura del pepino...',
  'Evaluando compatibilidad con nueces...',
  'Balanceando macros como un ninja...',
  'Agitando el shaker imaginario...',
  'Limpiando la cocina virtual...',
  'Colocando los cubiertos...',
  'Peleando contra la comida chatarra...',
  'Dibujando la tabla nutricional...',
  'Cargando motivación saludable...',
  'Pidiendo permiso al nutricionista fantasma...',
  'Evitando tentaciones...',
  'Meditando sobre la comida...',
  'Despertando a los macros...',
  'Verificando que el pollo no esté crudo...',
  'Convenciendo a la col rizada...',
  'Fusionando energía y sabor...',
  'Escapando del azúcar...',
  'Contando calorías como Matrix...',
  'Desfragmentando el hummus...',
  'Compilando semillas de chía...',
  'Desarrollando fuerza vegetal...',
  'Activando modo saludable...',
  'Cocinando datos...',
  'Sumando pasos...',
  'Aplicando IA a tus gustos raros...',
  'Importando recetas ancestrales...',
  'Comparando con dieta alienígena...',
  'Multiplicando aguacates...',
  'Teleportando proteínas...',
  'Convirtiendo agua en smoothie...',
  'Masticando código fuente...',
  'Recargando nutrientes...',
  'Poniendo en marcha el metabolismo virtual...',
  'Simulando digestión...',
  'Leyendo etiquetas imaginarias...',
  'Cargando playlist de cocina...',
  'Desayunando bits...'
];

export const Loading = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, 2500); // ⏱ más lento que el transition
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 z-100 flex items-center justify-center w-full h-[100svh] backdrop-blur bg-white">
      <div className="max-w-4xl text-center rounded-2xl">
        <AnimatePresence mode="wait">
          <motion.p
            key={phrases[index]} // ✅ clave única
            className="text-xl font-semibold text-black"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.8 }}
          >
            {phrases[index]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
};
