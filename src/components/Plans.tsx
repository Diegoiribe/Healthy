import { InputBottom } from './TypeInputs';

export const Plans = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <p className="mb-5 text-6xl font-semibold text-center">
        Simple Plans, <span className="text-orange-300">Free</span> To Try
      </p>
      <p className="mb-20 text-2xl text-center text-neutral-600">
        No Hidden Fees, No Games, No Surprises.
        <br />
        Free To Get Started
      </p>
      <div className="w-full">
        <div className="flex w-full px-4 py-2">
          <div className="w-[30%]"></div>
          <div className="w-[29%] flex flex-col items-center">
            <p className="text-4xl font-semibold text-center text-neutral-400">
              FREE
            </p>
          </div>
          <div className="w-[29%] flex flex-col items-center">
            <p className="text-4xl font-semibold text-center text-orange-300 uppercase">
              Basic
            </p>
          </div>
          <div className="w-[11%] flex flex-col items-center">
            <p className="text-4xl font-semibold text-center text-yellow-400 uppercase"></p>
          </div>
        </div>
        <div className="flex items-center w-full px-4 py-2">
          <p className="w-[30%] text-sm text-neutral-500 font-semibold">
            Monthly Fees
          </p>
          <p className="w-[29%] text-4xl text-center  ">
            <span className="mr-1 text-lg">$</span>0
          </p>
          <p className="w-[29%] text-4xl text-center  ">
            <span className="mr-1 text-lg">$</span>9.99
          </p>
          <p className="w-[11%] text-4xl text-center font-light">
            <span className="text-lg"></span>
          </p>
        </div>
        <div className="flex w-full px-4 py-2 rounded-lg bg-neutral-50">
          <p className="w-[30%] ">No. of Uploads per Month</p>
          <p className="w-[29%] text-center font-semibold">1</p>
          <p className="w-[29%] text-center font-semibold">20</p>
          <p className="w-[11%] text-center font-semibold"></p>
        </div>
        <div className="flex w-full px-4 py-4 ">
          <p className="w-[30%] ">Per upload event price</p>
          <p className="w-[29%]  text-center font-semibold">1</p>
          <p className="w-[29%] text-center font-semibold">1</p>
          <p className="w-[11%] text-center font-semibold"></p>
        </div>
        <div className="flex w-full px-4 py-2 rounded-lg bg-neutral-100">
          <p className="w-[30%] ">No. of Uploads per Month</p>
          <p className="w-[29%] text-center font-semibold">1</p>
          <p className="w-[29%] text-center font-semibold">20</p>
          <p className="w-[11%] text-center font-semibold"></p>
        </div>
        <div className="flex w-full px-4 pt-4 pb-4 border-b border-neutral-300">
          <p className="w-[30%] ">Per upload event price</p>
          <p className="w-[29%] text-center font-semibold">1</p>
          <p className="w-[29%] text-center font-semibold">1</p>
          <p className="w-[11%] text-center font-semibold"></p>
        </div>
        <div className="flex w-full py-5">
          <div className="w-[30%]"></div>
          <div className="flex items-center justify-center w-[29%]">
            <InputBottom
              name="Get Plan4Me"
              className="px-4 py-2 text-sm text-white bg-black border"
            />
          </div>

          <div className="flex items-center justify-center w-[29%]">
            <InputBottom
              name="Get Plan4Me"
              className="px-4 py-2 text-sm text-white bg-black border"
            />
          </div>
          <div className="flex items-center justify-center w-[11%]">
            <p className=""></p>
          </div>
        </div>
      </div>
    </div>
  );
};
