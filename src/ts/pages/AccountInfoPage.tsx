import React, {useEffect, useState} from "react";
import {Avatar} from "../components/Avatar";
import {useAppSelector} from "../hooks/hooks";
import {userSelector} from "../slices/authSlice/authSlice";
import Moment from "react-moment";
import {fetchUserCountComments} from "../utils/fetchUserCountComments";
import {fetchUserPostsCount} from "../utils/fetchUserPostsCount";

export const AccountInfoPage = (): JSX.Element => {
    const user = useAppSelector(userSelector);
    const [commentsCount, setCommentsCount] = useState<number | undefined>(undefined);
    const [userPosts, setUserPosts] = useState<number | undefined>(undefined);


    useEffect(() => {
        fetchUserCountComments()
            .then((data) => setCommentsCount(data?.commentsCount));
        fetchUserPostsCount().then((data) => setUserPosts(data.postsCount));
    }, [user]);

    return (
        <div className={'flex p-5 gap-20 bg-white rounded text-xl'}>
            <Avatar fileName={user?.avatar as string} link={false} className={'large'}/>
            <ul>
                <li className={'flex justify-between p-1 gap-10'}>
                    <div>Имя пользователя:</div>
                    <div className={'font-medium'}>{user?.username}</div>
                </li>
                <li className={'flex justify-between p-1 gap-10'}>
                    <div>Дата создания профиля:</div>
                    <div className={'font-medium'}><Moment format='DD.MM.YYYY'>{user?.createdAt}</Moment></div>
                </li>
                <li className={'flex justify-between p-1 gap-10'}>
                    <div>Публикации:</div>
                    <div className={'font-medium'}>{userPosts}</div>
                </li>
                <li className={'flex justify-between p-1 gap-64'}>
                    <div>Комментарии:</div>
                    <div className={'font-medium'}>{commentsCount}</div>
                </li>
            </ul>
        </div>
    );
};