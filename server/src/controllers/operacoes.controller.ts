import fs from 'fs'
import { operacao_service } from '../services/operacoes.service'



const getOperacoes = (req: any, res: any) => {
    const jsonOperacoes = JSON.parse(fs.readFileSync('./src/json/operacoes.json').toString())
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
    const jsonOperacoes = JSON.parse(fs.readFileSync('./src/json/operacoes.json').toString())
    const investimentosConsolidados = operacao_service.adicionarNovaOperacao(req.body.operacao, req.body.nome)
    res.set({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    });
    res.status(201)
    res.json({
        status: 'sucess',
        data: {
            operacoes: jsonOperacoes,
            investimentosConsolidados: investimentosConsolidados
        }
    })
}

const putOperacoes = (req: any, res: any) => {
    const jsonOperacoes = JSON.parse(fs.readFileSync('./src/json/operacoes.json').toString())
    const investimentosConsolidados = operacao_service.editarOperacao(req.body.operacao, req.body.nome, req.body.id)
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
    const jsonOperacoes = JSON.parse(fs.readFileSync('./src/json/operacoes.json').toString())
    const investimentosConsolidados = operacao_service.funcaoDeletarOperacao(req.body.operacao, req.body.nome, req.body.id)
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



export const operacao_controller: any = {
    postOperacoes,
    getOperacoes,
    putOperacoes,
    deletarOperacoes
} 
