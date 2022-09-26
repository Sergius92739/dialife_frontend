import {instAxios} from "./axios";
import {toast} from "react-toastify";

export const fetchUserCountComments = async (userId: string) => {
    try {
        const response = await instAxios.get(`/comments/${userId}`);
        if (response.status !== 200) {
            throw new Error(response.statusText)
        }
        return response.data as { count: number };
    } catch (error: any) {
        console.error(error);
        toast.error(error.message, {theme: "colored"})
    }
}