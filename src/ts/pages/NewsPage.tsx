import React, { useEffect } from 'react'
import { ToastContainer } from 'react-toastify';
import { useAppSelector } from '../hooks/hooks';
import { statusSelector } from '../slices/authSlice/authSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Banner } from '../components/Banner';

export const NewsPage = (): JSX.Element => {
  const status = useAppSelector(statusSelector);

  /* useEffect(() => {
    if (status === ('Вы вошли в систему.' || 'Регистрация прошла успешно')) {
      toast.success(status, { theme: 'colored' })
    }
  }, [status]) */

  return (
    <>
      <Banner />
      <section>
        <h2>Новости из мира диабета</h2>
        <div className="news">

        </div>
      </section>
    </>
  )
}
