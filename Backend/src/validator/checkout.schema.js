const z = require("zod");

const checkoutSchema = z.object({
  email: z
    .string()
    .email("Invalid email address"),

  name: z
    .string()
    .min(3, "Name must be at least 3 characters"),

 contact: z
    .string(),
  productKey: z.literal("PROMPT_PACK"),
});

module.exports = checkoutSchema;
