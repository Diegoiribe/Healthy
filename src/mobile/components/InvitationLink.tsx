import React from 'react';
import type { UserDataProps } from '../../pages/Dashboard';

export const InvitationLink = (props: { userData?: UserDataProps }) => {
  const { userData } = props;

  const link = `https://www.plan4me.com/register?ref=${userData?.refCode}`;

  const shareLink = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Plan4Me',
          text: 'Únete a Plan4Me usando mi link de referido:',
          url: link
        });
      } catch (err) {
        console.error('Error al compartir:', err);
      }
    } else {
      alert('Tu navegador no soporta la función de compartir.');
    }
  };

  return (
    <div className="w-[325px]">
      <div className="flex flex-col w-full gap-3 px-4 py-4 backdrop-blur-md bg-white/60 rounded-3xl">
        <p className="text-xl font-black text-yellow-800 ">Link de referido</p>
        <div className="flex items-center justify-between px-4 py-2 bg-white rounded-lg hover:bg-white/90">
          <p className="text-sm font-bold text-neutral-600">
            {`/register?ref=${userData?.refCode}`}
          </p>
          <svg
            onClick={() => {
              navigator.clipboard.writeText(link);
              alert('¡Copiado al portapapeles!');
            }}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="cursor-pointer text-neutral-400 lucide lucide-copy-icon lucide-copy hover:text-black"
          >
            <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
          </svg>
        </div>
        <div
          onClick={shareLink}
          className="w-full px-4 py-2 text-white bg-black cursor-pointer rounded-xl hover:bg-black/90"
        >
          <p className="text-sm font-medium text-center">Compartir link</p>
        </div>
      </div>
    </div>
  );
};
