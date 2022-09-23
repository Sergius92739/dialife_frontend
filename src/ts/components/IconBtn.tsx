import React, {createRef, MouseEventHandler, MutableRefObject} from "react";

type TProps = {
    onClick?: MouseEventHandler<HTMLButtonElement> | undefined,
    text: string,
    iconFill?: JSX.Element | undefined,
    iconOutline: JSX.Element,
    toggle?: boolean | undefined,
    count: number,
}

export const IconBtn = (props: TProps): JSX.Element => {
    const {onClick, iconFill, iconOutline, toggle, text, count} = props;
    const ref = createRef() as MutableRefObject<HTMLDivElement>;

    return (
        <button
            onClick={onClick}
            className={`flex gap-2 items-center relative text-[#798e98] ${onClick ? 'cursor-pointer' : 'cursor-auto'}`}
            onMouseOver={() => ref.current.classList.remove("hidden")}
            onMouseOut={() => ref.current.classList.add("hidden")}
        >
            {toggle ? iconFill : iconOutline}
            <span className="text-xl text-green-500">
                {count}
              </span>
            <div
                ref={ref}
                className="px-4 py-2 w-32 text-center bg-black text-white text-sm absolute z-10 top-10 -right-9 rounded hidden"
            >
                {text}
            </div>
        </button>
    );
};