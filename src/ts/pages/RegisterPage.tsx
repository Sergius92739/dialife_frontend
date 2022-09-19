import React, {
  useEffect,
  useState,
  FormEvent,
  ChangeEvent,
  createRef,
  MutableRefObject,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { Paths } from "../paths";
import { checkAuth, statusSelector } from "../slices/authSlice/authSlice";
import { loginUser, registerUser } from "../slices/authSlice/asyncFunc";
import no_avatar from "../../img/no_avatar.jpg";
import { toast } from "react-toastify";

export const RegisterPage = (): JSX.Element => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(new Blob([""]));
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(checkAuth);
  const navigate = useNavigate();
  const inputFileEl = createRef() as MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    if (isAuth) {
      navigate(Paths.HOME);
    }
  }, [isAuth, navigate]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("username", username);
      data.append("password", password);
      data.append("avatar", image);
      dispatch(registerUser(data));
      setPassword("");
      setUsername("");
    } catch (error: any) {
      console.error(error);
      toast.error(error.message, { theme: "colored" });
    }
  };

  const handleUserName = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-1/3 mx-auto text-[#404242] mt-10"
    >
      <h1 className="text-2xl text-center font-black">Регистрация</h1>
      <div
        className="w-[100px] h-[100px] p-4 rounded-full mx-auto mt-5"
        style={{
          backgroundImage: `url(${
            image.size ? URL.createObjectURL(image) : no_avatar
          })`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      ></div>
      <div className="mt-7 text-center">
        <label
          className="font-bold block py-2 bg-[#58A9A5] text-white rounded-lg text-xl cursor-pointer"
          htmlFor="image"
        >
          {!image.size ? "Добавить аватар" : "Изменить аватар"}
          <input
            ref={inputFileEl}
            id="image"
            type="file"
            className="hidden"
            onChange={handleImageChange}
          />
        </label>
      </div>
      <div className="mt-7">
        <label className="font-bold" htmlFor="username">
          Логин:
        </label>
        <input
          id="username"
          onChange={handleUserName}
          value={username}
          type="text"
          placeholder="Введите логин"
          className="w-full border-b-4 border-[#58A9A5] outline-none placeholder:text-gray-400 mt-2 bg-inherit"
          required
        />
      </div>
      <div className="mt-7">
        <label className="font-bold" htmlFor="password">
          Пароль:
        </label>
        <input
          id="password"
          onChange={handlePassword}
          value={password}
          type="password"
          placeholder="Введите пароль"
          className="w-full border-b-4 border-[#58A9A5] outline-none placeholder:text-gray-400 mt-2 bg-inherit"
          required
        />
      </div>
      <div className="flex gap-8 justify-center items-center mt-8">
        <button
          type="submit"
          className="px-12 py-2.5 bg-[#58A9A5] text-white rounded-lg text-xl"
        >
          Подтвердить
        </button>
        <Link
          to={Paths.LOGIN}
          className="text-base text-[#58A9A5] border-b-2 border-[#58A9A5]"
        >
          Есть аккаунт ?
        </Link>
      </div>
    </form>
  );
};
