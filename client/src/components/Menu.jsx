import React from 'react'
import logo from './logo.png'
import { Link } from 'react-router-dom'

const Menu = () => {
  return (
    <div className='min-w-full absolute h-16 bg-azul-600 flex z-10 top-0 justify-center items-center'>
      <div className='w-11/12 xl:w-3/4 flex justify-center items-center px-auto'>
        <Link className='text-white mr-auto' to='/'>Carteira</Link>
      <img src={logo} className='h-10 w-auto ml-auto mr-auto' />

      <Link className='text-white ml-auto' to='/simplificada'>Operações</Link>
      </div>
      
    </div>
  )
}

export default Menu