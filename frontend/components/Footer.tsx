import { FaGithub } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { FaTwitter } from "react-icons/fa6";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="border-t border-gray-200 bg-gray-100 text-gray-700">
            <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr] lg:px-8">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-gray-950">Buy me</h2>
                    <p className="mt-4 max-w-sm text-sm leading-6 text-gray-600">
                        We have clothes that suit your style and that you are proud to wear, from women to men.
                    </p>
                    <div className="mt-6 flex items-center gap-3">
                        <a
                            href="https://github.com"
                            aria-label="GitHub"
                            title="GitHub"
                            className="rounded-full border border-gray-300 p-2.5 transition-colors hover:border-emerald-500 hover:bg-emerald-400 hover:text-gray-950"
                        >
                            <FaGithub className="h-4 w-4" aria-hidden="true" />
                        </a>
                        <a
                            href="https://facebook.com"
                            aria-label="Facebook"
                            title="Facebook"
                            className="rounded-full border border-gray-300 p-2.5 transition-colors hover:border-emerald-500 hover:bg-emerald-400 hover:text-gray-950"
                        >
                            <FaFacebook className="h-4 w-4" aria-hidden="true" />
                        </a>
                        <a
                            href="https://instagram.com"
                            aria-label="Instagram"
                            title="Instagram"
                            className="rounded-full border border-gray-300 p-2.5 transition-colors hover:border-emerald-500 hover:bg-emerald-400 hover:text-gray-950"
                        >
                            <RiInstagramFill className="h-4 w-4" aria-hidden="true" />
                        </a>
                        <a
                            href="https://twitter.com"
                            aria-label="Twitter"
                            title="Twitter"
                            className="rounded-full border border-gray-300 p-2.5 transition-colors hover:border-emerald-500 hover:bg-emerald-400 hover:text-gray-950"
                        >
                            <FaTwitter className="h-4 w-4" aria-hidden="true" />
                        </a>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-8 sm:max-w-sm sm:justify-self-end">
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-950">Shop</h3>
                        <nav className="mt-4 flex flex-col gap-3 text-sm">
                            <Link className="transition-colors hover:text-emerald-400" href="/">
                                New Arrivals
                            </Link>
                            <Link className="transition-colors hover:text-emerald-400" href="/cart">
                                Cart
                            </Link>
                        </nav>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-950">Account</h3>
                        <nav className="mt-4 flex flex-col gap-3 text-sm">
                            <Link className="transition-colors hover:text-emerald-400" href="/profile">
                                Profile
                            </Link>
                            <Link className="transition-colors hover:text-emerald-400" href="/cart">
                                Shopping bag
                            </Link>
                        </nav>
                    </div>
                </div>
            </div>
            <div className="border-t border-gray-200">
                <p className="mx-auto max-w-7xl px-4 py-5 text-xs text-gray-500 sm:px-6 lg:px-8">
                    Buy me &copy; 2026. All rights reserved.
                </p>
            </div>
        </footer>
    )
}
