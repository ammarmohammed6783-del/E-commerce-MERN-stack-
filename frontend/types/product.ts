export interface Variant {
    size: string;
    color: string;
    cost: number;
    discount: number;
    quantity: number;
}

export interface Review {
    user: string;
    userName: string;
    stars: number;
    review?: string;
    createdAt: string;
}

export interface Product {
    _id: string;
    itemName: string;
    itemDesc: string;
    category: "casual" | "formal" | "gym" | "party";
    variants: Variant[];
    reviews: Review[];
    createdAt: string;
    updatedAt: string;
}