import { conectaAPI } from "../conectaAPI";
import { databasePool } from "../database/connectionPool";
import { requireSQL } from "../database/requireSQL";

export const getAllInvestimentos = async (idUser: number) => {
    const connection = await databasePool.getConnection();
    const consolidadoPorAtivoSql = await requireSQL("consolidadoPorAtivo.sql");

    const [investimentos] = await connection.query(consolidadoPorAtivoSql, [idUser]) as any;
    connection.release();
    const success = investimentos.length > 0
    return { investimentos, success }
}

export const getDadosConsolidadosPorTipo = async (idUser: number) => {
    const dadosAPrecoAtual = await getDadosConsolidadosAtuais(idUser);
    const connection = await databasePool.getConnection();
    const consolidadoPorAtivoSql = await requireSQL("consolidadoPorTipo.sql");

    const [consolidado] = await connection.query(consolidadoPorAtivoSql, [idUser]) as any;
    connection.release();
    const success = consolidado.length > 0

    return { consolidado, dadosAPrecoAtual, success }
}

export const getAtivosPorTipo = async (idUser: number, tipo: 'fundosimobiliarios' | 'acoes') => {
    const dadosAPrecoAtual = await getDadosConsolidadosAtuais(idUser);
    const precoTotalAtualDoTipo = dadosAPrecoAtual[tipo]

    const connection = await databasePool.getConnection();
    const consolidadoPorAtivoWhereSql = await requireSQL("consolidadoPorAtivoWhere.sql");

    const [consolidado] = await connection.query(consolidadoPorAtivoWhereSql, [idUser, tipo]) as any;
    const dadosComPorcentagem = consolidado.map((dados: any) => {
        const totalAtualDoAtivoIndividualmente = (dadosAPrecoAtual.dadosCalculados.find((item: any) => item.id === dados.ativos_user_id))?.precoTotalAtual

        const precoAtual = (dadosAPrecoAtual.dadosCalculados.find((item: any) => item.id === dados.ativos_user_id)).precoAtual

        const precoTotalAtual = (dadosAPrecoAtual.dadosCalculados.find((item: any) => item.id === dados.ativos_user_id)).precoTotalAtual

        const porcentagem = totalAtualDoAtivoIndividualmente * 100 / precoTotalAtualDoTipo
        const retorno = precoTotalAtual - Number(dados.valor_total)

        return {
            ...dados,
            porcentagem: porcentagem.toFixed(2),
            precoAtual,
            precoTotalAtual,
            retorno: retorno.toFixed(2),
        }
    })

    const valorTotalInvestido = consolidado.reduce((acc: number, ativo: any) => {
        return acc + Number(ativo.valor_total)
    }, 0)

    const retorno = precoTotalAtualDoTipo - valorTotalInvestido

    connection.release();
    const success = consolidado.length > 0

    return {
        dadosComPorcentagem,
        totalAtual: precoTotalAtualDoTipo.toFixed(2),
        retorno: retorno.toFixed(2),
        success
    }
}

export const getDadosConsolidadosAtuais = async (idUser: number) => {
    const dadosInvestimentos = await getAllInvestimentos(idUser)
    const dadosBanco = dadosInvestimentos.investimentos

    const dadosCalculados = await Promise.all(dadosBanco.map(async (dado: any) => {
        const ativo = await conectaAPI.retornaAtivoProcurado(dado.codigo_ativo)
        const precoTotalAtual = ativo && ativo[0]?.regularMarketPrice * Number(dado.quantidade_total)
        return {
            id: dado.ativos_user_id,
            precoAtual: ativo[0].regularMarketPrice,
            precoTotalAtual,
            tipo: dado.tipo
        }
    }))

    const valorAtualFIIs = dadosCalculados.reduce((acc: number, dados: any) => {
        if (dados.tipo === 'fundosimobiliarios') {
            return acc + dados.precoTotalAtual
        }
        return acc
    }, 0)

    const valorAtualAcao = dadosCalculados.reduce((acc: number, dados: any) => {
        if (dados.tipo === 'acoes') {
            return acc + dados.precoTotalAtual
        }
        return acc

    }, 0)

    const dados = {
        dadosCalculados,
        acoes: valorAtualAcao,
        fundosimobiliarios: valorAtualFIIs,
        total: valorAtualAcao + valorAtualFIIs
    }

    return { ...dados }
}

