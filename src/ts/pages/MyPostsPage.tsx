import React, {MouseEvent, useEffect, useState} from "react";
import {IPost} from "../slices/postSlice/interfaces";
import {instAxios} from "../utils/axios";
import {toast} from "react-toastify";
import {useAppDispatch, useAppSelector} from "../hooks/hooks";
import {checkAuth} from "../slices/authSlice/authSlice";
import {nanoid} from "nanoid";
import {Paths} from "../paths";
import {Link, useNavigate} from "react-router-dom";
import {Button} from "../components/Button";
import {removePost} from "../slices/postSlice/asyncFunc";
import {
    postErrorSelector,
    postStatusSelector,
} from "../slices/postSlice/postSlice";
import Popup from "../components/Popup";
import MyPostsItem from "../components/MyPostsItem";

export const MyPostsPage = (): JSX.Element => {
    const [posts, setPosts] = useState<IPost[] | undefined>(undefined);
    const [popup, setPopup] = useState(false);
    const [postId, setPostId] = useState("");
    const isAuth = useAppSelector(checkAuth);
    const status = useAppSelector(postStatusSelector);
    const error = useAppSelector(postErrorSelector);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const fetchUserPosts = async () => {
        try {
            const response = await instAxios.get("/posts/user");
            if (response.status !== 200) {
                throw new Error(response.statusText);
            }
            return response.data as IPost[];
        } catch (error: any) {
            console.error(error);
            toast.error(error.message, {theme: "colored"});
        }
    };

    useEffect(() => {
        fetchUserPosts()
            .then((data) => setPosts(data))
            .catch((error) => {
                console.error(error);
                toast.error(error.message, {theme: "colored"});
            });
    }, []);



    const handleRemoveBtn = (e: MouseEvent<HTMLButtonElement>) => {
        let id;
        const wrapper = e.currentTarget.closest(".postWrapper");
        if (wrapper) {
            const article = wrapper.querySelector("article");
            if (article) {
                id = article.id;
                setPostId(id);
            }
        }
        setPopup(true);
    };

    const handleEditBtn = (e: MouseEvent<HTMLButtonElement>) => {
        let id;
        const wrapper = e.currentTarget.closest(".postWrapper");
        if (wrapper) {
            const article = wrapper.querySelector("article");
            if (article) {
                id = article.id;
                setPostId(id);
            }
        }
        navigate(`${Paths.POSTS}/edit-post/${id}`);
    };

    const handlePopupCancelBtn = () => {
        setPopup(false);
        setPostId("");
    };

    const handlePopupRemoveBtn = async (e: MouseEvent<HTMLButtonElement>) => {
        try {
            if (postId) {
                await dispatch(removePost(postId));
                await setPopup(false);
                navigate(Paths.POSTS);
            }
        } catch (error: any) {
            console.error(error);
            toast.error(error.message);
        }
    };

    return (
        <>
            {error && toast.error(status, {theme: "colored"})}
            {isAuth && (
                <div className={"flex flex-col"}>
                    <div>
                        <Button
                            text={"К постам"}
                            type={"button"}
                            onClick={() => navigate(Paths.POSTS)}
                        />
                    </div>
                    {!posts?.length && (
                        <div className={"text-center text-lg"}>
                            У вас нет постов.
                            <Link
                                className="text-lg text-indigo-600 ml-3"
                                to={Paths.NEW_POST}
                            >
                                Добавьте пост
                            </Link>
                        </div>
                    )}
                    {posts &&
                        posts.map((post) => {
                            return post ? (
                                <MyPostsItem
                                    key={nanoid()}
                                    editBtnHandler={handleEditBtn}
                                    removeBtnHandler={handleRemoveBtn}
                                    post={post}
                                />
                            ) : null;
                        })}
                </div>
            )}
            <Popup
                btnActionSuccessColor={false}
                text={"Вы уверены что хотите удалить пост?"}
                state={popup}
                btnCancelHandler={handlePopupCancelBtn}
                btnActionHandler={handlePopupRemoveBtn}
            />
        </>
    );
};
