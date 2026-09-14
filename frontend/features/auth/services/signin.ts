import { apiClient } from "@/lib/api-client";

export default async function signin(
    email: string,
    password: string
) {
    const response = await apiClient("/auth/signin", {
        method: "POST",
        body: JSON.stringify({
            email,
            password,
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.msg || "Failed to sign in");
    }

    return data;
}