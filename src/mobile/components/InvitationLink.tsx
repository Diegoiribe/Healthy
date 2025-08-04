import React from 'react';

export const InvitationLink = () => {
  return (
    <div className="w-[325px]">
      <div className="flex flex-col w-full gap-3 px-4 py-4 bg-red-400 rounded-3xl">
        <p className="text-xl font-black text-white">Invitation link</p>
        <div className="flex items-center justify-between px-4 py-2 bg-white rounded-lg hover:bg-white/90">
          <p className="text-sm font-bold text-neutral-600">
            plan4me.com/invite/diego
          </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="cursor-pointer text-neutral-400 lucide lucide-copy-icon lucide-copy hover:text-black"
          >
            <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
          </svg>
        </div>
        <div className="w-full px-4 py-2 text-white bg-black cursor-pointer rounded-xl hover:bg-black/90">
          <p className="text-sm font-medium text-center ">Share link</p>
        </div>
      </div>
    </div>
  );
};
