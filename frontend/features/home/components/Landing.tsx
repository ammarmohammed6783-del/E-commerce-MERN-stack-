export default function Landing() {
    return (
        <main className="flex h-[calc(100svh-5rem)] min-h-0 flex-col overflow-hidden bg-stone-50 text-gray-950">
            <section className="mx-auto flex min-h-0 w-full max-w-7xl flex-1 flex-col justify-center gap-8 px-4 py-6 sm:px-6 md:gap-10 md:py-8 lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-8">
                <div>
                    <p className="mb-6 text-sm font-semibold uppercase tracking-[0.25em] text-emerald-700">
                        New season / 2026
                    </p>
                    <h1 className="max-w-3xl text-4xl font-black uppercase leading-[0.95] tracking-tight sm:text-5xl lg:text-6xl">
                        Find clothes that match your style
                    </h1>
                    <p className="mt-5 max-w-xl text-sm leading-6 text-gray-600 sm:text-base">
                        Browse our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.
                    </p>
                    <button
                        type="button"
                        className="mt-6 inline-flex items-center rounded-full bg-gray-950 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                    >
                        Shop now
                        <span className="ml-3 text-lg" aria-hidden="true">-&gt;</span>
                    </button>

                    <div className="mt-8 grid max-w-2xl grid-cols-3 border-t border-gray-300 pt-4">
                        <div className="pr-3">
                            <h3 className="text-xl font-bold sm:text-2xl">200+</h3>
                            <p className="mt-1 text-xs uppercase leading-5 tracking-wide text-gray-500 sm:text-sm">International brands</p>
                        </div>
                        <div className="border-l border-gray-300 px-4">
                            <h3 className="text-xl font-bold sm:text-2xl">2,000+</h3>
                            <p className="mt-1 text-xs uppercase leading-5 tracking-wide text-gray-500 sm:text-sm">High-quality products</p>
                        </div>
                        <div className="border-l border-gray-300 pl-4">
                            <h3 className="text-xl font-bold sm:text-2xl">30,000+</h3>
                            <p className="mt-1 text-xs uppercase leading-5 tracking-wide text-gray-500 sm:text-sm">Happy customers</p>
                        </div>
                    </div>
                </div>

                <div className="relative min-h-[200px] overflow-hidden rounded-[2rem] bg-gray-200 p-6 sm:min-h-[280px] lg:min-h-[420px]">
                    <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full border-[36px] border-emerald-300/70" aria-hidden="true" />
                    <div className="absolute bottom-8 left-8 right-8 top-8 border border-white/70" aria-hidden="true" />
                    <div className="relative flex h-full flex-col justify-between">
                        <p className="text-xs font-bold uppercase tracking-[0.3em] text-gray-700">The everyday edit</p>
                        <div className="max-w-xs self-end text-right">
                            <p className="text-6xl font-black uppercase leading-none text-gray-950 sm:text-8xl">Wear</p>
                            <p className="text-6xl font-black uppercase leading-none text-emerald-700 sm:text-8xl">well</p>
                        </div>
                    </div>
                </div>
            </section>

            <div className="bg-gray-950 text-white">
                <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-8 gap-y-4 px-4 py-7 sm:px-6 lg:px-8">
                    <p className="text-lg font-black tracking-tight sm:text-xl">VERSACE</p>
                    <p className="text-lg font-bold tracking-tight sm:text-xl">ZARA</p>
                    <p className="text-lg font-black tracking-tight sm:text-xl">PRADA</p>
                    <p className="text-lg font-bold tracking-tight sm:text-xl">CALVIN KLEIN</p>
                </div>
            </div>
        </main>
    )
}
