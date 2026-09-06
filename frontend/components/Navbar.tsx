import { IoCartOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import Link from "next/link";

export default function Navbar() {
    return (
        <header className="border-b border-slate-200 bg-white">
            <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-4 px-4 py-4 sm:px-6 lg:px-8">
                <Link
                    href="/"
                    className="text-2xl font-bold tracking-tight text-slate-900 transition-colors hover:text-emerald-600"
                >
                    Buy me
                </Link>

                <nav className="order-3 flex w-full items-center gap-5 text-sm font-medium text-slate-600 md:order-2 md:w-auto">
                    <Link className="transition-colors hover:text-emerald-600" href="/cart">
                        New Arrivals
                    </Link>
                    <Link className="transition-colors hover:text-emerald-600" href="/cart">
                        Cart
                    </Link>
                </nav>

                <form className="order-2 ml-auto flex min-w-0 flex-1 md:order-3 md:max-w-sm" role="search">
                    <label htmlFor="product-search" className="sr-only">
                        Search for products
                    </label>
                    <input
                        id="product-search"
                        type="search"
                        placeholder="Search for products..."
                        className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100"
                    />
                </form>

                <div className="order-1 ml-auto flex items-center gap-1 text-slate-700 md:order-4">
                    <Link
                        href="/cart"
                        aria-label="Shopping cart"
                        className="rounded-lg p-2 transition-colors hover:bg-emerald-50 hover:text-emerald-600"
                    >
                        <IoCartOutline className="h-6 w-6" aria-hidden="true" />
                    </Link>
                    <Link
                        href="/profile"
                        aria-label="Profile"
                        className="rounded-lg p-2 transition-colors hover:bg-emerald-50 hover:text-emerald-600"
                    >
                        <CgProfile className="h-6 w-6" aria-hidden="true" />
                    </Link>
                </div>
            </div>
        </header>
    )
}
