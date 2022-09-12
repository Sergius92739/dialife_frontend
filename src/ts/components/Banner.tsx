import React from 'react';
import happyPeople2 from '../../img/happy_people.jpg';

export const Banner = (): JSX.Element => {
  return (
    <div className='h-96 relative before:absolute before:inset-0 before:bg-black before:opacity-50'>
      <div className="absolute top-4 left-80">
        <h1 className='text-5xl text-center text-white font-bold'>Блог о жизни с диабетом</h1>
        <p className='text-center text-white text-2xl mt-5'>Поверьте, с диабетом возможно всё</p>
      </div>
      <img className='object-cover h-full w-full' src={happyPeople2} alt="Счастливые люди" />
    </div>
  )
}
