import React, {MutableRefObject, MouseEventHandler} from "react";

type TBtnProps = {
    text: string;
    type: "button" | "submit" | "reset" | undefined;
    onClick: MouseEventHandler<HTMLButtonElement>;
    successColor?: boolean;
    disabled?: boolean;
    refValue?: MutableRefObject<HTMLButtonElement> | null;
};

export const Button = ({
                           text,
                           type,
                           onClick,
                           successColor = true,
                           disabled = false,
                           refValue = null,
                       }: TBtnProps): JSX.Element => {

    return (
        <button
            ref={refValue}
            disabled={disabled}
            onClick={onClick}
            type={type}
            className={`px-4 py-2 ${successColor ? 'bg-success' : 'bg-danger'} text-white rounded-lg lowercase`}
        >
            {text}
        </button>
    );
};
