import { apiFetch } from "@/lib/api";

export default async function register(
    email: string,
    password: string,
    userName: string
) {
    const response = await apiFetch("/auth/register", {
        method: "POST",
        body: JSON.stringify({
            email,
            password,
            userName,
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.msg || "Failed to register");
    }

    localStorage.setItem("accessToken", data.accessToken);

    return data;
}