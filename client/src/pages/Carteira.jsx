import React, { useEffect, useState } from 'react'
import ContainerTipos from '../components/ContainerTipos'
import ModalAdicionarInvestimento from '../components/ModalAdicionarAtivo'
import { useAdicionarOperacaoContext } from "../Contextos/DadosInvestimentos"
import { useBuscaAtivoContext } from '../Contextos/BuscaAcao'
import { useAxios } from '../useAxios.js'


const Carteira = () => {
    const { alternaModal, showModal } = useAdicionarOperacaoContext()
    const { dadosNovos, usuario } = useBuscaAtivoContext()


    const [{ data: dadosConsolidados }, getDadosConsolidados] = useAxios(
        {
            url: "/investimentos/consolidados",
            method: "get",
        },
        {
            manual: true,
        }
    )

    const [showAcoes, setShowAcoes] = useState(false)
    const [showFIIs, setShowFIIs] = useState(false)

    const fetch = () => {
        getDadosConsolidados({
            params: { idUser: usuario.id }
        })
    }

    useEffect(() => {
        fetch()
    }, [dadosNovos])

    return (
        <>
            {showModal && <ModalAdicionarInvestimento fetch={fetch} />}


            <div className='flex flex-col bg-gray-100 relative h-full min-h-full mt-24'>

                <h1 className='text-center text-5xl mb-8 uppercase text-azul-600'>Investimentos</h1>
                <div className='mx-auto w-11/12 xl:w-3/4'>

                    <div
                        className='w-full p-6 my-4 bg-azul-200 text-white rounded-3xl'
                    >
                        <div
                            className='cursor-pointer'
                        >
                            <h3>Renda Fixa</h3>
                        </div>

                    </div>


                    {dadosConsolidados &&
                        dadosConsolidados?.data.consolidado.map(dadosConsolidados => {
                            if (dadosConsolidados.tipo === 'acoes') {
                                return (
                                    <ContainerTipos dados={dadosConsolidados} show={showAcoes} setShow={setShowAcoes} tipo='acoes' nome='Ações' key={dadosConsolidados.tipo} />
                                )
                            }


                            if (dadosConsolidados.tipo === 'fundosimobiliarios') {
                                return (
                                    <ContainerTipos dados={dadosConsolidados} show={showFIIs} setShow={setShowFIIs} tipo='fundosimobiliarios' nome='Fundos Imobiliarios' key={dadosConsolidados.tipo} />
                                )
                            }

                        }
                        )}




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