import React from 'react'

const Select = ({ options, onChange, value, id, estiloInline, disabled }) => {

    return (
        <>
            <select
                style={estiloInline}
                className='shadow-lg w-full rounded-lg text-base p-3 box-border my-3 text-black'
                id={id}
                value={value}
                disabled={disabled}
                onChange={(e) => {
                    onChange(e.target.value)
                }}>
                {options.map((codigoAcao) => <option value={codigoAcao} key={codigoAcao}>{codigoAcao}</option>)}
            </select>
        </>
    )
}

export default Select