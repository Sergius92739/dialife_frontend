import {instAxios} from "./axios";
import {IPost} from "../slices/postSlice/interfaces";

export const fetchPostAndUpdateViews = async (id: string) => {
    const response = await instAxios.get(`/posts/${id}/updateViews`);
    if (response.status !== 200) {
        throw new Error(response.statusText);
    }
    return response.data as IPost;
};