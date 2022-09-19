import {instAxios} from "./axios";
import {IPost} from "../slices/postSlice/interfaces";

export const fetchLike = async (postId: string, userId: string, param: string) => {
    const response = await instAxios.get(
        `/posts/${postId}/${userId}/${param}`
    );
    if (response.status !== 200) {
        throw new Error(response.statusText);
    }
    return response.data as { _post: IPost; message: string };
};

