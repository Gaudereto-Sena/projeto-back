import React, { useCallback, useEffect, useState } from 'react'
import api from '../api/api'
import { useBuscaAtivoContext } from '../Contextos/BuscaAcao'
import { useAdicionarOperacaoContext } from '../Contextos/DadosInvestimentos'
import Operacoes from './Operacoes'
import { GoTriangleDown } from 'react-icons/go'


const AtivoIndividual = ({ codigo, tipo }) => {
  const { investimentos, operacoes } = useAdicionarOperacaoContext()
  const { setPrecosAtualizados, precosAtualizados, precoConsolidados, setPrecosConsolidados } = useBuscaAtivoContext()
  const [showOperacoes, setShowOperacoes] = useState(false)
  const [precoAtivoAtualizado, setPrecoAtivoAtualizado] = useState(0)
  const [valorTotalAtual, setValorTotalAtual] = useState(0)
  const [diferencaTotalAtual, setDiferencaTotalAtual] = useState(0)
  const [porcentagem, setPorcentagem] = useState(0)


  useEffect(() => {
    buscaPrecoAtivo()
  }, [investimentos, precoAtivoAtualizado, valorTotalAtual, diferencaTotalAtual, operacoes, precoConsolidados])

  useEffect(() => {
    buscaPrecoAtivo()
  }, [])

  useEffect(() => {
    setPrecosAtualizados((estadoAnterior) => {
      return {
        ...estadoAnterior,
        [tipo]: {
          ...estadoAnterior[tipo],
          [codigo]: {
            valorAtual: Number(valorTotalAtual),
            porcentagem: porcentagem
          }
        }
      }
    })
  }, [valorTotalAtual, porcentagem])

  const buscaPrecoAtivo = async () => {
    const resposta = await api.get(`/bolsa/${codigo}`)
    const respostaData = await resposta.data.data
    setPrecoAtivoAtualizado(respostaData[0].regularMarketPrice)
    calculaTotalAtual()
    calculaDiferencaAtual()
    calculaPorcentagem()
  }

  const calculaTotalAtual = () => {
    const valorTotalAtualCalculado = precoAtivoAtualizado * investimentos[tipo][codigo]?.quantidadeTotal
    setValorTotalAtual(valorTotalAtualCalculado)
  }
  const calculaDiferencaAtual = async () => {
    const diferencaAtualCalculado = valorTotalAtual - investimentos[tipo][codigo]?.valorPagoTotal
    setDiferencaTotalAtual(diferencaAtualCalculado)
  }

  const calculaPorcentagem = () => {
    if (valorTotalAtual > 0) {
      const porcentagemCalculada = valorTotalAtual * 100 / precoConsolidados[tipo]
      setPorcentagem(porcentagemCalculada.toFixed(2))
    } else {
      setPorcentagem(0)
    }
  }

  const toggleOperacoes = () => {
    setShowOperacoes((show) => !show)
  }

  return (
    <>
      {
        investimentos[tipo][codigo] &&
        <div className='bg-azul-400 mt-8 rounded-3xl shadow-md p-4 text-white font-bold'>
          <div
            className='flex flex-row justify-between cursor-pointer'
            onClick={toggleOperacoes}
          >
            <div className='w-2/12'>{investimentos[tipo][codigo].codigo}</div>
            <div className='w-3/12'>Total Investido: R${investimentos[tipo][codigo].valorPagoTotal.toFixed(2)}</div>
            <div className='w-3/12'>Total atual: R${valorTotalAtual.toFixed(2)}</div>
            <div className={diferencaTotalAtual > 0 ? 'w-3/12 text-verde-300' : 'w-3/12 text-vermelho-300'}>Lucro/prejuizo: R${diferencaTotalAtual.toFixed(2)}</div>
            <div className='w-1/12'>%{precosAtualizados[tipo][codigo]?.porcentagem}</div>
            <GoTriangleDown />
          </div>
          {showOperacoes &&
            <div className='flex flex-row justify-between pt-4'>
              <div className='w-2/12'>{investimentos[tipo][codigo].nome}</div>
              <div className='w-3/12'>Preço médio: {investimentos[tipo][codigo].precoMedio.toFixed(2)}</div>
              <div className='w-3/12'>Preço atual: {precoAtivoAtualizado}</div>
              <div className='w-3/12'>Quantidade: {investimentos[tipo][codigo].quantidadeTotal}</div>
              <div className='w-1/12'>Variação: </div>
            </div>
          }
        </div>

      }
      {showOperacoes &&
        <>
          <Operacoes codigo={codigo} tipo={tipo} />
        </>
      }

    </>
  )
}

export default AtivoIndividual