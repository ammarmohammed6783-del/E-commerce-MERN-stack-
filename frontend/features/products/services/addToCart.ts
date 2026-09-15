import { apiClient } from "@/lib/api-client";

export default async function addToCart() {
    const response = await apiClient(
        `/products/addToCart`,
        {
            method: "POST",
        }
    );

    if (!response.ok) {
        const error = await response.text();

        throw new Error("Failed to fetch product");
    }

    const data = await response.json();

    return data;
}