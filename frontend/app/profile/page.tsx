"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    ArrowRight,
    Camera,
    Check,
    Heart,
    LockKeyhole,
    LogOut,
    Mail,
    MapPin,
    ShieldCheck,
    UserRound,
    Eye,
    EyeOff,
} from "lucide-react";
import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api-client";

type AccountUser = {
    _id: string;
    userName: string;
    email: string;
    role: "user" | "admin" | "superAdmin";
};

const navigation = [
    { id: "personal-info", label: "Personal information", icon: UserRound },
    { id: "wishlist", label: "My wishlist", icon: Heart },
    { id: "settings", label: "Account settings", icon: ShieldCheck },
];

function getInitials(name: string) {
    return name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part[0])
        .join("")
        .toUpperCase();
}

export default function ProfilePage() {
    const router = useRouter();
    const [user, setUser] = useState<AccountUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState("");
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [logoutError, setLogoutError] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [passwordNotice, setPasswordNotice] = useState("");

    useEffect(() => {
        let isActive = true;

        async function loadAccount() {
            try {
                const response = await apiClient("/auth/me");
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.msg || "Unable to load your account.");
                }

                if (isActive) {
                    setUser(data.loggedInUser as AccountUser);
                }
            } catch (error) {
                if (isActive) {
                    setLoadError(
                        error instanceof Error
                            ? error.message
                            : "Unable to load your account."
                    );
                }
            } finally {
                if (isActive) {
                    setIsLoading(false);
                }
            }
        }

        loadAccount();

        return () => {
            isActive = false;
        };
    }, []);

    async function handleLogout() {
        setLogoutError("");
        setIsLoggingOut(true);

        try {
            const response = await apiClient("/auth/logout", {
                method: "POST",
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.msg || "Unable to log out.");
            }

            router.replace("/profile/login");
            router.refresh();
        } catch (error) {
            setLogoutError(
                error instanceof Error ? error.message : "Unable to log out."
            );
        } finally {
            setIsLoggingOut(false);
        }
    }

    function handlePasswordSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setPasswordNotice(
            "Password changes are not available yet. Please contact support for help."
        );
    }

    if (isLoading) {
        return (
            <main className="flex-1 bg-[#f7f8f6]">
                <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                    <div className="h-9 w-52 animate-pulse rounded-lg bg-slate-200" />
                    <div className="mt-8 h-72 animate-pulse rounded-3xl bg-white" />
                </div>
            </main>
        );
    }

    if (!user) {
        return (
            <main className="flex flex-1 items-center justify-center bg-[#f7f8f6] px-4 py-20">
                <div className="w-full max-w-md rounded-3xl border border-slate-100 bg-white p-8 text-center shadow-sm">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                        <UserRound className="h-7 w-7" aria-hidden="true" />
                    </div>
                    <h1 className="mt-5 text-2xl font-semibold tracking-tight text-slate-900">
                        Sign in to your account
                    </h1>
                    <p className="mt-2 text-sm leading-6 text-slate-500">
                        Your profile, orders, and saved items will be waiting for you.
                    </p>
                    {loadError && (
                        <p className="mt-4 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800">
                            {loadError}
                        </p>
                    )}
                    <Link
                        href="/profile/login"
                        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
                    >
                        Sign in <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="flex-1 bg-[#f7f8f6]">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                <div className="mb-8">
                    <p className="text-sm font-medium text-emerald-700">Your account</p>
                    <h1 className="mt-1 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                        Welcome back, {user.userName}
                    </h1>
                    <p className="mt-2 text-sm text-slate-500">
                        Manage your profile, orders, and account preferences.
                    </p>
                </div>

                <div className="grid gap-6 lg:grid-cols-[250px_minmax(0,1fr)]">
                    <aside className="h-fit rounded-3xl border border-slate-100 bg-white p-4 shadow-sm">
                        <div className="flex items-center gap-3 border-b border-slate-100 px-2 pb-5 pt-2">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-semibold text-emerald-800">
                                {getInitials(user.userName)}
                            </div>
                            <div className="min-w-0">
                                <p className="truncate text-sm font-semibold text-slate-900">
                                    {user.userName}
                                </p>
                                <p className="truncate text-xs text-slate-500">{user.email}</p>
                            </div>
                        </div>

                        <nav aria-label="Account navigation" className="mt-4 space-y-1">
                            {navigation.map(({ id, label, icon: Icon }, index) => (
                                <a
                                    key={id}
                                    href={`#${id}`}
                                    className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                                        index === 0
                                            ? "bg-emerald-50 text-emerald-800"
                                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                    }`}
                                >
                                    <Icon className="h-4.5 w-4.5" aria-hidden="true" />
                                    {label}
                                </a>
                            ))}
                        </nav>

                        <div className="mt-5 border-t border-slate-100 pt-4">
                            {logoutError && (
                                <p className="mb-3 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700">
                                    {logoutError}
                                </p>
                            )}
                            <button
                                type="button"
                                onClick={handleLogout}
                                disabled={isLoggingOut}
                                className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium text-rose-600 transition hover:bg-rose-50 disabled:cursor-wait disabled:opacity-60"
                            >
                                <LogOut className="h-4.5 w-4.5" aria-hidden="true" />
                                {isLoggingOut ? "Signing out..." : "Log out"}
                            </button>
                        </div>
                    </aside>

                    <div className="min-w-0 space-y-6">
                        <section
                            id="personal-info"
                            className="scroll-mt-6 rounded-3xl border border-slate-100 bg-white p-5 shadow-sm sm:p-7"
                        >
                            <div className="flex flex-wrap items-start justify-between gap-4">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">
                                        Account overview
                                    </p>
                                    <h2 className="mt-2 text-xl font-semibold text-slate-900">
                                        Personal information
                                    </h2>
                                    <p className="mt-1 text-sm text-slate-500">
                                        Your basic details and sign-in information.
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setIsEditing((editing) => !editing)}
                                    className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-800"
                                >
                                    {isEditing ? "Close" : "Edit profile"}
                                </button>
                            </div>

                            <div className="mt-7 flex flex-col gap-6 border-t border-slate-100 pt-6 sm:flex-row sm:items-center">
                                <div className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-emerald-100 to-teal-50 text-xl font-semibold text-emerald-800 ring-4 ring-emerald-50">
                                    {getInitials(user.userName)}
                                    <span className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-slate-100 text-slate-500">
                                        <Camera className="h-3.5 w-3.5" aria-hidden="true" />
                                    </span>
                                </div>
                                <div className="grid flex-1 gap-5 sm:grid-cols-2">
                                    <div>
                                        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                                            Username
                                        </p>
                                        <p className="mt-1.5 font-medium text-slate-900">{user.userName}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                                            Email address
                                        </p>
                                        <p className="mt-1.5 break-all font-medium text-slate-900">{user.email}</p>
                                    </div>
                                </div>
                            </div>

                            {isEditing && (
                                <div className="mt-6 rounded-2xl border border-amber-100 bg-amber-50/70 p-4 text-sm leading-6 text-amber-900">
                                    Profile editing and profile photos are not supported by the account service yet.
                                </div>
                            )}

                            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-slate-50 p-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-500 shadow-sm">
                                        <LockKeyhole className="h-5 w-5" aria-hidden="true" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-slate-900">Password & security</p>
                                        <p className="text-xs text-slate-500">Keep your account secure</p>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsChangingPassword((changing) => !changing);
                                        setPasswordNotice("");
                                    }}
                                    className="text-sm font-semibold text-emerald-700 hover:text-emerald-900"
                                >
                                    {isChangingPassword ? "Close" : "Change password"}
                                </button>
                            </div>

                            {isChangingPassword && (
                                <form
                                    onSubmit={handlePasswordSubmit}
                                    className="mt-4 rounded-2xl border border-slate-200 p-4 sm:p-5"
                                >
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        {["Current password", "New password"].map((label) => (
                                            <label key={label} className="block">
                                                <span className="mb-2 block text-sm font-medium text-slate-700">
                                                    {label}
                                                </span>
                                                <div className="relative">
                                                    <input
                                                        type={showPassword ? "text" : "password"}
                                                        autoComplete={
                                                            label === "Current password"
                                                                ? "current-password"
                                                                : "new-password"
                                                        }
                                                        className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 pr-11 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                                                        placeholder="Enter password"
                                                    />
                                                    {label === "New password" && (
                                                        <button
                                                            type="button"
                                                            onClick={() => setShowPassword((show) => !show)}
                                                            aria-label={showPassword ? "Hide password" : "Show password"}
                                                            className="absolute inset-y-0 right-0 flex items-center px-3 text-slate-400 hover:text-slate-700"
                                                        >
                                                            {showPassword ? (
                                                                <EyeOff className="h-4 w-4" aria-hidden="true" />
                                                            ) : (
                                                                <Eye className="h-4 w-4" aria-hidden="true" />
                                                            )}
                                                        </button>
                                                    )}
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                    <div className="mt-4 flex flex-wrap items-center gap-3">
                                        <button
                                            type="submit"
                                            className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
                                        >
                                            Update password
                                        </button>
                                        <p className="text-xs text-slate-500">
                                            Password changes are not available yet.
                                        </p>
                                    </div>
                                    {passwordNotice && (
                                        <p role="status" className="mt-3 text-sm text-amber-800">
                                            {passwordNotice}
                                        </p>
                                    )}
                                </form>
                            )}
                        </section>

                        <section
                            id="wishlist"
                            className="scroll-mt-6 rounded-3xl border border-slate-100 bg-white p-5 shadow-sm sm:p-7"
                        >
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <h2 className="text-xl font-semibold text-slate-900">My wishlist</h2>
                                    <p className="mt-1 text-sm text-slate-500">
                                        Keep the pieces you love close by.
                                    </p>
                                </div>
                                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-rose-50 text-rose-600">
                                    <Heart className="h-5 w-5" aria-hidden="true" />
                                </span>
                            </div>
                            <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-2xl bg-rose-50/60 p-5 sm:flex-row">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-rose-500">
                                        <Heart className="h-5 w-5" aria-hidden="true" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-900">Your wishlist is waiting</h3>
                                        <p className="mt-1 text-sm text-slate-500">
                                            Saved products will show up here.
                                        </p>
                                    </div>
                                </div>
                                <Link
                                    href="/products"
                                    className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:text-emerald-800"
                                >
                                    Browse products <ArrowRight className="h-4 w-4" aria-hidden="true" />
                                </Link>
                            </div>
                            <p className="mt-4 text-xs text-slate-400">
                                Wishlist saving is not connected to your account yet.
                            </p>
                        </section>

                        <section
                            id="settings"
                            className="scroll-mt-6 rounded-3xl border border-slate-100 bg-white p-5 shadow-sm sm:p-7"
                        >
                            <div>
                                <h2 className="text-xl font-semibold text-slate-900">Account settings</h2>
                                <p className="mt-1 text-sm text-slate-500">
                                    Your contact details and delivery preferences.
                                </p>
                            </div>
                            <div className="mt-6 grid gap-4 sm:grid-cols-2">
                                <div className="rounded-2xl border border-slate-100 p-4">
                                    <div className="flex items-center gap-3">
                                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-700">
                                            <Mail className="h-5 w-5" aria-hidden="true" />
                                        </span>
                                        <div>
                                            <p className="text-sm font-semibold text-slate-900">Contact information</p>
                                            <p className="mt-0.5 text-xs text-slate-500">Email associated with your account</p>
                                        </div>
                                    </div>
                                    <p className="mt-4 break-all text-sm text-slate-700">{user.email}</p>
                                    <p className="mt-2 flex items-center gap-1.5 text-xs text-emerald-700">
                                        <Check className="h-3.5 w-3.5" aria-hidden="true" />
                                        Account email
                                    </p>
                                </div>
                                <div className="rounded-2xl border border-slate-100 p-4">
                                    <div className="flex items-center gap-3">
                                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-700">
                                            <MapPin className="h-5 w-5" aria-hidden="true" />
                                        </span>
                                        <div>
                                            <p className="text-sm font-semibold text-slate-900">Shipping addresses</p>
                                            <p className="mt-0.5 text-xs text-slate-500">Manage where we deliver</p>
                                        </div>
                                    </div>
                                    <p className="mt-4 text-sm text-slate-500">No saved addresses yet.</p>
                                    <p className="mt-2 text-xs text-slate-400">
                                        Address management is not available yet.
                                    </p>
                                </div>
                            </div>

                            <div className="mt-4 flex flex-col justify-between gap-4 rounded-2xl bg-slate-50 p-4 sm:flex-row sm:items-center">
                                <div className="flex items-center gap-3">
                                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-emerald-700 shadow-sm">
                                        <ShieldCheck className="h-5 w-5" aria-hidden="true" />
                                    </span>
                                    <div>
                                        <p className="text-sm font-semibold text-slate-900">Account status</p>
                                        <p className="text-xs text-slate-500">Signed in as {user.role}</p>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    disabled={isLoggingOut}
                                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-rose-200 hover:text-rose-700 disabled:opacity-60"
                                >
                                    <LogOut className="h-4 w-4" aria-hidden="true" />
                                    {isLoggingOut ? "Signing out..." : "Log out"}
                                </button>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </main>
    );
}
