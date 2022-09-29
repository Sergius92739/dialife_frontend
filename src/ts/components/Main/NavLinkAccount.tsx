import {NavLink} from "react-router-dom";
import React from "react";

export const NavLinkAccount: React.FC<{ link: string, text: string }> = props => {
    return (
        <NavLink className={'account_link relative '} to={props.link}>
            <li className={'py-2 px-4 hover:bg-bisque-light'}>
                {props.text}
            </li>
        </NavLink>
    );
};
