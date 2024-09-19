import { getProducts } from "@/services/ProductService";
import { redirect } from "react-router-dom";

export async function loader() {
  await getProducts();
  return redirect("/");
}

export default function ProductDeleted() {
  return <div>product deleted</div>;
}
