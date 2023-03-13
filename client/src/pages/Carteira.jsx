import React, { useEffect, useState } from 'react'
import ContainerTipos from '../components/ContainerTipos'
import ModalAdicionarInvestimento from '../components/ModalAdicionarAtivo'
import { useAdicionarOperacaoContext } from "../Contextos/DadosInvestimentos"
import api from '../api/api'
import { useBuscaAtivoContext } from '../Contextos/BuscaAcao'
import Menu from '../components/Menu'


const Carteira = () => {
    const { alternaModal, investimentos, setInvestimentos, showModal, operacoes } = useAdicionarOperacaoContext()
    const { precosAtualizados, precoConsolidados, setPrecosConsolidados } = useBuscaAtivoContext()
    const [keysAcao, setKeysAcao] = useState([])
    const [keysFII, setkeysFII] = useState([])
    const [showAcoes, setShowAcoes] = useState(false)
    const [showFIIs, setShowFIIs] = useState(false)

    useEffect(() => {
        const getDadosInvestimentos = async () => {
            const getDadosInvestimento = await api.get('/investimentos')
            const dadosInvestimentoJson = getDadosInvestimento.data.data
            setInvestimentos(dadosInvestimentoJson)
        }
        getDadosInvestimentos()
    }, [])

    useEffect(() => {
        setKeysAcao(Object.keys(investimentos.acoes))
        setkeysFII(Object.keys(investimentos.fundosimobiliarios))
        console.log({
            keysFII,
            keysAcao
        })
        setPrecosConsolidados(() => {
            const acoes = keysAcao.reduce((acc, key) => {
                return acc + Number(precosAtualizados.acoes[key]?.valorAtual)
            }, 0)
            const fundosImobiliarios = keysFII.reduce((acc, key) => {
                return acc + Number(precosAtualizados.fundosimobiliarios[key]?.valorAtual)
            }, 0)

            return {
                acoes: acoes.toFixed(2),
                fundosimobiliarios: fundosImobiliarios.toFixed(2),
            }
        })
    }, [investimentos, precosAtualizados, operacoes])

    return (
        <>
            <Menu />
            {showModal && <ModalAdicionarInvestimento />}


            <div className='flex flex-col bg-gray-100 relative h-full min-h-full mt-24'>

                <h1 className='text-center text-5xl mb-8 uppercase text-azul-600'>Investimentos</h1>
                <div className='mx-auto w-3/4'>

                    <div
                        className='w-full p-6 my-4 bg-azul-200 text-white rounded-3xl'
                    >
                        <div
                            className='cursor-pointer'
                        >
                            <h3>Renda Fixa</h3>
                        </div>

                    </div>

                    <ContainerTipos show={showAcoes} setShow={setShowAcoes} tipo='acoes' keys={keysAcao} nome='Ações' />
                    <ContainerTipos show={showFIIs} setShow={setShowFIIs} tipo='fundosimobiliarios' keys={keysFII} nome='Fundos Imobiliarios' />

                    <button
                        className='fixed right-6 bottom-6 rounded-[100%] bg-azul-600 text-white w-24 h-24 text-3xl'
                        onClick={alternaModal}>
                        +
                    </button>
                </div>

            </div>

        </>

    )
}

export default Carteira