import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import Products, {
  loader as productsLoader,
  action as productsAction,
} from "./pages/Products";
import NewProduct, { action as newProductAction } from "./pages/NewProduct";
import EditProduct, {
  action as editProductAction,
  loader as editProductLoader,
} from "./pages/EditProduct";
import ProductDeleted, {
  loader as productDeletedLoader,
} from "./pages/ProductDeleted";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Products />,
        loader: productsLoader,
        action: productsAction,
      },
      {
        path: "/products/new",
        element: <NewProduct />,
        action: newProductAction,
      },
      {
        path: "/products/:id/edit",
        element: <EditProduct />,
        action: editProductAction,
        loader: editProductLoader,
      },
      {
        path: "/products/deleted",
        element: <ProductDeleted />,
        loader: productDeletedLoader,
      },
    ],
  },
]);
