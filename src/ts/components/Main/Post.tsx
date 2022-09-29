import React, {createRef, MutableRefObject, useEffect, useState} from "react";
import Moment from "react-moment";
import "moment/locale/ru";
import {
    AiFillDislike,
    AiFillLike,
    AiOutlineComment,
    AiOutlineDislike,
    AiOutlineEye,
    AiOutlineLike,
} from "react-icons/ai";
import {IPost} from "../../slices/postSlice/interfaces";
import DOMPurify from "dompurify";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {checkAuth, userSelector} from "../../slices/authSlice/authSlice";
import {likesHandler} from "../../utils/likesHandler";
import {useParams} from "react-router-dom";
import {IconBtn} from "./IconBtn";
import {Avatar} from "../Avatar";

export const Post = ({data}: { data: IPost }) => {
    const [post, setPost] = useState(data);
    const isAuth = useAppSelector(checkAuth);
    const user = useAppSelector(userSelector);
    const [like, setLike] = useState(post.likes.some((e) => e === user?._id));
    const [disLike, setDislike] = useState(
        post.dislikes.some((e) => e === user?._id)
    );
    const textContainerRef = createRef() as MutableRefObject<HTMLDivElement>;
    const cleanText = DOMPurify.sanitize(data.text);
    const dispatch = useAppDispatch();
    const {id} = useParams();

    useEffect(() => {
        textContainerRef.current.innerHTML = cleanText;
    }, []);

    useEffect(() => {
        setLike(post.likes.some((e) => e === user?._id));
        setDislike(post.dislikes.some((e) => e === user?._id));
    }, [post]);

    const handleLikeBtn = likesHandler({dispatch, setPost});

    return (
        <>
            <article id={post._id} className="post p-4 flex flex-col bg-white">
                <div className={'flex justify-between items-center'}>
                    <div className="flex items-center gap-5">
                        <Avatar link={false} fileName={post.avatar}/>
                        <div className={`text-lg font-medium ${post.username === 'admin' ? 'text-red-500' : ''}`}>
                            {post.username}
                        </div>
                        <div className=" opacity-70">
                            <Moment fromNow>{post.createdAt}</Moment>
                        </div>
                    </div>
                    {
                        (post.createdAt !== post.updatedAt) && (
                            <div className={'opacity-70'}>
                                <span className={'mr-3'}>изменён:</span>
                                <Moment fromNow>{post.updatedAt}</Moment>
                            </div>
                        )
                    }
                </div>
                <h3 className="text-3xl font-bold mt-3">{post.title}</h3>
                {post.imgUrl && (
                    <div className="py-3">
                        <img
                            className="object-cover w-full"
                            src={`${process.env.REACT_APP_SERVER_URL}/${post.imgUrl}`}
                            alt={post.title}
                        />
                    </div>
                )}
                <div ref={textContainerRef} className="mt-3">
                    {/**Контейтер контента поста */}
                </div>
                <div className="mt-5 flex items-center justify-between gap-20">
                    <div className="flex gap-10 items-center text-2xl">
                        <IconBtn
                            text={'Просмотры'}
                            iconOutline={<AiOutlineEye/>}
                            count={post.views}
                        />
                        <IconBtn
                            onClick={() => handleLikeBtn({
                                postId: post._id,
                                userId: user?._id as string,
                                isAuth,
                                param: 'likes'
                            })}
                            iconFill={<AiFillLike/>}
                            iconOutline={<AiOutlineLike/>}
                            text={'Нравится'}
                            toggle={like}
                            count={post.likes.length}
                        />
                        <IconBtn
                            text={'Не нравится'}
                            iconOutline={<AiOutlineDislike/>}
                            count={post.dislikes.length}
                            onClick={() => handleLikeBtn({
                                postId: post._id,
                                userId: user?._id as string,
                                isAuth,
                                param: "dislikes",
                            })}
                            iconFill={<AiFillDislike/>}
                            toggle={disLike}
                        />
                        <IconBtn
                            text={'Комментарии'}
                            iconOutline={<AiOutlineComment/>}
                            count={post.comments.length}
                        />
                    </div>
                </div>
            </article>
        </>
    );
};
