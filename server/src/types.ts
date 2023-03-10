export type Operacao = {
    id: string,
    codigo: string,
    tipo: string,
    quantidade: number,
    precoDaOperacao: number,
    valorTotalDaOperacao: number,
    dataDaOperacao: Date,
    venda: boolean
}

export type InvestimentoConsolidado = {
    id: string,
    nome: string,
    codigo: string,
    tipo: string,
    quantidadeTotal: number,
    valorPagoTotal: number,
    precoMedio: number,
    operacoes: Operacao
}

export type dadosChave = {
    tipo: string,
    codigo: string
}