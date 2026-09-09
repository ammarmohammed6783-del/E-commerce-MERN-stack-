import getClickedProduct from "@/features/products/services/getClickedProduct";



import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from "next/link";
import OneProdPage from "@/features/products/services/component/OneProdPage";


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
        <div>
            <div className="mx-auto max-w-7xl px-4 pb-5 sm:px-6 lg:px-8 mt-10">
                <Breadcrumb>
                    <BreadcrumbList className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-400">
                        <BreadcrumbItem>
                            <BreadcrumbLink className="transition-colors hover:text-emerald-700" render={<Link href="/">Home</Link>} />
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink className="transition-colors hover:text-emerald-700" render={<Link href="/products">Products</Link>} />
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage className="text-stone-900">product</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <OneProdPage product={product} />
        </div>
    );
}

// you can use params as a builtin tool or use another naming but the id will be sent like this --> /products?id=68c123ab