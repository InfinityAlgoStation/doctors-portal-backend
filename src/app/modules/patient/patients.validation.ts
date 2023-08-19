import { z } from 'zod';

export const patientValidationUpdateZodSchema = z.object({
  body: z
    .object({
      phoneNumber: z.number().optional(),
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

export const PatientsValidation = {
  patientValidationUpdateZodSchema,
};
