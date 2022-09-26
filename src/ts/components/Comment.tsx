import React, {Dispatch, FormEventHandler, MouseEventHandler, SetStateAction, useState} from "react";
import no_avatar from "../../img/no_avatar.jpg";
import Moment from "react-moment";
import {IComment} from "../slices/postSlice/interfaces"
import {Button} from "./Button";
import {toast} from "react-toastify";
import {Link, useParams} from "react-router-dom";
import {useAppSelector} from "../hooks/hooks";
import {checkAuth, userSelector} from "../slices/authSlice/authSlice";
import {AiOutlineClose} from 'react-icons/ai'
import {createComment, TCreateCommentProps} from '../utils/createComment'
import {getPostComments} from "../utils/getPostComments";
import {Paths} from "../paths";
import {Avatar} from "./Avatar";
import {Loading} from "./Loading";

type TProps = {
    item: IComment;
    setFunc: React.Dispatch<SetStateAction<IComment[] | undefined>>
}


export const Comment = (props: TProps): JSX.Element => {
    const {item, setFunc} = props;
    const [form, setForm] = useState('hidden');
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(false);
    const user = useAppSelector(userSelector);
    const isAuth = useAppSelector(checkAuth);


    const submitHandler = () => {
        try {
            setLoading(true)
            const commentData: TCreateCommentProps = {
                userId: user?._id as string,
                postId: item.postId,
                type: 'answer',
                comment,
                commentId: item._id,
            }
            createComment(commentData)
                .then((data) => toast.success(data?.message, {theme: "colored"}))
                .then(() => getPostComments(item.postId))
                .then((data) => setFunc(data))
                .then(() => setComment(''))
                .then(() => setLoading(false));
        } catch (error: any) {
            console.error(error);
            toast.error(error.message, {theme: "colored"})
        }
    }

    return (
        <>
            {loading && <Loading/>}
            <div className={'flex flex-col p-2'}>
                <div className="flex items-center gap-5">
                    <Avatar link={false} fileName={item.author.avatar}/>
                    <div className="text-lg font-medium">{item.author.username}</div>
                    <div className=" opacity-70">
                        <Moment fromNow>{item.createdAt}</Moment>
                    </div>
                </div>
                <div className={'flex flex-col gap-2 ml-[68px]'}>
                    {
                        item.type === 'answer' ? (
                            <div
                                className={'flex flex-col gap-2 border border-[#58A9A5] border-l-[8px] px-2 py-1 rounded-md'}>
                                <div className="flex items-center gap-5">
                                    <Avatar link={false} fileName={item.answerTo.avatar}/>
                                    <div className="text-lg font-medium">{item.answerTo.username}</div>
                                </div>
                                <div>
                                    {item.answerTo.comment}
                                </div>
                            </div>

                        ) : null
                    }
                    <div className={''}>
                        {item.comment}
                    </div>
                    <div>
                        <button
                            className={'text-blue-500'}
                            onClick={() => setForm('')}
                        >
                            Ответить
                        </button>
                    </div>
                </div>
                <div className={`p-4 flex flex-col gap-3 bg-[#f7f7f7] rounded relative ${form}`}>
                    {
                        !isAuth && (
                            <span className={'font-normal text-lg block absolute top-28 left-44'}>
                            Только зарегестрированные пользователи могут оставлять комментарии.
                            <Link className={'text-blue-500 ml-3'}
                                  to={Paths.LOGIN}>Войти/Зарегестрироваться</Link>
                        </span>
                        )
                    }
                    <div className={'flex justify-between'}>
                        <h3 className={'font-bold text-lg'}>
                            Ответить
                            <span
                                className={'text-blue-500 font-normal ml-1'}>@{item.author.username}
                            </span>
                        </h3>
                        <button
                            className={'text-2xl'}
                            onClick={() => setForm('hidden')}
                        >
                            <AiOutlineClose/>
                        </button>
                    </div>

                    <form
                        onSubmit={(e) => e.preventDefault()}
                        className={'flex flex-col gap-3'}>
                            <textarea
                                placeholder={'Введите текст'}
                                className={'w-full border-2 p-2 outline-0 h-32 rounded resize-none'}
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                disabled={!isAuth}
                                required={true}
                            />
                        <div>
                            <Button
                                text={'Отправить'}
                                type={'submit'}
                                onClick={submitHandler}
                                disabled={!isAuth}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};