import {
  ActionFunctionArgs,
  Form,
  useActionData,
  redirect,
  useNavigate,
  LoaderFunctionArgs,
  useLoaderData,
} from "react-router-dom";
import ErrorMessage from "../components/shared/ErrorMessage";
import { getProductById, updateProduct } from "../services/ProductService";
import { Button } from "@/components/ui/button";
import { ChevronLeft, CirclePlus } from "lucide-react";
import { Product } from "@/types";

export async function action({ request, params }: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData());
  const id = params.id as string;
  let errors = "";
  if (Object.values(data).includes("")) {
    errors = "All fields are required";
  }
  if (errors.length) {
    return errors;
  }
  await updateProduct(data, id);
  return redirect("/");
}

export async function loader({ params }: LoaderFunctionArgs) {
  const id = params.id as string;
  const data = await getProductById(id);
  if (!data) {
    return redirect("/");
  }
  return data;
}

export default function EditProduct() {
  const errors = useActionData() as string;
  const product = useLoaderData() as Product;
  const nativate = useNavigate();

  const handleClick = () => {
    nativate("/");
  };

  const availabilityOptions = [
    { name: "Available", value: true },
    { name: "Not Available", value: false },
  ];

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-4xl font-bold text-slate-600">Update a product</h2>

        <Button variant="outline" onClick={handleClick} className="">
          <ChevronLeft className="mr-2 h-4 w-4" /> Product List
        </Button>
      </div>

      {errors && <ErrorMessage>{errors}</ErrorMessage>}

      <Form className="mt-10" method="POST">
        <div className="mb-4">
          <label className="text-gray-800" htmlFor="name">
            Product name:
          </label>
          <input
            id="name"
            type="text"
            className="mt-2 block w-full p-3 bg-gray-50"
            placeholder="Product name..."
            defaultValue={product.name}
            name="name"
          />
        </div>
        <div className="mb-4">
          <label className="text-gray-800" htmlFor="price">
            Price:
          </label>
          <input
            id="price"
            type="number"
            className="mt-2 block w-full p-3 bg-gray-50"
            placeholder="Product price..."
            min="0"
            max="9999999999999999999999999999999999.99"
            defaultValue={product.price}
            name="price"
          />
        </div>
        <div className="mb-4">
          <label className="text-gray-800" htmlFor="availability">
            Availability:
          </label>
          <select
            id="availability"
            className="mt-2 block w-full p-3 bg-gray-50"
            name="availability"
            defaultValue={product?.availability.toString()}
          >
            {availabilityOptions.map((option) => (
              <option key={option.name} value={option.value.toString()}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-center mt-10">
          <Button variant="outline" type="submit" className="text-lg">
            <CirclePlus className="mr-2 h-4 w-4" /> Update product
          </Button>
        </div>
      </Form>
    </div>
  );
}
