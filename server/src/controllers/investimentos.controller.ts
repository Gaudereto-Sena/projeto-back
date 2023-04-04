
import * as investimentos_repositories from '../repositories/investimentos.repositories';

const getInvestimentos = async (req: any, res: any) => {
    const idUser = await req.query.idUser
    const { success, investimentos } = await investimentos_repositories.getAllInvestimentos(idUser)
    res.set({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    });
    res.status(200)
    res.json({
        success,
        data: investimentos,
    })
}

const getDadosConsolidados = async (req: any, res: any) => {
    const idUser = await req.query.idUser
    const { success, consolidado, dadosAPrecoAtual } = await investimentos_repositories.getDadosConsolidadosPorTipo(idUser)
    res.set({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    });
    res.status(200)
    res.json({
        success,
        data: {consolidado, dadosAPrecoAtual}
    })
}

const getAtivosPorTipo = async (req: any, res: any) => {
    const idUser = await req.query.idUser
    const tipo = req.params.tipo
    const { success, dadosComPorcentagem, totalAtual, retorno } = await investimentos_repositories.getAtivosPorTipo(idUser, tipo)

    res.set({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    });
    res.status(200)
    res.json({
        success,
        data: dadosComPorcentagem,
        totalAtual,
        retorno
    })
}

const getDadosPrecoDeMercado = async (req: any, res: any) => {
    const idUser = await req.query.idUser
    const dados = await investimentos_repositories.getDadosConsolidadosAtuais(idUser)
    console.log(dados)
    res.set({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    });
    res.status(200)
    res.json({

        data: dados
    })
}



export const investimentos_controller: any = {
    getInvestimentos,
    getDadosConsolidados,
    getAtivosPorTipo,
    getDadosPrecoDeMercado
} 