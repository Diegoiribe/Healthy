export const Footer = () => {
  return (
    <div className="flex items-center justify-center h-screen p-5 ">
      <div className="flex flex-col justify-between p-5 bg-black min-w-4xl shadow-xl h-[450px] rounded-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-neutral-50">
            <p className="text-xs font-semibold uppercase">Twitter</p>
          </div>
          <div className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-neutral-50">
            <p className="text-xs font-semibold uppercase">Dribble</p>
          </div>
          <div className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-neutral-50">
            <p className="text-xs font-semibold uppercase">Instagram</p>
          </div>
          <div className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-neutral-50">
            <p className="text-xs font-semibold uppercase">Linkedin</p>
          </div>
          <p className="text-sm font-semibold ">Broccoli@gmail.com</p>
          <p className="text-sm font-semibold ">+52 66 74 50 70 62</p>
        </div>

        <div>
          <p className="font-bold text-orange-300 text-9xl">Broccoli</p>
          <p className="font-bold text-orange-300 text-9xl">Stay healthy</p>
        </div>
        <div>
          <p className="text-[10px] text-neutral-200">
            © 2023 All right reserved to Mama and Papa Bejgart
          </p>
        </div>
      </div>
    </div>
  );
};
