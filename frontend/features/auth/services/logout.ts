import { apiClient } from "@/lib/api-client";

export default async function logout() {
    const response = await apiClient("/auth/logout", {
        method: "POST",
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.msg || "Failed to logout");
    }

    return data;
}