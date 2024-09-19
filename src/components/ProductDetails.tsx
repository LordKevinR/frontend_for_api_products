import { Product } from "../types";
import { formatCurrency } from "../utils/FormatCurrency";
import { formatDate } from "../utils/FormatDate";

type ProductDetailsProps = {
  product: Product;
};

export default function ProductDetails({ product }: ProductDetailsProps) {
  const isAvailable = product.availability;

  return (
    <tr className="border-b ">
      <td className="p-3 text-lg text-gray-800">{product.name}</td>
      <td className="p-3 text-lg text-gray-800">
        {formatCurrency(product.price)}
      </td>
      <td className="p-3 text-lg text-gray-800">
        {isAvailable ? "available" : "not available"}
      </td>
      <td className="p-3 text-lg text-gray-800">
        {formatDate(product.createdAt)}
      </td>
      <td className="p-3 text-lg text-gray-800">
        {formatDate(product.updatedAt)}
      </td>
      <td className="p-3 text-lg text-gray-800 "></td>
    </tr>
  );
}
