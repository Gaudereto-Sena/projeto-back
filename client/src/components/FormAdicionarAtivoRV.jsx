import React from 'react'
import { useAdicionarOperacaoContext } from '../Contextos/DadosInvestimentos'
import Textfield from './Textfield'
import Select from './Select'
import ErrorMessage from './ErrorMessage'

function FormAdicionarAtivoRV({ validate }) {
    const { quantidadeOperada, setQuantidadeOperada, valorDeOperacao, setValorDeOperacao, dataDaOperacao, setDataDaOperacao, setEVenda, selectVenda, setSelectVenda, tipoOperacao, setTipoOperacao } = useAdicionarOperacaoContext()

    return (
        <>
            <div className='flex gap-8 items-end'>
                <div className='flex flex-col w-1/2 items-center  py-2'>
                    <Textfield
                        containerStyle='w-full'
                        id='data_operacao'
                        type='date'
                        required
                        funcaoOnChange={(e) => setDataDaOperacao(e)}
                        value={dataDaOperacao}
                        label='Data da operacao'
                    />
                    <ErrorMessage validation={validate} name='dataDaOperacao' />
                </div>

                <div className='flex flex-col w-1/2 py-2'>
                    <label htmlFor='venda_ou_compra'>Tipo da operação:</label>
                    <Select
                        classStyle='w-full'
                        estiloInline={
                            tipoOperacao === 'compra' ?
                                {
                                    width: '50% !important',
                                    backgroundColor: '#c0ffc0'
                                } :
                                {
                                    width: '50% !important',
                                    backgroundColor: '#f9b9b9'
                                }
                        }
                        id='venda_ou_compra'
                        options={['venda', 'compra']}
                        onChange={(e) => setTipoOperacao(e)}
                        value={tipoOperacao}
                    />

                    <ErrorMessage validation={validate} name='tipoOperacao' />
                </div>
            </div>

            <div className='flex gap-8'>
                <div className='flex flex-col w-1/2 items-center  py-2'>
                    <Textfield
                        containerStyle='w-full'
                        id='quantidade_operada'
                        type='number'
                        required
                        funcaoOnChange={(e) => setQuantidadeOperada(e)}
                        value={quantidadeOperada}
                        placeholder='Insira a quantidade operada'
                        label='Quantidade'
                        min={0}
                        step={1}
                    />
                    <ErrorMessage validation={validate} name='quantidade' />
                </div>
                <div className='flex flex-col w-1/2 items-center  py-2'>
                    <Textfield
                        containerStyle='w-full'
                        id='valor_de_operada'
                        type='number'
                        required
                        funcaoOnChange={(e) => setValorDeOperacao(e)}
                        value={valorDeOperacao}
                        placeholder='Insira o valor da operacao'
                        label='Valor da operacao'
                        min={0.00}
                        step='any'
                    />
                    <ErrorMessage validation={validate} name='precoDaOperacao' />
                </div>
            </div>
        </>
    )
}

export default FormAdicionarAtivoRV