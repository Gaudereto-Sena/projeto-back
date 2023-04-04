import { z } from 'zod';

export type Operacao = z.infer<typeof reqOperacoesSchema>;

export const reqOperacoesSchema = z.object({
    codigo: z.string().max(64).optional(),
    nome: z.string().max(128).optional(),
    dataDaOperacao: z.string().max(64).optional(),
    tipoOperacao: z.string().toLowerCase().regex(/^(compra|venda)$/),
    tipo: z.string()
        .max(64)
        .toLowerCase(),
    quantidade: z.number()
        .transform((value) => Number(value))
        .refine((value) => Number.isInteger(value) && value >= 0),
    precoDaOperacao: z.number()
        .transform((value) => Number(value))
        .refine((value) => value >= 0),
    idOperacao: z.number()
        .transform((value) => Number(value))
        .refine((value) => Number.isInteger(value) && value >= 0),
    idUser: z.number()
        .transform((value) => Number(value))
        .refine((value) => Number.isInteger(value) && value >= 0)
})