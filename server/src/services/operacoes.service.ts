import fs from 'fs'
import { v4 as uuidv4 } from 'uuid'
import { Operacao } from '../types'
import { escreveJSON, padronizaTipoDaOperacao } from '../util/util'
import { investimentos_service } from './investimentos.service'





const adicionarNovaOperacao = (operacao: Operacao, nomeDoAtivo: string) => {
    const jsonOperacoes = JSON.parse(fs.readFileSync('./src/json/operacoes.json').toString())
    const tipoPadronizado: string = padronizaTipoDaOperacao(operacao.tipo)

    const novaOperacao: Operacao = {
        id: uuidv4(),
        codigo: operacao.codigo,
        tipo: tipoPadronizado,
        quantidade: operacao.quantidade,
        precoDaOperacao: operacao.precoDaOperacao,
        valorTotalDaOperacao: operacao.precoDaOperacao * operacao.quantidade,
        dataDaOperacao: operacao.dataDaOperacao,
        venda: operacao.venda
    }

    /* Verifica se existe a categoria da operacao e se há alguma operacao para o codigo*/

    if (jsonOperacoes[tipoPadronizado] && !jsonOperacoes[tipoPadronizado][operacao.codigo]) {
        jsonOperacoes[tipoPadronizado] = {
            ...jsonOperacoes[tipoPadronizado],
            [operacao.codigo]: []
        }
    }

    /* Adiciona a nova operacao ao json */
    jsonOperacoes[tipoPadronizado][operacao.codigo].push(novaOperacao)

    escreveJSON(jsonOperacoes, './src/json/operacoes.json')

    const operacoesAtualizadasDoAtivo = jsonOperacoes[tipoPadronizado][operacao.codigo]

    const investimentosConsolidados = investimentos_service.consolidaOperacoesRV(operacoesAtualizadasDoAtivo, nomeDoAtivo)

    return investimentosConsolidados
}



const editarOperacao = (operacao: Operacao, nomeDoAtivo: string, id: string) => {
    const jsonOperacoes = JSON.parse(fs.readFileSync('./src/json/operacoes.json').toString())
    const tipoPadronizado: string = padronizaTipoDaOperacao(operacao.tipo)

    const operacaoEditada: Operacao = {
        id: id,
        codigo: operacao.codigo,
        tipo: tipoPadronizado,
        quantidade: operacao.quantidade,
        precoDaOperacao: operacao.precoDaOperacao,
        valorTotalDaOperacao: operacao.precoDaOperacao * operacao.quantidade,
        dataDaOperacao: operacao.dataDaOperacao,
        venda: operacao.venda
    }

    /* Adiciona a nova operacao ao json */
    const idxOperacaoEditada = jsonOperacoes[tipoPadronizado][operacao.codigo].findIndex((operacaoIndividual: Operacao, idx: number) => operacaoIndividual.id === id)

    jsonOperacoes[tipoPadronizado][operacao.codigo][idxOperacaoEditada] = operacaoEditada

    escreveJSON(jsonOperacoes, './src/json/operacoes.json')

    const operacoesAtualizadasDoAtivo = jsonOperacoes[tipoPadronizado][operacao.codigo]

    const investimentosConsolidados = investimentos_service.consolidaOperacoesRV(operacoesAtualizadasDoAtivo, nomeDoAtivo)

    return investimentosConsolidados
}

const funcaoDeletarOperacao = (operacao: Operacao, nomeDoAtivo: string, id: string) => {
    const jsonOperacoes = JSON.parse(fs.readFileSync('./src/json/operacoes.json').toString())
    
    const tipoPadronizado: string = padronizaTipoDaOperacao(operacao.tipo)

    const idxOperacaoEditada = jsonOperacoes[tipoPadronizado][operacao.codigo]?.findIndex((operacaoIndividual: Operacao, idx: number) => operacaoIndividual.id === id)

    jsonOperacoes[tipoPadronizado][operacao.codigo]?.splice(idxOperacaoEditada, 1)

    if (jsonOperacoes[tipoPadronizado][operacao.codigo].length === 0) {
        delete jsonOperacoes[tipoPadronizado][operacao.codigo]
    }

    escreveJSON(jsonOperacoes, './src/json/operacoes.json')

    const dadosParaDeletar = {
        tipo: tipoPadronizado,
        codigo: operacao.codigo
    }

    const operacoesAtualizadasDoAtivo = jsonOperacoes[tipoPadronizado][operacao.codigo] ? jsonOperacoes[tipoPadronizado][operacao.codigo] : undefined

    const investimentosConsolidados = investimentos_service.consolidaOperacoesRV(operacoesAtualizadasDoAtivo, nomeDoAtivo, dadosParaDeletar)


    return investimentosConsolidados
}

export const operacao_service = {
    adicionarNovaOperacao,
    editarOperacao,
    funcaoDeletarOperacao
}