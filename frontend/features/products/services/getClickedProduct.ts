import { apiFetch } from "@/lib/api";
import type { Product } from "@/types/product";

// type ProductResponse = {
//     product: Product;
// };

export default async function getClickedProduct(id: string) {
    const response = await apiFetch(
        `/products/${id}`,
        {
            method: "GET",
        }
    );

    console.log("ID:", id);
    console.log("STATUS:", response.status);
    console.log("URL:", response.url);

    if (!response.ok) {
        const error = await response.text();
        console.log("ERROR:", error);

        throw new Error("Failed to fetch product");
    }

    const data = await response.json();

    return data;
}