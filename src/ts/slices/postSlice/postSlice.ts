import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TRootState } from "../../store";
import {
  createPost,
  getAllPosts,
  fetchLike,
  fetchDislike,
  getPostById,
} from "./asyncFunc";
import { IPost, IPostState } from "./interfaces";

const initialState: IPostState = {
  posts: [],
  popularPosts: [],
  isLoading: false,
  status: null,
  error: null,
  post: null,
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    resetPostStatus: (state: IPostState) => {
      state.status = null;
    },
  },
  extraReducers: {
    // Create post
    [createPost.pending.type]: (state: IPostState) => {
      state.isLoading = true;
      state.status = null;
      state.error = null;
    },
    [createPost.fulfilled.type]: (
      state: IPostState,
      action: PayloadAction<any>
    ) => {
      state.isLoading = false;
      if (action.payload.newPostWithImage) {
        state.posts.push(action.payload.newPostWithImage as IPost);
      } else {
        state.posts.push(action.payload.newPostWithoutImage as IPost);
      }
      state.status = action.payload.message;
    },
    [createPost.rejected.type]: (state: IPostState, action: any) => {
      state.isLoading = false;
      state.error = action.error;
      state.status = action.error.message;
    },
    // Getting all posts
    [getAllPosts.pending.type]: (state: IPostState) => {
      state.isLoading = true;
      state.status = null;
      state.error = null;
    },
    [getAllPosts.fulfilled.type]: (
      state: IPostState,
      action: PayloadAction<{ posts: IPost[]; popularPosts: IPost[] }>
    ) => {
      state.isLoading = false;
      state.posts = action.payload.posts;
      state.popularPosts = action.payload.popularPosts;
    },
    [getAllPosts.rejected.type]: (state: IPostState, action: any) => {
      state.isLoading = false;
      state.error = action.error;
      state.status = action.error.message;
    },
    // Get post by id
    [getPostById.pending.type]: (state: IPostState) => {
      state.isLoading = true;
      state.error = null;
      state.status = null;
    },
    [getPostById.fulfilled.type]: (
      state: IPostState,
      action: PayloadAction<IPost>
    ) => {
      state.post = action.payload;
      state.isLoading = false;
    },
    [getPostById.rejected.type]: (state: IPostState, action: any) => {
      state.error = action.error;
      state.status = action.error.message;
      state.isLoading = false;
    },
    // Like handler
    [fetchLike.pending.type]: (state: IPostState) => {
      state.isLoading = true;
      state.error = null;
      state.status = null;
    },
    [fetchLike.fulfilled.type]: (
      state: IPostState,
      action: PayloadAction<{ _post: IPost; message: string }>
    ) => {
      state.post = action.payload._post;
      state.isLoading = false;
      state.status = action.payload.message;
    },
    [fetchLike.rejected.type]: (state: IPostState, action: any) => {
      state.error = action.error;
      state.status = action.error.message;
      state.isLoading = false;
    },
    // Dislike handler
    [fetchDislike.pending.type]: (state: IPostState) => {
      state.isLoading = true;
      state.error = null;
      state.status = null;
    },
    [fetchDislike.fulfilled.type]: (
      state: IPostState,
      action: PayloadAction<{ _post: IPost; message: string }>
    ) => {
      state.post = action.payload._post;
      state.isLoading = false;
      state.status = action.payload.message;
    },
    [fetchDislike.rejected.type]: (state: IPostState, action: any) => {
      state.error = action.error;
      state.status = action.error.message;
      state.isLoading = false;
    },
  },
});

export const postReducer = postSlice.reducer;
export const postStatusSelector = (state: TRootState) => state.post.status;
export const popularPostsSelector = (state: TRootState) =>
  state.post.popularPosts;
export const postLoadingSelector = (state: TRootState) => state.post.isLoading;
export const postErrorSelector = (state: TRootState) => state.post.error;
export const postsSelector = (state: TRootState) => state.post.posts;
export const postSelector = (state: TRootState) => state.post.post;
export const { resetPostStatus } = postSlice.actions;
