import { cookies } from "next/headers";

const API_URL = "http://localhost:3001";

export async function apiServer(
    endpoint: string,
    options?: RequestInit
) {
    const cookieStore = await cookies();

    const cookieHeader = cookieStore
        .getAll()
        .map(({ name, value }) => `${name}=${value}`)
        .join("; ");

    return fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            Cookie: cookieHeader,
            ...options?.headers,
        },
    });
}