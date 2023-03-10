import React from 'react'
import logo from './logo.png'

const Menu = () => {
  return (
    <div className='w-32 min-w-full absolute h-16 bg-azul-600 flex flex-col z-10 top-0 justify-center items-center'>
      <img src={logo} className='h-10 w-auto' />
    </div>
  )
}

export default Menu