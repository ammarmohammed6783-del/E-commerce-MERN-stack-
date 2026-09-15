import { apiServer } from "@/lib/api-server";
import type { Product } from "@/types/product";

export default async function getTopSelling(): Promise<Product[]> {
    const response = await apiServer("/products/top-selling", {
        method: "GET",
    });

    const data: Product[] = await response.json();

    return data;
}