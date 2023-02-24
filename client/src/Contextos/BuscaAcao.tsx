import { createContext, useContext, useState } from "react";
import api from "../api/api";
import { InterfaceAtivoBuscado, InterfaceBuscaAtivoContext } from "../types";


export const BuscaAtivoContext = createContext({} as InterfaceBuscaAtivoContext)

BuscaAtivoContext.displayName = 'Buscar Ação'

export default function BuscaAtivoProvider({ children }: any) {
    const [ativos, setAtivos] = useState([]);
    const [codigo, setCodigo] = useState('');
    const [ativoProcurado, setAtivoProcurado] = useState({});
    const tiposInvestimento = [
        'Renda Fixa',
        'Fundos Imobiliarios',
        'Ações',
    ]

    return (
        <BuscaAtivoContext.Provider
            value={{ codigo, setCodigo, ativoProcurado: {} as InterfaceAtivoBuscado, setAtivoProcurado, tiposInvestimento, ativos, setAtivos }}>
            {children}
        </BuscaAtivoContext.Provider>
    )
}

export function useBuscaAtivoContext() {
    const { codigo, setCodigo, ativoProcurado, setAtivoProcurado, tiposInvestimento, ativos, setAtivos } = useContext(BuscaAtivoContext)


    const selecionaListaDeAtivos = async (tipos: string) => {
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
        selecionaListaDeAtivos
    }
}