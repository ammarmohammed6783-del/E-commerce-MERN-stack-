const { z } = require("zod");


// Variant schema
const variantSchema = z.object({
    size: z
        .string()
        .min(1, "Size is required"),

    color: z
        .string()
        .min(1, "Color is required"),

    cost: z
        .number()
        .min(0, "Cost cannot be negative"),

    discount: z
        .number()
        .min(0, "Discount cannot be negative")
        .max(100, "Discount cannot be more than 100")
        .default(0),

    quantity: z
        .number()
        .int()
        .min(0, "Quantity cannot be negative")
});


// Create product
const createProductSchema = z.object({
    itemName: z
        .string()
        .min(1, "Product name is required"),

    itemDesc: z
        .string()
        .min(1, "Product description is required"),

    category: z
        .enum(["all", "casual", "formal", "gym", "party"]),

    soldCount: z
        .number()
        .min(0)
        .default(0),

    variants: z
        .array(variantSchema)
        .min(1, "Product must have at least one variant")
});


// Update product
const updateProductSchema = z.object({
    itemName: z
        .string()
        .min(1, "Product name cannot be empty")
        .optional(),

    itemDesc: z
        .string()
        .min(1, "Product description cannot be empty")
        .optional(),

    category: z
        .enum(["all", "casual", "formal", "gym", "party"])
        .optional(),

    variants: z
        .array(variantSchema)
        .min(1, "Product must have at least one variant")
        .optional()
});


const reviewSchema = z.object({
    stars: z
        .number()
        .int()
        .min(1)
        .max(5),

    review: z
        .string()
        .min(1, "Review cannot be empty")
        .optional()
});


module.exports = {
    createProductSchema,
    updateProductSchema,
    reviewSchema
};
