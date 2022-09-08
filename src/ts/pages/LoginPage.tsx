import React, { useEffect, useState, FormEvent, ChangeEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Loading } from '../components/Loading';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { Paths } from '../paths';
import { loginUser } from '../slices/authSlice/asyncFunc';
import { checkAuth, isLoadingSelector } from '../slices/authSlice/authSlice';

export const LoginPage = (): JSX.Element => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(checkAuth);
  const isLoading = useAppSelector(isLoadingSelector);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      navigate(Paths.HOME)
    }
  }, [isAuth, navigate])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      dispatch(loginUser({ username, password }));
    } catch (error: any) {
      console.error(error);
    }
  }

  const handleUserName = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  }

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }

  return (
    <>
      {
        isLoading && <Loading />
      }
      <form
        className='w-1/3 mx-auto text-[#404242] mt-20'
        onSubmit={handleSubmit}
      >
        <h1 className='text-2xl text-center font-black'>Авторизация</h1>
        <div className='mt-7'>
          <label className='font-bold' htmlFor="username">Логин:</label>
          <input
            id='username'
            value={username}
            onChange={handleUserName}
            type="text"
            placeholder='Введите логин'
            className='w-full border-b-4 border-[#58A9A5] outline-none placeholder:text-gray-400 mt-2'
            required
          />
        </div>
        <div className='mt-7'>
          <label className='font-bold' htmlFor="password">Пароль:</label>
          <input
            id='password'
            value={password}
            onChange={handlePassword}
            type="password"
            placeholder='Введите пароль'
            className='w-full border-b-4 border-[#58A9A5] outline-none placeholder:text-gray-400 mt-2'
            required
          />
        </div>
        <div className="flex gap-8 justify-center items-center mt-8">
          <button
            type='submit'
            className='px-12 py-2.5 bg-[#58A9A5] text-white rounded-lg text-xl'
          >
            Войти
          </button>
          <Link to={Paths.REGISTER} className='text-base text-[#58A9A5] border-b-2 border-[#58A9A5]'>Нет аккаунта ?</Link>
        </div>
      </form>
    </>
  )
}

