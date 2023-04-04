import React, { useCallback, useEffect, useState } from 'react'
import { useBuscaAtivoContext } from '../Contextos/BuscaAcao'
import { useAdicionarOperacaoContext } from '../Contextos/DadosInvestimentos'
import DataList from './DataList'
import FormAdicionarAtivoRV from './FormAdicionarAtivoRV'
import Select from './Select'
import TabelaDadosRV from './TabelaDadosRV'
import { useAxios } from '../useAxios.js'
import { operacaoSchema } from '../operacaoSchema.ts'
import ErrorMessage from './ErrorMessage'
import toast from "react-simple-toasts";


const ModalAdicionarAtivo = ({ fetch }) => {

  const { ativos, setAtivos, setCodigo, ativoProcurado, setAtivoProcurado, tiposInvestimento, selecionaListaDeAtivos, usuario } = useBuscaAtivoContext()

  const { tipoDeInvestimentoSelecionado, setTipoDeInvestimentoSelecionado, quantidadeOperada, valorDeOperacao, dataDaOperacao, alternaModal, tipoOperacao, editaOperacaoModal, idOperacao, callbackOperacao } = useAdicionarOperacaoContext()

  const [isDeleteOperacao, setIsDeleteOperacao] = useState(false)
  const [validate, setValidate] = useState({})

  const [, adicionaOperacao] = useAxios(
    {
      url: `/operacoes/`,
      method: "post",
    },
    {
      manual: true,
    }
  )

  const [, editarOperacao] = useAxios(
    {
      url: `/operacoes/`,
      method: "put",
    },
    {
      manual: true,
    }
  )

  const [, deletarOperacao] = useAxios(
    {
      url: `/operacoes/${idOperacao}`,
      method: "delete",
    },
    {
      manual: true,
    }
  )

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

    const dadosForm = {
      codigo: ativoProcurado.symbol,
      tipo: tipoDeInvestimentoSelecionado,
      quantidade: Number(quantidadeOperada),
      precoDaOperacao: Number(valorDeOperacao),
      dataDaOperacao: dataDaOperacao,
      tipoOperacao: tipoOperacao,
    }

    const validation = operacaoSchema.safeParse(dadosForm)
    setValidate(validation)

    const dados = {
      ...dadosForm,
      nome: ativoProcurado.shortName,
      idOperacao,
      idUser: usuario.id
    }

    if (validation.success) {
      if (editaOperacaoModal) {
        if (isDeleteOperacao) {
          await deletarOperacao()
          setIsDeleteOperacao(false)
          setTimeout(() => {
            toast('Operação deletada com sucesso')
          }, 500)

        } else {
          console.log('teste edit')
          await editarOperacao({
            data: dados
          })
          setTimeout(() => {
            toast('Operação editada com sucesso')
          }, 500)

        }
      } else {
        await adicionaOperacao({
          data: dados
        })
        setTimeout(() => {
          toast('Operação adicionada com sucesso')
        }, 500)

      }

      if (callbackOperacao?.callback) {
        await callbackOperacao.callback()
      }

      fetch()

      setTimeout(() => {
        alternaModal()
      }, 500)


    } else {
      toast('Falha na requisição')
    }

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
          <ErrorMessage validation={validate} name='tipo' />

          {tipoDeInvestimentoSelecionado === 'Fundos Imobiliarios' || tipoDeInvestimentoSelecionado === 'Ações' ?
            <>
              <DataList options={ativos.map((ativo) => (ativo.stock))} disabled={editaOperacaoModal} />
              <ErrorMessage validation={validate} name='codigo' />
              {ativoProcurado &&
                <>
                  <FormAdicionarAtivoRV validate={validate} />
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
                        onClick={() => setIsDeleteOperacao(true)}>
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