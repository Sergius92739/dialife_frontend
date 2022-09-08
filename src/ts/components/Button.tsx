import React from 'react';

type TBtnProps = {
  text: string,
  type: "button" | "submit" | "reset" | undefined,
  onClick: VoidFunction
}

export const Button = ({ text, type, onClick }: TBtnProps): JSX.Element => {
  return (
    <button
      onClick={onClick}
      type={type}
      className='px-12 py-2.5 bg-[#58A9A5] text-white rounded-lg text-xl'>
      {text}
    </button>
  )
}
