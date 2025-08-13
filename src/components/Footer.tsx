export const Footer = (props: { isMobile: boolean }) => {
  const { isMobile } = props;
  return (
    <div
      className={`flex items-center justify-center h-screen overflow-x-hidden ${
        isMobile ? 'px-5' : 'p-5'
      }`}
    >
      <div
        className={`flex flex-col justify-between p-5 bg-black  shadow-xl ${
          isMobile ? ' h-[450px]' : 'min-w-4xl h-[450px]'
        }  rounded-2xl overflow-x-hidden`}
      >
        <div className="flex flex-wrap items-center justify-between gap-5">
          <div className="flex items-center justify-center gap-2 px-4 py-2 rounded-full cursor-pointer bg-neutral-50 hover:bg-neutral-300">
            <p
              className={` font-semibold  ${
                isMobile ? ' text-xs ' : 'text-sm'
              }   `}
            >
              X
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 px-4 py-2 rounded-full cursor-pointer hover:bg-neutral-300 bg-neutral-50">
            <p
              className={` font-semibold  ${
                isMobile ? ' text-xs ' : 'text-sm'
              }   `}
            >
              Instagram
            </p>
          </div>
          <div className="flex items-center justify-center gap-2 px-4 py-2 rounded-full cursor-pointer hover:bg-neutral-300 bg-neutral-50">
            <p
              className={` font-semibold  ${
                isMobile ? ' text-xs ' : 'text-sm'
              }   `}
            >
              Youtube
            </p>
          </div>
          <p
            className={` font-semibold text-white ${
              isMobile ? ' text-xs ' : 'text-sm'
            }   `}
          >
            Plan4me@gmail.com
          </p>
          <p
            className={` font-semibold text-white ${
              isMobile ? ' text-xs hidden' : 'text-sm'
            }  text-red-300 `}
          >
            +52 66 74 50 70 62
          </p>
        </div>

        <div>
          <p
            className={`font-bold ${
              isMobile ? ' text-7xl ' : 'text-9xl'
            }  text-red-300 `}
          >
            Plan4Me
          </p>
          <p
            className={`font-bold capitalize ${
              isMobile ? ' text-7xl ' : 'text-9xl'
            }  text-red-300 `}
          >
            Stay Healthy
          </p>
        </div>
        <div>
          <p className="text-[10px] text-neutral-200">
            © 2025 Plan4me. Todos los derechos reservados. Este sitio esta hecho
            para cambiar la vida de las personas
          </p>
        </div>
      </div>
    </div>
  );
};
