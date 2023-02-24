import fs from 'fs'
import { v4 as uuidv4 } from 'uuid'

const jsonInvestimentos = JSON.parse(fs.readFileSync('./src/json/investimentos.json').toString())

type Operacao = {
    id: string,
    codigo: string,
    tipo: string,
    quantidade: number,
    precoDaOperacao: number,
    valorTotalDaOperacao: number,
    dataDaOperacao: Date,
    venda: boolean
}

type InvestimentoConsolidado = {
    id: string,
    nome: string,
    codigo: string,
    tipo: string,
    quantidadeTotal: number,
    valorPagoTotal: number,
    precoMedio: number,
    operacoes: Operacao
}

type dadosChave = {
    tipo: string,
    codigo: string
}

const consolidaOperacoesRV = (operacoes: Operacao[] | undefined, nomeDoAtivo: string, dadosParaDeletar? : dadosChave) => {

    if (operacoes) {
        const codigo = operacoes.reduce((acc, operacao) => {
            return operacao.codigo
        }, '')

        const tipo = operacoes.reduce((acc, operacao) => {
            return operacao.tipo
        }, '')

        const quantidadeTotal = operacoes.reduce((acc, operacao) => {
            if (operacao.venda) {
                return acc - operacao.quantidade
            }
            return acc + operacao.quantidade
        }, 0)

        const valorPagoTotal = (operacoes.reduce((acc, operacao) => {
            if (operacao.venda) {
                return acc - operacao.quantidade * operacao.precoDaOperacao
            }
            return acc + operacao.quantidade * operacao.precoDaOperacao
        }, 0))

        const precoMedio = quantidadeTotal ? valorPagoTotal / quantidadeTotal : 0

        const ativoConsolidado = {
            id: uuidv4(),
            nome: nomeDoAtivo,
            codigo,
            tipo,
            quantidadeTotal,
            valorPagoTotal,
            precoMedio,
            operacoes: operacoes
        }
        /* Verifica se existe a categoria de investimento e se há a chave para o codigo do ativo consolidado*/

        if (jsonInvestimentos[tipo] && !jsonInvestimentos[tipo][codigo]) {
            jsonInvestimentos[tipo] = {
                ...jsonInvestimentos[tipo],
                [codigo]: {}
            }
        }

        /* Adiciona a nova operacao ao json */
        jsonInvestimentos[tipo][codigo] = ativoConsolidado

    } else{
        dadosParaDeletar &&
        delete jsonInvestimentos[dadosParaDeletar.tipo][dadosParaDeletar.codigo] 
    }


    const jsonInvestimentosString = JSON.stringify(jsonInvestimentos)

    fs.writeFile('./src/json/investimentos.json', jsonInvestimentosString, 'utf-8', (err) => {
        if (err) {
            console.log("Ocorreu um erro ao adicionar a operação");
            return console.log(err);
        }

        console.log("Json foi salvo.");
    })

    return jsonInvestimentos

}

const getInvestimentos = (req: any, res: any) => {
    res.set({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    });
    res.status(200)
    res.json({
        status: 'sucess',
        data: jsonInvestimentos
    })
}

export const investimentosController: any = {
    consolidaOperacoesRV,
    getInvestimentos
} 