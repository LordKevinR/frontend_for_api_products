import {
  ActionFunctionArgs,
  Form,
  useActionData,
  redirect,
  useNavigate,
} from "react-router-dom";
import ErrorMessage from "../components/shared/ErrorMessage";
import { createProduct } from "../services/ProductService";
import { Button } from "@/components/ui/button";
import { ChevronLeft, CirclePlus } from "lucide-react";

export async function action({ request }: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData());

  let errors = "";
  if (Object.values(data).includes("")) {
    errors = "All fields are required";
  }

  if (errors.length) {
    return errors;
  }

  await createProduct(data);

  return redirect("/");
}

export default function NewProduct() {
  const errors = useActionData() as string;

  const nativate = useNavigate();

  const handleClick = () => {
    nativate("/");
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-4xl font-bold text-slate-600">
          Create a new product
        </h2>

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
            name="price"
          />
        </div>

        <div className="flex justify-center mt-10">
          <Button variant="outline" type="submit" className="text-lg">
            <CirclePlus className="mr-2 h-4 w-4" /> Add new product
          </Button>
        </div>
      </Form>
    </div>
  );
}
