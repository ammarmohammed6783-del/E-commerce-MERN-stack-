import { apiFetch } from "@/lib/api";

export default async function getMe() {
    const accessToken = localStorage.getItem("accessToken");

    const response = await apiFetch("/auth/me", {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.msg || "Failed to get user");
    }

    return data.loggedInUser;
}