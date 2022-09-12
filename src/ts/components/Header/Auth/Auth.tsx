import React from 'react'
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { Paths } from '../../../paths'
import { checkAuth, logout, userSelector } from '../../../slices/authSlice/authSlice';
import { Button } from '../../Button';
import { toast } from 'react-toastify';
import no_avatar from '../../../../img/no_avatar.jpg';

export const Auth = (): JSX.Element => {
  const isAuth = useAppSelector(checkAuth);
  const dispatch = useAppDispatch();
  const user = useAppSelector(userSelector);

  const handleLogout = () => {
    dispatch(logout());
    window.localStorage.removeItem('token');
    toast.info('Вы вышли из системы.', { theme: 'colored' })
  }

  return (
    <>
      {
        isAuth
          ? <div className='flex gap-4 relative'>
            <div
              className="w-[50px] h-[50px] border rounded-full absolute -left-16"
              style={{
                backgroundImage: user?.avatar ? `url(http://localhost:3002/${user?.avatar})` : `url(${no_avatar})` ,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
              }}
            ></div>
            <Button onClick={handleLogout} text='Выйти' type={undefined} />
          </div>
          : <Link className='px-12 py-2.5 bg-[#58A9A5] text-white rounded-lg text-xl' to={Paths.LOGIN}>Войти</Link>
      }
    </>
  )
}
