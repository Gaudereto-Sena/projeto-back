import * as operacoes_repositories from '../repositories/operacoes.repositories';

const getOperacoes = async (req: any, res: any) => {
    const { operacoes, success, numeroOperacoes } = await operacoes_repositories.getTodasOperacoes(req.query)

    res.set({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    });
    res.status(200).json({
        success,
        data: operacoes,
        numeroOperacoes
    })
}

const getOperacoesPorId = async (req: any, res: any) => {
    const id = Number(req.params.id);
    const { operacoes, success } = await operacoes_repositories.getOperacoesPorId(id)

    res.set({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    });
    res.status(200)
    res.json({
        success,
        data: operacoes
    })
}

const postOperacoes = async (req: any, res: any) => {
    const { operacaoAdicionada, success, errors } = await operacoes_repositories.createOperacao(req.body)

    res.set({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    });
    res.status(201).json({
        success,
        data: operacaoAdicionada,
        errors
    })
}

const putOperacoes = async (req: any, res: any) => {
    const { operacaoEditada, success, errors } = await operacoes_repositories.editOperacao(req.body)
    res.set({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    });
    res.status(200).json({
        success,
        data:
            operacaoEditada,
        errors

    })
}

const deletarOperacoes = async (req: any, res: any) => {
    const idOperacao = req.params.id
    const { operacaoDeletada, success, ativoDeletadoResponse } = await operacoes_repositories.deleteOperacao(idOperacao)
    res.set({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    });
    res.status(200)
    res.json({
        success,
        data: {
            operacaoDeletada,
            ativoDeletadoResponse
        }
    })
}

export const operacao_controller: any = {
    postOperacoes,
    getOperacoes,
    putOperacoes,
    deletarOperacoes,
    getOperacoesPorId
} 
