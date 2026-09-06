export default function StayUpdated() {
    return (
        <section className="mx-auto w-[80%] overflow-hidden rounded-2xl bg-black text-white">
            <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-12 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400">Stay updated</p>
                    <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                        Stay up to date with our latest offers
                    </h1>
                    <p className="mt-2 max-w-xl text-sm text-gray-400">
                        Sign up for new arrivals, exclusive offers, and style inspiration.
                    </p>
                </div>
                <form className="flex w-full max-w-md flex-col gap-3 sm:flex-row" action="#">
                    <label htmlFor="newsletter-email" className="sr-only">
                        Email address
                    </label>
                    <input
                        id="newsletter-email"
                        type="email"
                        placeholder="Enter your email"
                        className="min-w-0 flex-1 rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/30"
                    />
                    <button
                        type="submit"
                        className="rounded-lg bg-emerald-400 px-5 py-3 text-sm font-semibold text-gray-950 transition-colors hover:bg-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-offset-2 focus:ring-offset-black"
                    >
                        Subscribe
                    </button>
                </form>
            </div>
        </section>
    )
}
