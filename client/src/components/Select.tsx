import React from 'react'
import { InterfaceSelect } from '../types'


const Select = ({ options, onChange, value, id } : InterfaceSelect) => {

    return (
        <>
            <select
                className='shadow-lg w-full rounded-lg text-base p-3 box-border my-3'
                id={id}
                value={value}
                onChange={(e) => {
                    onChange(e.target.value)
                }}>
                {options.map((codigoAcao) => <option value={codigoAcao} key={codigoAcao}>{codigoAcao}</option>)}
            </select>
        </>
    )
}

export default Select