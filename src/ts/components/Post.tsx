import React, { createRef, MutableRefObject, useEffect, useState } from "react";
import no_avatar from "../../img/no_avatar.jpg";
import Moment from "react-moment";
import "moment/locale/ru";
import {
  AiFillDislike,
  AiFillLike,
  AiOutlineComment,
  AiOutlineDislike,
  AiOutlineEye,
  AiOutlineLike,
  AiOutlineDelete,
  AiFillDelete,
} from "react-icons/ai";
import { IPost } from "../slices/postSlice/interfaces";
import DOMPurify from "dompurify";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { checkAuth, userSelector } from "../slices/authSlice/authSlice";
import { likesHandler } from "../utils/likesHandler";
import { useNavigate, useParams } from "react-router-dom";
import { Paths } from "../paths";
import { Button } from "./Button";

export const Post = ({ data }: { data: IPost }) => {
  const [post, setPost] = useState(data);
  const isAuth = useAppSelector(checkAuth);
  const user = useAppSelector(userSelector);
  const [like, setLike] = useState(post.likes.some((e) => e === user?._id));
  const [disLike, setDislike] = useState(
    post.dislikes.some((e) => e === user?._id)
  );
  const ref1 = createRef() as MutableRefObject<HTMLDivElement>;
  const ref2 = createRef() as MutableRefObject<HTMLDivElement>;
  const ref3 = createRef() as MutableRefObject<HTMLDivElement>;
  const ref4 = createRef() as MutableRefObject<HTMLDivElement>;
  const textContainerRef = createRef() as MutableRefObject<HTMLDivElement>;
  const cleanText = DOMPurify.sanitize(data.text);
  const dispatch = useAppDispatch();
  const { id } = useParams();

  useEffect(() => {
    textContainerRef.current.innerHTML = cleanText;
  }, []);

  useEffect(() => {
    setLike(post.likes.some((e) => e === user?._id));
    setDislike(post.dislikes.some((e) => e === user?._id));
  }, [post]);

  const handleLikeBtn = likesHandler({ dispatch, setPost });

  return (
    <>
      <article id={post._id} className="post p-4 flex flex-col bg-white">
        <div className="flex items-center gap-5">
          <div
            className="w-12 h-12 rounded-full"
            style={{
              backgroundImage: post.avatar
                ? `url(${process.env.REACT_APP_SERVER_URL}/${post.avatar})`
                : `url(${no_avatar})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
          <div className="text-lg font-medium">{post.username}</div>
          <div className=" opacity-70">
            <Moment fromNow>{post.createdAt}</Moment>
          </div>
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
            <div
              className="flex gap-2 items-center relative text-[#798e98]"
              onMouseOver={() => ref1.current.classList.remove("hidden")}
              onMouseOut={() => ref1.current.classList.add("hidden")}
            >
              <AiOutlineEye />
              <span className="text-xl text-blue-500">{post.views}</span>
              <div
                ref={ref1}
                className="px-4 py-2 w-32 text-center bg-black text-white text-sm absolute z-10 top-10 -right-9 rounded hidden"
              >
                Просмотры
              </div>
            </div>
            <button
              onClick={() =>
                handleLikeBtn({
                  postId: post._id,
                  userId: user?._id as string,
                  isAuth,
                  param: "likes",
                })
              }
              className="flex gap-2 items-center relative text-[#798e98]"
              onMouseOver={() => ref2.current.classList.remove("hidden")}
              onMouseOut={() => ref2.current.classList.add("hidden")}
            >
              {like ? <AiFillLike /> : <AiOutlineLike />}
              <span className="text-xl text-green-500">
                {post.likes.length}
              </span>
              <div
                ref={ref2}
                className="px-4 py-2 w-32 text-center bg-black text-white text-sm absolute z-10 top-10 -right-9 rounded hidden"
              >
                Нравится
              </div>
            </button>
            <button
              onClick={() =>
                handleLikeBtn({
                  postId: post._id,
                  userId: user?._id as string,
                  isAuth,
                  param: "dislikes",
                })
              }
              className="flex gap-2 items-center relative text-[#798e98]"
              onMouseOver={() => ref3.current.classList.remove("hidden")}
              onMouseOut={() => ref3.current.classList.add("hidden")}
            >
              {disLike ? <AiFillDislike /> : <AiOutlineDislike />}
              <span className="text-xl text-red-500">
                {post.dislikes.length}
              </span>
              <div
                ref={ref3}
                className="px-4 py-2 w-32 text-center bg-black text-white text-sm absolute z-10 top-10 -right-9 rounded hidden"
              >
                Не нравится
              </div>
            </button>
            <div
              className="flex gap-2 items-center relative text-[#798e98]"
              onMouseOver={() => ref4.current.classList.remove("hidden")}
              onMouseOut={() => ref4.current.classList.add("hidden")}
            >
              <div className="flex gap-2">
                <AiOutlineComment />
                <span className="text-xl text-blue-500">
                  {post.comments.length}
                </span>
              </div>
              <div
                ref={ref4}
                className="px-4 py-2 w-32 text-center bg-black text-white text-sm absolute z-10 top-10 -right-9 rounded hidden"
              >
                Комментарии
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
};
