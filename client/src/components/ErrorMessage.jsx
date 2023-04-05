import React from 'react'

const ErrorMessage = ({ validation, name }) => {

    return (
        validation &&

        !validation.success &&

        validation.error &&
        validation.error.issues.map((e) => {
            if (e.path.some(e => e === name)) {
                return (
                    <div key={name}>
                        <p className='text-red-300 text-center uppercase'>{e.message}</p>
                    </div>
                )

            }
            return ''
        }))
}


export default ErrorMessage