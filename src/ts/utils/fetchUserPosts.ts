import {instAxios} from "./axios";
import {IPost} from "../slices/postSlice/interfaces";
import {toast} from "react-toastify";

export const fetchUserPosts = async () => {
    try {
        const response = await instAxios.get("/posts/user");
        if (response.status !== 200) {
            throw new Error(response.statusText);
        }
        return response.data as IPost[];
    } catch (error: any) {
        console.error(error);
        toast.error(error.message, {theme: "colored"});
    }
};