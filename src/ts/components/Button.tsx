import React, { MutableRefObject, MouseEventHandler } from "react";

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
  const bgColor = {
    success: "#58A9A5",
    danger: "#fc5c65",
  };
  return (
    <button
      ref={refValue}
      disabled={disabled}
      onClick={onClick}
      type={type}
      className={`px-12 py-2.5 bg-[${
        successColor ? bgColor.success : bgColor.danger
      }] text-white rounded-lg text-xl`}
    >
      {text}
    </button>
  );
};
