import { apiClient } from "@/lib/api-client";

export default async function addToCart(
    product: string,
    variant: {
        size: string;
        color: string;
    },
    quantity: number
) {
    const response = await apiClient("/products/addToCart", {
        method: "POST",
        body: JSON.stringify({
            product,
            variant,
            quantity,
        }),
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(error || "Failed to add item to cart");
    }

    return response.json();
}