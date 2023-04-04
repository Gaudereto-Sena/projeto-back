import React from 'react'
import api from '../api/api'
import { useBuscaAtivoContext } from '../Contextos/BuscaAcao'
import { useAdicionarOperacaoContext } from '../Contextos/DadosInvestimentos'

const DataList = ({ options, disabled }) => {
    const {codigo, setCodigo, buscaAtivo } = useBuscaAtivoContext()

    const mudarValor = async (valor) => {
        setCodigo(valor)
    }

    const buscarAtivoProcurado = async (codigoAtivo) => {
        if (codigoAtivo.length >= 5) {
            buscaAtivo(codigoAtivo)
        }
    }

    return (
        <>
            <input
                className='shadow-lg w-full rounded-lg text-base p-3 box-border my-3 text-black'
                list='ativos'
                value={codigo}
                placeholder='Digite o codigo do ativo'
                disabled={disabled}
                onChange={(e) => {
                    mudarValor(e.target.value)
                    buscarAtivoProcurado(e.target.value)
                    
                }}
            />
            <datalist id='ativos'>
                {options.map((codigoAtivo) => <option value={codigoAtivo} key={codigoAtivo}>{codigoAtivo}</option>)}
            </datalist>
        </>
    )
}

export default DataList