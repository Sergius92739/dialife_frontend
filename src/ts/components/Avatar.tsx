import no_avatar from "../../img/no_avatar.jpg";
import React, {createRef, MutableRefObject} from "react";
import {Link} from "react-router-dom";
import {Paths} from "../paths";

export type TProps = {
    fileName: string;
    tooltipText?: string;
    link: boolean;
    className?: string;
    rounded?: boolean
}

export const Avatar = ({fileName, tooltipText = '', link = false, className = '', rounded = true}: TProps): JSX.Element => {
    const ref = createRef() as MutableRefObject<HTMLDivElement>;

    const avatar = (): JSX.Element => {
        return (
            <div
                onMouseOver={() => ref.current?.classList.remove("hidden")}
                onMouseOut={() => ref.current?.classList.add("hidden")}
                className={`w-12 h-12 ${rounded ? 'rounded-full' : ''} ${className}`}
                style={{
                    backgroundImage: fileName
                        ? `url(${process.env.REACT_APP_SERVER_URL}/${fileName})`
                        : `url(${no_avatar})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                }}
            ></div>
        )
    }

    return (
        <div className={'relative'}>
            {link ? (
                <Link to={Paths.ACCOUNT}>
                    {avatar()}
                </Link>
            ) : (
                avatar()
            )}
            {tooltipText ? (
                <div
                    ref={ref}
                    className="px-4 py-2 w-36 text-center bg-black text-white text-sm absolute z-10 -bottom-10 -left-11 rounded hidden"
                >
                    {tooltipText}
                </div>
            ) : null}
        </div>
    );
};