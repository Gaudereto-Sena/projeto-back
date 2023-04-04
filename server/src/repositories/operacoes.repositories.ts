import { databasePool } from "../database/connectionPool";
import { requireSQL } from "../database/requireSQL";
import { getOperacoesSchema, sortParams } from "../schemas/getOperacoesSchema";
import { Operacao, reqOperacoesSchema } from "../schemas/reqOperacoesSchema";
import { padronizaTipoDaOperacao } from '../util/util'



export const getTodasOperacoes = async (params: sortParams) => {
    const validadeParams = await getOperacoesSchema.safeParseAsync(params)
    if (validadeParams.success) {
        const connection = await databasePool.getConnection();
        const selectTodasOperacoes = await requireSQL("selectOperacoes.sql");
        const orderBy = ` order by ${validadeParams.data.orderBy} ${validadeParams.data.direction}, tipo  LIMIT ${validadeParams.data.limit} offset ${validadeParams.data.offset}`
        const select =
            validadeParams.data.search ?
                ` and (nome_ativo like '%${validadeParams.data.search}%' or codigo_ativo like '%${validadeParams.data.search}%')`
                : ""

        const [operacoes] = await connection.query(
            selectTodasOperacoes + select + orderBy,
            [validadeParams.data.idUser]
        ) as any;


        const success = operacoes.length > 0

        const countOperacoesSql = await requireSQL('countOperacoes.sql')
        const [[{ numeroOperacoes }]] = await connection.query(
            countOperacoesSql, [validadeParams.data.idUser]
        ) as any

        connection.release();
        return { operacoes, success, numeroOperacoes }
    } else {
        return {
            success: false,
            data: [],
            numeroOperacoes: 0,
        }
    }

}

export const getOperacoesPorId = async (id: number) => {
    const connection = await databasePool.getConnection();
    const selectOperacoesPorId = await requireSQL("selectOperacoesPorId.sql");
    const [operacoes] = await connection.query(
        selectOperacoesPorId, [id]
    ) as any;

    connection.release();
    const success = operacoes.length > 0

    return { operacoes, success }
}

export const getOperacaoIndividualPorId = async (id: number) => {
    const connection = await databasePool.getConnection();
    const selectOperacaoIndividualPorId = await requireSQL("selectOperacaoIndividualPorId.sql");

    const [operacao] = await connection.query(
        selectOperacaoIndividualPorId, [id]
    ) as any;

    connection.release();
    const success = operacao.length > 0

    return { operacao, success }
}
export const createOperacao = async (operacao: Operacao) => {
    const operacaoValida = await reqOperacoesSchema.safeParseAsync(operacao)

    if (operacaoValida.success) {
        const tipoTransformado = padronizaTipoDaOperacao(operacao.tipo)

        let idAtivo;
        const connection = await databasePool.getConnection();
        const [ativosDoUsuario] = await connection.query('SELECT * FROM ativos_user where id_user=?', [operacao.idUser]) as any

        const isAlreadyInStorage = ativosDoUsuario.some((dado: any) => {
            return dado.codigo_ativo === operacao.codigo
        })

        if (!isAlreadyInStorage) {
            const adicionarNovoAtivo = await requireSQL("adicionarNovoAtivo.sql")
            const [novoAtivoResponse] = await connection.query(adicionarNovoAtivo, [operacao.codigo, operacao.nome, tipoTransformado, operacao.idUser]) as any;
            idAtivo = novoAtivoResponse.insertId
        } else {
            idAtivo = ativosDoUsuario.find((dado: any) => dado.codigo_ativo === operacao.codigo).id_ativo
        }

        const adicionarOperacao = await requireSQL("adicionarOperacao.sql");

        const [novaOperacaoResponse] = await connection.query(adicionarOperacao,
            [operacao.quantidade, operacao.tipoOperacao, operacao.precoDaOperacao, operacao.dataDaOperacao, idAtivo]) as any;

        connection.release();

        const success = novaOperacaoResponse.affectedRows > 0

        const operacaoAdicionada = (await getOperacaoIndividualPorId(novaOperacaoResponse.insertId))

        return { operacaoAdicionada, success, errors: [] }
    } else {
        return {
            operacaoAdicionada: [], success: false, errors: operacaoValida.error.errors
        }
    }

}


export const editOperacao = async (dadosOperacao: Operacao) => {
    const operacaoValida = await reqOperacoesSchema.safeParseAsync(dadosOperacao)

    if (operacaoValida.success) {
        const dados = operacaoValida.data
        const connection = await databasePool.getConnection();
        const editOperacao = await requireSQL("editOperacao.sql");

        const [editOperacaoResponse] = await connection.query(
            editOperacao, [dados.quantidade, dados.precoDaOperacao, dados.dataDaOperacao, dados.tipoOperacao, dados.idOperacao]
        ) as any;

        connection.release();

        const operacaoEditada = (await getOperacaoIndividualPorId(dadosOperacao.idOperacao)).operacao
        const success = editOperacaoResponse.affectedRows > 0

        return { operacaoEditada, success, errors: [] }

    } else {

        return {
            operacaoEditada: [], success: false, errors: []
        }
    }
}


export const deleteOperacao = async (idOperacao: number) => {
    const [operacaoDeletada] = (await getOperacaoIndividualPorId(idOperacao)).operacao
    const connection = await databasePool.getConnection();
    const deleteOperacaoSql = await requireSQL("deleteOperacao.sql");

    const [deleteResponse] = await connection.query(
        deleteOperacaoSql, [idOperacao]
    ) as any;

    connection.release();

    const success = deleteResponse.affectedRows > 0

    const hasOperacoes = await hasOperacoesDoAtivo(operacaoDeletada?.id_ativo)
    if (!hasOperacoes) {
        const ativoDeletadoResponse = await deleteAtivo(operacaoDeletada?.id_ativo)

        return { operacaoDeletada, success, ativoDeletadoResponse }
    }

    return { operacaoDeletada, success, ativoDeletado: false }
}



export const deleteAtivo = async (idAtivo: number) => {
    const connection = await databasePool.getConnection();

    const [ativoDeletado] = await connection.query('select * from ativos_user where id_ativo = ?', [idAtivo])

    const deleteAtivoSql = await requireSQL("deleteAtivo.sql")

    const [deleteResponse] = await connection.query(deleteAtivoSql, [idAtivo]) as any

    connection.release();

    const success = deleteResponse.affectedRows > 0

    return { ativoDeletado, success }
}


const hasOperacoesDoAtivo = async (idAtivo: number) => {
    const connection = await databasePool.getConnection();

    const [operacoesAtivo] = await connection.query('select * from operacoes where ativos_user_id= ?', [idAtivo]) as any

    const hasOperacoes = operacoesAtivo.length > 0

    return hasOperacoes
}