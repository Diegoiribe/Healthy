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
      <div className="flex flex-col w-full gap-3 px-4 py-4 backdrop-blur-md bg-white/60 rounded-3xl">
        <p className="text-xl font-black text-yellow-800 ">Link de referido</p>

        <div
          onClick={shareLink}
          className="w-full px-4 py-[10px] text-white  bg-black cursor-pointer rounded-xl hover:bg-blue-400"
        >
          <p className="text-sm font-bold text-center">Compartir</p>
        </div>
      </div>
    </div>
  );
};
