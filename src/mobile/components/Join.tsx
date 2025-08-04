import React from 'react';

export const Join = () => {
  return (
    <div className="flex flex-col items-center justify-center w-[350px] pt-15">
      <div className="px-8 py-3 text-white bg-red-400 rounded-full shadow-xl cursor-pointer hover:bg-black hover:text-white">
        <p className="font-bold text-center ">Upgrate Premium</p>
      </div>
      <div className="flex items-center gap-4 mt-15">
        <p className="text-xs font-light text-white cursor-pointer hover:font-semibold">
          Cookie Preferences
        </p>
        <p className="text-xs font-black text-white">·</p>
        <p className="text-xs font-light text-white cursor-pointer hover:font-semibold">
          Report
        </p>
        <p className="text-xs font-black text-white">·</p>
        <p className="text-xs font-light text-white cursor-pointer hover:font-semibold">
          Privacy
        </p>
      </div>
    </div>
  );
};
