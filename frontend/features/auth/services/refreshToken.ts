import { apiFetch } from "@/lib/api";

export default async function refreshToken() {
    const response = await apiFetch("/auth/refresh", {
        method: "POST",
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.msg || "Session expired");
    }

    localStorage.setItem("accessToken", data.newAccessToken);

    return data.newAccessToken;
}