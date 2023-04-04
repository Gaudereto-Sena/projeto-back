import React, { useEffect } from 'react'
import { AiOutlineEdit } from 'react-icons/ai'
import { useBuscaAtivoContext } from '../Contextos/BuscaAcao'
import { useAdicionarOperacaoContext } from '../Contextos/DadosInvestimentos'
import { useAxios } from '../useAxios.js'

const Operacoes = ({ codigo, tipo, id, ativos }) => {
    const { setCodigo, buscaAtivo, transformaTipoEmTexto, dadosNovos, usuario } = useBuscaAtivoContext()

    const { setTipoDeInvestimentoSelecionado, alternaModal, setQuantidadeOperada, setValorDeOperacao, setDataDaOperacao, setEditaOperacaoModal, setIdOperacao, setTipoOperacao, setCallbackOperacao } = useAdicionarOperacaoContext()

    const [{ data: operacoesAtivo }, getOperacoes] = useAxios({
        url: `/operacoes/${id}`,
        method: "get",
    },
        {
            manual: true,
        })

    function fetchOperacaosById() {
        getOperacoes({
            params: { idUser: usuario.id }
        })
    }

    
    useEffect(() => {
        fetchOperacaosById()
    }, [ativos])


    const editarOperacao = (operacao) => {
        setCallbackOperacao({
            callback: fetchOperacaosById
        })
        alternaModal(); // Abrir modal
        setTipoDeInvestimentoSelecionado(transformaTipoEmTexto(tipo));
        setCodigo(operacao.codigo_ativo);
        buscaAtivo(operacao.codigo_ativo);
        setDataDaOperacao(formatDate(operacao.data_operacao));
        setTipoOperacao(operacao.tipo_operacao);
        setQuantidadeOperada(operacao.quantidade);
        setValorDeOperacao(operacao.valor);
        setEditaOperacaoModal(true)
        setIdOperacao(operacao.id_operacao)
    }

    function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
    }

    const formatDate = (date) => {
        const data = new Date(date)
        const ano = data.getFullYear()
        const mes = padTo2Digits(data.getMonth() + 1)
        const dia = padTo2Digits(data.getDate())
        return `${ano}-${mes}-${dia}`
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
            {operacoesAtivo?.data.map((operacao) => {
                return (
                    <div
                        className='flex flex-row justify-between bg-amarelo-300 rounded-2xl p-3 my-3'
                        key={operacao.id_operacao}

                    >
                        <div
                            className={operacao.venda ? 'w-2/12 text-vermelho-500' : 'w-2/12 text-verde-500'}
                        >
                            {(new Date(operacao.data_operacao)).toLocaleDateString()}
                        </div>

                        {
                            operacao.tipo_operacao === 'venda' &&
                            <div className='w-3/12 text-vermelho-500'>
                                -{operacao.quantidade}
                            </div>
                        }

                        {
                            operacao.tipo_operacao === 'compra' &&
                            <div className='w-3/12 text-verde-500'>
                                {operacao.quantidade}
                            </div>
                        }

                        <div
                            className={operacao.tipo_operacao === 'venda' ? 'w-3/12 text-vermelho-500' : 'w-3/12 text-verde-500'}
                        >
                            R${operacao.valor}
                        </div>

                        <div
                            className={operacao.tipo_operacao === 'venda' ? 'w-3/12 text-vermelho-500' : 'w-3/12 text-verde-500'}
                        >
                            R${(operacao.valor_total_operacao)}
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