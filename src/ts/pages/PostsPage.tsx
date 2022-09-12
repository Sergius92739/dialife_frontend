import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { PostItem } from '../components/PostItem'
import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import { getAllPosts } from '../slices/postSlice/asyncFunc'
import { IPost } from '../slices/postSlice/interfaces'
import { popularPostsSelector, postsSelector } from '../slices/postSlice/postSlice'
import { Paths } from '../paths'
import { PopularPostItem } from '../components/PopularPostItem'

export const PostsPage = (): JSX.Element => {
  const posts = useAppSelector(postsSelector)
  const popularPosts = useAppSelector(popularPostsSelector);
  const dispatch = useAppDispatch();
  const refPostsContainer = React.createRef() as React.MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch])

  return (
    <div className='flex justify-between gap-10'>
      <div ref={refPostsContainer} className="flex flex-col gap-4 basis-3/4">
        {
          posts.length
            ? posts.map((el: IPost) => <PostItem key={el._id} post={el} />)
            : <div className="text-lg text-center p-4">
              Здесь пока ничего нет.
              <Link className='text-lg text-indigo-600' to={Paths.NEW_POST}> Добавьте пост</Link>
            </div>
        }
      </div>
      <aside className="basis-1/4 ">
        {
          popularPosts.length
            ?
            <>
              <div className="bg-white p-4">
                <h2 className='main_title text-xl text-center uppercase font-bold'>Популярные посты</h2>
                <div className="mt-5">
                  {
                    popularPosts.map((el) => <PopularPostItem key={el._id} />)
                  }
                </div>
              </div>
            </>
            : null
        }
      </aside>
    </div>
  )
}
