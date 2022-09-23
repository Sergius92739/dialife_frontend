import React from "react";
import {useNavigate} from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { Paths } from "../../../paths";
import {
  checkAuth,
  logout,
  userSelector,
} from "../../../slices/authSlice/authSlice";
import { toast } from "react-toastify";
import {Avatar} from "../../Avatar";
import {AuthBtn} from "../../AuthBtn";

export const Auth = (): JSX.Element => {
  const isAuth = useAppSelector(checkAuth);
  const dispatch = useAppDispatch();
  const user = useAppSelector(userSelector);
  const navigate = useNavigate();

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
          <Avatar fileName={user?.avatar as string}/>
          <AuthBtn toggle={isAuth} onClick={handleLogout}/>
        </div>
      ) : (
          <AuthBtn toggle={isAuth} onClick={() => navigate(Paths.LOGIN)}/>
      )}
    </>
  );
};
