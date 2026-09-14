const API_URL = "http://localhost:3001";

export async function apiClient(
    endpoint: string,
    options?: RequestInit
) {
    return fetch(`${API_URL}${endpoint}`, {
        ...options,
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            ...options?.headers,
        },
    });
}