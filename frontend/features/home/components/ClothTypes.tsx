export default function ClothTypes() {
    return (
        <section className="bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
            <div className="mx-auto max-w-7xl">
                <div className="mb-8 flex items-end justify-between gap-6 border-b border-stone-200 pb-5">
                    <h1 className="text-3xl font-black uppercase tracking-tight text-stone-950 sm:text-4xl">
                        Browse by dress style
                    </h1>
                    <span className="hidden text-xs font-bold uppercase tracking-[0.2em] text-emerald-700 sm:block">
                        Find your fit
                    </span>
                </div>

                <div className="grid grid-cols-1 gap-5 lg:grid-cols-5">
                    <div className="group relative min-h-56 overflow-hidden rounded-[2rem] border border-stone-200 bg-stone-200 shadow-[0_12px_30px_rgb(28,25,23,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgb(28,25,23,0.14)] sm:min-h-64 lg:col-span-3">
                        <div className="absolute inset-0 z-10 bg-linear-to-t from-black/25 via-transparent to-transparent" />
                        <p className="absolute bottom-5 left-5 z-20 rounded-2xl bg-white px-5 py-3 text-xl font-black uppercase tracking-tight text-black shadow-lg sm:text-2xl">
                            Casual
                        </p>
                        <img
                            src="/img/casual.jpg"
                            alt="Casual clothing"
                            className="h-full min-h-56 w-full object-cover transition duration-700 group-hover:scale-105 sm:min-h-64"
                        />
                    </div>
                    <div className="group relative min-h-56 overflow-hidden rounded-[2rem] border border-stone-200 bg-stone-200 shadow-[0_12px_30px_rgb(28,25,23,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgb(28,25,23,0.14)] sm:min-h-64 lg:col-span-2">
                        <div className="absolute inset-0 z-10 bg-linear-to-t from-black/25 via-transparent to-transparent" />
                        <p className="absolute bottom-5 left-5 z-20 rounded-2xl bg-white px-5 py-3 text-xl font-black uppercase tracking-tight text-black shadow-lg sm:text-2xl">
                            Formal
                        </p>
                        <img
                            src="/img/formal.jpg"
                            alt="Formal clothing"
                            className="h-full min-h-56 w-full object-cover transition duration-700 group-hover:scale-105 sm:min-h-64"
                        />
                    </div>
                    <div className="group relative min-h-56 overflow-hidden rounded-[2rem] border border-stone-200 bg-stone-200 shadow-[0_12px_30px_rgb(28,25,23,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgb(28,25,23,0.14)] sm:min-h-64 lg:col-span-2">
                        <div className="absolute inset-0 z-10 bg-linear-to-t from-black/25 via-transparent to-transparent" />
                        <p className="absolute bottom-5 left-5 z-20 rounded-2xl bg-white px-5 py-3 text-xl font-black uppercase tracking-tight text-black shadow-lg sm:text-2xl">
                            Party
                        </p>
                        <img
                            src="/img/party.jpg"
                            alt="Party clothing"
                            className="h-full min-h-56 w-full object-cover transition duration-700 group-hover:scale-105 sm:min-h-64"
                        />
                    </div>
                    <div className="group relative min-h-56 overflow-hidden rounded-[2rem] border border-stone-200 bg-stone-200 shadow-[0_12px_30px_rgb(28,25,23,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgb(28,25,23,0.14)] sm:min-h-64 lg:col-span-3">
                        <div className="absolute inset-0 z-10 bg-linear-to-t from-black/25 via-transparent to-transparent" />
                        <p className="absolute bottom-5 left-5 z-20 rounded-2xl bg-white px-5 py-3 text-xl font-black uppercase tracking-tight text-black shadow-lg sm:text-2xl">
                            Gym
                        </p>
                        <img
                            src="/img/gym.jpg"
                            alt="Gym clothing"
                            className="h-full min-h-56 w-full object-cover transition duration-700 group-hover:scale-105 sm:min-h-64"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
