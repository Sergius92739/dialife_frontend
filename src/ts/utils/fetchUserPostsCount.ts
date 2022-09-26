import {instAxios} from "./axios";

export const fetchUserPostsCount = async () => {
    const response = await instAxios.get('posts/user/count');
    if (response.status !== 200) {
        throw new Error(response.statusText);
    }
    return response.data as { postsCount: number }
}