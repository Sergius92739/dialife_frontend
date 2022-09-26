import {instAxios} from "./axios";
import {IComment} from "../slices/postSlice/interfaces";
import {toast} from "react-toastify";

export const fetchPostComments = async (id: string) => {
    try {
        const response = await instAxios.get(`/posts/${id}/comments`);
        if (response.status !== 200) {
            throw new Error(response.statusText)
        }
        return response.data as IComment[];
    } catch (error: any) {
        console.error(error);
        toast.error(error.message, {theme: "colored"})
    }
}