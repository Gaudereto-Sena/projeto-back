import fs from 'fs'
import { v4 as uuidv4 } from 'uuid'
import { dadosChave, Operacao } from '../types'
import { escreveJSON } from '../util/util'

const consolidaOperacoesRV = (operacoes: Operacao[] | undefined, nomeDoAtivo: string, dadosParaDeletar?: dadosChave) => {

    const jsonInvestimentos = JSON.parse(fs.readFileSync('./src/json/investimentos.json').toString())

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



    } else {
        dadosParaDeletar &&
            delete jsonInvestimentos[dadosParaDeletar.tipo][dadosParaDeletar.codigo]
    }


    escreveJSON(jsonInvestimentos, './src/json/investimentos.json')

    consolidaTodosAtivosDeCadaCategoria(jsonInvestimentos)

    return jsonInvestimentos

}

const consolidaTodosAtivosDeCadaCategoria = (json: any) => {
    const chavesTipos = Object.keys(json)

    const consolidados = chavesTipos.map((tipo) => {
        const chavesAtivos = Object.keys(json[tipo])
        const numeroDeAtivos = chavesAtivos.length
        const valorInvestidoTotal = chavesAtivos ? chavesAtivos.reduce((acc, chaveAtivo) => {
            return acc + json[tipo][chaveAtivo]?.valorPagoTotal
        }
            , 0) : 0

        return {
            totalInvestido: valorInvestidoTotal,
            numeroDeAtivos: numeroDeAtivos
        }
    })
    
        const consolidadosArray = chavesTipos.map((tipo, idx) => {
            return {
                [tipo]: consolidados[idx]
            }
        })
    
        let consolidadosJSON = {}
    
        consolidadosArray.map(tipoConsolidado => {
            consolidadosJSON = {
                ...consolidadosJSON,
                ...tipoConsolidado
            }
        })
    
        escreveJSON(consolidadosJSON, './src/json/consolidado.json')

}

export const investimentos_service = {
    consolidaOperacoesRV
}