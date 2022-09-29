import {Link, NavLink, Outlet} from "react-router-dom";
import {Paths} from "../paths";
import {useAppSelector} from "../hooks/hooks";
import {checkAuth} from "../slices/authSlice/authSlice";
import {NavLinkAccount} from "../components/Main/NavLinkAccount";

export const AccountPage = (): JSX.Element => {
    const isAuth = useAppSelector(checkAuth);

    return (
        isAuth ? (
            <div className={'flex gap-5'}>
                <aside className={'w-1/5 rounded'}>
                    <ul className={'bg-white'}>
                        <NavLinkAccount link={Paths.PROFILE} text={'Профиль'}/>
                        <NavLinkAccount link={Paths.MY_POSTS} text={'Мои посты'}/>
                        <NavLinkAccount link={Paths.MY_COMMENTS} text={'Мои комментарии'}/>
                        <NavLinkAccount link={Paths.NEW_POST} text={'Добавить пост'}/>
                    </ul>
                </aside>
                <div className={'w-4/5'}>
                    <Outlet/>
                </div>
            </div>
        ) : (
            <div className={'text-center text-blue-500'}>
                <Link to={Paths.LOGIN}>Войдите или зарегестрируйтесь.</Link>
            </div>
        )
    );
};