import { ProductsRecommended } from './ProductsRecommended';
import { List } from './List';
import { useState } from 'react';

export const ListUser = (props: { setIsList: (value: boolean) => void }) => {
  const { setIsList } = props;
  const [IsSelected, setIsSelected] = useState<string>('list');

  return (
    <div className="w-full h-screen ">
      <div className="flex items-center justify-between max-w-3xl mx-auto ">
        <div className="flex items-center justify-between gap-10 py-5 ">
          <p
            className={` text-lg cursor-pointer  ${
              IsSelected === 'list'
                ? 'text-black font-semibold border-black border-b'
                : 'text-neutral-400'
            }`}
            onClick={() => setIsSelected('list')}
          >
            List
          </p>
          <p
            className={` text-lg cursor-pointer  ${
              IsSelected === 'products'
                ? 'text-black font-semibold border-black border-b '
                : 'text-neutral-400'
            }`}
            onClick={() => setIsSelected('products')}
          >
            Products recommended
          </p>
        </div>

        <p
          className="text-2xl cursor-pointer text-neutral-300 hover:text-black"
          onClick={() => setIsList(false)}
        >
          🆇
        </p>
      </div>

      {IsSelected === 'list' && <List />}
      {IsSelected === 'products' && <ProductsRecommended />}
    </div>
  );
};
