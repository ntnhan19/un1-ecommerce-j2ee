import React from 'react';
import { useCart } from '../../hooks/useCart';

const mockProducts = [
  { id: 101, name: 'Áo Polo', price: 350000, image: '/assets/images/polo.jpg' },
  { id: 102, name: 'Quần Jeans', price: 650000, image: '/assets/images/jeans.jpg' },
];

const RecommendedProducts = () => {
  const { addToCart } = useCart();

  return (
    <div className="recommended-products mt-8">
      <h3 className="font-semibold mb-4">Sản phẩm gợi ý</h3>

      <div className="flex gap-4">
        {mockProducts.map(p => (
          <div key={p.id} className="bg-white rounded shadow p-2 w-40">
            <img
              src={p.image}
              alt={p.name}
              className="w-full h-24 object-cover rounded"
            />

            <div className="mt-2 font-medium">{p.name}</div>

            <div className="text-sm text-gray-500">
              {p.price.toLocaleString()} VND
            </div>

            <button
              onClick={() =>
                addToCart({
                  ...p,
                  quantity: 1,
                  color: 'Đen',
                  size: 'M',
                })
              }
              className="mt-2 bg-black text-white px-2 py-1 rounded w-full"
            >
              Thêm vào giỏ
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedProducts;
