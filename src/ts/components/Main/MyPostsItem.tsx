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
                        className={'flex gap-5 items-center p-3 bg-white cursor-pointer hover:bg-[bisque]'}
                        onClick={() => setHidden(false)}
                    >
                        <div className={'w-[40%] line-clamp-1'}>{post.title}</div>
                        <div className={'w-[20%]'}>{<Moment format={'DD.MM.YYYY'}>{post.createdAt}</Moment>}</div>
                        <div className={'w-1/3 flex-1 flex justify-between'}>
                            <div><IconBtn iconOutline={<AiOutlineEye/>} count={post.views} text={'Просмотры'}/></div>
                            <div><IconBtn iconOutline={<AiOutlineLike/>} count={post.likes.length} text={'Нравится'}/>
                            </div>
                            <div><IconBtn iconOutline={<AiOutlineDislike/>} count={post.dislikes.length}
                                          text={'Не нравится'}/>
                            </div>
                            <div><IconBtn iconOutline={<AiOutlineComment/>} count={post.comments.length}
                                          text={'Комментарии'}/>
                            </div>
                        </div>
                    </div>
                ) : <button className={'m-3 text-blue-500 text-lg inline-block border-b-2 border-b-blue-500'} onClick={() => setHidden(true)}>свернуть</button>
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
