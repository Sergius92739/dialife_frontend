import React, {
    useState,
    createRef,
    MutableRefObject,
    useEffect,
} from "react";
import {Button} from "./Button";
import {
    AiOutlineEye,
    AiOutlineLike,
    AiOutlineDislike,
    AiOutlineComment,
    AiFillLike,
    AiFillDislike,
} from "react-icons/ai";
import {IPost} from "../../slices/postSlice/interfaces";
import {Link, useNavigate} from "react-router-dom";
import {Paths} from "../../paths";
import Moment from "react-moment";
import "moment/locale/ru";
import DOMPurify from "dompurify";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {checkAuth, userSelector} from "../../slices/authSlice/authSlice";
import {likesHandler} from "../../utils/likesHandler";
import {IconBtn} from "./IconBtn";
import {Avatar} from "../Avatar";
import {fetchPostAndUpdateViews} from "../../utils/fetchPostAndUpdateViews";

export const PostItem = ({data}: { data: IPost }): JSX.Element => {
    const [post, setPost] = useState(data);
    const isAuth = useAppSelector(checkAuth);
    const user = useAppSelector(userSelector);
    const [like, setLike] = useState(post?.likes.some((e) => e === user?._id));
    const [disLike, setDislike] = useState(
        post?.dislikes.some((e) => e === user?._id)
    );
    const [readMore, setReadMore] = useState(true);
    const textContainerRef = createRef() as MutableRefObject<HTMLDivElement>;
    const cleanText = DOMPurify.sanitize(post?.text);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        setLike(post.likes.some((e) => e === user?._id));
        setDislike(post.dislikes.some((e) => e === user?._id));
    }, [post]);

    useEffect(() => {
        if (cleanText) {
            textContainerRef.current.innerHTML = cleanText;
        }
    }, []);

    const handleLikeBtn = likesHandler({dispatch, setPost});

    const handleReadMoreClick = () => {
        if (readMore) {
            setReadMore(false);
            fetchPostAndUpdateViews(post._id).then((data) => setPost(data));
        } else {
            setReadMore(true);
        }
    };

    return (
        <article className="post p-4 flex flex-col bg-white">
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

            <h3 id={post._id} className="text-3xl font-bold mt-3">
                <Link
                    className="hover:text-[#58A9A5] text-inherit"
                    to={`${Paths.POSTS}/${post._id}`}
                    title={'Перейти к посту'}
                >
                    {post.title}
                </Link>
            </h3>
            {post.imgUrl && (
                <div className="py-3">
                    <img
                        className="object-cover w-full"
                        src={`${process.env.REACT_APP_SERVER_URL}/${post.imgUrl}`}
                        alt={post.title}
                    />
                </div>
            )}
            {
                <div
                    className={`mt-3 ${readMore ? "line-clamp-3" : ""}`}
                    ref={textContainerRef}
                >
                    {/*text container */}
                </div>
            }
            <div className="mt-5 flex items-center gap-20">
                <>
                    {readMore ? (
                        <Button
                            text="Читать далее"
                            type="button"
                            onClick={handleReadMoreClick}
                        />
                    ) : (
                        <Button
                            text="Свернуть"
                            type="button"
                            onClick={handleReadMoreClick}
                        />
                    )}
                    <div className="flex gap-10 items-center text-2xl">
                        <IconBtn
                            text={'Просмотры'}
                            iconOutline={<AiOutlineEye/>}
                            count={post.views}
                        />
                        <IconBtn
                            text={'Нравится'}
                            iconOutline={<AiOutlineLike/>}
                            count={post.likes.length}
                            iconFill={<AiFillLike/>}
                            toggle={like}
                            onClick={() => handleLikeBtn({
                                userId: user?._id as string,
                                postId: post._id,
                                isAuth,
                                param: "likes"
                            })}
                        />
                        <IconBtn
                            text={'Не нравится'}
                            iconOutline={<AiOutlineDislike/>}
                            count={post.dislikes.length}
                            toggle={disLike}
                            iconFill={<AiFillDislike/>}
                            onClick={() => handleLikeBtn({
                                userId: user?._id as string,
                                postId: post._id,
                                isAuth,
                                param: 'dislikes'
                            })}
                        />
                        <IconBtn
                            text={'Комментарии'}
                            iconOutline={<AiOutlineComment/>}
                            count={post.comments.length}
                            onClick={() => navigate(`${Paths.POSTS}/${post._id}`)}
                        />
                    </div>
                </>
            </div>
        </article>
    );
};
