import { useState } from 'react';
import { HomeMobile } from '../components/HomeMobile';
import { CalendarMobile } from '../components/CalendarMobile';
import { OpenCalendar } from '../components/OpenCalendar';

export const DashboardMobile = () => {
  const [active, setActive] = useState<'links' | 'calendar'>('links');
  const [openCalendar, setOpenCalendar] = useState(false);

  const logOut = () => {
    localStorage.removeItem('token'); // o sessionStorage
    window.location.replace('/login'); // reemplaza historial
  };

  return (
    <div className="w-full min-h-screen bg-amber-50">
      {openCalendar && (
        <div className="relative bg-amber-50">
          <OpenCalendar setOpenCalendar={setOpenCalendar} />
        </div>
      )}
      <div className="flex flex-col items-center max-w-2xl p-10 mx-auto ">
        <div className="flex justify-end w-full">
          <div
            className="flex items-center justify-center w-10 h-10 text-xl font-bold text-white rounded-full cursor-pointer bg-black/10 hover:bg-red-400/70"
            onClick={logOut}
          >
            Ｘ
          </div>
        </div>
        <div
          className="w-24 h-24 mb-5 bg-black rounded-full"
          style={{
            backgroundImage:
              'url(https://scontent-sea1-1.cdninstagram.com/v/t51.2885-19/292268737_130207846366721_2163411911589064067_n.jpg?stp=dst-jpg_s206x206_tt6&_nc_cat=104&ccb=1-7&_nc_sid=bf7eb4&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy4xMDgwLkMzIn0%3D&_nc_ohc=ZVFZ9enJq60Q7kNvwHrifMg&_nc_oc=AdlxxJKHHbjpeaqnfxMvTzMxuFqTmc22qd0P8dhpZ51HE8a2N75UBBZza2uVbCC7jE8&_nc_zt=24&_nc_ht=scontent-sea1-1.cdninstagram.com&edm=AP4hL3IEAAAA&oh=00_AfRSQmapTGk7mAwmGiJzyf4BO8YQML-XgtyuXIni3H5V-w&oe=68850167)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        ></div>
        <div className="flex items-center gap-1 mb-5">
          <p className="text-3xl font-black ">Diego</p>
          <p className="flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-blue-400 rounded-full">
            ✓
          </p>
        </div>
        <div className="flex items-center justify-center gap-4 pr-2 mb-7">
          <p className="flex items-center justify-center w-12 h-12 p-2 text-4xl font-semibold text-blue-400 rounded-full cursor-pointer hover:bg-black/10 ">
            ↓
          </p>
          <p className="flex items-center justify-center w-12 h-12 p-2 text-3xl rounded-full cursor-pointer hover:bg-black/10">
            ⚙️
          </p>
          <p className="flex items-center justify-center w-12 h-12 text-2xl rounded-full cursor-pointer hover:bg-black/10">
            📋
          </p>
        </div>
        <div className="flex p-[2px] overflow-hidden rounded-full bg-black/10">
          <button
            onClick={() => setActive('links')}
            className={`w-24 h-13 font-black transition-all duration-300  ${
              active === 'links'
                ? 'bg-white text-black rounded-full'
                : ' text-white'
            }`}
          >
            Links
          </button>

          <button
            onClick={() => setActive('calendar')}
            className={`w-26 h-13 font-black transition-all duration-300 ${
              active === 'calendar'
                ? 'bg-white text-black rounded-full'
                : ' text-white'
            }`}
          >
            Calendar
          </button>
        </div>
        <div className="w-full mt-10">
          {/* Links y Shop */}
          {active === 'links' && <HomeMobile />}
          {active === 'calendar' && (
            <CalendarMobile
              openCalendar={openCalendar}
              setOpenCalendar={setOpenCalendar}
            />
          )}
        </div>
      </div>
    </div>
  );
};
