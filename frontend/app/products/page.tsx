import Card from "@/components/Card";
import getProductByCategory from "@/features/products/services/getProductByCategory";
import Link from "next/link";

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{ category?: string | undefined }>;
}) {
    const { category } = await searchParams;
    const categoryProducts = await getProductByCategory(category);

    return (
        <main className="min-h-screen bg-stone-50">
            <section className="border-b border-stone-200 bg-white">
                <div className="mx-auto max-w-7xl px-4 pb-10 pt-12 sm:px-6 lg:px-8 lg:pb-14 lg:pt-16">
                    <div className="max-w-3xl">
                        <p className="text-xs font-bold uppercase tracking-[0.28em] text-emerald-700">
                            The collection
                        </p>
                        <h1 className="mt-3 text-4xl font-black tracking-tight text-stone-950 sm:text-5xl">
                            {category ? `${category} essentials` : "Everything worth wearing"}
                        </h1>
                        <p className="mt-4 max-w-2xl text-base leading-7 text-stone-500 sm:text-lg">
                            Thoughtfully chosen pieces for the moments that fill your calendar.
                            Find your next favorite in the edit below.
                        </p>
                    </div>

                    <nav aria-label="Product categories" className="mt-8 flex flex-wrap gap-2">
                        {["all", "casual", "formal", "gym", "party"].map((item) => {
                            const isActive = item === (category ?? "all");
                            const href = item === "all" ? "/products" : `/products?category=${item}`;

                            return (
                                <Link
                                    key={item}
                                    href={href}
                                    className={`rounded-full border px-4 py-2 text-sm font-semibold capitalize transition-colors ${isActive
                                        ? "border-stone-950 bg-stone-950 text-white"
                                        : "border-stone-200 bg-stone-50 text-stone-600 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-800"
                                        }`}
                                >
                                    {item}
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
                <div className="mb-8 flex flex-col gap-4 border-b border-stone-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="text-sm font-medium text-stone-500">
                            Showing {categoryProducts.length} {categoryProducts.length === 1 ? "piece" : "pieces"}
                        </p>
                        <h2 className="mt-1 text-2xl font-bold tracking-tight text-stone-950">
                            Curated for you
                        </h2>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-stone-500">
                        <span className="hidden sm:inline">Sort by</span>
                        <span className="rounded-lg border border-stone-200 bg-white px-3 py-2 font-semibold text-stone-700 shadow-sm">
                            Featured
                        </span>
                    </div>
                </div>

                <div className="grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:items-start">
                    <aside className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
                        <div className="flex items-center justify-between">
                            <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-stone-900">
                                Refine
                            </h2>
                            <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
                        </div>
                        <div className="mt-5 space-y-4 border-t border-stone-100 pt-5 text-sm text-stone-600">
                            <div className="flex items-center justify-between">
                                <span>Category</span>
                                <span className="font-semibold capitalize text-stone-900">{category ?? "All"}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span>Availability</span>
                                <span className="font-semibold text-stone-900">In stock</span>
                            </div>
                            <p className="pt-2 text-xs leading-5 text-stone-400">
                                Every piece is checked for quality before it joins the collection.
                            </p>
                        </div>
                    </aside>

                    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                        {categoryProducts.length > 0 ? (
                            categoryProducts.map((product) => (
                                <Card product={product} key={product._id} />
                            ))
                        ) : (
                            <div className="rounded-2xl border border-dashed border-stone-300 bg-white px-6 py-16 text-center sm:col-span-2 xl:col-span-3">
                                <p className="text-lg font-bold text-stone-900">Nothing here yet</p>
                                <p className="mt-2 text-sm text-stone-500">Try another category to keep browsing.</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
}