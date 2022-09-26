import {BiLogIn, BiLogOut} from "react-icons/bi";
import React, {createRef, MouseEventHandler, MutableRefObject} from "react";

export const AuthBtn: React.FC<{ toggle: boolean, onClick: MouseEventHandler<SVGElement> }> = props => {
    const { toggle, onClick} = props;
    const tooltipRef = createRef() as MutableRefObject<HTMLDivElement>;

    return (
        <>
            {
                <div
                    className={
                        "flex justify-center items-center cursor-pointer w-[50px] h-[50px] relative"
                    }
                >
                    {
                      toggle ? (
                          <BiLogOut
                              onClick={onClick}
                              className={"text-4xl"}
                              onMouseOver={() => tooltipRef.current.classList.remove("hidden")}
                              onMouseOut={() => tooltipRef.current.classList.add("hidden")}
                          />
                      ) : (
                          <BiLogIn
                              onClick={onClick}
                              className={"text-4xl"}
                              onMouseOver={() => tooltipRef.current.classList.remove("hidden")}
                              onMouseOut={() => tooltipRef.current.classList.add("hidden")}
                          />
                      )
                    }
                    <div
                        ref={tooltipRef}
                        className={
                            "px-4 py-2 w-auto text-center bg-black text-white text-sm absolute whitespace-nowrap top-12 rounded hidden"
                        }
                    >
                        {
                            toggle ? 'Выйти' : 'Войти / Зарегестрироваться'
                        }
                    </div>
                </div>
            }
        </>
    );
};