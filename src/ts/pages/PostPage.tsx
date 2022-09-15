import React, {useEffect, useState} from "react";
import { Post } from "../components/Post";
import {instAxios} from '../utils/axios'
import {useParams} from 'react-router-dom'
import { IPost } from "../slices/postSlice/interfaces";

export const PostPage = () => {
  const [post, setPost] = useState<IPost[]>([]);
  const { id } = useParams();

  const fetchPost = async (id: string) => {
    const response = await instAxios.get(`/posts/${id}`);
    if (response.status !== 200) {
      throw new Error(response.statusText);
    }
    setPost([response.data]);
  };

  useEffect(() => {
    fetchPost(id as string);
  }, [id]);

  return post[0] && <Post data={post[0]}/>
};
