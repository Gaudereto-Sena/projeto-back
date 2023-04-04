import React from 'react'
import PropTypes from 'prop-types';

const Textfield = ({ id, label, type, required, funcaoOnChange, value, placeholder, estiloInline, step, min, disabled, classStyle, containerStyle }) => {
    return (
        <div className={`relative ${containerStyle} mb-3`} style={estiloInline}>
            {label &&
                <label
                    className='block mb-2 text-center'
                    htmlFor={id}>{label}
                </label>}
            <input
                className={`bg-white shadow-xl w-full rounded-lg text-base p-3 box-border text-black ${classStyle}`}
                id={id}
                type={type}
                required={required}
                onChange={event => funcaoOnChange(event.target.value)}
                value={value}
                placeholder={placeholder}
                disabled={disabled}
                step={step}
                min={min}
            />
        </div>
    )
}

Textfield.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string,
    type: PropTypes.string,
    required: PropTypes.bool,
    funcaoOnChange: PropTypes.func,
    value: PropTypes.any,
    placeHolder: PropTypes.string,
    estiloInline: PropTypes.object,
    step: PropTypes.any,
    min: PropTypes.number,
    disabled: PropTypes.bool
}

Textfield.defaultProps = {
    id: "email",
    label: undefined,
    type: "email",
    required: true,
    funcaoOnChange: null,
    value: "",
    placeHolder: "Digite seu e-mail",
    estiloInline: {},
    step: 1,
    min: 0,
    disabled: false
}

export default Textfield;