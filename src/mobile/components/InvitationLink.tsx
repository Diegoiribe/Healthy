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
    <div className="w-[325px] mb-30">
      <div className="flex items-center justify-between w-full gap-3 px-4 py-4 backdrop-blur-md bg-white/60 rounded-3xl">
        <p className="text-xl font-black text-yellow-800 ">Link de referido</p>

        <div
          onClick={shareLink}
          className="flex items-center justify-center w-10 h-10 text-black bg-white rounded-full cursor-pointer hover:bg-black hover:text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className=" lucide lucide-square-arrow-out-up-right-icon lucide-square-arrow-out-up-right"
          >
            <path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6" />
            <path d="m21 3-9 9" />
            <path d="M15 3h6v6" />
          </svg>
        </div>
      </div>
    </div>
  );
};
