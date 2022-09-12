import React, { useState, createRef, useRef, MutableRefObject, useEffect, ReactNode, ReactElement, JSXElementConstructor } from 'react'
import no_avatar from '../../img/no_avatar.jpg';
import { Button } from './Button';
import { AiOutlineEye, AiOutlineLike, AiOutlineDislike, AiOutlineComment } from 'react-icons/ai';
import { IPost } from '../slices/postSlice/interfaces';
import { Link } from 'react-router-dom';
import { Paths } from '../paths';
import Moment from 'react-moment';
import 'moment/locale/ru';
import parse, { Element } from 'html-react-parser';
import DOMPurify from 'dompurify';

export const PostItem = ({ post }: { post: IPost }): JSX.Element => {
  const [readMore, setReadMore] = useState(true);
  const ref1 = createRef() as MutableRefObject<HTMLDivElement>;
  const ref2 = createRef() as MutableRefObject<HTMLDivElement>;
  const ref3 = createRef() as MutableRefObject<HTMLDivElement>;
  const ref4 = createRef() as MutableRefObject<HTMLDivElement>;
  const textContainerRef = createRef() as MutableRefObject<HTMLDivElement>;
  const { _id, username, title, text, imgUrl, views, createdAt, comments, like, dislike, avatar } = post;
  const cleanText = DOMPurify.sanitize(text);

  const htmlString = () => {
    return `<p>
             ${content(cleanText).slice(0, 100)}
             <span class="opacity-60">${content(cleanText).slice(100, 200)}</span>
             <span class="opacity-50">${content(cleanText).slice(200, 300)}</span>
             <span class="opacity-40">${content(cleanText).slice(300, 400)}</span>
             <span class="opacity-30">${content(cleanText).slice(400, 500)}</span>
             <span class="opacity-20">${content(cleanText).slice(500, 600)}</span>
             <span class="opacity-10">${content(cleanText).slice(600, 700)}</span>
           </p>`
  }

  useEffect(() => {
    if (cleanText) {
      textContainerRef.current.innerHTML = htmlString();
    }
  }, [])

  const content = (str: string) => {
    const regex = /<.*?>/g;
    return str.replace(regex, '');
  }

  const handleBtnClick = () => {
    if (readMore) {
      textContainerRef.current.innerHTML = '';
      textContainerRef.current.insertAdjacentHTML('beforeend', cleanText);
      setReadMore(!readMore);
    } else {
      textContainerRef.current.innerHTML = htmlString();
      setReadMore(!readMore)
    }
  }

  return (
    <article className="post p-4 flex flex-col bg-white">
      <>
        <div className="flex items-center gap-5">
          <div
            className="w-12 h-12 rounded-full"
            style={{
              backgroundImage: avatar ? `url(${process.env.REACT_APP_SERVER_URL}/${avatar})` : `url(${no_avatar})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat'
            }}
          ></div>
          <div className="text-lg font-medium">{username}</div>
          <div className=" opacity-70"><Moment fromNow>{createdAt}</Moment></div>
        </div>
        <h3 id={_id} className='text-3xl font-bold mt-3'>
          <Link className=' hover:text-[#58A9A5] text-inherit' to={Paths.POST}>{title}</Link>
        </h3>
        {
          imgUrl && <div className='py-3'>
            <img src={`${process.env.REACT_APP_SERVER_URL}/${imgUrl}`} alt={title} />
          </div>
        }
        {
          <div className='mt-3' ref={textContainerRef}>

          </div>
        }
        <div className='mt-5 flex items-center gap-20'>
          <>
            {
              readMore
                ? <Button text='Читать далее' type='button' onClick={handleBtnClick} />
                : <Button text='Свернуть' type='button' onClick={handleBtnClick} />
            }
            <div className="flex gap-10 items-center text-2xl">
              <div
                className="flex gap-2 items-center relative text-[#798e98]"
                onMouseOver={() => ref1.current.classList.remove('hidden')}
                onMouseOut={() => ref1.current.classList.add('hidden')}
              >
                <AiOutlineEye />
                <span className='text-xl text-blue-500'>{views}</span>
                <div
                  ref={ref1}
                  className="px-4 py-2 w-32 text-center bg-black text-white text-sm absolute top-10 -right-9 rounded hidden">
                  Просмотры
                </div>
              </div>
              <button
                className="flex gap-2 items-center relative text-[#798e98]"
                onMouseOver={() => ref2.current.classList.remove('hidden')}
                onMouseOut={() => ref2.current.classList.add('hidden')}
              >
                <AiOutlineLike />
                <span className='text-xl text-green-500'>{like}</span>
                <div
                  ref={ref2}
                  className="px-4 py-2 w-32 text-center bg-black text-white text-sm absolute top-10 -right-9 rounded hidden">
                  Нравится
                </div>
              </button>
              <button
                className="flex gap-2 items-center relative text-[#798e98]"
                onMouseOver={() => ref3.current.classList.remove('hidden')}
                onMouseOut={() => ref3.current.classList.add('hidden')}
              >
                <AiOutlineDislike />
                <span className='text-xl text-red-500'>{dislike}</span>
                <div
                  ref={ref3}
                  className="px-4 py-2 w-32 text-center bg-black text-white text-sm absolute top-10 -right-9 rounded hidden">
                  Не нравится
                </div>
              </button>
              <button
                className="flex gap-2 items-center relative text-[#798e98]"
                onMouseOver={() => ref4.current.classList.remove('hidden')}
                onMouseOut={() => ref4.current.classList.add('hidden')}
              >
                <Link className='flex gap-2' to={Paths.POST}>
                  <AiOutlineComment />
                  <span className='text-xl text-green-500'>{comments.length}</span>
                </Link>
                <div
                  ref={ref4}
                  className="px-4 py-2 w-32 text-center bg-black text-white text-sm absolute top-10 -right-9 rounded hidden">
                  Комментарии
                </div>
              </button>
            </div>
          </>
        </div>
      </>
    </article>
  )
}
