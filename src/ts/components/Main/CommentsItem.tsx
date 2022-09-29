import {IComment, IPost} from "../../slices/postSlice/interfaces";
import React, {useEffect, useState} from "react";
import {fetchPostById} from "../../utils/fetchPostById";
import {Avatar} from "../Avatar";
import Moment from "react-moment";
import {Link} from "react-router-dom";
import {Paths} from "../../paths";
import {Button} from "./Button";
import {AiOutlineClose, AiOutlineComment, AiOutlineDislike, AiOutlineEye, AiOutlineLike} from "react-icons/ai";
import {toast} from "react-toastify";
import {fetchUpdateUserComment} from "../../utils/fetchUpdateUserComment";
import Popup from "./Popup";
import {Loading} from "./Loading";
import {IconBtn} from "./IconBtn";

export const CommentsItem: React.FC<{ comment: IComment }> = props => {
    const [comment, setComment] = useState<IComment>(props.comment);
    const [post, setPost] = useState<IPost | undefined>(undefined);
    const [form, setForm] = useState('hidden');
    const [commentText, setCommentText] = useState(comment.comment);
    const [popupState, setPopupState] = useState(false);
    const [loading, setLoading] = useState(false);
    const [commentVisible, setCommentVisible] = useState(false);

    useEffect(() => {
        fetchPostById(props.comment.postId)
            .then((data) => setPost(data))
    }, [props.comment]);

    const submitHandler = (commentId: string) => {
        try {
            setLoading(true);
            const commentData = {
                text: commentText,
                commentId: comment._id
            }
            fetchUpdateUserComment(commentData)
                .then((data) => {
                    if (data?.comment) {
                        setComment(data.comment);
                        setCommentText(data.comment.comment);
                        toast.success(data.message, {theme: "colored"});
                        setForm('hidden');
                        setPopupState(false);
                        setLoading(false);
                    }
                })
        } catch (error: any) {
            console.error(error);
            toast.error(error.message, {theme: "colored"})
        }
    }

    return (
        <>
            {loading && <Loading/>}
            {
                commentVisible ? (
                    <div>
                        <button
                            className={'m-3 text-blue-500 inline-block border-b-2 border-b-blue-500'}
                            onClick={() => setCommentVisible(false)}>
                            свернуть
                        </button>
                    </div>
                ) : (
                    <div
                        className={'flex gap-5 items-center whitespace-nowrap justify-between py-1 px-6 bg-white rounded cursor-pointer hover:bg-bisque-light'}
                        onClick={() => setCommentVisible(true)}
                        title={'Кликни чтобы открыть комментарий'}
                    >
                        <div className={'w-1/2 line-clamp-1'}>{comment.comment}</div>
                        <div className={'flex gap-5'}>
                            {
                                (comment.createdAt !== comment.updatedAt) && (
                                    <div className={''}>
                                        <span className={'mr-3 text-gray-400'}>отредактирован:</span>
                                        <Moment className={''} format={'DD.MM.YYYY HH:mm'}>{comment.updatedAt}</Moment>
                                    </div>
                                )
                            }
                            <div className={''}>
                                <span className={'mr-3 text-gray-400'}>создан:</span>
                                <Moment className={''} format={'DD.MM.YYYY HH:mm'}>{comment.createdAt}</Moment>
                            </div>

                        </div>
                    </div>
                )
            }
            <div className={`py-3 px-4 bg-white rounded ${commentVisible ? '' : 'hidden'}`}>
                <div className={'border-l border-t border-r rounded'}>
                    <div className={'flex items-center justify-between border-b py-2 px-4 gap-10'}>
                        <div className={'w-1/3 text-gray-500'}>Создан:</div>
                        <div className={''}><Moment format='DD.MM.YYYY HH:mm'>{comment.createdAt}</Moment>
                        </div>
                    </div>
                    {
                        (comment.createdAt !== comment.updatedAt) && (
                            <div className={'flex items-center justify-between border-b py-2 px-4 gap-10'}>
                                <div className={'w-1/3 text-gray-500'}>Отредактирован:</div>
                                <div className={''}><Moment
                                    format='DD.MM.YYYY HH:mm'>{comment.updatedAt}</Moment>
                                </div>
                            </div>
                        )
                    }
                    {
                        comment.type === 'comment' ? (
                            <div className={'flex items-center justify-between border-b py-2 px-4 gap-10'}>
                                <div className={'w-1/3 text-gray-500'}>Комментарий:</div>
                                <div className={''}>{comment.comment}</div>
                            </div>
                        ) : null
                    }
                    {
                        comment.type === 'answer' ? (
                            <div className={'flex justify-between border-b py-2 px-4 gap-10'}>
                                <div className={'w-1/3 text-gray-500'}>Ответ на комментарий:</div>
                                <div className={'flex-1 flex flex-col gap-2'}>
                                    <div
                                        className={'flex flex-col gap-2 border border-[#58A9A5] border-l-[8px] px-2 py-1 rounded-md'}>
                                        <div className="flex items-center gap-5">
                                            <Avatar link={false} fileName={comment.answerTo.avatar}
                                                    className={'small'}/>
                                            <div className="text-lg font-medium">{comment.answerTo.username}</div>
                                        </div>
                                        <div className={''}>
                                            {comment.answerTo.comment}
                                        </div>
                                    </div>
                                    <div>
                                        {comment.comment}
                                    </div>
                                </div>
                            </div>
                        ) : null
                    }
                    <div className={'flex justify-between border-b py-2 px-4 gap-10'}>
                        <div className={'w-1/3 text-gray-500'}>Ссылка на пост:</div>
                        <div className={'flex-1 font-medium text-right'}>
                            <Link
                                className={'cursor-pointer text-blue-500'} to={`${Paths.POSTS}/${post?._id}`}
                                title={'Кликни чтобы перейти к посту'}
                            >
                                {post?.title}
                            </Link>
                        </div>
                    </div>
                </div>
                {
                    form === 'hidden' ? (
                        <div className={'mt-3'}>
                            <Button text={'редактировать комментарий'} type={'button'} onClick={() => setForm('')}/>
                        </div>
                    ) : null
                }
                <div className={`p-4 flex flex-col gap-3 bg-[#f7f7f7] rounded relative ${form}`}>
                    <div className={'flex justify-between'}>
                        <h3 className={'font-bold text-lg'}>Редактирование комментария</h3>
                        <button
                            className={'text-2xl'}
                            onClick={() => setForm('hidden')}
                        >
                            <AiOutlineClose title={'Закрыть'}/>
                        </button>
                    </div>
                    <form
                        onSubmit={(e) => e.preventDefault()}
                        className={'flex flex-col gap-3'}>
                            <textarea
                                placeholder={'Введите текст'}
                                className={'w-full border-2 p-2 outline-0 h-32 rounded resize-none'}
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                required={true}
                            />
                        <div>
                            <Button
                                text={'Сохранить'}
                                type={'submit'}
                                onClick={() => setPopupState(true)}
                            />
                        </div>
                    </form>
                </div>
                {
                    !loading && (
                        <Popup
                            text={'Сохранить изменения и опубликовать комментарий?'}
                            state={popupState}
                            btnCancelHandler={() => setPopupState(false)}
                            btnActionHandler={() => submitHandler(comment._id)}
                            btnActionText={'опубликовать'}
                        />
                    )
                }

            </div>
        </>
    );
};