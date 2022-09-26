import {instAxios} from "./axios";
import {toast} from "react-toastify";
import {IComment} from "../slices/postSlice/interfaces";

export const fetchUserCountComments = async () => {
    try {
        const response = await instAxios.get('/comments/user/count');
        if (response.status !== 200) {
            throw new Error(response.statusText)
        }
        return response.data as { commentsCount: number };
    } catch (error: any) {
        console.error(error);
        toast.error(error.message, {theme: "colored"})
    }
}