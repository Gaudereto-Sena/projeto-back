import React from 'react'
import { useBuscaAtivoContext } from '../Contextos/BuscaAcao'
import { useAdicionarOperacaoContext } from '../Contextos/DadosInvestimentos'

const TabelaDadosRV = () => {

    const { ativoProcurado } = useBuscaAtivoContext()
    const { quantidadeOperada,  valorDeOperacao } = useAdicionarOperacaoContext()

    return (
        <div className='p-8 bg-gray-100 rounded-2xl mt-6 text-black'>
            <h4 className='mb-3 underline text-center'>{ativoProcurado.longName}</h4>
            <table className='w-full'>
                <thead>
                    <tr className='flex justify-around'>
                        <th className='text-start w-1/3'>Preço atual</th>
                        <th className='text-start w-1/3'>Total atual</th>
                        <th className='text-start w-1/3'>Total investido</th>
                    </tr>

                </thead>
                <tbody>
                    <tr className='flex justify-around'>
                        <td className='text-start w-1/3'>R$ {ativoProcurado.regularMarketPrice}</td>
                        <td className='text-start w-1/3'>R$ {(quantidadeOperada * ativoProcurado.regularMarketPrice).toFixed(2)}</td>
                        <td className='text-start w-1/3'>R$ {(quantidadeOperada * valorDeOperacao).toFixed(2)}</td>
                    </tr>
                </tbody>

            </table>
        </div>
    )
}

export default TabelaDadosRV