import React from 'react'

const Select = ({ options, onChange, value, id, estiloInline, disabled, classStyle }) => {

    return (
        <>
            <select
                style={estiloInline}
                className={`shadow-lg w-full rounded-lg text-base p-3 box-border my-3 text-black ${classStyle}`}
                id={id}
                value={value}
                disabled={disabled}
                onChange={(e) => {
                    onChange(e.target.value)
                }}>
                {options.map((item) => <option value={item} key={item}>{item}</option>)}
            </select>
        </>
    )
}

export default Select