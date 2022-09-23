import React, {
    useState,
    createRef,
    MutableRefObject,
    useEffect,
    useCallback,
} from "react";
import no_avatar from "../../img/no_avatar.jpg";
import {Button} from "./Button";
import {
    AiOutlineEye,
    AiOutlineLike,
    AiOutlineDislike,
    AiOutlineComment,
    AiFillLike,
    AiFillDislike,
} from "react-icons/ai";
import {IPost} from "../slices/postSlice/interfaces";
import {Link, useNavigate} from "react-router-dom";
import {Paths} from "../paths";
import Moment from "react-moment";
import "moment/locale/ru";
import DOMPurify from "dompurify";
import {useAppDispatch, useAppSelector} from "../hooks/hooks";
import {
    postLoadingSelector,
    postStatusSelector,
} from "../slices/postSlice/postSlice";
import {checkAuth, userSelector} from "../slices/authSlice/authSlice";
import {toast} from "react-toastify";
import {fetchLike} from "../utils/fetchLike";
import {likesHandler} from "../utils/likesHandler";
import {instAxios} from "../utils/axios";
import {getAllPosts} from "../slices/postSlice/asyncFunc";
import {Loading} from "./Loading";
import {IconBtn} from "./IconBtn";
import {Avatar} from "./Avatar";

export const PostItem = ({data}: { data: IPost }): JSX.Element => {
    const [post, setPost] = useState(data);
    const isAuth = useAppSelector(checkAuth);
    const user = useAppSelector(userSelector);
    const [like, setLike] = useState(post?.likes.some((e) => e === user?._id));
    const [disLike, setDislike] = useState(
        post?.dislikes.some((e) => e === user?._id)
    );
    const [readMore, setReadMore] = useState(true);
    const ref1 = createRef() as MutableRefObject<HTMLDivElement>;
    const ref2 = createRef() as MutableRefObject<HTMLDivElement>;
    const ref3 = createRef() as MutableRefObject<HTMLDivElement>;
    const ref4 = createRef() as MutableRefObject<HTMLDivElement>;
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

    /* fetch post and update views */
    const fetchPost = async (id: string) => {
        const response = await instAxios.get(`/posts/${id}/updateViews`);
        if (response.status !== 200) {
            throw new Error(response.statusText);
        }
        return response.data as IPost;
    };

    const handleReadMoreClick = () => {
        if (readMore) {
            setReadMore(false);
            fetchPost(post._id).then((data) => setPost(data));
        } else {
            setReadMore(true);
        }
    };

    return (
        <article className="post p-4 flex flex-col bg-white">
            <div className="flex items-center gap-5">
                <Avatar fileName={post.avatar}/>
                <div className="text-lg font-medium">{post.username}</div>
                <div className=" opacity-70">
                    <Moment fromNow>{post.createdAt}</Moment>
                </div>
            </div>
            <h3 id={post._id} className="text-3xl font-bold mt-3">
                <Link
                    className="hover:text-[#58A9A5] text-inherit"
                    to={`${Paths.POSTS}/${post._id}`}
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
