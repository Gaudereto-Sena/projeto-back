import React, { useEffect, useState } from 'react'
import { useBuscaAtivoContext } from '../Contextos/BuscaAcao'
import { useAdicionarOperacaoContext } from '../Contextos/DadosInvestimentos'
import api from '../api/api'
import AtivoIndividual from './AtivoIndividual'
import {GoTriangleDown} from 'react-icons/go'

const ContainerTipos = ({ show, setShow, tipo, keys, nome }) => {
    const {precoConsolidados} = useBuscaAtivoContext()
    const {investimentos } = useAdicionarOperacaoContext()
    const [dadosConsolidados, setDadosConsolidados] = useState({})
    const [retorno, setRetorno] = useState({
        'rendafixa': 0,
        'fundosimobiliarios': 0,
        'acoes': 0
    })

    useEffect(() => {
        const getDadosConsolidados = async () => {
            const getDadosConsolidados = await api.get('/investimentos/consolidados')
            const getDadosConsolidadosJson = getDadosConsolidados.data.data
            setDadosConsolidados(getDadosConsolidadosJson)
        }

        getDadosConsolidados()
    }, [investimentos])

    useEffect(() => {
        setRetorno({
            acoes: precoConsolidados.acoes - dadosConsolidados.acoes?.totalInvestido,
            fundosimobiliarios: precoConsolidados.fundosimobiliarios - dadosConsolidados.fundosimobiliarios?.totalInvestido
        })
    }, [dadosConsolidados, precoConsolidados])

    return (
        <div
            className='w-full p-6 my-4 bg-azul-200 text-white rounded-3xl'
        >
            <div
                className='cursor-pointer'
                onClick={() => setShow((show) => !show)}
            >
                <div className='flex font-bold items-center'>
                    <h3 className='w-2/12'>{nome}</h3>
                    {show &&
                        <>
                            <p className='w-2/12 text-center mx-auto'>Investido: R${dadosConsolidados[tipo]?.totalInvestido}</p>
                            <p className='w-2/12 text-center mx-auto'>Atual: R${precoConsolidados[tipo]}</p>
                            {
                                retorno.acoes > 0 ?
                                    <p className='w-2/12 text-center mx-auto text-verde-300'>Retorno: R${retorno[tipo].toFixed(2)}</p> :
                                    <p className='w-2/12 text-center mx-auto text-vermelho-300'>Retorno: R${retorno[tipo].toFixed(2)}</p>
                            }
                        </>
                    }
                    <p className='w-2/12 text-center ml-auto'>Numero de ativos: {dadosConsolidados[tipo]?.numeroDeAtivos}</p>

                    <GoTriangleDown />
                </div>
            </div>

            {show &&
                keys.length > 0 &&
                keys.map(chave => {
                    return (
                        <AtivoIndividual codigo={chave} key={chave} tipo={tipo} />
                    )

                })
            }
        </div>
    )
}

export default ContainerTipos