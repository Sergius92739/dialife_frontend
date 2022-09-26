import React, {
    useState,
    ChangeEvent,
    useEffect,
    createRef,
    MutableRefObject,
} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../hooks/hooks";
import {Paths} from "../paths";
import {checkAuth, userSelector} from "../slices/authSlice/authSlice";
import {createPost, getAllPosts} from "../slices/postSlice/asyncFunc";
import {
    postErrorSelector,
    postStatusSelector,
} from "../slices/postSlice/postSlice";
import {toast} from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {Button} from "../components/Main/Button";
import Popup from "../components/Main/Popup";

export const AddPostPage = (): JSX.Element => {
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [image, setImage] = useState(new Blob([""]));
    const [showPopup, setShowPopup] = useState(false);
    const postError = useAppSelector(postErrorSelector);
    const postStatus = useAppSelector(postStatusSelector);
    const isAuth = useAppSelector(checkAuth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const inputFileEl = createRef() as MutableRefObject<HTMLInputElement>;
    const user = useAppSelector(userSelector);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            setImage(e.target.files[0]);
        }
    };

    const handleSubmit = () => {
        try {
            if (!title || !text) {
                throw new Error("Заполните все поля формы.");
            }
            const data = new FormData();
            data.append("title", title);
            data.append("text", text);
            data.append("image", image as Blob);
            resetForm();
            dispatch(createPost(data))
                .then(() => navigate(Paths.ACCOUNT))
        } catch (error: any) {
            toast.error(error.message, {theme: "colored"});
        }
    };

    const resetForm = () => {
        setImage(new Blob([""]));
        setText("");
        setTitle("");
        inputFileEl.current.value = "";
    };

    return (
        <>
            {isAuth ? (
                <>
                    <form
                        className="text-[#404242]"
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <h1 className="text-2xl text-center font-black">Добавление поста</h1>
                        <div className="mt-3 text-center">
                            <label
                                className="font-bold block py-2 bg-[#58A9A5] text-white rounded-lg text-xl cursor-pointer"
                                htmlFor="image"
                            >
                                {image.size ? "Поменять изображение" : "Прикрепить изображение"}
                                <input
                                    ref={inputFileEl}
                                    id="image"
                                    type="file"
                                    className="hidden"
                                    onChange={handleImageChange}
                                />
                            </label>
                        </div>
                        {image.size ? (
                            <div className="flex py-2">
                                <img src={URL.createObjectURL(image)} alt={image.type}/>
                            </div>
                        ) : null}
                        <div className="mt-3">
                            <label className="font-bold" htmlFor="title">
                                Заголовок поста:
                            </label>
                            <input
                                id="title"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Введите заголовок"
                                className="w-full px-[15px] py-2 border-2 rounded-lg border-[#58A9A5] outline-none placeholder:text-gray-500 mt-1 placeholder:italic placeholder:text-[13px]"
                                required
                            />
                        </div>
                        <div className="mt-3">
                            <label className="font-bold" htmlFor="text">
                                Текст поста:
                            </label>
                            <div className="border-2 border-[#58A9A5] rounded-lg bg-white h-[250px]">
                                <ReactQuill
                                    theme="snow"
                                    value={text}
                                    onChange={setText}
                                    placeholder="Введите текст"
                                />
                            </div>
                        </div>
                        <div className="mt-3 flex justify-between">
                            <Button text={'Добавить пост'} type={'submit'} onClick={handleSubmit}/>
                        </div>
                    </form>
                    <Popup text={'Очисть данные формы и перейти на главную страницу?'}
                           state={showPopup}
                           btnCancelText={'Отменить'}
                           btnCancelHandler={() => setShowPopup(false)}
                           btnActionHandler={() => {
                               resetForm();
                               navigate(Paths.HOME);
                           }}
                           btnActionText={'На главную'}
                           btnActionSuccessColor={true}
                    />
                </>
            ) : (
                <div className="text-lg p-4 text-center">
                    Только зарегестрированные пользователь могут добавлять посты.
                    <Link className="text-indigo-600" to={Paths.LOGIN}>
                        {" "}
                        Войдите или зарегстрируйтесь
                    </Link>
                    , пожалуйста.
                </div>
            )}
        </>
    );
};
