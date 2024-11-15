import { z } from "zod";

export const projectSchema = z.object({
  name: z
    .string()
    .min(1, "Project name is required")
    .max(100, "project name must be 100 characters or less"),
  key: z
    .string()
    .min(2, "Project key must be atleast 2 characters")
    .max(10, "Project key must be 10 character or less"),
  description: z
    .string()
    .max(500, "Description must be 500 character or less")
    .optional(),
});


export const sprintSchema = z.object({
  name: z.string().min(1,"Sprint name is required"),
  startDate: z.date(),
  endDate: z.date(),
})