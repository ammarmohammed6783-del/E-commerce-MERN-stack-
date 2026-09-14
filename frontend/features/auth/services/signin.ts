import { apiFetch } from "@/lib/api";

export default async function signin(
    email: string,
    password: string
) {
    const response = await apiFetch("/auth/signin", {
        method: "POST",
        body: JSON.stringify({
            email,
            password,
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.msg || "Failed to sign in");
    }

    // Save the short-lived access token
    localStorage.setItem("accessToken", data.accessToken);

    return data;
}