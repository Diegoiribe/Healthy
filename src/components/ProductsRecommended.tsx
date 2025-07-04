import { useState } from 'react';

interface Product {
  name: string;
  category: string;
  img: string;
}

export const ProductsRecommended = () => {
  const [search, setSearch] = useState<boolean>(false);
  const [products] = useState<Product[]>([
    {
      name: 'Pan integral Oroweat multigrano',
      category: 'Fruits',
      img: 'https://i5-mx.walmartimages.com/gr/images/product-images/img_large/00750100037541L.jpg?odnHeight=612&odnWidth=612&odnBg=FFFFFF'
    },
    {
      name: 'Caldo de pollo Knorr',
      category: 'Fruits',
      img: 'https://i5-mx.walmartimages.com/gr/images/product-images/img_large/00750100519929L.jpg?odnHeight=612&odnWidth=612&odnBg=FFFFFF'
    },
    {
      name: 'Chocolate en polvo Cal C Tose',
      category: 'Fruits',
      img: 'https://i5-mx.walmartimages.com/gr/images/product-images/img_large/00750620580763L.jpg?odnHeight=612&odnWidth=612&odnBg=FFFFFF'
    },
    {
      name: 'Producto a base de leche Yakult',
      category: 'Fruits',
      img: 'https://i5-mx.walmartimages.com/gr/images/product-images/img_large/00750102551100L.jpg?odnHeight=612&odnWidth=612&odnBg=FFFFFF'
    },
    {
      name: 'Salchicha de pavo San Rafael',
      category: 'Fruits',
      img: 'https://i5-mx.walmartimages.com/gr/images/product-images/img_large/00000007501382L.jpg?odnHeight=612&odnWidth=612&odnBg=FFFFFF'
    }
  ]);

  return (
    <div className="flex flex-col max-w-3xl gap-5 py-10 mx-auto">
      <div className="flex items-center justify-end w-full ">
        <div
          className="flex items-center justify-center w-10 h-10 text-lg rounded-full cursor-pointer bg-black/5 hover:bg-black/15"
          onClick={() => setSearch(true)}
        >
          🔍
        </div>
      </div>
      {search && (
        <div className="flex items-center justify-between w-full gap-2 border-b">
          <input
            type="text"
            className="w-full p-2 text-sm focus:outline-none"
            placeholder="Search any product"
          />
          <p
            className="text-sm cursor-pointer"
            onClick={() => setSearch(false)}
          >
            ｘ
          </p>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-5">
        {products.map((product, index) => (
          <div
            className="w-1/5 h-[250px]  rounded-2xl p-3 coursor-pointer  "
            key={index}
          >
            <div className="w-full h-[200px] flex items-center justify-center overflow-hidden">
              <img
                src={product.img}
                alt={product.name}
                className="object-contain w-full h-full "
              />
            </div>
            <p className="pt-2 text-sm font-light border-t">{product.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
