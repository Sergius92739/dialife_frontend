import React from "react";
import { Link } from "react-router-dom";
import { IPost } from "../../slices/postSlice/interfaces";
import { Paths } from "../../paths";
import Moment from "react-moment";
import 'moment/locale/ru';

export const PopularPostItem = ({ post }: { post: IPost }): JSX.Element => {
  return (
    <article className="mt-5 first:mt-0">
      <div className="opacity-70 text-sm">
        <Moment date={post.createdAt} format="D MMM YYYY" />
      </div>
      <h3 className="text-sm uppercase font-bold hover:text-[#58A9A5]">
        <Link to={`${Paths.POSTS}/${post._id}`}>{post.title}</Link>
      </h3>
    </article>
  );
};
