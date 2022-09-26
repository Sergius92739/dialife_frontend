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
    <div className={`popup ${state ? "open" : ""}`}>
      <div className={`popup_body`}>
        <div className={"popup_content"}>
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
