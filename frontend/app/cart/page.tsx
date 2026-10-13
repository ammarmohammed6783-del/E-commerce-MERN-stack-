"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, ImageOff, ShoppingBag, UserRound } from "lucide-react";
import { apiClient } from "@/lib/api-client";

// Change this to your store's currency symbol or code
const CURRENCY = "$";

type AccountUser = {
    userName: string;
};

type Money = number | string | { $numberDecimal: string };

type Product = {
    _id: string;
    name?: string;
    price?: Money;
    image?: string;
    images?: Array<string | { url: string }>;
};

type CartItem = {
    _id: string;
    product: Product | null; // null if the product was deleted after being added
    variant: {
        size: string;
        color: string;
    };
    quantity: number;
};

type Cart = {
    _id: string;
    items: CartItem[];
};

function toNumber(value: unknown): number {
    if (typeof value === "number") return value;
    if (typeof value === "string") return Number(value) || 0;
    if (value && typeof value === "object" && "$numberDecimal" in value) {
        return Number((value as { $numberDecimal: string }).$numberDecimal) || 0;
    }
    return 0;
}

function formatMoney(value: number): string {
    return `${CURRENCY}${value.toFixed(2)}`;
}

function getImage(product: Product | null): string | null {
    if (!product) return null;
    if (product.image) return product.image;
    const first = product.images?.[0];
    if (!first) return null;
    return typeof first === "string" ? first : first.url;
}

export default function CartPage() {
    const [user, setUser] = useState<AccountUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState("");
    const [items, setItems] = useState<CartItem[]>([]);
    const [isLoadingCart, setIsLoadingCart] = useState(false);
    const [cartError, setCartError] = useState("");

    useEffect(() => {
        let isActive = true;

        async function loadPage() {
            try {
                // Step 1: is the user signed in?
                const authResponse = await apiClient("/auth/me");

                if (authResponse.status === 401) {
                    if (isActive) setUser(null);
                    return;
                }

                const authData = await authResponse.json();
                if (!authResponse.ok) {
                    throw new Error(authData.msg || "Unable to check your sign-in status.");
                }

                if (!isActive) return;
                setUser(authData.loggedInUser as AccountUser);

                // Step 2: only now fetch the cart
                setIsLoadingCart(true);
                try {
                    const cartResponse = await apiClient("/cart");

                    if (!cartResponse.ok) {
                        throw new Error("Failed to load your cart.");
                    }

                    const cartData = await cartResponse.json();
                    // The API may send one cart object or an array of carts
                    const cart: Cart | undefined = Array.isArray(cartData)
                        ? cartData[0]
                        : cartData;

                    if (isActive) {
                        setItems(Array.isArray(cart?.items) ? cart.items : []);
                    }
                } catch (error) {
                    if (isActive) {
                        setCartError(
                            error instanceof Error ? error.message : "Failed to load your cart."
                        );
                    }
                } finally {
                    if (isActive) setIsLoadingCart(false);
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
                if (isActive) setIsLoading(false);
            }
        }

        loadPage();

        return () => {
            isActive = false;
        };
    }, []);

    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = items.reduce(
        (sum, item) => sum + toNumber(item.product?.price) * item.quantity,
        0
    );

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
                <div className="mb-8 flex items-end justify-between gap-4">
                    <div>
                        <p className="text-sm font-medium text-emerald-700">Your bag</p>
                        <h1 className="mt-1 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                            {user ? `${user.userName}'s cart` : "My cart"}
                        </h1>
                    </div>
                    {user && itemCount > 0 && (
                        <p className="pb-1 text-sm text-slate-500">
                            {itemCount} {itemCount === 1 ? "item" : "items"}
                        </p>
                    )}
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
                ) : !user ? (
                    <section className="mx-auto max-w-lg rounded-3xl border border-slate-100 bg-white p-8 text-center shadow-sm sm:p-10">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                            <UserRound className="h-7 w-7" aria-hidden="true" />
                        </div>
                        <h2 className="mt-5 text-2xl font-semibold tracking-tight text-slate-900">
                            Sign in to see your cart
                        </h2>
                        <p className="mt-2 text-sm leading-6 text-slate-500">
                            Your cart is saved to your account, so sign in to pick up where you left off.
                        </p>
                        <Link
                            href="/profile/login"
                            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
                        >
                            Sign in <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                    </section>
                ) : isLoadingCart ? (
                    <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
                        <div className="space-y-4">
                            <div className="h-32 animate-pulse rounded-3xl bg-white" />
                            <div className="h-32 animate-pulse rounded-3xl bg-white" />
                        </div>
                        <div className="h-64 animate-pulse rounded-3xl bg-white" />
                    </div>
                ) : cartError ? (
                    <section className="rounded-3xl border border-amber-100 bg-white p-8 text-center shadow-sm">
                        <h2 className="text-lg font-semibold text-slate-900">
                            We couldn’t load your cart
                        </h2>
                        <p role="alert" className="mt-2 text-sm text-amber-800">
                            {cartError}
                        </p>
                        <button
                            type="button"
                            onClick={() => window.location.reload()}
                            className="mt-5 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
                        >
                            Try again
                        </button>
                    </section>
                ) : items.length === 0 ? (
                    <section className="mx-auto max-w-lg rounded-3xl border border-dashed border-slate-200 bg-white px-6 py-12 text-center">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                            <ShoppingBag className="h-6 w-6" aria-hidden="true" />
                        </div>
                        <h2 className="mt-5 text-xl font-semibold text-slate-900">Your cart is empty</h2>
                        <p className="mx-auto mt-1 max-w-sm text-sm leading-6 text-slate-500">
                            Add something you like and it will wait for you here.
                        </p>
                        <Link
                            href="/products"
                            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
                        >
                            Browse products <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                    </section>
                ) : (
                    <div className="grid items-start gap-6 lg:grid-cols-[1fr_340px]">
                        {/* Items */}
                        <ul className="space-y-4">
                            {items.map((item) => {
                                const product = item.product;
                                const image = getImage(product);
                                const unitPrice = toNumber(product?.price);
                                const lineTotal = unitPrice * item.quantity;

                                return (
                                    <li
                                        key={item._id}
                                        className="flex gap-4 rounded-3xl border border-slate-100 bg-white p-4 shadow-sm sm:gap-5 sm:p-5"
                                    >
                                        <div className="h-28 w-24 shrink-0 overflow-hidden rounded-2xl bg-slate-100 sm:h-32 sm:w-28">
                                            {image ? (
                                                // eslint-disable-next-line @next/next/no-img-element
                                                <img
                                                    src={image}
                                                    alt={product?.name ?? "Product"}
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center text-slate-300">
                                                    <ImageOff className="h-6 w-6" aria-hidden="true" />
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex min-w-0 flex-1 flex-col justify-between">
                                            <div>
                                                <h3 className="truncate text-base font-semibold text-slate-900">
                                                    {product?.name ?? "This product is no longer available"}
                                                </h3>

                                                <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                                                    <span className="rounded-full bg-slate-100 px-2.5 py-1 font-medium text-slate-700">
                                                        Size {item.variant.size}
                                                    </span>
                                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 font-medium capitalize text-slate-700">
                                                        <span
                                                            className="h-3 w-3 rounded-full border border-slate-300"
                                                            style={{ backgroundColor: item.variant.color.toLowerCase() }}
                                                            aria-hidden="true"
                                                        />
                                                        {item.variant.color}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="mt-3 flex items-end justify-between gap-3">
                                                <p className="text-sm text-slate-500">
                                                    {item.quantity} × {formatMoney(unitPrice)}
                                                </p>
                                                <p className="text-base font-bold text-slate-900">
                                                    {formatMoney(lineTotal)}
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>

                        {/* Summary */}
                        <aside className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm lg:sticky lg:top-6">
                            <h2 className="text-lg font-semibold text-slate-900">Order summary</h2>

                            <dl className="mt-5 space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <dt className="text-slate-500">
                                        Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"})
                                    </dt>
                                    <dd className="font-medium text-slate-900">{formatMoney(subtotal)}</dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="text-slate-500">Shipping</dt>
                                    <dd className="text-slate-500">Calculated at checkout</dd>
                                </div>
                            </dl>

                            <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-5">
                                <span className="text-sm font-medium text-slate-900">Total</span>
                                <span className="text-2xl font-bold tracking-tight text-slate-900">
                                    {formatMoney(subtotal)}
                                </span>
                            </div>

                            <Link
                                href="/checkout"
                                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                            >
                                Go to checkout <ArrowRight className="h-4 w-4" aria-hidden="true" />
                            </Link>
                            <Link
                                href="/products"
                                className="mt-3 block text-center text-sm font-medium text-slate-500 transition hover:text-emerald-700"
                            >
                                Keep shopping
                            </Link>
                        </aside>
                    </div>
                )}
            </div>
        </main>
    );
}