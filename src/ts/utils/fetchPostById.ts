import {toast} from "react-toastify";
import {instAxios} from "./axios";
import {IPost} from "../slices/postSlice/interfaces";

export const fetchPostById = async (id: string) => {
    try {
        const response = await instAxios.get(`posts/${id}`);
        if (response.status !== 200) {
            throw new Error(response.statusText)
        }
        return response.data as IPost
    } catch (error: any) {
        console.error(error);
        toast.error(error.message, {theme: "colored"})
    }
}