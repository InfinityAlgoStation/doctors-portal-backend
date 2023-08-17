import { z } from 'zod';

const doctorValidationCreateZodSchema = z.object({
  body: z.object({
    name: z.object({
      firstName: z.string().min(2),
      lastName: z.string().min(2),
      middleName: z.string().optional(),
    }),
    id: z.number().optional(),
    age: z.number().optional(),
    phoneNumber: z.number(),
    location: z
      .enum([
        'Dhaka',
        'Chattogram',
        'Barishal',
        'Rajshahi',
        'Sylhet',
        'Comilla',
        'Rangpur',
        'Mymensingh',
      ])
      .optional(),
    verifiedLicense: z.boolean().optional(),
    chamber: z.string().optional(),
    expertise: z.array(z.string().min(2)).optional(),
    appointmentFee: z.number().optional(),
  }),
});

const doctorValidationUpdateZodSchema = z.object({
  body: z.object({
    name: z
      .object({
        firstName: z.string().min(2),
        lastName: z.string().min(2),
        middleName: z.string().optional(),
      })
      .optional(),
    id: z.number().optional(),
    age: z.number().optional(),
    phoneNumber: z.number().optional(),
    location: z
      .enum([
        'Dhaka',
        'Chattogram',
        'Barishal',
        'Rajshahi',
        'Sylhet',
        'Comilla',
        'Rangpur',
        'Mymensingh',
      ])
      .optional(),
    verifiedLicense: z.boolean().optional(),
    chamber: z.string().optional(),
    expertise: z.array(z.string().min(2)).optional(),
    appointmentFee: z.number().optional(),
  }),
});

export const DoctorValidation = {
  doctorValidationCreateZodSchema,
  doctorValidationUpdateZodSchema,
};
