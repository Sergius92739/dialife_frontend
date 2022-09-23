import React, {useEffect, useState} from 'react';
import {Button} from "./Button";
import {Comment} from "./Comment";
import {useAppSelector} from "../hooks/hooks";
import {toast} from "react-toastify";
import {checkAuth, userSelector} from "../slices/authSlice/authSlice";
import {nanoid} from "nanoid";
import {instAxios} from "../utils/axios";
import {IComment} from "../slices/postSlice/interfaces";

export const Comments: React.FC<{ id: string }> = props => {
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState<IComment[] | undefined>(undefined);
    const {id} = props;
    const user = useAppSelector(userSelector);
    const isAuth = useAppSelector(checkAuth);

    useEffect(() => {
        getPostComments(id)
            .then((data) => setComments(data))
    }, []);

    const getPostComments = async (id: string) => {
        try {
            const response = await instAxios.get(`/posts/${id}/comments`);
            if (response.status !== 200) {
                throw new Error(response.statusText)
            }
            return response.data as IComment[];
        } catch (error: any) {
            console.error(error);
            toast.error(error.message, {theme: "colored"})
        }
    }

    type TCreateCommentProps = {
        postId: string;
        comment: string;
        userId: string;
    }

    const createComment = async ({postId, comment, userId}: TCreateCommentProps) => {
        try {
            const response = await instAxios.post(`/comments/create/${postId}`, {postId, comment, userId});
            if (response.status !== 200) {
                throw new Error(response.statusText);
            }
            return response.data as { message: string }
        } catch (error: any) {
            console.error(error);
            toast.error(error.message, {theme: "colored"})
        }
    }

    const handleSubmit = () => {
        try {
            createComment({
                postId: id,
                userId: user?._id as string,
                comment
            }).then((data) => toast.success(data?.message, {theme: "colored"}))
                .then(() => getPostComments(id))
                .then((data) => setComments(data))
                .then(() => setComment(''));
        } catch (error: any) {
            console.error(error)
            toast.error(error.message, {theme: "colored"});
        }
    }

    return (
        <div className={'p-4 bg-white flex flex-col gap-5'}>
            {
                isAuth && (
                    <>
                        <h3 className={'font-bold text-lg'}>Оставить комментарий</h3>
                        <form
                            onSubmit={(e) => e.preventDefault()}
                            className={'flex flex-col gap-3'}>
                            <textarea
                                placeholder={'Введите текст'}
                                className={'w-full border-2 p-2 outline-0 h-32 rounded resize-none'}
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
                            <div>
                                <Button text={'Отправить'} type={'submit'} onClick={handleSubmit}/>
                            </div>
                        </form>
                    </>
                )
            }
            <div className={'flex flex-col gap-4'}>
                <h3 className={'font-bold text-lg'}>Комментарии<span
                    className={'text-xl font-normal text-blue-500 ml-4'}>{comments?.length}</span></h3>
                <div className={'flex flex-col gap-3'}>
                    {
                        comments && comments.map((el) => <Comment key={nanoid()} item={el}/>)
                    }
                </div>
            </div>
        </div>
    );
};
