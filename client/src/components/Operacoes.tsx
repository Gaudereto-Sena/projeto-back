import React from 'react'
import { useAdicionarOperacaoContext } from '../Contextos/DadosInvestimentos'
import { InterfaceCodigoETipo } from '../types'

const Operacoes = ({ codigo, tipo } : InterfaceCodigoETipo) => {
    const { investimentos } = useAdicionarOperacaoContext()
    

    return (
        <div className='bg-gray-300 px-4 pt-4'>

            <div className='flex flex-row justify-between border-b-2 border-gray-500'>
                <div className='w-3/12'>Data</div>
                <div className='w-3/12'>Quantidade</div>
                <div className='w-3/12'>Preço da Operação</div>
                <div className='w-3/12'>Valor total da Operação</div>
            </div>
            {investimentos[tipo][codigo].operacoes.map((operacao) => {
                return (
                    <div className='flex flex-row justify-between' key={operacao.id}>
                        <div className='w-3/12'>{operacao.dataDaOperacao}</div>
                        <div className='w-3/12'>{operacao.quantidade}</div>
                        <div className='w-3/12'>R${operacao.precoDaOperacao.toFixed(2)}</div>
                        <div className='w-3/12'>R${operacao.valorTotalDaOperacao.toFixed(2)}</div>
                    </div>
                )

            })}
        </div>
    )
}

export default Operacoes