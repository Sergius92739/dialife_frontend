import {Link, NavLink, Outlet} from "react-router-dom";
import {Paths} from "../paths";
import {useAppSelector} from "../hooks/hooks";
import {checkAuth} from "../slices/authSlice/authSlice";

export const AccountPage = (): JSX.Element => {
    const isAuth = useAppSelector(checkAuth);

    return (
        isAuth ? (
            <div className={'flex gap-5'}>
                <aside className={'w-1/5 rounded'}>
                    <ul className={'bg-white'}>
                        <NavLink className={'account_link relative'} to={Paths.PROFILE}>
                            <li className={'py-2 px-4 '}>
                                Профиль
                            </li>
                        </NavLink>
                        <NavLink className={'account_link relative'} to={Paths.MY_POSTS}>
                            <li className={'py-2 px-4 '}>
                                Мои посты
                            </li>
                        </NavLink>
                        <NavLink className={'account_link relative'} to={Paths.MY_COMMENTS}>
                            <li className={'py-2 px-4 '}>
                                Мои комментарии
                            </li>
                        </NavLink>
                        <NavLink className={'account_link relative'} to={Paths.NEW_POST}>
                            <li className={'py-1 px-4'}>
                                Добавить пост
                            </li>
                        </NavLink>
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