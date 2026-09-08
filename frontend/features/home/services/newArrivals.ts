import { apiFetch } from "@/lib/api";
import type { Product } from "@/types/product";

type ProductsResponse = {
    products: Product[];
};

export default async function getNewArrivals(): Promise<Product[]> {
    const response = await apiFetch("/products?limit=5", {
        method: "GET",
    });

    const data: ProductsResponse = await response.json();

    return data.products;
}