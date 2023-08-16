import { z } from 'zod';

const adminValidationCreateZodSchema = z.object({
  body: z.object({
    phoneNumber: z.number(),
    email: z.string().email(),
    password: z.string().min(6), // Change the minimum password length as needed
    name: z.object({
      firstName: z.string().min(2),
      lastName: z.string().min(2),
      middleName: z.string().optional(),
    }),
  }),
});

export const adminValidationUpdateZodSchema = z.object({
  body: z
    .object({
      phoneNumber: z.number().optional(),
      email: z.string().email().optional(),
      password: z.string().min(6).optional(),
      name: z
        .object({
          firstName: z.string().min(2).optional(),
          lastName: z.string().min(2).optional(),
          middleName: z.string().optional(),
        })
        .optional(),
    })
    .optional(),
});

export const AdminsValidation = {
  adminValidationCreateZodSchema,
  adminValidationUpdateZodSchema,
};
