import fs from 'fs'
import { v4 as uuidv4 } from 'uuid'
import { investimentosController } from './investimentosController'

const jsonOperacoes = JSON.parse(fs.readFileSync('./src/json/operacoes.json').toString())

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

const adicionarNovaOperacao = (operacao: Operacao, nomeDoAtivo: String) => {

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
    const jsonOperacoesString = JSON.stringify(jsonOperacoes)


    /* Escreve no json a operacao adicionada */
    fs.writeFile('./src/json/operacoes.json', jsonOperacoesString, 'utf-8', (err) => {
        if (err) {
            console.log("Ocorreu um erro ao adicionar a operação");
            return console.log(err);
        }

        console.log("Json foi salvo.");
    })
    const operacoesAtualizadasDoAtivo = jsonOperacoes[tipoPadronizado][operacao.codigo]

    const investimentosConsolidados = investimentosController.consolidaOperacoesRV(operacoesAtualizadasDoAtivo, nomeDoAtivo)

    return investimentosConsolidados
}

const editarOperacao = (operacao: Operacao, nomeDoAtivo: string, id: string) => {
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

    console.log(idxOperacaoEditada)
    jsonOperacoes[tipoPadronizado][operacao.codigo][idxOperacaoEditada] = operacaoEditada

    const jsonOperacoesString = JSON.stringify(jsonOperacoes)


    /* Escreve no json a operacao adicionada */
    fs.writeFile('./src/json/operacoes.json', jsonOperacoesString, 'utf-8', (err) => {
        if (err) {
            console.log("Ocorreu um erro ao adicionar a operação");
            return console.log(err);
        }

        console.log("Json foi salvo.");
    })
    const operacoesAtualizadasDoAtivo = jsonOperacoes[tipoPadronizado][operacao.codigo]

    const investimentosConsolidados = investimentosController.consolidaOperacoesRV(operacoesAtualizadasDoAtivo, nomeDoAtivo)

    return investimentosConsolidados
}

const funcaoDeletarOperacao = (operacao: Operacao, nomeDoAtivo: string, id: string) => {
    const tipoPadronizado: string = padronizaTipoDaOperacao(operacao.tipo)

    const idxOperacaoEditada = jsonOperacoes[tipoPadronizado][operacao.codigo]?.findIndex((operacaoIndividual: Operacao, idx: number) => operacaoIndividual.id === id)

    jsonOperacoes[tipoPadronizado][operacao.codigo]?.splice(idxOperacaoEditada, 1)

    if (jsonOperacoes[tipoPadronizado][operacao.codigo].length === 0) {
        delete jsonOperacoes[tipoPadronizado][operacao.codigo]

    }

    const jsonOperacoesString = JSON.stringify(jsonOperacoes)

    /* Escreve no json a operacao adicionada */
    fs.writeFile('./src/json/operacoes.json', jsonOperacoesString, 'utf-8', (err) => {
        if (err) {
            console.log("Ocorreu um erro ao adicionar a operação");
            return console.log(err);
        }

        console.log("Json foi salvo.");
    })
    const operacoesAtualizadasDoAtivo = jsonOperacoes[tipoPadronizado][operacao.codigo] ? jsonOperacoes[tipoPadronizado][operacao.codigo] : undefined

    const dadosParaDeletar = {
        tipo: tipoPadronizado,
        codigo: operacao.codigo
    }

    const investimentosConsolidados = investimentosController.consolidaOperacoesRV(operacoesAtualizadasDoAtivo, nomeDoAtivo, dadosParaDeletar)


    return investimentosConsolidados
}


const padronizaTipoDaOperacao = (tipo: string) => {
    if (tipo === 'Ações') {
        tipo = 'Acoes'
    }
    let tipoSemEspacos: string = tipo.replace(/\s/g, '')
    tipoSemEspacos = tipoSemEspacos.toLowerCase()
    return tipoSemEspacos
}

const getOperacoes = (req: any, res: any) => {
    res.set({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    });
    res.status(200)
    res.json({
        status: 'sucess',
        data: jsonOperacoes
    })
}

const postOperacoes = (req: any, res: any) => {
    const investimentosConsolidados = adicionarNovaOperacao(req.body.operacao, req.body.nome)
    res.set({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    });
    res.status(200)
    res.json({
        status: 'sucess',
        data: {
            operacoes: jsonOperacoes,
            investimentosConsolidados: investimentosConsolidados
        }
    })
}

const patchOperacoes = (req: any, res: any) => {
    const investimentosConsolidados = editarOperacao(req.body.operacao, req.body.nome, req.body.id)
    res.set({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    });
    res.status(200)
    res.json({
        status: 'sucess',
        data: {
            operacoes: jsonOperacoes,
            investimentosConsolidados: investimentosConsolidados
        }
    })
}

const deletarOperacoes = (req: any, res: any) => {
    const investimentosConsolidados = funcaoDeletarOperacao(req.body.operacao, req.body.nome, req.body.id)
    res.set({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    });
    res.status(200)
    res.json({
        status: 'sucess',
        data: {
            operacoes: jsonOperacoes,
            investimentosConsolidados: investimentosConsolidados
        }
    })
}



export const operacaoController: any = {
    postOperacoes,
    getOperacoes,
    patchOperacoes,
    deletarOperacoes
} 
