import { apiFetch } from "@/lib/api";
import type { Product } from "@/types/product";

export default async function getProductByCategory(category: string | undefined): Promise<Product[]> {
    const response = await apiFetch(`/products/?category=${category}`, {
        method: "GET",
    });

    const data: Product[] = await response.json();

    return data;
}