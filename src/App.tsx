import React, { useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import { Layout } from "./ts/components/Layout";
import { useAppDispatch } from "./ts/hooks/hooks";
import { AddPostPage } from "./ts/pages/AddPostPage";
import { AdminPage } from "./ts/pages/AdminPage";
import { ArticlesPage } from "./ts/pages/ArticlesPage";
import { EditPostPage } from "./ts/pages/EditPostPage";
import { Error404Page } from "./ts/pages/Error404Page";
import { LoginPage } from "./ts/pages/LoginPage";
import { MyPostsPage } from "./ts/pages/MyPostsPage";
import { NewsPage } from "./ts/pages/NewsPage";
import { PostPage } from "./ts/pages/PostPage";
import { PostsPage } from "./ts/pages/PostsPage";
import { RegisterPage } from "./ts/pages/RegisterPage";
import { Paths } from './ts/paths';
import { getMe } from './ts/slices/authSlice/asyncFunc';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch])

  return (
    <>
      <Routes>
        <Route path={Paths.HOME} element={<Layout />}>
          <Route index element={<NewsPage />} />
          <Route path={Paths.LOGIN} element={<LoginPage />} />
          <Route path={Paths.REGISTER} element={<RegisterPage />} />
          <Route path={Paths.ADMIN} element={<AdminPage />} />
          <Route path={Paths.POSTS} element={<PostsPage />} />
          <Route path={Paths.POST} element={<PostPage />} />
          <Route path={Paths.NEW_POST} element={<AddPostPage />} />
          <Route path={Paths.EDIT_POST} element={<EditPostPage />} />
          <Route path={Paths.MY_POSTS} element={<MyPostsPage />} />
          <Route path={Paths.ARTICLES} element={<ArticlesPage />} />
          <Route path="*" element={<Error404Page />} />
        </Route>
      </Routes>
    </>

  );
}

export default App;
