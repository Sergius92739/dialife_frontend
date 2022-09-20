import React, { MouseEventHandler, MutableRefObject } from "react";
import { Button } from "./Button";

type TPopupProps = {
  text: string;
  state: boolean;
  btnCancelHandler: MouseEventHandler<HTMLButtonElement>;
  btnActionHandler: MouseEventHandler<HTMLButtonElement>;
  btnCancelText?: string;
  btnActionText?: string;
  btnActionSuccessColor?: boolean;
  btnCancelSuccessColor?: boolean;
};

const Popup = ({
  text,
  state,
  btnCancelHandler,
  btnActionHandler,
  btnActionText = "Удалить",
  btnCancelText = "Отменить",
  btnActionSuccessColor = true,
  btnCancelSuccessColor = true,
}: TPopupProps) => {
  return (
    <div className={`fixed inset-0 z-10 ${state ? "" : "hidden"}`}>
      <div className={`flex items-center justify-center min-h-screen`}>
        <div className={"p-5 bg-[#FEC62D] rounded"}>
          <div className={"text-2xl text-center py-8 font-bold"}>{text}</div>
          <div className={"flex justify-between"}>
            <Button
              successColor={btnCancelSuccessColor}
              text={btnCancelText}
              type={"button"}
              onClick={btnCancelHandler}
            />
            <Button
              successColor={btnActionSuccessColor}
              text={btnActionText}
              type={"button"}
              onClick={btnActionHandler}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
