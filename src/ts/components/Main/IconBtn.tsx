import React, {createRef, MouseEventHandler, MutableRefObject} from "react";

type TProps = {
    onClick?: MouseEventHandler<HTMLButtonElement> | undefined,
    text: string,
    iconFill?: JSX.Element | undefined,
    iconOutline: JSX.Element,
    toggle?: boolean | undefined,
    count: number,
    showTooltip?: boolean,
}

export const IconBtn = (props: TProps): JSX.Element => {
    const {onClick, iconFill, iconOutline, toggle, text, count, showTooltip = true} = props;
    const ref = createRef() as MutableRefObject<HTMLDivElement>;
    const textColors = new Map([
        ['Просмотры', 'text-blue-500'],
        ['Нравится', 'text-green-500'],
        ['Не нравится', 'text-red-500'],
        ['Комментарии', 'text-blue-500']
    ])

    return (
        <button
            onClick={onClick}
            className={`flex gap-2 items-center relative text-[#798e98] ${onClick ? 'cursor-pointer' : 'cursor-auto'}`}
            onMouseOver={() => ref.current.classList.remove("hidden")}
            onMouseOut={() => ref.current.classList.add("hidden")}
        >
            {toggle ? iconFill : iconOutline}
            <span className={`text-xl ${textColors.get(text)}`}>
                {count}
              </span>
            {
                showTooltip && (
                    <div
                        ref={ref}
                        className="px-4 py-2 w-32 text-center bg-black text-white text-sm absolute z-10 top-10 -right-9 rounded hidden"
                    >
                        {text}
                    </div>
                )
            }
        </button>
    );
};