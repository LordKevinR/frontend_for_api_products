import { boolean, number, object, string, InferOutput, array } from "valibot";

export const DraftProductSchema = object({
  name: string(),
  price: number(),
});

export const DraftProductSchemaEdit = object({
  name: string(),
  price: number(),
  availability: boolean(),
});

export const ProductSchema = object({
  id: number(),
  name: string(),
  price: number(),
  createdAt: string(),
  updatedAt: string(),
  availability: boolean(),
});

export const ProductsSchema = array(ProductSchema);

export type Product = InferOutput<typeof ProductSchema>;
