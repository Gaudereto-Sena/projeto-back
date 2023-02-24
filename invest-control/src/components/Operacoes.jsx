import React from 'react'
import { AiOutlineEdit } from 'react-icons/ai'
import { useBuscaAtivoContext } from '../Contextos/BuscaAcao'
import { useAdicionarOperacaoContext } from '../Contextos/DadosInvestimentos'

const Operacoes = ({ codigo, tipo }) => {
    const { setCodigo, buscaAtivo, transformaTipoEmTexto} = useBuscaAtivoContext()

    const { investimentos, setTipoDeInvestimentoSelecionado, alternaModal, setQuantidadeOperada, setValorDeOperacao, setDataDaOperacao, setEditaOperacaoModal, setSelectVenda, setEVenda, setIdOperacao } = useAdicionarOperacaoContext()

    const editarOperacao = (operacao) => {
        alternaModal();
        setTipoDeInvestimentoSelecionado(transformaTipoEmTexto(tipo));
        setCodigo(codigo);
        buscaAtivo(codigo);
        setDataDaOperacao(operacao.dataDaOperacao);
        setEVenda(operacao.venda)
        setSelectVenda(operacao.venda ? 'venda' : 'compra')
        setQuantidadeOperada(operacao.quantidade);
        setValorDeOperacao(operacao.precoDaOperacao);
        setEditaOperacaoModal(true)
        setIdOperacao(operacao.id)
    }

    return (
        <div className='mt-4'>
            <div className='flex flex-row justify-between bg-amarelo-400 mb-3 rounded-2xl p-3'>
                <div className='w-2/12 text-black'>Data</div>
                <div className='w-3/12 text-black'>Quantidade</div>
                <div className='w-3/12 text-black'>Preço da Operação</div>
                <div className='w-3/12 text-black'>Valor total da Operação</div>
                <div className='w-1/12 text-center text-black'>Editar</div>
            </div>
            {investimentos[tipo][codigo]?.operacoes.map((operacao) => {
                return (
                    <div
                        className='flex flex-row justify-between bg-amarelo-300 rounded-2xl p-3 my-3'
                        key={operacao.id}

                    >
                        <div
                            className={operacao.venda ? 'w-2/12 text-vermelho-500' : 'w-2/12 text-verde-500'}
                        >
                            {operacao.dataDaOperacao}
                        </div>

                        {operacao.venda ?
                            <div className='w-3/12 text-vermelho-500'>
                                -{operacao.quantidade}
                            </div>
                            :
                            <div className='w-3/12 text-verde-500'>
                                {operacao.quantidade}
                            </div>
                        }

                        <div
                            className={operacao.venda ? 'w-3/12 text-vermelho-500' : 'w-3/12 text-verde-500'}
                        >
                            R${operacao.precoDaOperacao.toFixed(2)}
                        </div>

                        <div
                            className={operacao.venda ? 'w-3/12 text-vermelho-500' : 'w-3/12 text-verde-500'}
                        >
                            R${operacao.valorTotalDaOperacao.toFixed(2)}
                        </div>

                        <div
                            className='w-1/12 self-center cursor-pointer flex justify-center text-black'
                            onClick={() => editarOperacao(operacao)}
                        >
                            <AiOutlineEdit />
                        </div>

                    </div>
                )

            })}
        </div>
    )
}

export default Operacoes