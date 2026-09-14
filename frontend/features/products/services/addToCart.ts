import { apiFetch } from "@/lib/api";

export default async function addToCart() {
    const response = await apiFetch(
        `/products/addToCart`,
        {
            method: "POST",
        }
    );

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