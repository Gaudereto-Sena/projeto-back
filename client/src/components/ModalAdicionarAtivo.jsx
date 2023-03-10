import React, { useCallback, useEffect, useState } from 'react'
import api from '../api/api'
import { useBuscaAtivoContext } from '../Contextos/BuscaAcao'
import { useAdicionarOperacaoContext } from '../Contextos/DadosInvestimentos'
import DataList from './DataList'
import FormAdicionarAtivoRV from './FormAdicionarAtivoRV'
import Select from './Select'
import TabelaDadosRV from './TabelaDadosRV'


const ModalAdicionarAtivo = () => {

  const { ativos, setAtivos, setCodigo, ativoProcurado, setAtivoProcurado, tiposInvestimento, selecionaListaDeAtivos, } = useBuscaAtivoContext()

  const { tipoDeInvestimentoSelecionado, setTipoDeInvestimentoSelecionado, quantidadeOperada, valorDeOperacao, dataDaOperacao, alternaModal, setOperacoes, setInvestimentos, eVenda, editaOperacaoModal, idOperacao } = useAdicionarOperacaoContext()

  const [deletarOperacao, setDeletarOperacao] = useState(false)

  const selecionaTipoDeInvestimento = (tipo) => {
    setTipoDeInvestimentoSelecionado(tipo)
    setAtivoProcurado('')
    setCodigo('')
  }

  const filtraOsDadosDosAtivosListados = useCallback(async () => {
    setAtivos([])
    selecionaListaDeAtivos(tipoDeInvestimentoSelecionado)
  }, [setAtivos, tipoDeInvestimentoSelecionado, selecionaListaDeAtivos]);

  const submitOperacao = async (evento) => {
    evento.preventDefault()

    const dados = {
      operacao: {
        codigo: ativoProcurado.symbol,
        tipo: tipoDeInvestimentoSelecionado,
        quantidade: Number(quantidadeOperada),
        precoDaOperacao: Number(valorDeOperacao),
        dataDaOperacao: dataDaOperacao,
        venda: eVenda
      },
      nome: ativoProcurado.shortName
    }

    if (editaOperacaoModal) {
      if (deletarOperacao) {
        submitDeletarOperacao(dados, idOperacao)
      } else {
        submitEditarOperacao(dados, idOperacao)
      }
    } else {
      submitAdicionarAtivo(dados)
    }

    alternaModal()
  }

  const submitAdicionarAtivo = async (dados) => {
    const postDadosOperacao = await api.post('/operacoes', dados)
    const dadosOperacaoJSON = await postDadosOperacao.data.data
    console.log(dadosOperacaoJSON)
    setOperacoes(dadosOperacaoJSON.operacoes)
    setInvestimentos(dadosOperacaoJSON.investimentosConsolidados)
  }

  const submitEditarOperacao = async (dados, id) => {
    dados.id = id
    const patchDadosOperacao = await api.put('/operacoes', dados)
    const dadosEditaOperacaoJSON = await patchDadosOperacao.data.data

    setOperacoes(dadosEditaOperacaoJSON.operacoes)
    setInvestimentos(dadosEditaOperacaoJSON.investimentosConsolidados)
  }

  const submitDeletarOperacao = async (dados, id) => {
    dados.id = id
    const deletarDadosOperacao = await api.delete('/operacoes', {
      data: dados
    })
    const dadosDeletarOperacaoJSON = await deletarDadosOperacao.data.data

    setOperacoes(dadosDeletarOperacaoJSON.operacoes)
    setInvestimentos(dadosDeletarOperacaoJSON.investimentosConsolidados)
    setDeletarOperacao(false)
  }



  useEffect(() => {

    filtraOsDadosDosAtivosListados()

  }, [tipoDeInvestimentoSelecionado])


  return (
    <div className='w-full h-full bg-black/60 fixed flex justify-center items-center left-0 top-0 z-20'>
      <div className='w-full h-full absolute z-0' onClick={alternaModal}>
        
      </div>
      <div className='w-full min-h-[720px] max-w-3xl bg-azul-400 absolute z-10 rounded-3xl p-12 flex flex-col text-white'>
        <div className='w-full self-end text-center'>
          <h3 className='font-bold text-xl uppercase mb-3'>Adicionar Ativo</h3>
        </div>

        <form className='flex flex-col' onSubmit={(e) => submitOperacao(e)}>

          <label htmlFor='select_tipo_investimento'>Selecione o tipo de ativo:</label>
          <Select id='select_tipo_investimento' options={tiposInvestimento} onChange={selecionaTipoDeInvestimento} value={tipoDeInvestimentoSelecionado} disabled={editaOperacaoModal} />

          {tipoDeInvestimentoSelecionado === 'Fundos Imobiliarios' || tipoDeInvestimentoSelecionado === 'Ações' ?
            <>
              <DataList options={ativos.map((ativo) => (ativo.stock))} disabled={editaOperacaoModal} />

              {ativoProcurado &&
                <>
                  <FormAdicionarAtivoRV />
                  <TabelaDadosRV />
                  {
                    !editaOperacaoModal &&
                    <button
                      className='w-4/5 mt-6 mx-auto bg-amarelo-300 text-black cursor-pointer text-lg py-3 px-8 rounded-lg'>
                      Adicionar
                    </button>
                  }
                  {
                    editaOperacaoModal &&
                    <div
                      className='flex justify-between'
                    >
                      <button
                        className='w-2/5 mt-6 bg-amarelo-300 text-black cursor-pointer text-lg py-3 px-8 rounded-lg'>
                        Editar
                      </button>
                      <button
                        className='w-2/5 mt-6 bg-amarelo-300 text-black cursor-pointer text-lg py-3 px-8 rounded-lg'
                        onClick={() => setDeletarOperacao(true)}>
                        Deletar
                      </button>
                    </div>
                  }

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