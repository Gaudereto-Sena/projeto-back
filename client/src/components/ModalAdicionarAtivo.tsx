import React, { useCallback, useEffect } from 'react'
import api from '../api/api'
import { useBuscaAtivoContext } from '../Contextos/BuscaAcao'
import { useAdicionarOperacaoContext } from '../Contextos/DadosInvestimentos'
import DataList from './DataList'
import FormAdicionarAtivoRV from './FormAdicionarAtivoRV'
import Select from './Select'
import TabelaDadosRV from './TabelaDadosRV'


const ModalAdicionarAtivo = () => {

  const { ativos, setAtivos, setCodigo, ativoProcurado, setAtivoProcurado, tiposInvestimento, selecionaListaDeAtivos, } = useBuscaAtivoContext()

  const { tipoDeInvestimentoSelecionado, setTipoDeInvestimentoSelecionado, quantidadeOperada, valorDeOperacao, dataDaOperacao, alternaModal, setOperacoes, setInvestimentos } = useAdicionarOperacaoContext()

  const selecionaTipoDeInvestimento = (tipo: string) => {
    setTipoDeInvestimentoSelecionado(tipo)
    setAtivoProcurado('')
    setCodigo('')
    console.log(tipoDeInvestimentoSelecionado)
  }

  const filtraOsDadosDosAtivosListados = useCallback(async () => {
    setAtivos([])
    selecionaListaDeAtivos(tipoDeInvestimentoSelecionado)
  }, [setAtivos, tipoDeInvestimentoSelecionado, selecionaListaDeAtivos]);

  const submitAdicionarAtivo = async (evento: any) => {
    evento.preventDefault()
    const dados = {
      operacao: {
        codigo: ativoProcurado.symbol,
        tipo: tipoDeInvestimentoSelecionado,
        quantidade: Number(quantidadeOperada),
        precoDaOperacao: Number(valorDeOperacao),
        dataDaOperacao: dataDaOperacao,
        venda: false
      },
      nome: ativoProcurado.shortName
    }
    const getDadosOperacao = await api.post('/operacoes', dados)
    const dadosOperacaoJSON = await getDadosOperacao.data.data

    setOperacoes(dadosOperacaoJSON.operacoes)
    setInvestimentos(dadosOperacaoJSON.investimentosConsolidados)
    alternaModal()
  }

  useEffect(() => {

    filtraOsDadosDosAtivosListados()

  }, [tipoDeInvestimentoSelecionado, filtraOsDadosDosAtivosListados])


  return (
    <div className='w-full h-full bg-black/60 absolute flex justify-center items-center left-0'>
      <div className='w-full min-h-[720px] max-w-3xl bg-white absolute rounded-3xl p-12 flex flex-col'>
        <div className='w-full self-end text-center'>
          <h3>Adicionar Ativo</h3>
        </div>

        <form className='flex flex-col' onSubmit={(e) => submitAdicionarAtivo(e)}>

          <label htmlFor='select_tipo_investimento'>Selecione o tipo de ativo:</label>
          <Select id='select_tipo_investimento' options={tiposInvestimento} onChange={selecionaTipoDeInvestimento} value={tipoDeInvestimentoSelecionado} />

          {tipoDeInvestimentoSelecionado === 'Fundos Imobiliarios' || tipoDeInvestimentoSelecionado === 'Ações' ?
            <>
              <DataList options={ativos.map((ativo) => (ativo.stock))} />

              {ativoProcurado &&
                <>
                  <FormAdicionarAtivoRV />
                  <TabelaDadosRV />
                  <button
                    className='mt-5 ml-auto bg-gray-300 cursor-pointer text-lg py-3 px-8 rounded-lg self-end'>
                    Adicionar
                  </button>
                </>
              }
            </>
            : ''
          }

          {tipoDeInvestimentoSelecionado === 'Renda Fixa' &&
            <h3>Renda Fixa</h3>
          }

        </form>
      </div>
    </div >
  )
}

export default ModalAdicionarAtivo