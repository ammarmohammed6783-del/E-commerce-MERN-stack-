import { apiFetch } from "@/lib/api";

export default async function logout() {
    const response = await apiFetch("/auth/logout", {
        method: "POST",
    });

    if (!response.ok) {
        throw new Error("Failed to logout");
    }

    localStorage.removeItem("accessToken");
}