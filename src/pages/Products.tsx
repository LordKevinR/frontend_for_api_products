import {
  ActionFunctionArgs,
  useFetcher,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import { getProducts, updateAvailability } from "../services/ProductService";
// import ProductDetails from "../components/ProductDetails";
import { Product } from "../types";
import { DataTable } from "@/components/data-table/DataTable";
import { createColumns } from "@/components/data-table/Columns";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";

export async function loader() {
  const products = await getProducts();
  return products;
}

export async function action({ request }: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData());
  await updateAvailability(data.id.toString());
  return {};
}

export default function Products() {
  const products = useLoaderData() as Product[];
  const navigate = useNavigate();
  const fetcher = useFetcher();

  const columns = createColumns(navigate, fetcher);

  const handleClick = () => {
    navigate("/products/new");
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-4xl font-bold text-slate-600">Product List</h2>

        <Button variant="outline" onClick={handleClick} className="">
          <CirclePlus className="mr-2 h-4 w-4" />
          New Product
        </Button>
      </div>

      <div className="mt-10">
        <DataTable columns={columns} data={products} />
      </div>
    </div>
  );
}
