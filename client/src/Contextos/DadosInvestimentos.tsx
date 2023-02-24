import { createContext, Dispatch, useContext, useState } from "react";
import { interfaceDadosInvestimentos, InterfaceInvestimentos } from '../types';


export const InvestimentosContext = createContext({} as interfaceDadosInvestimentos)
InvestimentosContext.displayName = 'operacoes'

function InvestimentosProvider ({ children }: any) {
    const [operacoes, setOperacoes] = useState({})
    const [tipoDeInvestimentoSelecionado, setTipoDeInvestimentoSelecionado] = useState<string>('Renda Fixa')
    const [quantidadeOperada, setQuantidadeOperada] = useState(0);
    const [valorDeOperacao, setValorDeOperacao] = useState(0)
    const [dataDaOperacao, setDataDaOperacao] = useState('')
    const [showModal, setShowModal] = useState(false);
    const [investimentos, setInvestimentos] = useState({
        "rendafixa": {},
        "acoes": {},
        "fundosimobiliarios": {}
    })

    return (
        <InvestimentosContext.Provider
            value={{ operacoes, setOperacoes, tipoDeInvestimentoSelecionado, setTipoDeInvestimentoSelecionado, quantidadeOperada, setQuantidadeOperada, valorDeOperacao, setValorDeOperacao, dataDaOperacao, setDataDaOperacao, showModal, setShowModal, investimentos, setInvestimentos }}>
            {children}
        </InvestimentosContext.Provider>
    )
}

export function useAdicionarOperacaoContext() {
    const { operacoes, setOperacoes, tipoDeInvestimentoSelecionado, setTipoDeInvestimentoSelecionado, quantidadeOperada, setQuantidadeOperada, valorDeOperacao, setValorDeOperacao, dataDaOperacao, setDataDaOperacao, showModal, setShowModal, investimentos, setInvestimentos } = useContext(InvestimentosContext)

    const alternaModal = () => {
        resetaValoresDoForm()
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
        alternaModal,
    }
}

export const useInvestimentosContext = () => {
    const { investimentos, setInvestimentos } = useContext(InvestimentosContext)
}



export default InvestimentosProvider