import React, { useCallback, useEffect, useState } from 'react'
import { useBuscaAtivoContext } from '../Contextos/BuscaAcao'
import { useAdicionarOperacaoContext } from '../Contextos/DadosInvestimentos'
import Operacoes from './Operacoes'
import { GoTriangleDown } from 'react-icons/go'
import { useAxios } from '../useAxios.js'


const AtivoIndividual = ({ codigo, tipo, ativo, ativos }) => {
  const [showOperacoes, setShowOperacoes] = useState(false)
  const [diferencaTotalAtual, setDiferencaTotalAtual] = useState(0)

  const toggleOperacoes = () => {
    setShowOperacoes((show) => !show)
  }

  return (
    <>
      {
        ativo &&
        <div className='bg-azul-400 mt-8 rounded-3xl shadow-md p-4 text-white font-bold'>
          <div
            className='flex flex-row justify-between cursor-pointer'
            onClick={toggleOperacoes}
          >
            <div className='w-2/12'>{ativo.codigo_ativo}</div>
            <div className='w-3/12'>Total Investido: R${ativo.valor_total}</div>
            <div className='w-3/12'>Total atual: R${ativo.precoTotalAtual.toFixed(2)}</div>
            <div className={ativo.retorno > 0 ? 'w-3/12 text-verde-300' : 'w-3/12 text-vermelho-300'}>Lucro/prejuizo: R${ativo.retorno}</div>
            <div className='w-1/12'>%{ativo.porcentagem}</div>
            <GoTriangleDown />
          </div>
          {showOperacoes &&
            <div className='flex flex-row justify-between pt-4'>
              <div className='w-2/12'>{ativo.nome_ativo}</div>
              <div className='w-3/12'>Preço médio: {ativo.preco_medio}</div>
              <div className='w-3/12'>Preço atual: {ativo.precoAtual}</div>
              <div className='w-3/12'>Quantidade: {ativo.quantidade_total}</div>
              <div className='w-1/12'>Variação: </div>
            </div>
          }
        </div>

      }

      {showOperacoes &&

        <>
          <Operacoes codigo={codigo} tipo={tipo} id={ativo.ativos_user_id} ativos={ativos} />
        </>
      }

    </>
  )
}

export default AtivoIndividual