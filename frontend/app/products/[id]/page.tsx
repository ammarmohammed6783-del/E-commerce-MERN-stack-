import getClickedProduct from "@/features/products/services/getClickedProduct";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import OneProdPageReview from "@/features/products/services/component/Reviews";
import Prod from "@/features/products/services/component/Prod";

export default async function Page({
    params,
}: {
    params: Promise<{
        id: string;
    }>;
}) {
    const { id } = await params;
    const product = await getClickedProduct(id);

    return (
        <main className="min-h-screen text-stone-950">
            <section className="relative mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
                <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                    <div className="space-y-2">
                        <span className="text-[11px] font-black uppercase tracking-[0.30em] text-emerald-700">
                            Atelier Collection
                        </span>
                        <Breadcrumb>
                            <BreadcrumbList className="text-[11px] font-bold uppercase tracking-[0.16em] text-stone-500">
                                <BreadcrumbItem>
                                    <BreadcrumbLink
                                        className="transition-colors hover:text-emerald-700"
                                        render={<Link href="/">Home</Link>}
                                    />
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="text-stone-400" />
                                <BreadcrumbItem>
                                    <BreadcrumbLink
                                        className="transition-colors hover:text-emerald-700"
                                        render={<Link href="/products">Products</Link>}
                                    />
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="text-stone-400" />
                                <BreadcrumbItem>
                                    <BreadcrumbPage className="text-stone-900">
                                        {product.itemName}
                                    </BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>

                    <span className="hidden rounded-full border border-stone-300 bg-white px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-stone-700 shadow-sm sm:inline-flex">
                        Product Detail
                    </span>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
                <Prod product={product} />
                <OneProdPageReview
                    reviews={product.reviews}
                    productId={product._id}
                />
            </section>
        </main>
    );
}

// you can use params as a builtin tool or use another naming but the id will be sent like this --> /products?id=68c123ab