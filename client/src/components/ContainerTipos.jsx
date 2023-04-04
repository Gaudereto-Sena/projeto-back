import React, { useEffect, useState } from 'react'
import { useBuscaAtivoContext } from '../Contextos/BuscaAcao'
import AtivoIndividual from './AtivoIndividual'
import { GoTriangleDown } from 'react-icons/go'
import { useAxios } from '../useAxios.js'
import { useAdicionarOperacaoContext } from '../Contextos/DadosInvestimentos'

const ContainerTipos = ({ show, setShow, tipo, nome, dados }) => {
    const { usuario } = useBuscaAtivoContext()


    const [{ data: ativos }, getAtivosPorTipo] = useAxios(
        {
            url: `/investimentos/${tipo}`,
            method: "get",
        },
        {
            manual: true,
        })


    useEffect(() => {
        getAtivosPorTipo({
            params: { idUser: usuario.id }
        })
    }, [show, dados])

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

                    <p className='w-2/12 text-center mx-auto'>Investido: R${dados.total_investido}</p>
                    <p className='w-2/12 text-center mx-auto'>Atual: R${ativos?.totalAtual}</p>
                    {
                        ativos?.retorno > 0 ?
                            <p className='w-2/12 text-center mx-auto text-verde-300'>Retorno: R${ativos?.retorno}</p> :
                            <p className='w-2/12 text-center mx-auto text-vermelho-300'>Retorno: R${ativos?.retorno}</p>
                    }

                    <p className='w-2/12 text-center ml-auto'>Numero de ativos: {dados.quantidade_ativos}</p>

                    <GoTriangleDown />
                </div>
            </div>

            {show &&
                ativos?.data.length > 0 &&
                ativos?.data.map(ativo => {
                    return (
                        <AtivoIndividual codigo={ativo.codigo_ativo} key={ativo.codigo_ativo} tipo={ativo.tipo} ativo={ativo} ativos={ativos} />
                    )

                })
            }
        </div>
    )
}

export default ContainerTipos