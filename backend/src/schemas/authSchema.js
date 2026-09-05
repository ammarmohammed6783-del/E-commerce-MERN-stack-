const { z } = require("zod");

const signupSchema = z.object({
    userName: z
        .string()
        .min(3, "Username must be at least 3 characters"),

    email: z
        .string()
        .email("Invalid email"),

    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
});

const signinSchema = z.object({
    email: z
        .string()
        .email("Invalid email"),

    password: z
        .string()
        .min(1, "Password is required")
});

module.exports = {
    signupSchema,
    signinSchema
};

// Exactly — the field names inside z.object() are the names you expect to receive from req.body.
