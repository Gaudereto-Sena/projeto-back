import React, { useEffect, useState } from 'react'
import ModalAdicionarInvestimento from '../components/ModalAdicionarAtivo'
import AtivoIndividual from '../components/AtivoIndividual'
import { useAdicionarOperacaoContext } from "../Contextos/DadosInvestimentos"
import api from '../api/api'
import MenuLateral from '../components/MenuLateral'

const Carteira = () => {

    const { alternaModal, showModal, investimentos, setInvestimentos } = useAdicionarOperacaoContext()
    const [keysAcao, setKeysAcao] = useState([])
    const [keysFII, setkeysFII] = useState([])
    const [showAcoes, setShowAcoes] = useState(false)
    const [showFIIs, setShowFIIs] = useState(false)
    const [showRendaFixa, setShowRendaFixa] = useState(false)

    useEffect(() => {
        const getDadosInvestimentos = async () => {
            const getDadosInvestimento = await api.get('/investimentos')
            const dadosInvestimentoJson = await getDadosInvestimento.data.data
            setInvestimentos(dadosInvestimentoJson)
        }
        getDadosInvestimentos()
    }, [setInvestimentos])

    useEffect(() => {
        setKeysAcao(Object.keys(investimentos.acoes))
        setkeysFII(Object.keys(investimentos.fundosimobiliarios))
    }, [investimentos])

    return (
        <div className='flex bg-gray-100'>
            
            {showModal && <ModalAdicionarInvestimento />}

            <MenuLateral />
            <div className='mx-auto w-3/4'>

                

                <button onClick={alternaModal}>
                    abre modal
                </button>
                <div
                    className='w-full p-6 my-4 bg-azul-200 text-white rounded-3xl'
                >
                    <div
                        className='cursor-pointer'
                    >
                        <h3>Renda Fixa</h3>
                    </div>

                </div>
                <div

                    className='w-full p-6 my-4 bg-azul-200 text-white rounded-3xl'
                >
                    <div
                        className='cursor-pointer'
                        onClick={() => setShowAcoes((show) => !show)}
                    >
                        <h3>Ações</h3>
                    </div>

                    {showAcoes &&
                        keysAcao.length > 0 &&
                        keysAcao.map(chave => {
                            return (
                                <AtivoIndividual codigo={chave} key={chave} tipo='acoes' />
                            )

                        })
                    }
                </div>
                <div

                    className='w-full p-6 my-4 bg-azul-200 text-white rounded-3xl'
                >
                    <div
                        className='cursor-pointer'
                        onClick={() => setShowFIIs((show) => !show)}
                    >
                        <h3>Fundos Imobiliarios</h3>
                    </div>

                    {showFIIs &&
                        keysFII.length > 0 &&
                        keysFII.map(chave => {
                            return (
                                <AtivoIndividual codigo={chave} key={chave} tipo='fundosimobiliarios' />
                            )

                        })
                    }
                </div>
            </div>

        </div>



    )
}

export default Carteira