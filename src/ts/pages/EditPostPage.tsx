import React, {
  ChangeEvent,
  createRef,
  MutableRefObject,
  useEffect,
  useState,
} from "react";
import ReactQuill from "react-quill";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Paths } from "../paths";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import {
  postErrorSelector,
  postStatusSelector,
} from "../slices/postSlice/postSlice";
import { checkAuth } from "../slices/authSlice/authSlice";
import {
  createPost,
  getAllPosts,
  updatePost,
} from "../slices/postSlice/asyncFunc";
import { toast } from "react-toastify";
import { instAxios } from "../utils/axios";
import { IPost } from "../slices/postSlice/interfaces";
import { data } from "autoprefixer";
import { string } from "prop-types";
import { Button } from "../components/Main/Button";
import Popup from "../components/Main/Popup";

export const EditPostPage = (): JSX.Element => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [oldImage, setOldImage] = useState("");
  const [image, setImage] = useState(new Blob([""]));
  const postError = useAppSelector(postErrorSelector);
  const postStatus = useAppSelector(postStatusSelector);
  const isAuth = useAppSelector(checkAuth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const inputFileEl = createRef() as MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    fetchPost(id as string)
      .then((data) => {
        setOldImage(data.imgUrl);
        setTitle(data.title);
        setText(data.text);
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.message, { theme: "colored" });
      });
  }, [id]);

  const fetchPost = async (id: string) => {
    const response = await instAxios.get(`/posts/${id}`);
    if (response.status !== 200) {
      throw new Error(response.statusText);
    }
    return response.data as IPost;
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      setImage(e.target.files[0]);
      setOldImage("");
    }
  };

  const handleSubmit = () => {
    try {
      if (!title || !text) {
        throw new Error("?????????????????? ?????? ???????? ??????????.");
      }
      const data = new FormData();
      data.append("title", title);
      data.append("text", text);
      data.append("image", image as Blob);
      if (id) {
        dispatch(updatePost({ data, id }));
      }
      resetForm();
      navigate(Paths.POSTS);
    } catch (error: any) {
      console.error(error);
      toast.error(error.message, { theme: "colored" });
    }
  };

  const resetForm = () => {
    setImage(new Blob([""]));
    setOldImage("");
    setText("");
    setTitle("");
    inputFileEl.current.value = "";
  };

  const deleteImageBtnHandler = () => {
    setImage(new Blob([""]));
    setOldImage("");
    inputFileEl.current.value = "";
  };

  return (
    <>
      {isAuth ? (
        <form
          className="mx-auto text-[#404242] py-5"
          onSubmit={(e) => e.preventDefault()}
        >
          <h1 className="text-2xl text-center font-black">
            ???????????????????????????? ??????????
          </h1>
          {oldImage || image.size ? (
            <div className="flex mt-3 justify-between">
              <label
                className="block py-2.5 px-12 bg-[#58A9A5] text-white rounded-lg lowercase cursor-pointer"
                htmlFor="image"
              >
                ?????????????? ???????????? ??????????????????????
                <input
                  ref={inputFileEl}
                  id="image"
                  type="file"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
              <Button
                text={"?????????????? ??????????????????????"}
                type={"button"}
                onClick={deleteImageBtnHandler}
              />
            </div>
          ) : (
            <div className="flex mt-3 justify-between">
              <label
                className="block py-2.5 px-12 bg-[#58A9A5] text-white rounded-lg lowercase cursor-pointer"
                htmlFor="image"
              >
                ???????????????? ??????????????????????
                <input
                  ref={inputFileEl}
                  id="image"
                  type="file"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>
          )}

          {oldImage ? (
            <div className="flex py-2">
              <img
                src={`${process.env.REACT_APP_SERVER_URL}/${oldImage}`}
                alt={oldImage}
              />
            </div>
          ) : null}
          {image && image.size ? (
            <div className="flex py-2">
              <img src={URL.createObjectURL(image)} alt={image.type} />
            </div>
          ) : null}
          <div className="mt-3">
            <label className="font-bold" htmlFor="title">
              ?????????????????? ??????????:
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="?????????????? ??????????????????"
              className="w-full px-[15px] py-2 border-2 rounded-lg border-[#58A9A5] outline-none placeholder:text-gray-500 mt-1 placeholder:italic placeholder:text-[13px]"
              required
            />
          </div>
          <div className="mt-3">
            <label className="font-bold" htmlFor="text">
              ?????????? ??????????:
            </label>
            <div className="border-2 border-[#58A9A5] rounded-lg bg-white h-[250px]">
              <ReactQuill
                theme="snow"
                value={text}
                onChange={setText}
                placeholder="?????????????? ??????????"
              />
            </div>
          </div>
          <div className="mt-3 flex justify-between">
            <Button
              text={"??????????????????"}
              type={"submit"}
              onClick={() => setPopupVisible(true)}
            />
            <Button
              text={"?? ???????? ????????????"}
              type={"button"}
              onClick={() => navigate(Paths.MY_POSTS)}
            />
          </div>
        </form>
      ) : null}
      <Popup
        text={"?????????????????? ?????????????????? ?? ???????????????????????? ?????????"}
        state={popupVisible}
        btnCancelHandler={() => setPopupVisible(false)}
        btnActionHandler={handleSubmit}
        btnActionText={"????????????????????????"}
      />
    </>
  );
};
