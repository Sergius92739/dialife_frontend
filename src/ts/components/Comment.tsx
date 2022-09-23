import React from "react";
import no_avatar from "../../img/no_avatar.jpg";
import Moment from "react-moment";
import {IComment} from "../slices/postSlice/interfaces"


export const Comment: React.FC<{ item: IComment }> = props => {
    const {item} = props;

    return (
        <div className={'flex flex-col p-2'}>
            <div className="flex items-center gap-5">
                <div
                    className="w-12 h-12 rounded-full"
                    style={{
                        backgroundImage: item.author.avatar
                            ? `url(${process.env.REACT_APP_SERVER_URL}/${item.author.avatar})`
                            : `url(${no_avatar})`,
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                    }}
                ></div>
                <div className="text-lg font-medium">{item.author.username}</div>
                <div className=" opacity-70">
                    <Moment fromNow>{item.createdAt}</Moment>
                </div>
            </div>
            <div className={'ml-[68px]'}>
                {item.comment}

            </div>
            <div>

            </div>
        </div>
    );
};