import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TRootState } from "../../store";
import { createPost, getAllPosts, removePost, updatePost } from "./asyncFunc";
import { IPost, IPostState } from "./interfaces";

const initialState: IPostState = {
  posts: [],
  popularPosts: [],
  isLoading: false,
  status: null,
  error: null,
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    resetPostStatus: (state: IPostState) => {
      state.status = null;
    },
    updatePosts: (state: IPostState) => {},
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
    // Remove post
    [removePost.pending.type]: (state: IPostState) => {
      state.isLoading = true;
      state.error = null;
      state.status = null;
    },
    [removePost.fulfilled.type]: (
      state: IPostState,
      action: PayloadAction<{ postId: string; message: string }>
    ) => {
      state.isLoading = false;
      state.status = action.payload.message;
      state.posts = state.posts.filter(
        (post) => post._id !== action.payload.postId
      );
    },
    [removePost.rejected.type]: (state: IPostState, action: any) => {
      state.error = action.error;
      state.isLoading = false;
      state.status = action.error.message;
    },
    // Edit post
    [updatePost.pending.type]: (state: IPostState) => {
      state.isLoading = true;
      state.error = null;
      state.status = null;
    },
    [updatePost.fulfilled.type]: (
      state: IPostState,
      action: PayloadAction<{ post: IPost; message: string }>
    ) => {
      state.isLoading = false;
      const idx = state.posts.findIndex(
        (post) => post._id === action.payload.post._id
      );
      state.posts[idx] = action.payload.post;
      state.status = action.payload.message;
    },
    [updatePost.rejected.type]: (state: IPostState, action: any) => {
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
export const { resetPostStatus } = postSlice.actions;
