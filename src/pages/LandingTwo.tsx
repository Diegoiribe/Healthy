import { HeaderTwo } from '../components/HeaderTwo';

import { Star } from 'lucide-react';
import { useEffect, useState } from 'react';

export const LandingTwo = () => {
  const avatars = [
    'https://media.istockphoto.com/id/1200677760/es/foto/retrato-de-apuesto-joven-sonriente-con-los-brazos-cruzados.jpg?s=612x612&w=0&k=20&c=RhKR8pxX3y_YVe5CjrRnTcNFEGDryD2FVOcUT_w3m4w=',
    'https://media.istockphoto.com/id/1463491559/es/foto/joven-hermosa-niña-sonriendo-y-bebiendo-café-para-llevar-en-la-ciudad-retrato-en-primer-plano.jpg?s=612x612&w=0&k=20&c=iDv2xOt8xluPr7m9ceO4YSBlvlFCVt3BkYd3Qg0RP9E=',
    'https://media.istockphoto.com/id/1317804584/es/foto/un-retrato-de-estudio-de-una-empresaria-mirando-a-la-cámara.jpg?s=612x612&w=0&k=20&c=dPCcJRPE7BX2oreYlD9P2_lGi8bGW8_zONrUKif6hfU=',
    'https://media.istockphoto.com/id/1171169099/es/foto/hombre-con-brazos-cruzados-aislados-sobre-fondo-gris.jpg?s=612x612&w=0&k=20&c=8qDLKdLMm2i8DHXY6crX6a5omVh2IxqrOxJV2QGzgFg=',
    'https://media.istockphoto.com/id/1344040233/es/foto/mujer-sonriente-que-te-señala-con-el-dedo.jpg?s=612x612&w=0&k=20&c=NW_hP15M17xHEhhhNeFZb2xZf_bxcP1qcCyNLuetIUY=',
    'https://media.istockphoto.com/id/1351047032/es/foto/retrato-de-una-mujer-adulta-joven-sobre-un-fondo-blanco.jpg?s=612x612&w=0&k=20&c=GOWRptBobnf-JsvhOsK4Sx4M2SEh-LJO9p8KU12EN6g=',
    'https://media.istockphoto.com/id/1089633230/es/foto/gafas-chica-de-blanco.jpg?s=612x612&w=0&k=20&c=5An_JMTsdhNr9iZpLKfkiZMsNMKFx79hbnufRbZMprQ=',
    'https://media.istockphoto.com/id/2042540731/es/foto/successful-businesswoman-portrait.jpg?s=612x612&w=0&k=20&c=CDoJX0JAvA4QHbWt-2zBXlYD2RzVu5oInNpiZO8GJ8o='
  ];
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 1000);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1000);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex flex-col items-center w-full h-screen overflow-x-hidden ">
      {/* Section one */}
      <div className="flex flex-col items-center w-full min-h-screen px-20">
        <HeaderTwo />
        <div className="flex flex-col items-center justify-center w-full h-full">
          <div className="flex flex-col items-center justify-between max-w-4xl ">
            <div className="flex items-center justify-center">
              <div className="flex items-center w-full gap-3 py-1 pl-1 pr-3 mb-5 border rounded-full border-black/10">
                <div className="flex -space-x-2">
                  {avatars.map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt={`Avatar ${i + 1}`}
                      className={`object-cover  border-2 border-white rounded-full  w-6 h-6
              `}
                    />
                  ))}
                </div>
                <p className="text-xs font-semibold">
                  Trusted by 48,890+ users
                </p>
                <div className="flex items-center gap-2">
                  <Star color="#ffe135" size={18} />
                  <Star color="#ffe135" size={18} />
                  <Star color="#ffe135" size={18} />
                  <Star color="#ffe135" size={18} />
                  <Star color="#ffe135" size={18} />
                </div>
                <p className="text-xs font-semibold">4.98/5</p>
              </div>
            </div>
            <div className="mb-5">
              <p className="max-w-4xl mb-3 font-bold text-7xl ">
                Pierde peso en semanas,{' '}
                <span
                  className="
    relative inline-block isolate
    before:content-[''] before:absolute
    before:-inset-x-2 before:-bottom-[0.05em]
    before:h-[1em] before:bg-orange-100
    before:z-0
  "
                >
                  <span className="relative z-10 italic font-normal text-orange-400">
                    no en meses
                  </span>
                </span>
              </p>

              <p className="mt-10 text-xl text-neutral-500 ">
                Todo lo que necesitas para ponerte en forma, bajar de peso y
                sentirte genial, incluso si apenas estas empezando. - Puedes
                lograr todo lo que te propongas con Plan4Me
              </p>
            </div>
            <div className="w-full mt-10">
              <button className="flex items-center gap-5 py-1 pl-8 pr-1 text-lg font-semibold text-orange-400 bg-orange-100 rounded-full cursor-pointer">
                REGISTRARME
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="w-12 h-12 p-2 text-orange-400 bg-white rounded-full lucide lucide-move-up-right-icon lucide-move-up-right"
                >
                  <path d="M13 5H19V11" />
                  <path d="M19 5L5 19" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <div
        className="flex flex-col w-full h-screen px-20 "
        style={{
          backgroundImage: `url(${glass})`,
          backgroundSize: 'cover',
          backgroundPosition: 'top'
        }}
      >
        <HeaderTwo />
        <div className="flex h-full gap-20">
          <div className="flex flex-col justify-end h-full gap-5 py-20">
            <h1 className="font-bold text-white text-8xl ">
              Pierde peso en semanas, no en meses
            </h1>
          </div>
          <div className="flex flex-col justify-end h-full py-20 ml-20 text-white/60">
            <p className="font-medium text-white ">
              Todo lo que necesitas para ponerte en forma, bajar de peso y
              sentirte genial, incluso si apenas estas empezando. - Puedes
              lograr todo lo que te propongas con Plan4Me
            </p>
            <div className="flex gap-5 mt-5">
              <button className="flex items-center gap-5 py-1 pl-4 pr-1 text-xs font-light text-white bg-black rounded-full cursor-pointer">
                COMIENZA AHORA
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="p-1 text-black bg-white rounded-full w-9 h-9 lucide lucide-move-up-right-icon lucide-move-up-right"
                >
                  <path d="M13 5H19V11" />
                  <path d="M19 5L5 19" />
                </svg>
              </button>
              <button className="items-center gap-5 px-8 py-2 text-sm text-white border border-white rounded-full cursor-pointer">
                DESCUBRE
              </button>
            </div>
          </div>
        </div>
      </div> */}
      {/* Section two */}
      <div className="flex items-center justify-center w-full min-h-screen px-20 py-20">
        <div className="max-w-4xl">
          <p className="mb-2 text-sm font-medium text-orange-400">
            Fundado en 2024
          </p>

          <p
            className={`mb-15 font-bold  ${
              isMobile ? 'text-3xl px-3' : 'text-6xl '
            } `}
          >
            Que nos hace{' '}
            <span
              className="
    relative inline-block isolate
    before:content-[''] before:absolute
    before:-inset-x-2 before:-bottom-[0.01em]
    before:h-[1em] before:bg-orange-400
    before:z-0
  "
            >
              <span className="relative z-10 italic font-normal text-white">
                diferente
              </span>
            </span>
          </p>
          <p className="mb-3 text-xl text-neutral-500">
            En Plan4Me creemos que la vida real no es perfecta, y tu dieta
            tampoco tiene que serlo.
          </p>
          <p className="mb-3 text-xl text-neutral-500">
            Lo que nos hace diferentes es que no te castigamos cuando te sales
            del plan: lo ajustamos contigo. Si un día disfrutas de un antojo,
            nuestro sistema equilibra automáticamente el resto de tus comidas
            para que sigas avanzando sin culpas.
          </p>
          <p className="text-xl text-neutral-500 mb-15 ">
            Porque comer saludable no se trata de perfección, sino de
            constancia, motivación y acompañamiento. Plan4Me no solo te da un
            plan, camina contigo en cada paso.
          </p>

          <button className="flex items-center gap-5 py-1 pl-8 pr-1 text-lg font-semibold text-orange-400 bg-orange-100 rounded-full cursor-pointer">
            COMIENZA AHORA
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="w-12 h-12 p-2 text-orange-400 bg-white rounded-full lucide lucide-move-up-right-icon lucide-move-up-right"
            >
              <path d="M13 5H19V11" />
              <path d="M19 5L5 19" />
            </svg>
          </button>
        </div>
      </div>
      {/* Section three */}
      {/* <div className="w-full min-h-full p-20 rounded-2xl">
        <div className="relative w-full h-full overflow-hidden rounded-2xl">
          <video
            src="https://videos.openai.com/vg-assets/assets%2Ftask_01k4zfa9rffjhat93rkcs38hjz%2Ftask_01k4zfa9rffjhat93rkcs38hjz_genid_4b8d4d0d-740b-4db9-ba55-e3be231598d1_25_09_12_17_25_154291%2Fvideos%2F00000_590909078%2Fsource.mp4?st=2025-09-12T15%3A43%3A34Z&se=2025-09-18T16%3A43%3A34Z&sks=b&skt=2025-09-12T15%3A43%3A34Z&ske=2025-09-18T16%3A43%3A34Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=8ebb0df1-a278-4e2e-9c20-f2d373479b3a&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=ytxwNF1Y4MZSTQwTpw2R9ROruW6CeQ5rMkmGPB7LN9M%3D&az=oaivgprodscus"
            muted
            autoPlay
            loop
            playsInline
            className="absolute inset-0 object-cover w-full h-full"
          />

          
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-transparent" />

          
          <div className="relative z-10 flex items-end justify-center h-full py-20">
            <div className="max-w-2xl px-6 md:px-12">
              <h1 className="text-5xl font-bold tracking-tight text-white">
                PLAN4ME
              </h1>
              <p className="mt-4 text-xl font-medium  text-white/90 min-w-[625px]">
                The ultimate way to track your health. Wake up to your sleep
                score. Get notified of chronic high blood pressure, boost your
                fitness with the new Workout Buddy, and enjoy up to 24 hours of
                battery life.
              </p>
              <div className="flex gap-5 mt-6">
                <button className="px-4 py-2 text-sm font-medium bg-white border border-white rounded-full">
                  Learn more
                </button>
                <button className="px-5 py-3 text-sm font-medium text-black bg-white border border-white rounded-full">
                  Suscribete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      {/* Section four */}
      <div className="flex flex-col items-center justify-center w-full min-h-screen p-20 ">
        <p
          className={`mb-15 font-bold max-w-4xl  ${
            isMobile ? 'text-3xl px-3' : 'text-6xl '
          } `}
        >
          El 97% quiere comer mejor…,{' '}
          <span
            className=" mt-1
    relative inline-block isolate
    before:content-[''] before:absolute
    before:-inset-x-2 before:-bottom-[0.05em]
    before:h-[1.1em] before:bg-orange-100
    before:z-0
  "
          >
            <span className="relative z-10 italic font-normal text-orange-400 m-">
              pero no empieza
            </span>
          </span>
        </p>
        <p className={`text-xl text-neutral-500 mb-15 max-w-4xl `}>
          No dejes que tu motivación se enfríe. Cada día que pasa es una
          oportunidad menos para sentirte como quieres, y una más para alejarte
          de tu mejor versión. Empieza hoy, no mañana.
        </p>
        <div className={`flex justify-between max-w-4xl w-full   `}>
          <div>
            <p className="pb-2 text-4xl text-center ">🫣</p>
            <p
              className={` font-bold text-black text-center ${
                isMobile ? 'text-sm' : 'text-xl'
              } `}
            >
              Tienes el deseo de cambiar
            </p>
          </div>
          <p
            className={`font-thin text-orange-100 ${
              isMobile ? 'text-6xl ml-2' : 'text-7xl'
            } `}
          >
            {' '}
            ⃕
          </p>
          <div>
            <p className="pb-2 text-4xl text-center">🫤</p>
            <p
              className={`font-bold text-black text-center ${
                isMobile ? 'text-sm' : 'text-xl'
              } `}
            >
              Pero algo te detiene
            </p>
          </div>
          <p
            className={`font-thin text-orange-100 rotate-180  ${
              isMobile ? 'text-4xl' : 'text-7xl'
            } `}
          >
            {' '}
            ⃔
          </p>
          <div>
            <p className="pb-2 text-4xl text-center">😬</p>
            <p
              className={` font-bold text-black text-center ${
                isMobile ? 'text-sm' : 'text-xl'
              } `}
            >
              Y al final, todo sigue igual…
            </p>
          </div>
        </div>
      </div>
      {/* Section five */}
      <div className="flex items-center justify-center w-full min-h-screen p-20">
        <div className="max-w-4xl">
          <p className="mb-5 text-6xl font-bold">
            Planes flexibles para{' '}
            <span className="italic font-light text-orange-400">todos</span>
          </p>
          <p className="mb-3 text-xl text-neutral-500">
            Affordable and transparent pricing for individuals, teams, and
            businesses - find the right plan for you today
          </p>
          <div className="flex items-center gap-1 mb-10">
            <p className="px-4 py-1 text-lg font-medium text-orange-400 bg-orange-100 rounded-full cursor-pointer">
              Monthly
            </p>
            <p className="px-4 py-1 text-lg font-medium rounded-full cursor-pointer">
              Yearly
            </p>
          </div>
          <div className="flex bg-orange-100 gap-25 p-15 rounded-3xl">
            <div className="w-[29%]">
              <h1 className="mb-2 text-3xl font-bold text-orange-400">
                Premium
              </h1>
              <p className="mb-10 text-lg text-neutral-600">
                Security, complance, and flexible deployment
              </p>
              <p className="mb-10 text-3xl font-bold text-orange-400">
                <span className="text-lg font-normal text-orange-400/80">
                  $
                </span>
                50{' '}
                <span className="text-lg font-normal text-orange-400/80">
                  / per month
                </span>
              </p>
              <div className="inline-flex flex-col w-full gap-3">
                <button className="w-full px-6 py-2 text-lg font-medium text-white bg-orange-400 rounded-full cursor-pointer">
                  Get started
                </button>
                <button className="px-6 py-2 text-lg font-medium text-orange-400 border border-orange-400 rounded-full cursor-pointer">
                  Start free trial
                </button>
              </div>
            </div>
            <div className="w-[71%] text-neutral-600">
              <p className="mb-10 text-lg text-neutral-600">
                Funciones premium exclusivas{' '}
              </p>
              <div className="flex gap-2 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="w-6 h-6 lucide lucide-circle-check-icon lucide-circle-check"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                <p className="mb-5 font-medium ">
                  Dieta 100% personalizada: ajustada a tus metas (bajar de peso,
                  ganar masa, mantenerte).
                </p>
              </div>
              <div className="flex gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="w-6 h-6 lucide lucide-circle-check-icon lucide-circle-check"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                <p className="mb-5 font-medium ">
                  Lista de compras automática: olvídate de cálculos, lleva todo
                  lo que necesitas en un solo clic.
                </p>
              </div>
              <div className="flex gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="w-8 h-8 lucide lucide-circle-check-icon lucide-circle-check"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                <p className="mb-5 font-medium ">
                  Ajuste dinámico por “pecados”: si te sales del plan, la app
                  equilibra el resto de tus comidas para mantener tu progreso.
                </p>
              </div>
              <div className="flex gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="w-6 h-6 lucide lucide-circle-check-icon lucide-circle-check"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                <p className="font-medium ">
                  Acceso multiplataforma: tu plan disponible siempre, desde
                  cualquier dispositivo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-full px-20 mt-20">
        <div className="w-full max-w-4xl">
          {/* <div className="w-full px-20 bg-black/90 py-15 rounded-3xl">
            <p className="mb-5 text-6xl font-bold text-white">
              Let AI take the busywork off your team's plate
            </p>
            <p className="mb-5 text-lg text-white/80">
              From dispatching and documents to messages and reports automate
              the tasks your team shouldn't be doing manually.
            </p>
            <button className="flex items-center gap-2 py-2 pl-4 pr-2 text-lg font-medium bg-white rounded-full cursor-pointer">
              Build my Dite
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-chevron-right-icon lucide-chevron-right"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div> */}
          <div className="flex justify-between w-full py-10 mb-5 gap-15">
            <div className="w-[40%]">
              <p className="mb-5 text-xl font-medium">Plan4Me</p>
              <p className="mb-10 text-lg text-neutral-400">
                La herramienta diseñada para que transformes tu salud y alcances
                tu mejor versión de forma rápida, sencilla y sin complicaciones.
              </p>
              <div className="flex items-center gap-8 cursor-pointer text-neutral-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-facebook-icon lucide-facebook"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-linkedin-icon lucide-linkedin"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-instagram-icon lucide-instagram"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-send-icon lucide-send"
                >
                  <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
                  <path d="m21.854 2.147-10.94 10.939" />
                </svg>
              </div>
            </div>
            <div className="w-[15%]">
              <p className="mb-5 text-xl font-medium ">Compañia</p>
              <p className="mb-3 cursor-pointer text-neutral-400">Inicio</p>
              <p className="mb-3 cursor-pointer text-neutral-400">Nosotros</p>
              <p className="mb-3 cursor-pointer text-neutral-400">Eslogan</p>
              <p className="mb-3 cursor-pointer text-neutral-400">Pricing</p>
              <p className="cursor-pointer text-neutral-400">Footer</p>
            </div>
            <div className="w-[40%]">
              <p className="mb-5 text-xl font-medium">Newsletter</p>
              <p className="mb-10 text-neutral-400">
                Recibe consejos, novedades y motivación para transformar tu
                alimentación y alcanzar tu mejor versión de forma más
                inteligente.
              </p>
              <div className="flex w-full py-1 pl-4 pr-1 border rounded-full border-neutral-400">
                <input
                  type="text"
                  placeholder="Email address"
                  className="w-full focus:outline-none"
                />
                <button className="flex items-center gap-2 py-2 pl-4 pr-1 text-lg font-medium text-white bg-black rounded-full">
                  Subscribe
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-chevron-right-icon lucide-chevron-right"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between p-3 mb-10 bg-black/5 rounded-2xl">
            <p className="text-sm font-light text-center text-black/60 ">
              © 2024 Plan4Me. All rights reserved.
            </p>
            <div className="flex gap-5 text-sm font-light cursor-pointer text-black/60">
              <p>Privacy Policy</p>
              <p>Terms of Service</p>
              <p>Security</p>
              <p>Cookie</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
