import { apiFetch } from "@/lib/api";
import type { Product } from "@/types/product";

export default async function getNewArrivals(): Promise<Product[]> {
    const response = await apiFetch("/products?limit=5", {
        method: "GET",
    });

    const data: Product[] = await response.json();

    return data;
}