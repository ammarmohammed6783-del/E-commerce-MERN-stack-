import { apiClient } from "@/lib/api-client";

export default async function refreshToken() {
    const response = await apiClient("/auth/refresh", {
        method: "POST",
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.msg || "Failed to refresh access token"
        );
    }

    return data;
}