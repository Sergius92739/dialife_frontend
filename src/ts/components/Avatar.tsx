import no_avatar from "../../img/no_avatar.jpg";
import React from "react";

export type TProps = {
    fileName: string
}

export const Avatar = ({fileName}: TProps): JSX.Element => {
    return (
        <div
            className="w-12 h-12 rounded-full"
            style={{
                backgroundImage: fileName
                    ? `url(${process.env.REACT_APP_SERVER_URL}/${fileName})`
                    : `url(${no_avatar})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
            }}
        ></div>
    );
};