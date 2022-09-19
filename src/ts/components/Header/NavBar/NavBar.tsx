import React from "react";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../../hooks/hooks";
import { Paths } from "../../../paths";
import {
  checkAuth,
  isAdminSelector,
} from "../../../slices/authSlice/authSlice";

export const NavBar = (): JSX.Element => {
  const isAuth = useAppSelector(checkAuth);
  const isAdmin = useAppSelector(isAdminSelector);

  return (
    <ul className="flex gap-7 list-none m-0 p-0">
      <li>
        <NavLink
          className={"text-[#404242] text-base hover:text-[#58A9A5]"}
          to={Paths.HOME}
        >
          Главная
        </NavLink>
      </li>
      <li>
        <NavLink
          className={"text-[#404242] text-base hover:text-[#58A9A5]"}
          to={Paths.POSTS}
        >
          Посты
        </NavLink>
      </li>
      <li>
        <NavLink
          className={"text-[#404242] text-base hover:text-[#58A9A5]"}
          to={Paths.ARTICLES}
        >
          Статьи
        </NavLink>
      </li>
      {isAuth && (
        <>
          <li>
            <NavLink
              className={"text-[#404242] text-base hover:text-[#58A9A5]"}
              to={Paths.NEW_POST}
            >
              Добавить пост
            </NavLink>
          </li>
          <li>
            <NavLink
              className={"text-[#404242] text-base hover:text-[#58A9A5]"}
              to={Paths.MY_POSTS}
            >
              Мои посты
            </NavLink>
          </li>
        </>
      )}
      {isAdmin && (
        <li>
          <NavLink
            className={"text-[#404242] text-base hover:text-[#58A9A5]"}
            to={Paths.ADMIN}
          >
            Админка
          </NavLink>
        </li>
      )}
    </ul>
  );
};
