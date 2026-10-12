"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Clock3, PackageCheck, UserRound } from "lucide-react";
import { apiClient } from "@/lib/api-client";

type AccountUser = {
    userName: string;
};

export default function CartPage() {
    const [user, setUser] = useState<AccountUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState("");

    useEffect(() => {
        let isActive = true;

        async function checkSignIn() {
            try {
                const response = await apiClient("/auth/me");

                if (response.status === 401) {
                    if (isActive) {
                        setUser(null);
                    }

                    return;
                }

                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.msg || "Unable to check your sign-in status.");
                }

                if (isActive) {
                    setUser(data.loggedInUser as AccountUser);
                }
            } catch (error) {
                if (isActive) {
                    setLoadError(
                        error instanceof Error
                            ? error.message
                            : "Unable to check your sign-in status."
                    );
                }
            } finally {
                if (isActive) {
                    setIsLoading(false);
                }
            }
        }

        checkSignIn();

        return () => {
            isActive = false;
        };
    }, []);

    if (isLoading) {
        return (
            <main className="flex-1 bg-[#f7f8f6]">
                <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
                    <div className="h-9 w-48 animate-pulse rounded-lg bg-slate-200" />
                    <div className="mt-8 h-64 animate-pulse rounded-3xl bg-white" />
                </div>
            </main>
        );
    }

    return (
        <main className="flex-1 bg-[#f7f8f6]">
            <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                <div className="mb-8">
                    <p className="text-sm font-medium text-emerald-700">Your account</p>
                    <h1 className="mt-1 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                        {user ? `${user.userName}'s orders` : "My orders"}
                    </h1>
                    <p className="mt-2 text-sm text-slate-500">
                        Track deliveries and review your purchase history.
                    </p>
                </div>

                {loadError ? (
                    <section className="rounded-3xl border border-amber-100 bg-white p-8 text-center shadow-sm">
                        <h2 className="text-lg font-semibold text-slate-900">
                            We couldn’t check your sign-in status
                        </h2>
                        <p role="alert" className="mt-2 text-sm text-amber-800">
                            {loadError}
                        </p>
                        <button
                            type="button"
                            onClick={() => window.location.reload()}
                            className="mt-5 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
                        >
                            Try again
                        </button>
                    </section>
                ) : user ? (
                    <section className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm sm:p-7">
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <h2 className="text-xl font-semibold text-slate-900">Order history</h2>
                                <p className="mt-1 text-sm text-slate-500">
                                    Your previous orders and delivery updates.
                                </p>
                            </div>
                            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                                <PackageCheck className="h-5 w-5" aria-hidden="true" />
                            </span>
                        </div>
                        <div className="mt-6 rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 px-5 py-8 text-center">
                            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white text-slate-400 shadow-sm">
                                <Clock3 className="h-5 w-5" aria-hidden="true" />
                            </div>
                            <h3 className="mt-4 font-semibold text-slate-900">No orders to show yet</h3>
                            <p className="mx-auto mt-1 max-w-sm text-sm leading-6 text-slate-500">
                                Your past orders, delivery status, item details, and totals will appear here.
                            </p>
                            <Link
                                href="/products"
                                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 transition hover:text-emerald-900"
                            >
                                Explore products <ArrowRight className="h-4 w-4" aria-hidden="true" />
                            </Link>
                        </div>
                    </section>
                ) : (
                    <section className="mx-auto max-w-lg rounded-3xl border border-slate-100 bg-white p-8 text-center shadow-sm sm:p-10">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                            <UserRound className="h-7 w-7" aria-hidden="true" />
                        </div>
                        <h2 className="mt-5 text-2xl font-semibold tracking-tight text-slate-900">
                            Sign in to view your orders
                        </h2>
                        <p className="mt-2 text-sm leading-6 text-slate-500">
                            Sign in first to see your order history and delivery updates.
                        </p>
                        <Link
                            href="/profile/login"
                            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
                        >
                            Sign in <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                    </section>
                )}
            </div>
        </main>
    );
}