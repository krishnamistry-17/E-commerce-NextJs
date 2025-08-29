import { Product } from "../../types/product";
import Link from "next/link";

type Props = {
  product: Product;
};

export const ProductCard = ({ product }: Props) => (
  <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
    <img
      src={product?.image}
      alt={product?.title}
      className="w-full h-48 object-cover mb-2"
    />
    <h2 className="text-lg font-semibold">{product?.title}</h2>
    <p className="text-sm text-gray-600">${product?.price.toFixed(2)}</p>
    <Link href={`/product/${product?.id}`}>
      <span className="text-blue-500 hover:underline mt-2 inline-block">
        View Details
      </span>
    </Link>
  </div>
);
