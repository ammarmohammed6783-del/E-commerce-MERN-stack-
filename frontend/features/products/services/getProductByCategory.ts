import { apiFetch } from "@/lib/api";
import type { Product } from "@/types/product";

type ProductsResponse = {
    products: Product[];
    totalProducts: number;
    totalPages: number;
    currentPage: number;
};

export default async function getProductByCategory(
    category: string | undefined,
    page: string | undefined
): Promise<ProductsResponse> {

    const params = new URLSearchParams();

    if (category) {
        params.set("category", category);
    }

    params.set("page", page ?? "1");
    params.set("limit", "6");

    const response = await apiFetch(
        `/products?${params.toString()}`,
        {
            method: "GET",
        }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch products");
    }

    return response.json();
}