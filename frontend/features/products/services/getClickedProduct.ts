import { apiServer } from "@/lib/api-server";
import type { Product } from "@/types/product";

// type ProductResponse = {
//     product: Product;
// };

export default async function getClickedProduct(id: string) {
    const response = await apiServer(
        `/products/${id}`,
        {
            method: "GET",
        }
    );

    if (!response.ok) {
        const error = await response.text();
        console.log("ERROR:", error);

        throw new Error("Failed to fetch product");
    }

    const data = await response.json();

    return data;
}