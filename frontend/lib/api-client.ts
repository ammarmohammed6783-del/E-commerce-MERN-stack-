const API_URL = "http://localhost:3001";

export async function apiClient(
    endpoint: string,
    options?: RequestInit
) {
    const accessToken = localStorage.getItem("accessToken");

    return fetch(`${API_URL}${endpoint}`, {
        ...options,
        credentials: "include",
        headers: {
            "Content-Type": "application/json",

            ...(accessToken
                ? { Authorization: `Bearer ${accessToken}` }
                : {}),

            ...options?.headers,
        },
    });
}