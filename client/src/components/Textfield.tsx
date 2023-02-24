import { InterfaceTextField } from '../types';

const Textfield = ({ id, label, type, required, funcaoOnChange, value, placeholder, estiloInline, step, min } : InterfaceTextField ) => {
    return (
        <div className='py-2 relative' style={estiloInline}>
            <label 
                className='block mb-2 text-center'
                htmlFor={id}>{label}</label>
            <input
                className='bg-white shadow-xl w-full rounded-lg text-base p-3 box-border'
                id={id}
                type={type}
                required={required}
                onChange={event => funcaoOnChange(event.target.value)}
                value={value}
                placeholder={placeholder}
                step={step}
                min={min}
                />
        </div>
    )
}

export default Textfield;