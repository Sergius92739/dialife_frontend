import React, {useEffect, useState} from 'react';
import {Button} from "./Button";
import {Comment} from "./Comment";
import {useAppSelector} from "../hooks/hooks";
import {toast} from "react-toastify";
import {checkAuth, userSelector} from "../slices/authSlice/authSlice";
import {nanoid} from "nanoid";
import {instAxios} from "../utils/axios";
import {IComment} from "../slices/postSlice/interfaces";
import {createComment, TCreateCommentProps} from '../utils/createComment'
import {getPostComments} from '../utils/getPostComments'
import {Link} from "react-router-dom";
import {Paths} from "../paths";
import {Loading} from "./Loading";

export const Comments: React.FC<{ id: string }> = props => {
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState<IComment[] | undefined>(undefined);
    const [loading, setLoading] = useState(false);
    const {id} = props;
    const user = useAppSelector(userSelector);
    const isAuth = useAppSelector(checkAuth);

    useEffect(() => {
        console.log(comments);
    }, [comments]);


    useEffect(() => {
        getPostComments(id)
            .then((data) => setComments(data))
    }, []);

    const handleSubmit = () => {
        try {
            setLoading(true);
            const commentData: TCreateCommentProps = {
                postId: id,
                userId: user?._id as string,
                comment,
                type: 'comment',
            }
            createComment(commentData)
                .then((data) => toast.success(data?.message, {theme: "colored"}))
                .then(() => getPostComments(id))
                .then((data) => setComments(data))
                .then(() => setComment(''))
                .then(() => setLoading(false));
        } catch (error: any) {
            console.error(error)
            toast.error(error.message, {theme: "colored"});
        }
    }

    return (
        <>
            {loading && <Loading/>}
            <div className={'p-4 bg-white flex flex-col gap-5'}>
                {
                    (
                        <div className={'p-4 flex flex-col gap-3 bg-[#f7f7f7] rounded relative'}>
                            {
                                !isAuth && (
                                    <span className={'font-normal text-lg block absolute top-28 left-44'}>
                                        Только зарегестрированные пользователи могут оставлять комментарии.
                                        <Link className={'text-blue-500 ml-3'}
                                              to={Paths.LOGIN}>Войти/Зарегестрироваться</Link>
                                    </span>
                                )
                            }
                            <h3 className={'font-bold text-lg'}>Оставить комментарий</h3>
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
                                    <Button disabled={!isAuth} text={'Отправить'} type={'submit'}
                                            onClick={handleSubmit}/>
                                </div>
                            </form>
                        </div>
                    )
                }
                <div className={'flex flex-col gap-4'}>
                    <h3 className={'font-bold text-lg'}>Комментарии<span
                        className={'text-xl font-normal text-blue-500 ml-4'}>{comments?.length}</span></h3>
                    <div className={'flex flex-col gap-3'}>
                        {
                            comments && comments.map((el) =>
                                <Comment
                                    key={nanoid()}
                                    item={el}
                                    setFunc={setComments}
                                />
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    );
};
