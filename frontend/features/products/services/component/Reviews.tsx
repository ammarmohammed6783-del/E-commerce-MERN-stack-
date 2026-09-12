"use client"

import { Review } from "@/types/product";

interface CardProps {
    reviews: Review[];
    productId: string
}


export default function OneProdPage({reviews, productId} : CardProps) {

    return (
        <main className="min-h-screen py-8 text-stone-950">
            <div className="mb-6 my-8 rounded-[1.5rem] border border-stone-200 bg-stone-50 p-5">
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
                                `http://localhost:3001/products/${productId}/reviews`,
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

            <section className="mt-8 rounded-[2rem] border border-stone-200 bg-white p-7">
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
                        {reviews.length} reviews
                    </span>
                </div>

                {reviews && reviews.length > 0 ? (
                    <div className="grid gap-4">
                        {reviews.map((review, index) => (
                            <article
                                key={`${review.userName}-${review.createdAt}-${index}`}
                                className="rounded-[1.25rem] border border-stone-200 bg-stone-50 p-5 transition hover:bg-white"
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