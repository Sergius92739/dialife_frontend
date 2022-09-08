import { IUser } from "../authSlice/interfaces";

export interface IPostState {
  posts: IPost[],
  popularPosts: [],
  isLoading: boolean,
  error: Error | null,
  status: string | null,
}

export interface IPost {
  _id: string,
  username: string,
  title: string,
  text: string,
  imgUrl: string,
  views: number,
  author: IUser,
  comments: [],
  createdAt: string,
  updatedAt: string,
  __v: number
}