import type { Product } from "@/types/product";

interface CardProps {
    product: Product;
}

export default function Card({ product }: CardProps) {
    // Find the cheapest variant
    const cheapestVariant = product.variants.reduce((cheapest, variant) => {
        return variant.cost < cheapest.cost ? variant : cheapest;
    }, product.variants[0]);

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
            <div className="relative flex h-72 items-center justify-center overflow-hidden bg-gradient-to-br from-stone-200 via-stone-100 to-emerald-100/70">
                <div className="absolute h-44 w-44 rounded-full border-[18px] border-white/60 transition-transform duration-500 group-hover:scale-110" aria-hidden="true" />
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
                <div className="mt-4 flex flex-wrap gap-2">
                    {product.variants.slice(0, 3).map((variant, index) => (
                        <span
                            key={index}
                            className="rounded-md bg-stone-100 px-3 py-1 text-xs font-medium text-stone-600"
                        >
                            {variant.color} / {variant.size}
                        </span>
                    ))}

                    {product.variants.length > 3 && (
                        <span className="rounded-md bg-stone-100 px-3 py-1 text-xs font-medium text-stone-500">
                            +{product.variants.length - 3} more
                        </span>
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