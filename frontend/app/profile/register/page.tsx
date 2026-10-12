
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/api-client";

export default function RegisterPage() {
    const router = useRouter();

    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await apiClient("/auth/register", {
                method: "POST",
                body: JSON.stringify({ userName, email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.msg || "Registration failed");
            }

            // The backend sets the cookies automatically.
            router.replace("/");
            router.refresh();
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
            <form
                onSubmit={handleRegister}
                className="w-full max-w-md space-y-5 rounded-xl bg-white p-8 shadow"
            >
                <h1 className="text-3xl font-bold">Create Account</h1>

                <div>
                    <label htmlFor="userName" className="mb-2 block">
                        Username
                    </label>
                    <input
                        id="userName"
                        type="text"
                        autoComplete="username"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        required
                        className="w-full rounded-lg border p-3"
                    />
                </div>

                <div>
                    <label htmlFor="email" className="mb-2 block">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full rounded-lg border p-3"
                    />
                </div>

                <div>
                    <label htmlFor="password" className="mb-2 block">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        autoComplete="new-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={8}
                        className="w-full rounded-lg border p-3"
                    />
                </div>

                {error && <p className="text-sm text-red-600">{error}</p>}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-lg bg-black p-3 text-white disabled:opacity-50"
                >
                    {loading ? "Creating account..." : "Register"}
                </button>

                <p className="text-center text-sm">
                    Already registered? <a href="/login" className="underline">Login</a>
                </p>
            </form>
        </main>
    );
}
