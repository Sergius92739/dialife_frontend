import React, { useEffect, useState } from "react";
import { IPost } from "../slices/postSlice/interfaces";
import { instAxios } from "../utils/axios";
import { toast } from "react-toastify";
import { PostItem } from "../components/PostItem";
import { useAppSelector } from "../hooks/hooks";
import { checkAuth } from "../slices/authSlice/authSlice";
import { nanoid } from "nanoid";

export const MyPostsPage = (): JSX.Element => {
  const [posts, setPosts] = useState<IPost[] | undefined>(undefined);
  const isAuth = useAppSelector(checkAuth);

  useEffect(() => {
    try {
      fetchUserPosts()
        .then((data) => setPosts(data))
        .catch((error) => toast.error(error.message, { theme: "colored" }));
    } catch (error: any) {
      toast.error(error.message, { theme: "colored" });
    }
  }, []);

  const fetchUserPosts = async () => {
    try {
      const response = await instAxios.get("/posts/user");
      if (response.status !== 200) {
        throw new Error(response.statusText);
      }
      return response.data as IPost[];
    } catch (error: any) {
      console.error(error);
      toast.error(error.message, { theme: "colored" });
    }
  };

  return (
    <>
      {isAuth && (
        <div className={"flex flex-col gap-5"}>
          {!posts?.length && (
            <div className={"text-center text-lg"}>У вас нет постов.</div>
          )}
          {posts &&
            posts.map((post) => <PostItem key={nanoid()} data={post} />)}
        </div>
      )}
    </>
  );
};
