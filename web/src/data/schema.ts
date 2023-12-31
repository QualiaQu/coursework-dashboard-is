import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
    subject: z.string(),
    project: z.string(),
    tracker: z.string(),
    status: z.string(),
    priority: z.string(),
    assignee: z.string(),
    startDate: z.string(),
    dueDate: z.string().nullable(),
})

export type Task = z.infer<typeof taskSchema>