import { Header } from '../components/Header';
import { Plans } from '../components/Plans';
import { Footer } from '../components/Footer';
import { InputBottom } from '../components/TypeInputs';

export const Landing = () => {
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

  return (
    <div className="flex flex-col mx-auto">
      <Header isAdmin={false} />
      <div className="flex flex-col ">
        <div className="flex flex-col items-center justify-center w-full h-screen max-w-3xl mx-auto">
          <h1 className="mt-12 mb-12 font-black text-center text-7xl">
            Lose weight <br />
            <span className="relative inline-block before:absolute before:-inset-x-2 before:-bottom-[0.01em] before:h-[0.4em] before:bg-orange-200 before:-z-10">
              in weeks,
            </span>{' '}
            not months
          </h1>

          <p className="mb-12 text-3xl text-center px-15 text-neutral-600">
            Everything you need to get fit, lose weight, and feel great—even if
            you’re just starting out.
          </p>

          <InputBottom
            name="Get instant access"
            className="px-10 py-4 mb-8 text-xl text-black bg-orange-200 border"
          />

          <div className="flex -space-x-4">
            {avatars.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Avatar ${i + 1}`}
                className="object-cover w-12 h-12 border-2 border-white rounded-full"
              />
            ))}
          </div>
          <p className="mt-4 text-lg italic text-neutral-500">
            <span className="font-bold text-black">3,334</span> entrepreneurs
            love the course
          </p>
        </div>

        {/* Section two */}
        <div className="flex flex-col justify-center h-screen max-w-3xl gap-5 mx-auto min-w-3xl">
          <p className="mt-12 mb-12 font-black text-center text-7xl">
            97% of visitors aren't{' '}
            <span className="relative inline-block before:absolute before:-inset-x-2 before:-bottom-[0.01em] before:h-[0.4em] before:bg-orange-200 before:-z-10">
              ready to buy
            </span>
          </p>
          <p className="mb-12 text-3xl text-center px-15 text-neutral-600">
            All the time and money spent on ads, SEO, and content marketing goes
            to waste. Potential customers leave and never come back.
          </p>
          <div className="flex justify-between gap-10">
            <div>
              <p className="pb-2 text-4xl text-center">🫣</p>
              <p className="text-lg font-bold text-center">
                Potential customer is interested
              </p>
            </div>
            <p className="font-thin text-orange-300 text-7xl"> ⃕</p>
            <div>
              <p className="pb-2 text-4xl text-center">🫤</p>
              <p className="text-lg font-bold text-center">
                Doesn't find a reason to buy right now
              </p>
            </div>
            <p className="font-thin text-orange-300 rotate-180 text-7xl"> ⃔</p>
            <div>
              <p className="pb-2 text-4xl text-center">😬</p>
              <p className="text-lg font-bold text-center">
                Leaves and never come back
              </p>
            </div>
          </div>
        </div>
        <div className="max-w-5xl mx-auto min-w-4xl">
          <Plans />
        </div>
      </div>
      <Footer />
    </div>
  );
};
