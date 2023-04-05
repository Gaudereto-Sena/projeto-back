import React, { useEffect, useState } from 'react'
import Select from '../components/Select.jsx';
import Textfield from '../components/Textfield.jsx';
import { useBuscaAtivoContext } from '../Contextos/BuscaAcao.js'
import { useAxios } from '../useAxios.js'

const paramsIniciais = {
    direction: "desc",
    orderBy: "data_operacao",
    limit: 5,
    offset: 0,
    search: ''
}

const CarteiraSimplificada = () => {
    const { usuario } = useBuscaAtivoContext()
    const [numeroPaginas, setNumeroPaginas] = useState(1)
    const [paginaAtual, setPaginaAtual] = useState(1)
    const [operacoesParams, setOperacoesParams] = useState(
        {
            ...paramsIniciais,
            idUser: usuario.id
        }
    )

    const [{ data: operacoes }, getOperacoes] = useAxios(
        {
            url: `/operacoes/`,
            method: "get",
        },
        {
            manual: true,
        })


    const previousList = () => {
        setOperacoesParams({
            ...operacoesParams,
            offset: operacoesParams.offset - operacoesParams.limit
        })
        setPaginaAtual(paginaAtual - 1)
    }

    const nextList = () => {
        setOperacoesParams({
            ...operacoesParams,
            offset: operacoesParams.offset + operacoesParams.limit
        })
        setPaginaAtual(paginaAtual + 1)
    }

    useEffect(() => {
        getOperacoes({
            params: operacoesParams
        })

        const paginas = operacoes ? Math.ceil(Number(operacoes.numeroOperacoes) / operacoesParams.limit) : 1
        setNumeroPaginas(paginas)
    }, [operacoesParams])

    return (
        <div className='flex flex-col bg-gray-100 relative h-full min-h-full mt-24 mx-auto w-full md:max-w-[80%]'>
            <div className='flex gap-3'>
                <Textfield
                containerStyle='w-1/2 my-3'
                type="text"
                placeholder="Pesquisar"
                value={operacoesParams.search}
                funcaoOnChange={((e) => {
                    setOperacoesParams({
                        ...operacoesParams,
                        search: e
                    })
                })}
            />

            <Select
                estiloInline={{
                    width: '50%'
                }}
                id='ordem_exibicao'
                options={['Mais recentes', 'Mais antigas']}
                onChange={(e) => setOperacoesParams({
                    ...operacoesParams,
                    direction: e === 'Mais recentes' ? 'desc' : 'asc'
                })}
            />
            </div>
            
            <table>
                <tr>
                    <th>Data da operação</th>
                    <th>Codigo</th>
                    <th>Compra/Venda</th>
                    <th>Quantidade</th>
                    <th>Preço</th>
                    <th>Total da operação</th>
                </tr>
                {
                    operacoes &&
                    operacoes?.data?.map((ativo) => {
                        return (
                            <tr className='text-center'>
                                <td>{(new Date(ativo.data_operacao)).toLocaleDateString()}</td>
                                <td>{ativo.codigo_ativo}</td>
                                <td>{ativo.tipo_operacao}</td>
                                <td>{ativo.quantidade}</td>
                                <td>R${ativo.valor}</td>
                                <td>R${ativo.valor_total_operacao}</td>
                            </tr>
                        )
                    })
                }
            </table>
            <div className='flex justify-around py-10'>

                <button
                    disabled={operacoesParams.offset === 0 ? true : false}
                    onClick={() => previousList()}
                    className='bg-azul-400 disabled:bg-azul-200 px-4 py-2 rounded-2xl text-white cursor-pointer'>
                    Anterior
                </button>
                <div>
                    <p>{paginaAtual}/{numeroPaginas}</p>
                </div>
                <button
                    disabled={operacoesParams.offset + operacoesParams.limit < operacoes?.numeroOperacoes ? false : true}

                    onClick={() => nextList()}
                    className='bg-azul-400 disabled:bg-azul-200 px-4 py-2 rounded-2xl text-white cursor-pointer'>
                    Proxima
                </button>
            </div>


        </div>
    )
}

export default CarteiraSimplificada