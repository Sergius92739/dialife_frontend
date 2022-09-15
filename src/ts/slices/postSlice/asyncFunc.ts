import { createAsyncThunk } from "@reduxjs/toolkit";
import { instAxios } from "../../utils/axios";

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

export const getPostById = createAsyncThunk(
  "post/getPostById",
  async (id: string) => {
    const response = await instAxios.get(`/posts/${id}`);

    if (response.status !== 200) {
      throw new Error(response.statusText);
    }

    return response.data;
  }
);

export const fetchLike = createAsyncThunk(
  'post/fetchLike',
  async ({postId, userId}: {postId: string, userId: string}) => {
    const fetchLike = await instAxios.get(
      `/posts/${postId}/${userId}/likes`
    );
    if (fetchLike.status !== 200) {
      throw new Error(fetchLike.statusText);
    }
    return fetchLike.data;
  }
)

export const fetchDislike = createAsyncThunk(
  'post/fetchDislike',
  async ({postId, userId}: {postId: string, userId: string}) => {
    const fetchLike = await instAxios.get(
      `/posts/${postId}/${userId}/dislikes`
    );
    if (fetchLike.status !== 200) {
      throw new Error(fetchLike.statusText);
    }
    return fetchLike.data;
  }
)