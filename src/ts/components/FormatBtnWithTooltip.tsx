import React, { createRef, MutableRefObject, ReactNode } from 'react';

type TBtnProps = {
  tooltip: string,
  handleClick: Function,
  startTag?: string,
  endTag?: string,
  children: ReactNode
}

export const FormatBtnWithTooltip = (props: TBtnProps): JSX.Element => {
  const tooltipRef = createRef() as MutableRefObject<HTMLDivElement>;

  return (
    <div
      className='relative w-10 h-10'
      onMouseOver={() => tooltipRef.current.classList.remove('hidden')}
      onMouseOut={() => tooltipRef.current.classList.add('hidden')}>
      <button
        onClick={props.handleClick.name === 'insert'
          ? () => props.handleClick(props.startTag, props.endTag)
          : () => props.handleClick()}
        type='button'
        className='border border-[#404242] bg-white w-full h-full p-1'>
        {props.children}
      </button>
      <div
        ref={tooltipRef}
        className="px-4 py-2 whitespace-nowrap bg-black text-white rounded absolute z-10 -top-12 text-center hidden">
        {props.tooltip}
      </div>
    </div>
  )
}
