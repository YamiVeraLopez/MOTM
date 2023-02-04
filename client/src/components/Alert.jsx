import React from 'react'

export const Alert = ({msg}) => {
  return (
    <div className='bg-red-600 tex-center- p-3 rounded-md uppercase text-white font-bold'>
     {msg}
      </div>
  )
}
