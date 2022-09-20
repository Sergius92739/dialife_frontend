import { createAsyncThunk } from "@reduxjs/toolkit";
import { instAxios } from "../../utils/axios";
import { IPost } from "./interfaces";

export { createAsyncThunk } from "@reduxjs/toolkit";

export const createPost = createAsyncThunk(
  "post/createPost",
  async (params: FormData) => {
    const response = await instAxios.post("/posts/add", params);

    if (response.status !== 200) {
      throw new Error(response.statusText);
    }

    return response.data;
  }
);

export const getAllPosts = createAsyncThunk("post/getAllPosts", async () => {
  const response = await instAxios.get("/posts/all");

  if (response.status !== 200) {
    throw new Error(response.statusText);
  }

  return response.data;
});

export const removePost = createAsyncThunk(
  "post/removePost",
  async (id: string) => {
    const response = await instAxios.delete(`posts/${id}`);

    if (response.status !== 200) {
      throw new Error(response.statusText);
    }

    return response.data as { message: string; postId: string };
  }
);

export const updatePost = createAsyncThunk(
  "post/updatePost",
  async ({ data, id }: { data: FormData; id: string }) => {
    const response = await instAxios.put(`posts/${id}`, data);
    if (response.status !== 200) {
      throw new Error(response.statusText);
    }
    return response.data as { post: IPost; message: string };
  }
);
