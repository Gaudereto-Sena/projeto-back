import { conectaAPI } from '../conectaAPI'

/* Retorna a lista de fundos imobiliarios listados na bolsa */

const getFIIs = async (req: any, res: any) => {
    const ativos = await conectaAPI.retornaTodasAcoes()
    const fiis = conectaAPI.filterFundosImobiliarios(ativos)

    res.set({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    });
    res.status(200)
    res.json({
        status: 'sucess',
        fiis
    })
}

const getAcoes = async (req: any, res: any) => {
    const ativos = await conectaAPI.retornaTodasAcoes()
    const acoes = conectaAPI.getAcoesSemFracionados(ativos)

    res.set({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    });
    res.status(200)
    res.json({
        status: 'sucess',
        data: acoes
    })
}

/* Retorna ativo especifico de acordo com seu codigo  */
const getTicket = async (req: any, res: any) => {
    const ticket = req.params.ticket
    const ativo = await conectaAPI.retornaAtivoProcurado(ticket)

    res.set({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    });
    res.status(200)
    res.json({
        status: 'sucess',
        data: ativo
    })
}

export const bolsaController = {
    getFIIs,
    getAcoes,
    getTicket
}

