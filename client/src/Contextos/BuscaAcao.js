import { createContext, useContext, useState } from "react";
import api from "../api/api";

export const BuscaAtivoContext = createContext()
BuscaAtivoContext.displayName = 'Buscar Ação'

export default function BuscaAtivoProvider({ children }) {
    const [ativos, setAtivos] = useState([]);
    const [codigo, setCodigo] = useState('');
    const [ativoProcurado, setAtivoProcurado] = useState(null);
    const [precosAtualizados, setPrecosAtualizados] = useState({
        'rendafixa': 0,
        'fundosimobiliarios': 0,
        'acoes': 0
    })
    const [precoConsolidados, setPrecosConsolidados] = useState({
        acoes: 0,
        fundosimobiliarios: 0,
    })
    const tiposInvestimento = [
        'Renda Fixa',
        'Fundos Imobiliarios',
        'Ações',
    ]

    return (
        <BuscaAtivoContext.Provider
            value={{ codigo, setCodigo, ativoProcurado, setAtivoProcurado, tiposInvestimento, ativos, setAtivos, precosAtualizados, setPrecosAtualizados, precoConsolidados, setPrecosConsolidados }}>
            {children}
        </BuscaAtivoContext.Provider>
    )
}

export function useBuscaAtivoContext() {
    const { codigo, setCodigo, ativoProcurado, setAtivoProcurado, tiposInvestimento, ativos, setAtivos, precosAtualizados, setPrecosAtualizados, precoConsolidados, setPrecosConsolidados } = useContext(BuscaAtivoContext)

    const buscaAtivo = async (codigoAtivo) => {
        const resposta = await api.get(`/bolsa/${codigoAtivo}`)
        const respostaData = await resposta.data.data
        setAtivoProcurado(...respostaData)
    }

    const transformaTipoEmTexto = (tipo) => {
        switch (tipo) {
            case 'acoes': {
                return 'Ações';
            }
            case 'fundosimobiliarios': {
                return 'Fundos Imobiliarios';
            }
            case 'rendafixa': {
                return 'Renda Fixa'
            }
            default: {
                return 'Renda Fixa'
            }
        }

    }

    const selecionaListaDeAtivos = async (tipos, acoes, fundosImobiliarios) => {

        switch (tipos) {
            case 'Ações': {
                const getTodasAcoes = await api.get('/bolsa/acoes');
                const todasAcoes = await getTodasAcoes.data.data
                setAtivos(todasAcoes)
                break;
            }
            case 'Fundos Imobiliarios': {
                const getListaFII = await api.get('/bolsa/fiis');
                const listaFII = await getListaFII.data.fiis;
                setAtivos(listaFII)
                break;
            }
            case 'Renda Fixa': {
                setAtivos([])
                break;
            }
            default: {
                setAtivos([])
                break;
            }
        }
    }

    return {
        ativoProcurado,
        setAtivoProcurado,
        codigo,
        setCodigo,
        ativos,
        setAtivos,
        tiposInvestimento,
        buscaAtivo,
        transformaTipoEmTexto,
        selecionaListaDeAtivos,
        precosAtualizados, 
        setPrecosAtualizados,
        precoConsolidados, 
        setPrecosConsolidados
    }
}