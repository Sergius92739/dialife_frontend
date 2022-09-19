import React, { useEffect, useState } from "react";
import { Post } from "../components/Post";
import { instAxios } from "../utils/axios";
import { useParams } from "react-router-dom";
import { IPost } from "../slices/postSlice/interfaces";
import { useAppDispatch } from "../hooks/hooks";
import { getAllPosts } from "../slices/postSlice/asyncFunc";
import { toast } from "react-toastify";

export const PostPage = () => {
  const [post, setPost] = useState<IPost[]>([]);
  const { id } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchPost(id as string)
      .then((data) => setPost([data]))
      .then(() => dispatch(getAllPosts()))
      .catch((error) => {
        console.error(error);
        toast.error(error.message, { theme: "colored" });
      });
  }, [id]);

  const fetchPost = async (id: string) => {
    const response = await instAxios.get(`/posts/${id}/updateViews`);
    if (response.status !== 200) {
      throw new Error(response.statusText);
    }
    return response.data as IPost;
  };

  return post[0] && <Post data={post[0]} />;
};
