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