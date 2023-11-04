'use client';

/* eslint-disable @next/next/no-img-element */
import { apiPaths } from '@/core/api/apiConstants';
import { CommentDetailType } from '@/modules/comment/commentType';
import { More } from 'iconsax-react';
import { useState } from 'react';
// import ClickOutHandler from 'react-clickout-handler';
import { TemporarySegment } from '../../core/ui/components/TemporarySegment';
import PlayListResons from './(icons)/PlayListResons';

interface PostCommentProps {
  comment: CommentDetailType;
}

const PostComment = (props: PostCommentProps) => {
  const [dropDownOpen, setDropDownOpen] = useState(false);

  return (
    <div className="py-3 px-4">
      <div className="flex items-start justify-between">
        <div className="flex flex-col justify-center basis-full py-1 px-2 sm:px-5 bg-slate-100 rounded-2xl">
          <div className="flex items-start sm:items-center py-3">
            <div className="basis-2/12 sm:basis-[40px] w-full">
              <div className="w-[35px] lg:w-[40px] h-[35px] lg:h-[40px] rounded-full overflow-hidden mx-auto md:mx-0">
                <img
                  src="https://media.istockphoto.com/id/828156368/photo/demo.jpg?s=612x612&w=0&k=20&c=JIREJlrI5vY33-hLNn8vz_GREOoTIFLfSsOSkgYJ_ms="
                  alt=""
                  className="w-[100%] h-[100%] object-cover"
                />
              </div>
            </div>

            <div className="flex flex-col items-start pl-2 w-full basis-10/12 sm:basis-[calc(100%-40px)] ">
              <div className="flex justify-between items-start w-full">
                <h3 className="text-[.8rem] text-gray-700 font-bold">
                  {props.comment.owner.name}
                </h3>
                <PlayListResons width="18" height="18" gradient={false} />
              </div>
              <p className="text-[.8rem] text-gray-600">
                {props.comment.comment}
              </p>
            </div>
          </div>
          <hr />
          <div className="py-3">
            {props.comment.audio && (
              <TemporarySegment
                audioUrl={
                  apiPaths.baseUrl +
                  '/socialnetwork/audio/stream/' +
                  props.comment.audio.id
                }
              />
            )}
          </div>
        </div>

        <div className="relative flex justify-been basis-10">
          <div className="flex">
            <button
              onClick={() => setDropDownOpen(!dropDownOpen)}
              className="border-none bg-transparent w-[30px] items-center"
            >
              <More size="21" color="#888" variant="Outline" />
            </button>
          </div>
          {/* <ClickOutHandler onClickOut={() => setDropDownOpen(false)}>
            <>
              {dropDownOpen && (
                <div className="absolute top-6 right-0 bg-white w-max z-50 drop-shadow-2xl">
                  <a
                    href="#"
                    className="flex justify-start py-2 px-3 hover:bg-slate-200 text-gray-800"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 mr-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                      />
                    </svg>
                    <span>Save</span>
                  </a>

                  <a
                    href="#"
                    className="flex justify-start py-2 px-3 hover:bg-slate-200 text-gray-800"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 mr-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"
                      />
                    </svg>

                    <span>AutoPlay</span>
                  </a>

                  <a
                    href="#"
                    className="flex justify-start py-2 px-3 hover:bg-slate-200 text-gray-800"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 mr-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
                      />
                    </svg>

                    <span>Share</span>
                  </a>
                </div>
              )}
            </>
          </ClickOutHandler> */}
        </div>
      </div>
    </div>
  );
};

export default PostComment;
