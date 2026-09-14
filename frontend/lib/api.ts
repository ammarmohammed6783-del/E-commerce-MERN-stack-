const API_URL = "http://localhost:3001";

export async function apiFetch(
    endpoint: string,
    options?: RequestInit
) {
    const accessToken = localStorage.getItem("accessToken");

    return fetch(`${API_URL}${endpoint}`, {
        ...options,
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            ...(accessToken && {
                Authorization: `Bearer ${accessToken}`,
            }),
            ...options?.headers,
        },
    });
}

// In your project, lib should contain general-purpose code that is not specific to one feature.

/*
const obj = {
    headers: "FIRST",
    headers: "SECOND"
};

console.log(obj.headers);
*/