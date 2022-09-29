import {useEffect, useState} from "react";
import {IComment} from "../slices/postSlice/interfaces";
import {fetchUserComments} from "../utils/fetchUserComments";
import {CommentsItem} from "../components/Main/CommentsItem";
import {nanoid} from "nanoid";
import {useAppSelector} from "../hooks/hooks";
import {checkAuth} from "../slices/authSlice/authSlice";
import {Link} from "react-router-dom";
import {Paths} from "../paths";
import {toast} from "react-toastify";
import {Loading} from "../components/Main/Loading";

export const MyCommentsPage = (): JSX.Element => {
    const [comments, setComments] = useState<IComment[] | undefined>(undefined);
    const isAuth = useAppSelector(checkAuth);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        try {
            setLoading(true);
            fetchUserComments()
                .then((data) => {
                    setComments(data?.comments);
                    setLoading(false);
                })
        } catch (error: any) {
            console.error(error);
            toast.error(error.message, {theme: "colored"})
        }

    }, []);


    return (
        isAuth ? (
            <>
                {loading && <Loading/>}
                <div className={'flex flex-col gap-3'}>
                    {
                        !comments?.length && (
                            <div className={'text-center text-lg'}>
                                У вас нет комментариев.
                            </div>
                        )
                    }
                    {
                        (comments && comments.length) ? (
                            comments.map((comment) => {
                                    return <CommentsItem key={nanoid()} comment={comment}/>;
                                }
                            )) : null
                    }
                </div>
            </>
        ) : (
            <div className={'text-center text-lg'}>
                <Link to={Paths.LOGIN}>Войдите или зарегестрируйтесь</Link>
            </div>
        )
    );
};