import { apiClient } from "@/lib/api-client";

export default async function register(
    userName: string,
    email: string,
    password: string
) {
    const response = await apiClient("/auth/register", {
        method: "POST",
        body: JSON.stringify({
            userName,
            email,
            password,
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.msg || "Failed to register");
    }

    return data;
}