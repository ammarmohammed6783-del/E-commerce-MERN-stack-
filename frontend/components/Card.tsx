import type { Product } from "@/types/product";

interface CardProps {
    product: Product;
}

export default function Card({ product }: CardProps) {
    // Find the cheapest variant
    const cheapestVariant = product.variants.reduce((cheapest, variant) => {
        return variant.cost < cheapest.cost ? variant : cheapest;
    }, product.variants[0]);

    const visibleVariants = product.variants.slice(0, 3);

    // Calculate average rating
    const averageRating =
        product.reviews.length > 0
            ? product.reviews.reduce((sum, review) => sum + review.stars, 0) /
            product.reviews.length
            : 0;

    // Calculate discounted price
    const discountedPrice = cheapestVariant
        ? cheapestVariant.cost -
        (cheapestVariant.cost * cheapestVariant.discount) / 100
        : 0;

    return (
        <article className="group flex h-full w-full flex-col overflow-hidden rounded-[1.5rem] border border-stone-200 bg-white shadow-[0_8px_30px_rgb(28,25,23,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-[0_18px_40px_rgb(28,25,23,0.12)]">

            {/* Image placeholder */}
            <div className="relative flex h-72 items-center justify-center overflow-hidden bg-linear-to-br from-stone-200 via-stone-100 to-emerald-100/70">
                <div className="absolute h-44 w-44 rounded-full border-18 border-white/60 transition-transform duration-500 group-hover:scale-110" aria-hidden="true" />
                <span className="relative text-6xl drop-shadow-sm transition-transform duration-500 group-hover:scale-110">👕</span>

                {/* Discount badge */}
                {cheapestVariant?.discount > 0 && (
                    <span className="absolute left-4 top-4 rounded-full bg-rose-600 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white shadow-sm">
                        -{cheapestVariant.discount}%
                    </span>
                )}

                {/* Category */}
                <span className="absolute right-4 top-4 rounded-full border border-white/70 bg-white/80 px-3 py-1 text-xs font-semibold capitalize text-stone-700 shadow-sm backdrop-blur-sm">
                    {product.category}
                </span>
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-6">

                {/* Product name */}
                <h2 className="truncate text-xl font-bold tracking-tight text-stone-950">
                    {product.itemName}
                </h2>

                {/* Description */}
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-stone-500">
                    {product.itemDesc}
                </p>

                {/* Rating */}
                <div className="mt-4 flex items-center gap-2">
                    <div className="flex text-amber-500">
                        {"★".repeat(Math.round(averageRating))}
                        {"☆".repeat(5 - Math.round(averageRating))}
                    </div>

                    <span className="text-xs font-medium text-stone-500">
                        {product.reviews.length > 0
                            ? `${averageRating.toFixed(1)} (${product.reviews.length})`
                            : "No reviews"}
                    </span>
                </div>

                {/* Price */}
                {cheapestVariant && (
                    <div className="mt-5 flex items-end gap-3">
                        <span className="text-2xl font-black tracking-tight text-stone-950">
                            ${discountedPrice.toFixed(2)}
                        </span>

                        {cheapestVariant.discount > 0 && (
                            <span className="mb-1 text-sm text-stone-400 line-through">
                                ${cheapestVariant.cost.toFixed(2)}
                            </span>
                        )}
                    </div>
                )}

                {/* Available variants */}
                <div className="mt-5 rounded-2xl border border-stone-200 bg-stone-50/80 p-3">
                    <div className="flex items-center justify-between gap-3 px-1 pb-2">
                        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-stone-500">
                            Available options
                        </p>
                        <span className="text-xs font-medium text-stone-400">
                            {product.variants.length} {product.variants.length === 1 ? "option" : "options"}
                        </span>
                    </div>

                    <div className="space-y-2">
                        {visibleVariants.map((variant) => {
                            const variantPrice = variant.cost - (variant.cost * variant.discount) / 100;

                            return (
                                <div
                                    key={`${variant.color}-${variant.size}-${variant.cost}`}
                                    className="flex items-center justify-between gap-3 rounded-xl border border-stone-200/80 bg-white px-3 py-2.5 shadow-sm"
                                >
                                    <div className="flex min-w-0 items-center gap-2.5">
                                        <span
                                            className="h-3 w-3 shrink-0 rounded-full border border-stone-300 bg-stone-300 shadow-inner"
                                            title={`${variant.color} color`}
                                            aria-label={`${variant.color} color`}
                                        />
                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-semibold capitalize text-stone-800">
                                                {variant.color}
                                            </p>
                                            <p className="text-xs text-stone-500">
                                                Size {variant.size}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="shrink-0 text-right">
                                        <p className="text-sm font-bold text-stone-950">
                                            ${variantPrice.toFixed(2)}
                                        </p>
                                        <p className={`text-[11px] font-medium ${variant.quantity > 0 ? "text-emerald-700" : "text-rose-600"}`}>
                                            {variant.quantity > 0 ? `${variant.quantity} in stock` : "Sold out"}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {product.variants.length > 3 && (
                        <p className="px-1 pt-2 text-xs font-medium text-stone-500">
                            +{product.variants.length - 3} more options available
                        </p>
                    )}
                </div>

                {/* Button */}
                <button className="mt-6 w-full rounded-xl bg-stone-950 px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2">
                    View product
                </button>
            </div>
        </article>
    );
}