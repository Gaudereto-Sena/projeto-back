import { useState } from 'react'
import { useAdicionarOperacaoContext } from '../Contextos/DadosInvestimentos'
import { InterfaceCodigoETipo } from '../types'
import Operacoes from './Operacoes'


const AtivoIndividual = ({ codigo, tipo } : InterfaceCodigoETipo) => {
  const { investimentos } = useAdicionarOperacaoContext()
  const [showOperacoes, setShowOperacoes] = useState(false)

  const toggleOperacoes = () => {
    setShowOperacoes((show) => !show)
  }
  return (
    <>
      {investimentos[tipo][codigo] &&
        <div className='flex flex-row justify-between shadow-md p-3 bg-gray-100 mt-8' onClick={toggleOperacoes}>
          <div className='w-2/12'>{investimentos[tipo][codigo].codigo}</div>
          <div className='w-3/12'>{investimentos[tipo][codigo].nome}</div>
          <div className='w-2/12'>Quantidade: {investimentos[tipo][codigo].quantidadeTotal}</div>
          <div className='w-2/12'>Preço médio: {investimentos[tipo][codigo].precoMedio.toFixed(2)}</div>
          <div className='w-3/12'>Total Investido: R${investimentos[tipo][codigo].valorPagoTotal}</div>
        </div>
      }
      {showOperacoes &&

          <Operacoes codigo={codigo} tipo={tipo}/>
        }

    </>
  )
}

export default AtivoIndividual