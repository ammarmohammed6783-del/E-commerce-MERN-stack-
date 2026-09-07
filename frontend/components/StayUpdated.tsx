export default function StayUpdated() {
    return (
        <section className="relative mx-auto my-16 w-[calc(100%-2rem)] max-w-7xl overflow-hidden rounded-[2rem] bg-stone-950 text-white shadow-[0_24px_60px_rgb(28,25,23,0.16)] sm:w-[calc(100%-3rem)] lg:my-24">
            <div className="absolute -right-24 -top-28 h-72 w-72 rounded-full border-34 border-emerald-400/20" aria-hidden="true" />
            <div className="absolute -bottom-36 left-1/3 h-72 w-72 rounded-full border-20 border-amber-300/10" aria-hidden="true" />

            <div className="relative grid gap-10 px-6 py-10 sm:px-10 sm:py-12 lg:grid-cols-[1fr_auto] lg:items-center lg:px-16 lg:py-14">
                <div className="max-w-2xl">
                    <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-emerald-300">
                        <span className="h-px w-8 bg-emerald-300" aria-hidden="true" />
                        Stay updated
                    </p>
                    <h1 className="mt-4 max-w-xl text-3xl font-black uppercase leading-[0.95] tracking-tight sm:text-5xl">
                        Good things, straight to your inbox.
                    </h1>
                    <p className="mt-5 max-w-lg text-sm leading-6 text-stone-300 sm:text-base">
                        Get first access to new arrivals, considered offers, and style inspiration worth opening.
                    </p>
                </div>

                <form className="w-full max-w-xl lg:min-w-104" action="#">
                    <label htmlFor="newsletter-email" className="sr-only">
                        Email address
                    </label>
                    <div className="flex flex-col gap-2 rounded-2xl border border-white/15 bg-white/10 p-2 backdrop-blur-sm sm:flex-row">
                        <input
                            id="newsletter-email"
                            type="email"
                            placeholder="Enter your email"
                            className="min-w-0 flex-1 rounded-xl border border-transparent bg-transparent px-4 py-3 text-sm text-white outline-none transition placeholder:text-stone-400 focus:border-emerald-300/60 focus:bg-white/5 focus:ring-2 focus:ring-emerald-300/20"
                        />
                        <button
                            type="submit"
                            className="rounded-xl bg-emerald-300 px-6 py-3 text-sm font-bold text-stone-950 transition hover:bg-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:ring-offset-2 focus:ring-offset-stone-950"
                        >
                            Subscribe
                        </button>
                    </div>
                    <p className="mt-3 px-1 text-xs text-stone-400">No noise. Unsubscribe whenever you like.</p>
                </form>
            </div>
        </section>
    )
}
