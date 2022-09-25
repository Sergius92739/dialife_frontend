import {instAxios} from "./axios";
import {toast} from "react-toastify";

export type TCreateCommentProps = {
    postId: string;
    comment: string;
    userId: string;
    type: string;
    commentId?: string;
}

export const createComment = async ({postId, comment, userId, type, commentId = ''}: TCreateCommentProps) => {
    try {
        const response = await instAxios.post(`/comments/create/${postId}`, {postId, comment, userId, type, commentId});
        if (response.status !== 200) {
            throw new Error(response.statusText);
        }
        return response.data as { message: string }
    } catch (error: any) {
        console.error(error);
        toast.error(error.message, {theme: "colored"})
    }
}