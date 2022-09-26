import React, {useEffect} from "react";
import {Outlet} from "react-router-dom";
import {Footer} from "./Footer/Footer";
import {Header} from "./Header/Header";
import {Main} from "./Main/Main";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useAppDispatch, useAppSelector} from "../hooks/hooks";
import {
    errorSelector,
    statusSelector,
    userSelector,
    isLoadingSelector,
    isAdminSelector,
    resetAuthStatus,
} from "../slices/authSlice/authSlice";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
    postErrorSelector,
    postLoadingSelector,
    postStatusSelector,
    resetPostStatus,
} from "../slices/postSlice/postSlice";
import {Loading} from "./Main/Loading";

export const Layout = (): JSX.Element => {
    const authError = useAppSelector(errorSelector);
    const authStatus = useAppSelector(statusSelector);
    const user = useAppSelector(userSelector);
    const authLoading = useAppSelector(isLoadingSelector);
    const isAdmin = useAppSelector(isAdminSelector);
    const postError = useAppSelector(postErrorSelector);
    const postStatus = useAppSelector(postStatusSelector);
    const postLoading = useAppSelector(postLoadingSelector);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (authError) {
            toast.error(authStatus, {theme: "dark"});
        }

        if (authStatus?.startsWith("Ошибка") && !authError) {
            toast.error(authStatus, {theme: "colored"});
            dispatch(resetAuthStatus());
        }

        if (
            authStatus === "Данный username уже занят." ||
            authStatus === "Такого юзера не существует."
        ) {
            toast.info(authStatus, {theme: "colored"});
            dispatch(resetAuthStatus());
        }

        if (
            authStatus === "Вы вошли в систему." ||
            authStatus === "Регистрация прошла успешно"
        ) {
            toast.success(authStatus, {theme: "colored"});
            dispatch(resetAuthStatus());
        }

        if (postError) {
            toast.error(postStatus, {theme: "dark"});
        }

        if (postStatus === "Что-то пошло не так..." && !postError) {
            toast.error(postStatus, {theme: "colored"});
            dispatch(resetPostStatus());
        }

        if (
            postStatus === "Пост с изображением успешно сохранен." ||
            postStatus === "Пост без изображения успешно сохранен." ||
            postStatus === "Пост был удалён." ||
            postStatus === "Пост успешно обновлён."
        ) {
            toast.success(postStatus, {theme: "colored"});
            dispatch(resetPostStatus());
        }
    }, [authError, authStatus, postError, postStatus, dispatch]);

    return (
        <div className="flex flex-col min-h-screen bg-[#f0f0f0]">
            {postLoading && <Loading/>}
            {authLoading && <Loading/>}
            <Header/>
            <Main>
                <Outlet/>
            </Main>
            <Footer/>
            <ToastContainer position="bottom-right"/>
        </div>
    );
};
