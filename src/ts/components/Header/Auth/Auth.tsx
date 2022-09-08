import React from 'react'
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { Paths } from '../../../paths'
import { checkAuth, logout } from '../../../slices/authSlice/authSlice';
import { Button } from '../../Button';
import { toast } from 'react-toastify';

export const Auth = (): JSX.Element => {
  const isAuth = useAppSelector(checkAuth);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    window.localStorage.removeItem('token');
    toast.info('Вы вышли из системы.', {theme: 'colored'})
  }

  return (
    <>
      {
        isAuth
          ? <Button onClick={handleLogout} text='Выйти' type={undefined} />
          : <Link className='px-12 py-2.5 bg-[#58A9A5] text-white rounded-lg text-xl' to={Paths.LOGIN}>Войти</Link>
      }
    </>
  )
}
