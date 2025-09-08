import { z } from "zod";
 
export const taskZodSchema = z.object({
  product: z.string(),
  category: z.string(),
  title: z.string(),
  assignee: z.string(),
  status: z.enum(["TODO", "IN_PROGRESS", "DONE"]).optional(),
  remarks: z.string().optional(),
  createdDate: z.string().optional(),
  startDate: z.string().optional(),
  expectedEndDate: z.string().optional(),
  endDate: z.string().optional(),
});
 
// For updates: all fields optional
export const partialTaskSchema = taskZodSchema.partial();