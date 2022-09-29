import React, {ChangeEvent, useEffect, useState} from "react";
import {Avatar} from "../components/Avatar";
import {useAppDispatch, useAppSelector} from "../hooks/hooks";
import {setTheUser, userSelector} from "../slices/authSlice/authSlice";
import Moment from "react-moment";
import {fetchUserCountComments} from "../utils/fetchUserCountComments";
import {fetchUserPostsCount} from "../utils/fetchUserPostsCount";
import {toast} from "react-toastify";
import {fetchUpdateAvatar} from "../utils/fetchUpdateAvatar";
import {Loading} from "../components/Main/Loading";

export const AccountInfoPage = (): JSX.Element => {
    const [user, setUser] = useState(useAppSelector(userSelector));
    const [commentsCount, setCommentsCount] = useState<number | undefined>(undefined);
    const [userPosts, setUserPosts] = useState<number | undefined>(undefined);
    const [loading, setLoading] = useState(false);
    const dispatch = useAppDispatch();

    useEffect(() => {
        setLoading(true);
        fetchUserCountComments()
            .then((data) => setCommentsCount(data?.commentsCount))
            .then(() => fetchUserPostsCount())
            .then((data) => setUserPosts(data.postsCount))
            .then(() => setLoading(false));
    }, [user]);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            try {
                setLoading(true);
                const data = new FormData();
                data.append('avatar', e.target.files[0]);
                fetchUpdateAvatar(data)
                    .then((data) => {
                        setUser(data.user);
                        toast.success(data.message, {theme: "colored"})
                        dispatch(setTheUser(data.user));
                        setLoading(false);
                    })
            } catch (error: any) {
                console.error(error);
                toast.error(error.message, {theme: "colored"})
            }
        }
    };

    return (
        <>
            {loading && <Loading/>}
            <div className={'flex p-4 gap-5 bg-white rounded'}>
                <label
                    className={'cursor-pointer'}
                    title={'Сменить аватар'}
                >
                    <input
                        type={'file'}
                        className={'hidden'}
                        onChange={handleImageChange}
                    />
                    <Avatar fileName={user?.avatar as string} link={false} className={'large'} rounded={false}/>
                </label>
                <ul className={'flex-1'}>
                    <li className={'flex justify-between border-b py-2 px-4 gap-10'}>
                        <div className={'text-gray-500'}>Имя пользователя:</div>
                        <div className={'font-medium'}>{user?.username}</div>
                    </li>
                    <li className={'flex justify-between border-b py-2 px-4 gap-10'}>
                        <div className={'text-gray-500'}>Дата создания профиля:</div>
                        <div className={'font-medium'}><Moment format='DD.MM.YYYY'>{user?.createdAt}</Moment></div>
                    </li>
                    <li className={'flex justify-between border-b py-2 px-4 gap-10'}>
                        <div className={'text-gray-500'}>Публикации:</div>
                        <div className={'font-medium'}>{userPosts}</div>
                    </li>
                    <li className={'flex justify-between border-b py-2 px-4 gap-64'}>
                        <div className={'text-gray-500'}>Комментарии:</div>
                        <div className={'font-medium'}>{commentsCount}</div>
                    </li>
                </ul>
            </div>
        </>
    );
};