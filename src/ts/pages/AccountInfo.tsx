import React, {useEffect, useState} from "react";
import {Avatar} from "../components/Avatar";
import {useAppSelector} from "../hooks/hooks";
import {userSelector} from "../slices/authSlice/authSlice";
import Moment from "react-moment";
import {fetchUserCountComments} from "../utils/fetchUserCountComments";
import {fetchUserPosts} from "../utils/fetchUserPosts";
import {IPost} from "../slices/postSlice/interfaces";

export const AccountInfo = () => {
    const user = useAppSelector(userSelector);
    const [userComments, setUserComments] = useState<number | undefined>(undefined);
    const [userPosts, setUserPosts] = useState<IPost[] | undefined>(undefined);


    useEffect(() => {
        fetchUserCountComments(user?._id as string)
            .then((data) => setUserComments(data?.count));
        fetchUserPosts().then((data) => setUserPosts(data));
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
                    <div className={'font-medium'}>{userPosts?.length}</div>
                </li>
                <li className={'flex justify-between p-1 gap-64'}>
                    <div>Комментарии:</div>
                    <div className={'font-medium'}>{userComments}</div>
                </li>
            </ul>
        </div>
    );
};