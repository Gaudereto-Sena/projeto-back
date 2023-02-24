import React, { useContext, useEffect, useState } from 'react'
import ModalAdicionarInvestimento from '../components/ModalAdicionarAtivo'
import AtivoIndividual from '../components/AtivoIndividual'
import { InvestimentosContext, useAdicionarOperacaoContext } from "../Contextos/DadosInvestimentos"
import api from '../api/api'

const Carteira = () => {

    const {showModal, investimentos, setInvestimentos } = useContext(InvestimentosContext)
    
    const { alternaModal } = useAdicionarOperacaoContext()

    const [keysAcao, setKeysAcao] = useState<string[]>([])
    const [keysFII, setkeysFII] = useState<string[]>([])

    const getDadosInvestimentos = async () => {
        const getDadosInvestimento = await api.get('/investimentos')

        const dadosInvestimentoJson = await getDadosInvestimento.data.data
        setInvestimentos(dadosInvestimentoJson)
    }
    useEffect(() => {
        getDadosInvestimentos()
    }, [setInvestimentos])

    useEffect(() => {
        if (investimentos) {
            setKeysAcao(Object.keys(investimentos.acoes))
            setkeysFII(Object.keys(investimentos.fundosimobiliarios))
        }

    }, [investimentos])

    return (

        <div className='mx-10'>
            {showModal &&
                <ModalAdicionarInvestimento />}
            <button onClick={alternaModal}>
                abre modal
            </button>
            <div>
                <h3>Renda Fixa</h3>
            </div>
            <div>
                <h3>Ações</h3>
                {
                    keysAcao.length > 0 &&
                    keysAcao.map(chave => {
                        return (
                            <AtivoIndividual codigo={chave} key={chave} tipo='acoes' />
                        )

                    })
                }
            </div>
            <div>
                <h3>Fundos Imobiliarios</h3>
                {
                    keysFII.length > 0 &&
                    keysFII.map(chave => {
                        return (
                            <AtivoIndividual codigo={chave} key={chave} tipo='fundosimobiliarios' />
                        )

                    })
                }
            </div>
        </div>



    )
}

export default Carteira