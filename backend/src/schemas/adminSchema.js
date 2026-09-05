const { z } = require("zod");

const inviteAdminSchema = z.object({
    userName: z
        .string()
        .min(3, "Username must be at least 3 characters"),

    email: z
        .string()
        .email("Invalid email")
});

module.exports = {
    inviteAdminSchema
};

// Exactly — the field names inside z.object() are the names you expect to receive from req.body.