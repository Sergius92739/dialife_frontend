import React, {MouseEventHandler, useState} from "react";
import {nanoid} from "nanoid";
import {Button} from "./Button";
import {Post} from "./Post";
import {IPost} from "../../slices/postSlice/interfaces";
import {Comments} from "./Comments";
import Moment from "react-moment";
import {IconBtn} from "./IconBtn";
import {AiOutlineComment, AiOutlineDislike, AiOutlineEye, AiOutlineLike} from "react-icons/ai";

export type TMyPostsItemProps = {
    editBtnHandler: MouseEventHandler<HTMLButtonElement>;
    removeBtnHandler: MouseEventHandler<HTMLButtonElement>;
    post: IPost;
};

const MyPostsItem = ({
                         editBtnHandler,
                         removeBtnHandler,
                         post,
                     }: TMyPostsItemProps) => {
    const [hidden, setHidden] = useState(true);

    return (
        <div key={nanoid()} className={"postWrapper relative"}>
            {
                hidden ? (
                    <div
                        className={'flex gap-5 whitespace-nowrap justify-between items-center py-1 px-6 bg-white rounded cursor-pointer hover:bg-bisque-light'}
                        onClick={() => setHidden(false)}
                        title={'Кликни чтобы открыть пост'}
                    >
                        <div className={'line-clamp-1'}>{post.title}</div>
                        <div className={'flex gap-5'}>
                            {
                                (post.createdAt !== post.updatedAt) && (
                                    <div>
                                        <span className={'mr-3 text-gray-400'}>изменен:</span>
                                        <Moment className={''} format={'DD.MM.YYYY HH:mm'}>{post.updatedAt}</Moment>
                                    </div>
                                )
                            }
                            <div>
                                <span className={'mr-3 text-gray-400'}>опубликован:</span>
                                <Moment className={''} format={'DD.MM.YYYY HH:mm'}>{post.createdAt}</Moment>
                            </div>
                        </div>
                    </div>
                ) : <button
                    className={'m-3 text-blue-500 inline-block border-b-2 border-b-blue-500'}
                    onClick={() => setHidden(true)}>свернуть</button>
            }
            <div className={`${hidden ? 'hidden' : ''}`}>
                <div className={"flex gap-5 items-center p-4 bg-white"}>
                    <Button
                        text={"Редактировать"}
                        type={"button"}
                        onClick={editBtnHandler}
                    />
                    <Button
                        text={"Удалить пост"}
                        type={"button"}
                        onClick={removeBtnHandler}
                        successColor={false}
                    />
                </div>
                <Post key={nanoid()} data={post}/>
                <Comments id={post._id}/>
            </div>
        </div>
    );
};

export default MyPostsItem;
