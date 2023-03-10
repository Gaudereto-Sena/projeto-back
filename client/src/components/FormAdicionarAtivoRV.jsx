import React, { useState } from 'react'
import { useAdicionarOperacaoContext } from '../Contextos/DadosInvestimentos'
import Textfield from './Textfield'
import Select from './Select'

function FormAdicionarAtivoRV() {
    const { quantidadeOperada, setQuantidadeOperada, valorDeOperacao, setValorDeOperacao, dataDaOperacao, setDataDaOperacao, setEVenda, selectVenda, setSelectVenda } = useAdicionarOperacaoContext()
    

    const vendaOuCompra = (operacao) => {
        switch (operacao) {
            case 'venda':
                setEVenda(true)
                setSelectVenda('venda')
                break;
            case 'compra':
                setEVenda(false)
                setSelectVenda('compra')
                break;
            default:
                setEVenda(false)
                setSelectVenda('compra')
                break;
        }
    }
    return (
        <>
            <div className='flex gap-8 items-end'>
                <Textfield
                    estiloInline={{
                        width: '50%'
                    }}
                    id='data_compra'
                    type='date'
                    required
                    funcaoOnChange={(e) => setDataDaOperacao(e)}
                    value={dataDaOperacao}
                    label='Data da compra'
                    
                />
                <Select
                    estiloInline={
                        selectVenda === 'compra' ?
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
                    onChange={vendaOuCompra}
                    value={selectVenda}
                />
            </div>

            <div className='flex gap-8'>
                <Textfield
                    estiloInline={{
                        width: '50%'
                    }}
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
                <Textfield
                    estiloInline={{
                        width: '50%'
                    }}
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
            </div>
        </>
    )
}

export default FormAdicionarAtivoRV