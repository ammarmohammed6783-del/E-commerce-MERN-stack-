import { Product } from "@/types/product";

interface CardProps {
    product: Product;
}

export default function OneProdPage({ product }: CardProps) {
    const productVariants = product?.variants ?? [];

    const averageRating =
        product.reviews.length > 0
            ? product.reviews.reduce(
                (sum, review) => sum + review.stars,
                0
            ) / product.reviews.length
            : 0;

    const cheapestVariant = productVariants.length
        ? productVariants.reduce((cheapest, variant) => {
            return variant.cost < cheapest.cost ? variant : cheapest;
        }, productVariants[0])
        : undefined;

    const discountedPrice = cheapestVariant
        ? cheapestVariant.cost -
        (cheapestVariant.cost * cheapestVariant.discount) / 100
        : 0;

    const colors = [...new Set(productVariants.map((variant) => variant.color))];

    const sizes = [...new Set(productVariants.map((variant) => variant.size))];

    return (
        <main className="min-h-[calc(100vh-100px)] bg-neutral-50 px-4 py-8 text-stone-950">
            <section className="mx-auto grid max-w-6xl grid-cols-1 gap-10 rounded-[2rem] border border-stone-200 bg-white p-8 shadow-[0_24px_80px_rgba(0,0,0,0.08)] md:grid-cols-[0.95fr_1.05fr] md:p-10">
                <div className="flex items-center justify-center gap-5">
                    <div className="flex min-h-110 flex-1 items-center justify-center rounded-[1.75rem] border border-stone-300 bg-linear-to-br from-stone-100 to-stone-200">
                        <div className="relative flex h-105 w-85 items-center justify-center rounded-[1rem] border-2 border-stone-300 bg-[radial-gradient(circle_at_center,#d6d3d1_0%,#e7e5e4_60%,#f5f5f4_100%)] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.05)]">
                            <span className="absolute left-8 top-8 h-12 w-12 rounded-full border border-stone-400 opacity-70" />
                            <span className="text-[9rem] text-stone-700 drop-shadow-md">👕</span>
                            <span className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full border border-stone-400 bg-white px-4 py-1 text-[11px] font-black uppercase tracking-[0.24em] text-stone-900">
                                {product.category}
                            </span>
                        </div>
                    </div>
                </div>

                <section className="flex flex-col justify-center">
                    <div className="mb-4">
                        <div className="mb-2 flex items-center gap-2">
                            <span className="text-2xl text-amber-500">
                                {"★".repeat(Math.round(averageRating))}
                                {"☆".repeat(5 - Math.round(averageRating))}
                            </span>
                            <span className="text-sm font-bold text-stone-500">
                                {averageRating.toFixed(1)}/5
                            </span>
                        </div>

                        <h1 className="max-w-xl text-4xl font-black leading-tight tracking-[-0.03em] text-stone-950 sm:text-5xl">
                            {product.itemName}
                        </h1>
                    </div>

                    <div className="mt-3 flex items-end gap-3">
                        <span className="text-[2.75rem] font-black leading-none tracking-[-0.03em] text-stone-950">
                            ${discountedPrice.toFixed(2)}
                        </span>
                        {cheapestVariant && (
                            <>
                                <span className="pb-1 text-2xl font-semibold text-stone-400 line-through">
                                    ${cheapestVariant.cost.toFixed(2)}
                                </span>
                                <span className="mb-1 rounded-full bg-rose-100 px-3 py-1 text-xs font-black text-rose-500">
                                    -{cheapestVariant.discount}%
                                </span>
                            </>
                        )}
                    </div>

                    <p className="mt-6 max-w-xl text-sm leading-7 text-stone-500">
                        {product.itemDesc}
                    </p>

                    <div className="mt-7">
                        <div className="mb-3 text-sm font-black uppercase tracking-[0.14em] text-stone-700">
                            Select Colors
                        </div>
                        <div className="flex flex-wrap gap-3">
                            {colors.length > 0 ? (
                                colors.map((color, index) => (
                                    <label
                                        key={color}
                                        className="group flex cursor-pointer items-center gap-2 rounded-full border border-stone-300 px-3 py-2 transition hover:bg-stone-50 hover:border-stone-900"
                                    >
                                        <input type="radio" name="color" value={color} className="sr-only" defaultChecked={index === 0} />
                                        <span className="h-6 w-6 rounded-full border border-white shadow-sm"
                                            style={{backgroundColor: color.toLowerCase() === "black" ? "#1c1917" : color.toLowerCase() === "green" ? "#586b35" : color.toLowerCase() === "tan" ? "#b19170" : color.toLowerCase() === "white" ? "#fff" : "#a8a29e"}}
                                        />
                                        <span className="text-xs font-semibold capitalize text-stone-700">
                                            {color}
                                        </span>
                                    </label>
                                ))
                            ) : (
                                <span className="text-sm text-stone-500">No colors available</span>
                            )}
                        </div>
                    </div>

                    <div className="mt-7">
                        <div className="mb-3 text-sm font-black uppercase tracking-[0.14em] text-stone-700">
                            Choose Size
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {sizes.length > 0 ? (
                                sizes.map((size) => (
                                    <label
                                        key={size}
                                        className="inline-flex min-w-21 cursor-pointer items-center justify-center rounded-xl border border-stone-300 bg-stone-100 px-4 py-2 text-sm font-bold text-stone-600 transition hover:bg-stone-900 hover:text-white"
                                    >
                                        <input type="radio" name="size" value={size} className="sr-only" />
                                        {size}
                                    </label>
                                ))
                            ) : (
                                <span className="text-sm text-stone-500">No sizes available</span>
                            )}
                        </div>
                    </div>

                    <div className="mt-8 flex items-center gap-4 border-t border-stone-200 pt-6">
                        <div className="flex items-center rounded-full border border-stone-300 bg-stone-50 px-3">
                            <button type="button" className="px-3 py-2 text-2xl font-light text-stone-700">−</button>
                            <span className="min-w-10 text-center text-lg font-black text-stone-950">1</span>
                            <button type="button" className="px-3 py-2 text-2xl font-light text-stone-700">+</button>
                        </div>

                        <button className="flex-1 rounded-xl bg-stone-950 px-7 py-3 text-sm font-black uppercase tracking-[0.16em] text-white transition hover:bg-stone-700">
                            Add to Cart
                        </button>
                    </div>
                </section>
            </section>
        </main>
    );
}