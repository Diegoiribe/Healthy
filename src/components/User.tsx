export const User = () => {
  return (
    <div className="flex flex-col gap-5 p-5 mx-auto">
      <div className="flex gap-5">
        <div className="px-6 py-2 ">
          <p className="text-[10px] text-neutral-500">Name</p>
          <p className="text-sm font-medium ">Diego</p>
        </div>
        <div className="px-6 py-2 ">
          <p className="text-[10px] text-neutral-400">Last name</p>
          <p className="text-sm font-medium ">Iribe Carrazco</p>
        </div>
      </div>

      <div className="px-6 py-2 ">
        <p className="text-[10px] text-neutral-400">Email</p>
        <p className="text-sm font-medium">Iribecarrazcodiego@gmail.com</p>
      </div>
      <div className="px-6 py-2 ">
        <p className="text-[10px] text-neutral-400">Nacionalidad</p>

        <p className="font-medium">Mexicana</p>
      </div>
    </div>
  );
};
