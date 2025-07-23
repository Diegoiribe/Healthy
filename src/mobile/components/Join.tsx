import React from 'react';

export const Join = () => {
  return (
    <div className="flex flex-col items-center justify-center w-[350px] pt-15">
      <div className="px-8 py-3 rounded-full shadow-xl cursor-pointer bg-white/50 hover:bg-white">
        <p className="font-medium text-center ">Upgrate Premium</p>
      </div>
      <div className="flex items-center gap-4 mt-15">
        <p className="text-xs font-light text-black cursor-pointer hover:font-semibold">
          Cookie Preferences
        </p>
        <p className="text-xs font-black text-black">·</p>
        <p className="text-xs font-light text-black cursor-pointer hover:font-semibold">
          Report
        </p>
        <p className="text-xs font-black text-black">·</p>
        <p className="text-xs font-light text-black cursor-pointer hover:font-semibold">
          Privacy
        </p>
      </div>
    </div>
  );
};
