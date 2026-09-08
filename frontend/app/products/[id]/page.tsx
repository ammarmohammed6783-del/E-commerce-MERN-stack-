import getClickedProduct from "@/features/products/services/getClickedProduct";

export default async function Page({
    params,
}: {
    params: Promise<{
        id: string
    }>
}) {
    const { id } = await params;

    const clickedProduct = await getClickedProduct(id)

    return (
        <div>
            
        </div>
    );
}

// you can use params as a builtin tool or use another naming but the id will be sent like this --> /products?id=68c123ab