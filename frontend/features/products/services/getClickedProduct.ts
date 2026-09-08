import { apiFetch } from "@/lib/api";
import type { Product } from "@/types/product";

type ProductResponse = {
    product: Product;
};

export default async function getClickedProduct(id: string) {
    const response = await apiFetch(
        `/products/${id}`,
        {
            method: "GET",
        }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch product");
    }

    const data: ProductResponse = await response.json();

    return data.product;
}