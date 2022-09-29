import {toast} from "react-toastify";
import {instAxios} from "./axios";
import {IComment} from "../slices/postSlice/interfaces";

export const fetchUserComments = async () => {
    try {
        const response = await instAxios.get("/comments/user");
        if (response.status !== 200) {
            throw new Error(response.statusText)
        }
        if (response.data.message) {
            throw new Error(response.data.message);
        }
        return response.data as { comments: IComment[] }
    } catch (error: any) {
        console.error(error);
        toast.error(error.message, {theme: "colored"});
    }
}