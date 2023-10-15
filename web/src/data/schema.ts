import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
    subject: z.string(),
    title: z.string(),
    status: z.string(),
    label: z.string(),
    priority: z.string(),
    Assignee: z.string(),
    StartDate: z.string(),
    DueDate: z.string(),
})

export type Task = z.infer<typeof taskSchema>