import { z } from 'zod';

export type sortParams = z.infer<typeof getOperacoesSchema>

export const getOperacoesSchema = z.object({
    orderBy: z.string().toLowerCase().regex(/^(id|data_operacao)$/).optional(),
    direction: z.string().toLowerCase().regex(/^(asc|desc)$/).optional(),
    limit: z.string()
        .transform((value) => Number(value))
        .refine((value) => Number.isInteger(value) && value >= 0 && value <= 20)
        .optional(),
    offset: z
        .string()
        .transform((value) => Number(value))
        .refine((value) => Number.isInteger(value) && value >= 0)
        .optional(),
    search: z.string().max(128).optional(),
    idUser: z.string()
        .transform((value) => Number(value))
        .refine((value) => Number.isInteger(value) && value >= 0),
})