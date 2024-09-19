import { formatCurrency } from "@/utils/FormatCurrency";
import { formatDate } from "@/utils/FormatDate";
import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";

import { toast } from "sonner";
import { Checkbox } from "../ui/checkbox";
import { FetcherWithComponents, NavigateFunction } from "react-router-dom";
import { deleteProduct } from "@/services/ProductService";

export type Products = {
  id: number;
  name: string;
  price: number;
  createdAt: string;
  updatedAt: string;
  availability: boolean;
};

export const createColumns = (
  navigate: NavigateFunction,
  fetcher: FetcherWithComponents<any>
): ColumnDef<Products>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <div className="flex items-center">
          <p className="text-xl">Id</p>
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <div className="flex items-center">
            <p className="text-xl">Name</p>
            <ArrowUpDown className="ml-2 mt-1 h-4 w-4" />
          </div>
        </button>
      );
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <div className="flex items-center">
            <p className="text-xl">Price</p>
            <ArrowUpDown className="ml-2 mt-1 h-4 w-4" />
          </div>
        </button>
      );
    },
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      const formatted = formatCurrency(price);

      return <div className="">{formatted}</div>;
    },
  },
  {
    accessorKey: "availability",
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <div className="flex items-center">
            <p className="text-xl">Available</p>
            <ArrowUpDown className="ml-2 mt-1 h-4 w-4" />
          </div>
        </button>
      );
    },
    cell: ({ row }) => {
      const Available = row.getValue("availability") as boolean;
      const status = Available ? "Available" : "Not Available";
      const id = parseInt(row.getValue("id"));

      return (
        <div className="w-full">
          <fetcher.Form method="POST" className="w-full">
            <button
              type="submit"
              name="id"
              className={`${
                Available ? "bg-green-300" : "bg-red-300"
              } rounded-xl px-3 py-1 text-center w-full`}
              value={id.toString()}
            >
              {status}
            </button>
          </fetcher.Form>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <div className="flex items-center">
            <p className="text-xl">Creation Date</p>
            <ArrowUpDown className="ml-2 mt-1 h-4 w-4" />
          </div>
        </button>
      );
    },
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt") as string;
      const formatted = formatDate(createdAt);

      return <div className="">{formatted}</div>;
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <div className="flex items-center">
            <p className="text-xl">Last Update</p>
            <ArrowUpDown className="ml-2 mt-1 h-4 w-4" />
          </div>
        </button>
      );
    },
    cell: ({ row }) => {
      const updatedAt = row.getValue("updatedAt") as string;
      const formatted = formatDate(updatedAt);

      return <div className="">{formatted}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                navigate(`/products/${product.id}/edit`);
              }}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(product.name);
                toast("Name copied to clipboard", {
                  position: "top-right",
                });
              }}
            >
              Copy Name
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(product.price.toString());
                toast("Name copied to clipboard", {
                  position: "top-right",
                });
              }}
            >
              Copy Price
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                if (confirm("Are you sure you want to delete this product?")) {
                  deleteProduct(product.id.toString());
                  navigate("/products/deleted");
                  toast("Product deleted", {
                    position: "top-right",
                  });
                }
              }}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
