import { z } from 'zod';

export type Operacao = z.infer<typeof operacaoSchema>;

const errors = {
    invalido: 'valor invalido',
    codigo: {
        min: 'Codigo invalido',
        max: 'Codigo invalido'
    },
    dataDaOperacao: {
        max: 'Data invalida',
        min: 'Data invalida'
    },



}
const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
    if (issue.code === z.ZodIssueCode.invalid_type) {
      if (issue.expected === "string" || issue.expected === "number") {
        return { message: errors.invalido };
      }
    }
    return { message: ctx.defaultError };
  };

z.setErrorMap(customErrorMap)

const codigo = z.string().min(4, {message: errors.codigo.min}).max(9, {message: errors.codigo.max})
const dataDaOperacao = z.string().min(8, {message: errors.dataDaOperacao.min}).max(32, {message: errors.dataDaOperacao.max})
const tipoOperacao = z.string().toLowerCase().regex(/^(compra|venda)$/, {message: errors.invalido})
const tipo = z.string().toLowerCase().regex(/^(ações|fundos imobiliarios)$/, {message: errors.invalido})
const quantidade = z.number().transform((value) => Number(value)).refine((value) => Number.isInteger(value) && value >= 0, {message: errors.invalido})
const precoDaOperacao = z.number().transform((value) => Number(value)).refine((value) => value >= 0, {message: errors.invalido})

export const operacaoSchema = z.object({
    codigo,
    dataDaOperacao,
    tipoOperacao,
    tipo,
    quantidade,
    precoDaOperacao
})





 