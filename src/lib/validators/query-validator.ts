import { z } from 'zod'

export const QueryValidator = z.object({
  category: z.string().optional(),
  sort: z.enum(['asc', 'desc']).optional(),
  limit: z.number().optional(),
  search: z.string().optional(), // Add search field here
})

export type TQueryValidator = z.infer<typeof QueryValidator>