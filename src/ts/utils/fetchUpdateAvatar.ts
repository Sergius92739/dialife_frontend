import {instAxios} from "./axios";
import {IUser} from "../slices/authSlice/interfaces";

export const fetchUpdateAvatar = async (data: FormData) => {
    const response = await instAxios.put('/auth/update', data);
    if (response.status !== 200) {
        throw new Error(response.statusText);
    }
    return response.data as { message: string, user: IUser }
}