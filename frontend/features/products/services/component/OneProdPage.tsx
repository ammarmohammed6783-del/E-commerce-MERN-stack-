"use client"

import { Product, Variant } from "@/types/product";
import { useEffect, useMemo, useState } from "react";

interface CardProps {
    product: Product;
}

const colorToHex: Record<string, string> = {
    black: "#1c1917",
    green: "#586b35",
    tan: "#b19170",
    white: "#ffffff",
    cream: "#f5e7d1",
    navy: "#18263d",
    red: "#a33a3a",
    blue: "#3b82a8",
    grey: "#9ca3af",
    gray: "#9ca3af",
    beige: "#dfbf9d",
    brown: "#76533d"
};

export default function OneProdPage({ product }: CardProps) {

    useEffect(() => {
        console.log(product);
    })

    const productVariants = product?.variants ?? [];

    const colors = useMemo(
        () => [...new Set(productVariants.map((variant) => variant.color))],
        [productVariants]
    );

    const sizes = useMemo(
        () => [...new Set(productVariants.map((variant) => variant.size))],
        [productVariants]
    );

    const initialColor = colors[0] ?? "";
    const initialSize = sizes[0] ?? "";

    const [selectedColor, setSelectedColor] = useState<string>(initialColor);
    const [selectedSize, setSelectedSize] = useState<string>(initialSize);
    const [selectedQuantity, setSelectedQuantity] = useState<number>(1);
    const [selectedVariants, setSelectedVariants] = useState<
        Array<{ color: string; size: string; quantity: number }>
    >([
        {
            color: initialColor,
            size: initialSize,
            quantity: 1,
        },
    ]);
    const selectedVariant =
        productVariants.find(
            (variant) =>
                variant.color === selectedColor && variant.size === selectedSize
        ) ?? productVariants[0];
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

    const selectedDiscountedPrice = selectedVariant
        ? selectedVariant.cost -
        (selectedVariant.cost * selectedVariant.discount) / 100
        : 0;

    const selectedMaxQuantity = selectedVariant?.quantity ?? 0;

    const handleColorChange = (color: string) => {
        setSelectedColor(color);

        const sizesForColor = productVariants
            .filter((variant) => variant.color === color)
            .map((variant) => variant.size);

        if (sizesForColor.length > 0) {
            setSelectedSize(sizesForColor[0]);
            setSelectedQuantity(1);
        }
    };

    const handleSizeChange = (size: string) => {
        setSelectedSize(size);
        setSelectedQuantity(1);
    };

    const addAnotherVariant = () => {
        const matchingVariant = productVariants.find(
            (variant) =>
                variant.color === selectedColor && variant.size === selectedSize
        );

        if (!matchingVariant) {
            return;
        }

        const quantity = Math.min(selectedQuantity, matchingVariant.quantity);

        setSelectedVariants((current) => [
            ...current,
            {
                color: selectedColor,
                size: selectedSize,
                quantity,
            },
        ]);

        setSelectedQuantity(1);
        setSelectedColor(colors[0] ?? "");
        setSelectedSize(sizes[0] ?? "");
    };

    const removeVariant = (variantIndex: number) => {
        setSelectedVariants((current) =>
            current.filter((_, index) => index !== variantIndex)
        );
    };

    return (
        <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,#fffaf5,transparent_30%),linear-gradient(135deg,#f7f2ea_0%,#f8faf9_100%)] px-4 py-8 text-stone-950">
            <section className="mx-auto grid max-w-6xl grid-cols-1 gap-8 rounded-[2rem] border border-stone-200 bg-white p-7 shadow-[0_24px_80px_rgba(0,0,0,0.08)] md:grid-cols-[0.92fr_1.08fr] md:p-10">
                <div className="flex items-center justify-center gap-5">
                    <div className="flex min-h-105 w-full flex-1 items-center justify-center rounded-[2rem] border border-stone-200 bg-[linear-gradient(135deg,#f6f2eb_0%,#e7dfd5_100%)] p-5 shadow-[inset_0_0_40px_rgba(120,90,50,0.05)]">
                        <div className="relative flex h-90 w-70 items-center justify-center rounded-[2rem] border-2 border-stone-300 bg-[radial-gradient(circle_at_center,#d6d3d1_0%,#e7e5e4_60%,#f5f5f4_100%)] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.05),0_30px_60px_rgba(0,0,0,0.14)]">
                            <span className="absolute left-8 top-8 h-16 w-16 rounded-full border border-stone-400 opacity-70" />
                            <span className="absolute right-8 top-9 h-4 w-4 rounded-full bg-stone-700 opacity-80" />
                            <span className="text-[8rem] text-stone-700 drop-shadow-md">👕</span>
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

                    <div className="mt-7 rounded-[1.75rem] border border-stone-200 bg-stone-50/90 p-5">
                        <div className="mb-3 flex items-center justify-between">
                            <span className="text-sm font-black uppercase tracking-[0.14em] text-stone-700">
                                Variant Collection
                            </span>
                            <span className="rounded-full border border-stone-300 px-3 py-1 text-[11px] font-black uppercase tracking-[0.2em] text-stone-700">
                                {productVariants.length} styles
                            </span>
                        </div>

                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                            {productVariants.length > 0 ? (
                                productVariants.map((variant, index) => {
                                    const variantDiscounted =
                                        variant.cost -
                                        (variant.cost * variant.discount) / 100;

                                    return (
                                        <div
                                            key={`${variant.color}-${variant.size}-${index}`}
                                            className="rounded-[1rem] border border-stone-300 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-stone-950 hover:shadow-md"
                                        >
                                            <div className="flex items-center justify-between gap-3">
                                                <span className="flex items-center gap-2">
                                                    <span
                                                        className="h-8 w-8 rounded-full border-2 border-stone-200 shadow-sm"
                                                        style={{
                                                            backgroundColor:
                                                                colorToHex[
                                                                variant.color.toLowerCase()
                                                                ] ?? "#a8a29e"
                                                        }}
                                                    />
                                                    <span className="text-xs font-black uppercase tracking-[0.18em] text-stone-900">
                                                        {variant.color}
                                                    </span>
                                                </span>

                                                <span className="rounded-full border border-stone-300 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-stone-800">
                                                    size {variant.size}
                                                </span>
                                            </div>

                                            <div className="mt-4 flex items-end justify-between gap-3">
                                                <div>
                                                    <div className="text-lg font-black text-stone-950">
                                                        ${variantDiscounted.toFixed(2)}
                                                    </div>
                                                    <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-stone-500">
                                                        {variant.quantity} in stock
                                                    </div>
                                                </div>

                                                <div className="text-right">
                                                    <div className="text-[11px] font-black uppercase text-stone-400 line-through">
                                                        ${variant.cost.toFixed(2)}
                                                    </div>
                                                    <div className="rounded-full bg-rose-100 px-2 py-1 text-[10px] font-black uppercase text-rose-600">
                                                        -{variant.discount}%
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <span className="text-sm text-stone-500">
                                    No variants available
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="mt-7 rounded-[1.75rem] border border-stone-200 bg-[linear-gradient(135deg,#fffdf9,#f6f4ee)] p-5 shadow-[0_14px_30px_rgba(0,0,0,0.04)]">
                        <div className="mb-4 flex items-center justify-between">
                            <span className="text-sm font-black uppercase tracking-[0.14em] text-stone-700">
                                Select Variant
                            </span>
                            <span className="rounded-full bg-stone-950 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-white">
                                {selectedVariant?.quantity ?? 0} available
                            </span>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <label className="text-[11px] font-black uppercase tracking-[0.2em] text-stone-700">
                                        Color
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {colors.length > 0 ? (
                                            colors.map((color) => (
                                                <button
                                                    type="button"
                                                    key={color}
                                                    onClick={() => handleColorChange(color)}
                                                    className={`flex items-center gap-2 rounded-full border px-3 py-2 transition duration-300 ${selectedColor === color
                                                        ? "border-stone-950 bg-stone-950 text-white shadow-[0_8px_18px_rgba(0,0,0,0.12)]"
                                                        : "border-stone-300 bg-white text-stone-700 hover:border-stone-950 hover:bg-stone-950 hover:text-white"
                                                        }`}
                                                >
                                                    <span
                                                        className="h-6 w-6 rounded-full border border-stone-300"
                                                        style={{
                                                            backgroundColor:
                                                                colorToHex[
                                                                color.toLowerCase()
                                                                ] ?? "#a8a29e"
                                                        }}
                                                    />
                                                    <span className="text-[11px] font-black uppercase">
                                                        {color}
                                                    </span>
                                                </button>
                                            ))
                                        ) : (
                                            <span className="text-sm text-stone-500">
                                                No colors available
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[11px] font-black uppercase tracking-[0.2em] text-stone-700">
                                        Size
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {sizes.length > 0 ? (
                                            sizes.map((size) => (
                                                <button
                                                    type="button"
                                                    key={size}
                                                    onClick={() => handleSizeChange(size)}
                                                    className={`min-w-16 rounded-xl border px-4 py-2 text-sm font-black transition duration-300 ${selectedSize === size
                                                        ? "border-stone-950 bg-stone-950 text-white shadow-[0_8px_18px_rgba(0,0,0,0.12)]"
                                                        : "border-stone-300 bg-white text-stone-700 hover:border-stone-950 hover:bg-stone-950 hover:text-white"
                                                        }`}
                                                >
                                                    {size}
                                                </button>
                                            ))
                                        ) : (
                                            <span className="text-sm text-stone-500">
                                                No sizes available
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-3 rounded-[1.2rem] border border-stone-300 bg-white p-4 sm:grid-cols-3">
                                <div className="space-y-2">
                                    <span className="text-[11px] font-black uppercase tracking-[0.2em] text-stone-700">
                                        Quantity
                                    </span>
                                    <div className="flex items-center rounded-full border border-stone-300 bg-stone-50 px-2">
                                        <button
                                            type="button"
                                            className="px-2 py-1 text-2xl font-light text-stone-700"
                                            onClick={() =>
                                                setSelectedQuantity((current) =>
                                                    Math.max(1, current - 1)
                                                )
                                            }
                                        >
                                            −
                                        </button>
                                        <input
                                            type="number"
                                            min={1}
                                            max={selectedMaxQuantity}
                                            value={selectedQuantity}
                                            onChange={(event) => {
                                                const nextQuantity = Math.min(
                                                    Math.max(
                                                        Number(event.target.value) || 1,
                                                        1
                                                    ),
                                                    selectedMaxQuantity
                                                );
                                                setSelectedQuantity(nextQuantity);
                                            }}
                                            className="min-w-14 border-0 bg-transparent text-center text-lg font-black text-stone-950 outline-0"
                                        />
                                        <button
                                            type="button"
                                            className="px-2 py-1 text-2xl font-light text-stone-700"
                                            onClick={() =>
                                                setSelectedQuantity((current) =>
                                                    Math.min(
                                                        selectedMaxQuantity,
                                                        current + 1
                                                    )
                                                )
                                            }
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <span className="text-[11px] font-black uppercase tracking-[0.2em] text-stone-700">
                                        Color
                                    </span>
                                    <div className="flex items-center gap-2">
                                        <span
                                            className="h-8 w-8 rounded-full border border-stone-300"
                                            style={{
                                                backgroundColor:
                                                    colorToHex[
                                                    selectedColor.toLowerCase()
                                                    ] ?? "#a8a29e"
                                            }}
                                        />
                                        <span className="text-sm font-black uppercase text-stone-950">
                                            {selectedColor}
                                        </span>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <span className="text-[11px] font-black uppercase tracking-[0.2em] text-stone-700">
                                        Size
                                    </span>
                                    <span className="block text-sm font-black uppercase text-stone-950">
                                        {selectedSize}
                                    </span>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4 rounded-[1rem] border border-stone-200 bg-white p-4">
                                <div>
                                    <div className="text-[11px] font-black uppercase tracking-[0.2em] text-stone-500">
                                        Price
                                    </div>
                                    <div className="mt-1 text-xl font-black text-stone-950">
                                        ${selectedDiscountedPrice.toFixed(2)}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-[11px] font-black uppercase tracking-[0.2em] text-stone-500">
                                        Original
                                    </div>
                                    <div className="mt-1 text-xl font-black text-stone-400 line-through">
                                        ${selectedVariant?.cost.toFixed(2) ?? "0.00"}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-[11px] font-black uppercase tracking-[0.2em] text-stone-500">
                                        Quantity
                                    </div>
                                    <div className="mt-1 text-xl font-black text-stone-950">
                                        {selectedQuantity}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 rounded-[1rem] border border-stone-300 bg-white p-4">
                                <div className="mb-3 flex items-center justify-between">
                                    <span className="text-[11px] font-black uppercase tracking-[0.2em] text-stone-700">
                                        Selected Variants
                                    </span>
                                    <button
                                        type="button"
                                        onClick={addAnotherVariant}
                                        className="rounded-full border border-stone-950 px-4 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-stone-950 transition hover:bg-stone-950 hover:text-white"
                                    >
                                        + Add Another Variant
                                    </button>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {selectedVariants.map((item, index) => (
                                        <span
                                            key={`${item.color}-${item.size}-${item.quantity}-${index}`}
                                            className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-stone-50 px-3 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-stone-800"
                                        >
                                            <span>
                                                {item.color} / {item.size} / Qty {item.quantity}
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() => removeVariant(index)}
                                                className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-stone-950 text-[11px] font-black leading-none text-white transition hover:bg-rose-600"
                                                aria-label={`Remove ${item.color} ${item.size} variant`}
                                            >
                                                ×
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 flex items-center gap-4 border-t border-stone-200 pt-6">
                        <button className="flex-1 rounded-xl bg-stone-950 px-7 py-3 text-sm font-black uppercase tracking-[0.16em] text-white transition hover:bg-stone-700 hover:shadow-[0_14px_20px_rgba(0,0,0,0.14)]">
                            Add to Cart
                        </button>
                    </div>
                </section>
            </section>

            {/* adding review neeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeed a lot of work*/}
            {/* adding review neeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeed a lot of work*/}
            {/* adding review neeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeed a lot of work*/}
            {/* adding review neeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeed a lot of work*/}
            {/* adding review neeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeed a lot of work*/}
            <div className="mb-6 rounded-[1.5rem] border border-stone-200 bg-stone-50 p-5">
                <h3 className="mb-4 text-lg font-black text-stone-950">
                    Write a Review
                </h3>

                <form
                    onSubmit={async (event) => {
                        event.preventDefault();

                        const form = event.currentTarget;
                        const formData = new FormData(form);

                        const stars = Number(formData.get("stars"));
                        const review = String(formData.get("review") || "");

                        try {
                            const response = await fetch(
                                `http://localhost:3001/products/${product._id}/reviews`,
                                {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                        // Add your auth header here if your backend requires it
                                        // Authorization: `Bearer ${token}`,
                                    },
                                    body: JSON.stringify({
                                        stars,
                                        review,
                                    }),
                                }
                            );

                            const data = await response.json();

                            if (!response.ok) {
                                throw new Error(data.error || "Failed to add review");
                            }

                            console.log("Review added:", data);

                            form.reset();

                            // Refresh the page so the new review appears
                            window.location.reload();
                        } catch (error) {
                            console.error(error);
                        }
                    }}
                    className="space-y-4"
                >
                    <div>
                        <label className="mb-2 block text-[11px] font-black uppercase tracking-[0.2em] text-stone-700">
                            Rating
                        </label>

                        <select
                            name="stars"
                            defaultValue="5"
                            className="rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm font-bold outline-none"
                        >
                            <option value="5">5 Stars</option>
                            <option value="4">4 Stars</option>
                            <option value="3">3 Stars</option>
                            <option value="2">2 Stars</option>
                            <option value="1">1 Star</option>
                        </select>
                    </div>

                    <div>
                        <label className="mb-2 block text-[11px] font-black uppercase tracking-[0.2em] text-stone-700">
                            Your Review
                        </label>

                        <textarea
                            name="review"
                            required
                            placeholder="Write your review..."
                            className="min-h-30 w-full rounded-xl border border-stone-300 bg-white p-4 text-sm outline-none focus:border-stone-950"
                        />
                    </div>

                    <button
                        type="submit"
                        className="rounded-xl bg-stone-950 px-6 py-3 text-sm font-black uppercase tracking-[0.16em] text-white transition hover:bg-stone-700"
                    >
                        Submit Review
                    </button>
                </form>
            </div>

            <section className="mx-auto mt-8 max-w-6xl rounded-[2rem] border border-stone-200 bg-white p-7 shadow-[0_24px_80px_rgba(0,0,0,0.06)]">
                <div className="mb-5 flex items-center justify-between border-b border-stone-200 pb-4">
                    <div>
                        <span className="text-[11px] font-black uppercase tracking-[0.24em] text-stone-500">
                            Customer Reviews
                        </span>
                        <h2 className="mt-2 text-2xl font-black tracking-[-0.03em] text-stone-950">
                            All Reviews
                        </h2>
                    </div>
                    <span className="rounded-full border border-stone-300 px-4 py-2 text-[11px] font-black uppercase tracking-[0.16em] text-stone-700">
                        {product.reviews.length} reviews
                    </span>
                </div>

                {product.reviews && product.reviews.length > 0 ? (
                    <div className="grid gap-4">
                        {product.reviews.map((review, index) => (
                            <article
                                key={`${review.userName}-${review.createdAt}-${index}`}
                                className="rounded-[1.25rem] border border-stone-200 bg-stone-50 p-5 transition hover:bg-white hover:shadow-[0_12px_24px_rgba(0,0,0,0.05)]"
                            >
                                <div className="flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xl text-amber-500">
                                            {"★".repeat(Math.round(review.stars))}
                                            {"☆".repeat(5 - Math.round(review.stars))}
                                        </span>
                                        <span className="text-[11px] font-black uppercase tracking-[0.2em] text-stone-700">
                                            {review.userName ?? "UnKnown"}
                                        </span>
                                    </div>
                                    <span className="text-[11px] font-black uppercase tracking-[0.16em] text-stone-500">
                                        Posted on {review.createdAt}
                                    </span>
                                </div>
                                <p className="mt-3 text-sm leading-7 text-stone-600">
                                    {review.review || "Loved this product and the fit was perfect."}
                                </p>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="rounded-[1rem] border border-dashed border-stone-300 bg-stone-50 p-8 text-center">
                        <p className="text-sm font-bold uppercase tracking-[0.16em] text-stone-500">
                            there is no reviews yet.
                        </p>
                    </div>
                )}
            </section>
        </main>
    );
}