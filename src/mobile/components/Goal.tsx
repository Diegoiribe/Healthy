export const Goal = () => {
  const flowers = [
    { id: 1, name: '🌺' },
    { id: 2, name: '🌻' },
    { id: 3, name: '🌾' },
    { id: 4, name: '🍄' },
    { id: 5, name: '🪻' }
  ];
  return (
    <div className="w-[325px] mb-10">
      <div className="w-full gap-3 px-4 py-4 backdrop-blur-md bg-white/60 rounded-3xl">
        <div className="flex items-center justify-between">
          <p className="text-xl font-black text-yellow-800 ">
            Seguimiento de dieta
          </p>

          <div className="flex items-center justify-center w-10 h-10 text-black bg-white rounded-full cursor-pointer hover:bg-black hover:text-white">
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
              className="lucide lucide-badge-check-icon lucide-badge-check"
            >
              <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </div>
        </div>
        {/* aqui quiero el calendario */}
        <div className="flex w-full mt-5 bg-white border border-dashed border-neutral-200 rounded-xl">
          {flowers.map((flower) => (
            <div className="flex items-center justify-center py-3 text-3xl border-r border-dashed last:border-0 border-neutral-200 flex-1/5">
              {flower.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Goal;
