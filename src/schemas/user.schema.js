import { z } from "zod";

export const registerSchema = z
  .object({
    username: z
      .string({ message: "Username field is required." })
      .min(3, { message: "Username must be atleast 3 characters long." })
      .max(10, { message: "Username can be at the most 10 characters long." })
      .regex(/^[a-zA-Z\s]+$/, {
        message: "Username can only contain letters.",
      }),
    password: z
      .string({ message: "Password field is required." })
      .min(8, { message: "Password must be atleast 8 characters long." })
      .regex(/\d/, { message: "Password must contain at least one number." }),
  });