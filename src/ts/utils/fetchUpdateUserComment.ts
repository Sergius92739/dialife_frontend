import {toast} from "react-toastify";
import {instAxios} from "./axios";
import {IComment} from "../slices/postSlice/interfaces";

export const fetchUpdateUserComment = async (data: { text: string, commentId: string }) => {
    try {
        const response = await instAxios.put('/comments/update', data);
        if (response.status !== 200) {
            throw new Error(response.statusText);
        }
        console.log(response.data);
        return response.data as { message: string, comment: IComment };
    } catch (error: any) {
        console.error(error);
        toast.error(error.message, {theme: "colored"})
    }
}