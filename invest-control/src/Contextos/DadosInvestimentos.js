import React from 'react'
import { createContext, useContext, useState } from "react";

const categoriasInvestimentos = {
    rendafixa: [

    ],
    acoes: [

    ],
    fundosimobiliarios: [

    ],
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
    const [eVenda, setEVenda] = useState(false);
    const [editaOperacaoModal, setEditaOperacaoModal] = useState(false)
    const [selectVenda, setSelectVenda] = useState('compra')
    const [idOperacao, setIdOperacao] = useState('')

    const [investimentos, setInvestimentos] = useState({
        rendafixa: [

        ],
        acoes: [

        ],
        fundosimobiliarios: [

        ],
    })

    return (
        <InvestimentosContext.Provider
            value={{ operacoes, setOperacoes, tipoDeInvestimentoSelecionado, setTipoDeInvestimentoSelecionado, quantidadeOperada, setQuantidadeOperada, valorDeOperacao, setValorDeOperacao, dataDaOperacao, setDataDaOperacao, showModal, setShowModal, investimentos, setInvestimentos, eVenda, setEVenda, editaOperacaoModal, setEditaOperacaoModal, selectVenda, setSelectVenda, idOperacao, setIdOperacao }}>
            {children}
        </InvestimentosContext.Provider>
    )
}

export function useAdicionarOperacaoContext() {
    const { operacoes, setOperacoes, tipoDeInvestimentoSelecionado, setTipoDeInvestimentoSelecionado, quantidadeOperada, setQuantidadeOperada, valorDeOperacao, setValorDeOperacao, dataDaOperacao, setDataDaOperacao, showModal, setShowModal, investimentos, setInvestimentos, eVenda, setEVenda, editaOperacaoModal, setEditaOperacaoModal, selectVenda, setSelectVenda, idOperacao, setIdOperacao } = useContext(InvestimentosContext)

    const alternaModal = () => {
        resetaValoresDoForm()
        setEditaOperacaoModal(false)
        setShowModal(!showModal)
    }

    const resetaValoresDoForm = () => {
        setTipoDeInvestimentoSelecionado('')
        setQuantidadeOperada(0)
        setValorDeOperacao(0)
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
        eVenda, 
        setEVenda,
        editaOperacaoModal,
        setEditaOperacaoModal,
        selectVenda, 
        setSelectVenda,
        idOperacao, 
        setIdOperacao,
        alternaModal
    }
}

export const useInvestimentosContext = () => {
    const { investimentos, setInvestimentos } = useContext(InvestimentosContext)
}



export default InvestimentosProvider