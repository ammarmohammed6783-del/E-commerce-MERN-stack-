import { apiFetch } from "@/lib/api";
import type { Product } from "@/types/product";

export default async function getTopSelling(): Promise<Product[]> {
    const response = await apiFetch("/products/top-selling", {
        method: "GET",
    });

    const data: Product[] = await response.json();

    return data;
}