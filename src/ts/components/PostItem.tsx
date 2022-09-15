import React, { useState, createRef, MutableRefObject, useEffect } from "react";
import no_avatar from "../../img/no_avatar.jpg";
import { Button } from "./Button";
import {
  AiOutlineEye,
  AiOutlineLike,
  AiOutlineDislike,
  AiOutlineComment,
  AiFillLike,
  AiFillDislike,
} from "react-icons/ai";
import { IPost } from "../slices/postSlice/interfaces";
import { Link } from "react-router-dom";
import { Paths } from "../paths";
import Moment from "react-moment";
import "moment/locale/ru";
import DOMPurify from "dompurify";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { postStatusSelector } from "../slices/postSlice/postSlice";
import { checkAuth, userSelector } from "../slices/authSlice/authSlice";
import { toast } from "react-toastify";
import { instAxios } from "../utils/axios";
import { fetchDislike, fetchLike } from "../slices/postSlice/asyncFunc";

export const PostItem = ({ data }: { data: IPost }): JSX.Element => {
  const [post, setPost] = useState(data);
  const [like, setLike] = useState(
    useAppSelector(postStatusSelector) === "Лайк поставлен."
  );

  const [disLike, setDislike] = useState(
    useAppSelector(postStatusSelector) === "Дизлайк поставлен."
  );
  const isAuth = useAppSelector(checkAuth);
  const user = useAppSelector(userSelector);
  const [readMore, setReadMore] = useState(true);
  const ref1 = createRef() as MutableRefObject<HTMLDivElement>;
  const ref2 = createRef() as MutableRefObject<HTMLDivElement>;
  const ref3 = createRef() as MutableRefObject<HTMLDivElement>;
  const ref4 = createRef() as MutableRefObject<HTMLDivElement>;
  const textContainerRef = createRef() as MutableRefObject<HTMLDivElement>;
  const dispatch = useAppDispatch();
  const status = useAppSelector(postStatusSelector);
  const {
    _id,
    username,
    title,
    text,
    imgUrl,
    views,
    createdAt,
    comments,
    likes,
    dislikes,
    avatar,
  } = post;
  const cleanText = DOMPurify.sanitize(text);

  useEffect(() => {
    setLike(post.likes.some((e) => e === user?._id));
    setDislike(post.dislikes.some((e) => e === user?._id));
    if (status) {
      toast.info(status, { theme: "colored" });
    }
  }, [post.likes, post.dislikes]);

  useEffect(() => {
    if (cleanText) {
      textContainerRef.current.innerHTML = htmlString();
    }
  }, []);

  const fetchPost = async (id: string) => {
    const response = await instAxios.get(`/posts/${id}`);
    if (response.status !== 200) {
      throw new Error(response.statusText);
    }
    setPost(response.data);
  };

  const likesHandler = async () => {
    if (!isAuth) {
      return toast.error(
        "Это действие доступно только для авторизованных пользователей.",
        { theme: "colored" }
      );
    }
    if (user) {
      await dispatch(fetchLike({ postId: post._id, userId: user._id }));
      fetchPost(post._id);
    }
  };

  const dislikesHandler = async () => {
    if (!isAuth) {
      return toast.error(
        "Это действие доступно только для авторизованных пользователей.",
        { theme: "colored" }
      );
    }
    if (user) {
      await dispatch(fetchDislike({ postId: post._id, userId: user?._id }));
      fetchPost(post._id);
    }
  };

  const htmlString = () => {
    return `<p>
             ${content(cleanText).slice(0, 100)}
             <span class="opacity-60">${content(cleanText).slice(
               100,
               200
             )}</span>
             <span class="opacity-50">${content(cleanText).slice(
               200,
               300
             )}</span>
             <span class="opacity-40">${content(cleanText).slice(
               300,
               400
             )}</span>
             <span class="opacity-30">${content(cleanText).slice(
               400,
               500
             )}</span>
             <span class="opacity-20">${content(cleanText).slice(
               500,
               600
             )}</span>
             <span class="opacity-10">${content(cleanText).slice(
               600,
               700
             )}</span>
           </p>`;
  };

  const content = (str: string) => {
    const regex = /<.*?>/g;
    return str.replace(regex, "");
  };

  const handleReadMoreClick = () => {
    if (readMore) {
      textContainerRef.current.innerHTML = "";
      textContainerRef.current.insertAdjacentHTML("beforeend", cleanText);
      setReadMore(!readMore);
    } else {
      textContainerRef.current.innerHTML = htmlString();
      setReadMore(!readMore);
    }
  };

  return (
    <article className="post p-4 flex flex-col bg-white">
      <div className="flex items-center gap-5">
        <div
          className="w-12 h-12 rounded-full"
          style={{
            backgroundImage: avatar
              ? `url(${process.env.REACT_APP_SERVER_URL}/${avatar})`
              : `url(${no_avatar})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
        <div className="text-lg font-medium">{username}</div>
        <div className=" opacity-70">
          <Moment fromNow>{createdAt}</Moment>
        </div>
      </div>
      <h3 id={_id} className="text-3xl font-bold mt-3">
        <Link
          className="hover:text-[#58A9A5] text-inherit"
          to={`${Paths.POSTS}/${post._id}`}
        >
          {title}
        </Link>
      </h3>
      {imgUrl && (
        <div className="py-3">
          <img
            className="object-cover w-full"
            src={`${process.env.REACT_APP_SERVER_URL}/${imgUrl}`}
            alt={title}
          />
        </div>
      )}
      {<div className="mt-3" ref={textContainerRef}></div>}
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
            <div
              className="flex gap-2 items-center relative text-[#798e98]"
              onMouseOver={() => ref1.current.classList.remove("hidden")}
              onMouseOut={() => ref1.current.classList.add("hidden")}
            >
              <AiOutlineEye />
              <span className="text-xl text-blue-500">{views}</span>
              <div
                ref={ref1}
                className="px-4 py-2 w-32 text-center bg-black text-white text-sm absolute top-10 -right-9 rounded hidden"
              >
                Просмотры
              </div>
            </div>
            <button
              onClick={likesHandler}
              className="flex gap-2 items-center relative text-[#798e98]"
              onMouseOver={() => ref2.current.classList.remove("hidden")}
              onMouseOut={() => ref2.current.classList.add("hidden")}
            >
              {like ? <AiFillLike /> : <AiOutlineLike />}
              <span className="text-xl text-green-500">{likes.length}</span>
              <div
                ref={ref2}
                className="px-4 py-2 w-32 text-center bg-black text-white text-sm absolute top-10 -right-9 rounded hidden"
              >
                Нравится
              </div>
            </button>
            <button
              onClick={dislikesHandler}
              className="flex gap-2 items-center relative text-[#798e98]"
              onMouseOver={() => ref3.current.classList.remove("hidden")}
              onMouseOut={() => ref3.current.classList.add("hidden")}
            >
              {disLike ? <AiFillDislike /> : <AiOutlineDislike />}
              <span className="text-xl text-red-500">{dislikes.length}</span>
              <div
                ref={ref3}
                className="px-4 py-2 w-32 text-center bg-black text-white text-sm absolute top-10 -right-9 rounded hidden"
              >
                Не нравится
              </div>
            </button>
            <button
              className="flex gap-2 items-center relative text-[#798e98]"
              onMouseOver={() => ref4.current.classList.remove("hidden")}
              onMouseOut={() => ref4.current.classList.add("hidden")}
            >
              <Link className="flex gap-2" to={`${Paths.POSTS}/${post._id}`}>
                <AiOutlineComment />
                <span className="text-xl text-blue-500">{comments.length}</span>
              </Link>
              <div
                ref={ref4}
                className="px-4 py-2 w-32 text-center bg-black text-white text-sm absolute top-10 -right-9 rounded hidden"
              >
                Комментарии
              </div>
            </button>
          </div>
        </>
      </div>
    </article>
  );
};
