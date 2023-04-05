import React from 'react'
import { createContext, useContext, useState } from "react";

const categoriasInvestimentos = {
    rendafixa: {},
    acoes: {},
    fundosimobiliarios: {},
}


export const InvestimentosContext = createContext()
InvestimentosContext.displayName = 'operacoes'


function InvestimentosProvider({ children }) {
    const [operacoes, setOperacoes] = useState(categoriasInvestimentos)
    const [tipoDeInvestimentoSelecionado, setTipoDeInvestimentoSelecionado] = useState('Renda Fixa')
    const [quantidadeOperada, setQuantidadeOperada] = useState();
    const [valorDeOperacao, setValorDeOperacao] = useState()
    const [dataDaOperacao, setDataDaOperacao] = useState(undefined)
    const [showModal, setShowModal] = useState(false);
    const [tipoOperacao, setTipoOperacao] = useState('compra');
    const [editaOperacaoModal, setEditaOperacaoModal] = useState(false)
    const [selectVenda, setSelectVenda] = useState('compra')
    const [idOperacao, setIdOperacao] = useState(0)
    const [callbackOperacao, setCallbackOperacao] = useState(null)

    const [investimentos, setInvestimentos] = useState({
        rendafixa: {},
        acoes: {},
        fundosimobiliarios: {},
    })

    return (
        <InvestimentosContext.Provider
            value={{ operacoes, setOperacoes, tipoDeInvestimentoSelecionado, setTipoDeInvestimentoSelecionado, quantidadeOperada, setQuantidadeOperada, valorDeOperacao, setValorDeOperacao, dataDaOperacao, setDataDaOperacao, showModal, setShowModal, investimentos, setInvestimentos, tipoOperacao, setTipoOperacao, editaOperacaoModal, setEditaOperacaoModal, selectVenda, setSelectVenda, idOperacao, setIdOperacao, callbackOperacao, setCallbackOperacao }}>
            {children}
        </InvestimentosContext.Provider>
    )
}

export function useAdicionarOperacaoContext() {
    const { operacoes, setOperacoes, tipoDeInvestimentoSelecionado, setTipoDeInvestimentoSelecionado, quantidadeOperada, setQuantidadeOperada, valorDeOperacao, setValorDeOperacao, dataDaOperacao, setDataDaOperacao, showModal, setShowModal, investimentos, setInvestimentos, tipoOperacao, setTipoOperacao, editaOperacaoModal, setEditaOperacaoModal, selectVenda, setSelectVenda, idOperacao, setIdOperacao, callbackOperacao, setCallbackOperacao } = useContext(InvestimentosContext)

    const alternaModal = () => {
        resetaValoresDoForm()
        setEditaOperacaoModal(false)
        setShowModal(!showModal)
    }

    const resetaValoresDoForm = () => {
        setTipoDeInvestimentoSelecionado('')
        setQuantidadeOperada(0)
        setValorDeOperacao(0)
        setTipoOperacao('compra')
        setDataDaOperacao(undefined)
    }

    return {
        operacoes,
        setOperacoes,
        investimentos,
        setInvestimentos,
        tipoDeInvestimentoSelecionado,
        setTipoDeInvestimentoSelecionado,
        quantidadeOperada,
        setQuantidadeOperada,
        valorDeOperacao,
        setValorDeOperacao,
        dataDaOperacao,
        setDataDaOperacao,
        showModal,
        setShowModal,
        tipoOperacao,
        setTipoOperacao,
        editaOperacaoModal,
        setEditaOperacaoModal,
        selectVenda,
        setSelectVenda,
        idOperacao,
        setIdOperacao,
        alternaModal,
        callbackOperacao,
        setCallbackOperacao
    }
}

export const useInvestimentosContext = () => {
    const { investimentos, setInvestimentos } = useContext(InvestimentosContext)
}



export default InvestimentosProvider