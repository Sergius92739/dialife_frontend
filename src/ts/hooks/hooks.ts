import { useState, useEffect } from "react";
import type { TAppDispatch, TRootState } from "../store";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { postsSelector } from "../slices/postSlice/postSlice";
import { instAxios } from "../utils/axios";

export const useAppDispatch = () => useDispatch<TAppDispatch>();

export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;

export const useGetAllPosts = () => {
  const [posts, setPosts] = useState(useAppSelector(postsSelector));
  const refetchPosts = async () => {
    const response = await instAxios.get("/posts/all");
    if (response.status !== 200) {
      throw new Error(response.statusText);
    }
    return response.data;
  };
  return { posts, refetchPosts, setPosts };
};
