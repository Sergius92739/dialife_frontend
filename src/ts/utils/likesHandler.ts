import {toast} from "react-toastify";
import {fetchLike} from "./fetchLike";
import {getAllPosts} from "../slices/postSlice/asyncFunc";
import React, {Dispatch} from "react";
import {IPost, IPostState} from "../slices/postSlice/interfaces";
import {AnyAction, ThunkDispatch} from "@reduxjs/toolkit";
import {IAuthState, IUser} from "../slices/authSlice/interfaces";

type TWrapperProps = {
    dispatch: ThunkDispatch<{ auth: IAuthState, post: IPostState }, undefined, AnyAction> & Dispatch<AnyAction>,
    setPost: React.Dispatch<React.SetStateAction<IPost>>,
}

type TInnerProps = {
    isAuth: boolean,
    param: string,
    postId: string,
    userId: string,
}

export const likesHandler = (options: TWrapperProps) => {
    return (data: TInnerProps) => {
        if (!data.isAuth) {
            return toast.error(
                "Это действие доступно только для авторизованных пользователей.",
                {theme: "colored"}
            );
        }
        try {
            fetchLike(data.postId, data.userId, data.param)
                .then((data) => {
                    options.setPost(data._post);
                    return data;
                })
                .then((data) => toast.info(data.message, {theme: "colored"}))
                .then(() => options.dispatch(getAllPosts()))
        } catch (error: any) {
            console.error(error);
            toast.error(error.message, {theme: "colored"})
        }
    }
};