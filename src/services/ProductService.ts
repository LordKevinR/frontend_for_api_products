import { safeParse } from "valibot";
import {
  DraftProductSchema,
  DraftProductSchemaEdit,
  ProductSchema,
  ProductsSchema,
} from "../types";
import axios from "axios";
import { convertToBoolean } from "@/utils/ConvertToBoolean";

type ProductData = {
  [k: string]: FormDataEntryValue;
};

export async function createProduct(data: ProductData) {
  try {
    const result = safeParse(DraftProductSchema, {
      name: data.name,
      price: +data.price,
    });
    if (result.success) {
      const url = `${import.meta.env.VITE_API_URL}/api/products`;
      await axios.post(url, result.output);
    } else {
      throw new Error("Invalid data");
    }
  } catch (error) {
    console.log(error);
  }
}

export async function updateProduct(data: ProductData, id: string) {
  try {
    const result = safeParse(DraftProductSchemaEdit, {
      name: data.name,
      price: +data.price,
      availability: convertToBoolean(data.availability.toString()),
    });

    if (result.success) {
      const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
      await axios.put(url, result.output);
    } else {
      throw new Error("Invalid data");
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getProducts() {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products`;
    const response = await axios.get(url);
    const result = safeParse(ProductsSchema, response.data.data);
    if (result.success) {
      return result.output;
    } else {
      throw new Error("Invalid data");
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getProductById(id: string) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
    const response = await axios.get(url);
    const result = safeParse(ProductSchema, response.data.data);
    if (result.success) {
      return result.output;
    } else {
      throw new Error("Invalid data");
    }
  } catch (error) {
    console.log(error);
  }
}

export async function deleteProduct(id: string) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
    const response = await axios.delete(url);
    const result = response.data.data;
    return result;
  } catch (error) {
    console.log(error);
  }
}
export async function updateAvailability(id: string) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
    await axios.patch(url);
  } catch (error) {
    console.log(error);
  }
}
