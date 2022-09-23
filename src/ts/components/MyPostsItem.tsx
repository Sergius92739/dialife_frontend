import React, { MouseEventHandler } from "react";
import { nanoid } from "nanoid";
import { Button } from "./Button";
import { Post } from "./Post";
import { IPost } from "../slices/postSlice/interfaces";

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
  return (
    <div key={nanoid()} className={"postWrapper mt-5 relative"}>
      <Post key={nanoid()} data={post} />
      <div className={"flex gap-5 items-center p-4 bg-white"}>
        <Button
          text={"Редактировать"}
          type={"button"}
          onClick={editBtnHandler}
        />
        <Button
          successColor={false}
          text={"Удалить пост"}
          type={"button"}
          onClick={removeBtnHandler}
        />
      </div>

    </div>
  );
};

export default MyPostsItem;
