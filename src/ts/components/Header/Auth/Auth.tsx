import React, { createRef, MutableRefObject } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { Paths } from "../../../paths";
import {
  checkAuth,
  logout,
  userSelector,
} from "../../../slices/authSlice/authSlice";
import { Button } from "../../Button";
import { toast } from "react-toastify";
import no_avatar from "../../../../img/no_avatar.jpg";
import { BiLogIn, BiLogOut } from "react-icons/bi";

export const Auth = (): JSX.Element => {
  const isAuth = useAppSelector(checkAuth);
  const dispatch = useAppDispatch();
  const user = useAppSelector(userSelector);
  const tooltipRef = createRef() as MutableRefObject<HTMLDivElement>;

  const handleLogout = () => {
    try {
      dispatch(logout());
      window.localStorage.removeItem("token");
      toast.info("Вы вышли из системы.", { theme: "colored" });
    } catch (error: any) {
      console.error(error);
      toast.error(error.message, { theme: "colored" });
    }
  };

  return (
    <>
      {isAuth ? (
        <div className="flex gap-2">
          <div
            className="w-[50px] h-[50px] border rounded-full"
            style={{
              backgroundImage: user?.avatar
                ? `url(http://localhost:3002/${user?.avatar})`
                : `url(${no_avatar})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
          {/*<Button onClick={handleLogout} text="Выйти" type={undefined} />*/}
          <div
            className={
              "flex justify-center items-center cursor-pointer w-[50px] h-[50px] relative"
            }
          >
            <BiLogOut
              onClick={handleLogout}
              className={"text-4xl"}
              onMouseOver={() => tooltipRef.current.classList.remove("hidden")}
              onMouseOut={() => tooltipRef.current.classList.add("hidden")}
            />
            <div
              ref={tooltipRef}
              className={
                "px-4 py-2 w-auto text-center bg-black text-white text-sm absolute whitespace-nowrap top-12 rounded hidden"
              }
            >
              Выйти
            </div>
          </div>
        </div>
      ) : (
        <div
          className={
            "flex justify-center items-center cursor-pointer w-[50px] h-[50px] relative"
          }
        >
          <Link to={Paths.LOGIN}>
            <BiLogIn
              className={"text-4xl"}
              onMouseOver={() => tooltipRef.current.classList.remove("hidden")}
              onMouseOut={() => tooltipRef.current.classList.add("hidden")}
            />
          </Link>
          <div
            ref={tooltipRef}
            className="px-4 py-2 w-auto text-center bg-black text-white text-sm absolute whitespace-nowrap top-12 -right-20 rounded hidden"
          >
            Войти / Зарегестрироваться
          </div>
        </div>
      )}
    </>
  );
};
