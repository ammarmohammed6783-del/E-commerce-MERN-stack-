const addToCartSchema = z.object({
    product: z
        .string()
        .regex(/^[0-9a-fA-F]{24}$/, "Invalid product ID"),

    variant: z.object({
        size: z.string().min(1),
        color: z.string().min(1)
    }),

    quantity: z.number().int().min(1)
});

module.exports = { addToCartSchema }