
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/api-client";

export default function LogoutPage() {
    const router = useRouter();

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleLogout() {
        setError("");
        setLoading(true);

        try {
            const response = await apiClient("/auth/logout", {
                method: "POST",
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.msg || "Logout failed");
            }

            router.replace("/login");
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
            <div className="w-full max-w-md space-y-5 rounded-xl bg-white p-8 text-center shadow">
                <h1 className="text-3xl font-bold">Logout</h1>

                <p>Are you sure you want to log out?</p>

                {error && <p className="text-sm text-red-600">{error}</p>}

                <button
                    onClick={handleLogout}
                    disabled={loading}
                    className="w-full rounded-lg bg-red-600 p-3 text-white disabled:opacity-50"
                >
                    {loading ? "Logging out..." : "Confirm Logout"}
                </button>

                <button
                    onClick={() => router.back()}
                    disabled={loading}
                    className="w-full rounded-lg border p-3"
                >
                    Cancel
                </button>
            </div>
        </main>
    );
}
