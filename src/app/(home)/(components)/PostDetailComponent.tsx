'use client';

import PostCommentSkeleton from '@/app/(components)/(skeletons)/PostCommentSkeleton';
import PostLoadingSkeleton from '@/app/(components)/(skeletons)/PostLoadingSkeleton';
import PlayAllButton from '@/app/(components)/PlayAllButton';
import PostCommentV4 from '@/app/(components)/PostCommentV4';
import PostDetailV4 from '@/app/(components)/PostDetailV4';
import { apiPaths } from '@/core/api/apiConstants';
import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import { PaginatedResponseType } from '@/core/types/reponseTypes';
import commentApi from '@/modules/comment/commentApi';
import { CommentDetailType } from '@/modules/comment/commentType';
import {
  addNewPlaylist,
  updateIsPlaying,
} from '@/modules/nowPlaying/nowPlayingReducer';
import { updateHomePage } from '@/modules/post/homePageReducer';
import postApi from '@/modules/post/postApi';
import { PostDetailType, PostEachDetailType } from '@/modules/post/postType';
import Image from 'next/image';
import { CaretLeft, Record } from 'phosphor-react';
import { useCallback, useEffect, useState } from 'react';

export default function PostDetailComponent({
  params,
}: {
  params?: { id: number };
}) {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(8);
  const [hasMoreData, setHasMoreData] = useState(true);
  const incrementBy = 8;
  const [cachedPostData, setCachePostData] = useState<
    PostDetailType | undefined
  >(undefined);

  const playlistId = useAppSelector(
    (state: RootState) => state.nowPlaying.playlistId
  );
  const isPlaying = useAppSelector(
    (state: RootState) => state.nowPlaying.isPlaying
  );

  const postListData = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries.getPostList
        ?.data as PaginatedResponseType<PostDetailType>
  );

  useEffect(() => {
    if (!params) return;
    const tempPostQuery = postListData?.data.filter(
      (post) => post.id == params.id
    );
    if (!tempPostQuery || tempPostQuery.length <= 0) {
      dispatch(postApi.endpoints.getPost.initiate(params.id));
    } else {
      setCachePostData(tempPostQuery[0]);
    }
  }, [dispatch, params?.id, postListData]);

  const postDetailData = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries[`getPost("${params?.id}")`]
        ?.data as PostEachDetailType
  );

  useEffect(() => {
    if (postDetailData) {
      setCachePostData(postDetailData.post);
    }
  }, [postDetailData]);

  useEffect(() => {
    if (!params) return;
    const fetchData = async () => {
      setIsLoading(true);

      const response = await dispatch(
        commentApi.endpoints.getAllComments.initiate({
          postId: params.id,
          page: currentPage,
        })
      );
      setIsLoading(false); // Set isLoading to false after the request is completed

      if (response.data) {
        if (
          response.data!.pagination.currentPage >=
          response.data!.pagination.totalPages
        ) {
          setHasMoreData(false);
        }
      }
    };

    if (hasMoreData) {
      // console.log('has more');

      fetchData();
    }
  }, [dispatch, currentPage, hasMoreData, params?.id]);

  useEffect(() => {
    const scrollableDiv = document.getElementById('detailScroller');
    if (scrollableDiv) {
      scrollableDiv.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
    setHasMoreData(true);
  }, [params?.id]);

  const commentList = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries[`getAllComments-${params?.id}`]
        ?.data as PaginatedResponseType<CommentDetailType>
  );

  const handleScroll = useCallback(() => {
    const scrollableDiv = document.getElementById('detailScroller');
    if (scrollableDiv) {
      if (
        scrollableDiv.scrollHeight - scrollableDiv.scrollTop <=
          scrollableDiv.clientHeight + 200 &&
        !isLoading &&
        hasMoreData
      ) {
        setIsLoading(true);
        setCurrentPage(currentPage + incrementBy);
      }
    }
  }, [isLoading, hasMoreData, currentPage]);

  useEffect(() => {
    const scrollableDiv = document.getElementById('detailScroller');
    if (scrollableDiv) {
      scrollableDiv.addEventListener('scroll', handleScroll);

      return () => {
        scrollableDiv.removeEventListener('scroll', handleScroll);
      };
    }
  }, [handleScroll]);

  const handlePlayPauseAllComments = async () => {
    if (
      playlistId &&
      cachedPostData?.id &&
      playlistId == cachedPostData.id.toString()
    ) {
      if (isPlaying) {
        dispatch(updateIsPlaying(false));
      } else {
        dispatch(updateIsPlaying(true));
      }
      return;
    }

    if (commentList) {
      var commentAudios = (
        commentList as PaginatedResponseType<CommentDetailType>
      ).data.map((comment) => {
        return {
          url:
            apiPaths.baseUrl +
            '/socialnetwork/audio/stream/' +
            comment.audio.id!,
          duration: comment.audio.file_duration
            ? parseFloat(comment.audio.file_duration)
            : 0,
          info: {
            title: comment.comment ?? comment.owner.name,
            description: comment.owner.name ?? '',
            id: cachedPostData?.id,
            cid: comment.id,
          },
        };
      });
      if (cachedPostData) {
        dispatch(
          addNewPlaylist({
            id: cachedPostData.id?.toString(),
            playlist: [
              {
                url:
                  apiPaths.baseUrl +
                  '/socialnetwork/audio/stream/' +
                  cachedPostData.audio?.id,
                duration: cachedPostData.audio.file_duration
                  ? parseFloat(cachedPostData.audio.file_duration)
                  : 0,
                info: {
                  title: cachedPostData.title,
                  description: cachedPostData.owner.name,
                  id: cachedPostData.id,
                },
              },
              ...commentAudios,
            ],
            totalDuration: cachedPostData.total_duration,
          })
        );
      }
    }
  };

  function secondsToString(seconds: number) {
    var round = Math.round(seconds);
    var numMinutes = Math.floor((((round % 31536000) % 86400) % 3600) / 60);
    var numSeconds = (((round % 31536000) % 86400) % 3600) % 60;
    return numMinutes + `.${numSeconds}` + ' minutes';
  }

  return (
    <div className="w-full flex flex-col items-center max-full h-full">
      {cachedPostData ? (
        <>
          <div
            className="max-w-3xl w-full shadow-s flex flex-col h-full max-full relative flex-1 overflow-y-scroll"
            id="detailScroller"
          >
            <div
              className="flex items-center sticky bg-dark-500 text-white h-12 top-0 z-50"
              onClick={() => {
                dispatch(updateHomePage({ page: 1 }));
              }}
            >
              <div
                // href="/"
                className="h-12 flex items-center justify-center w-12"
              >
                <CaretLeft size="20" weight="bold" className="cursor-pointer" />
              </div>
              <h3 className="text-base text-white flex-1 font-medium line-clamp-1">
                {cachedPostData.title}
              </h3>
            </div>
            <PostDetailV4 post={cachedPostData} descriptionEllipsis={false} />

            <div
              className={`${
                commentList && commentList.data.length > 2
                  ? ' bg-white flex-1'
                  : 'bg-white flex-1'
              }`}
            >
              {commentList ? (
                commentList && commentList.data.length > 0 ? (
                  commentList.data.map((comment, index) => (
                    <PostCommentV4
                      key={index}
                      commentData={comment}
                      postId={cachedPostData.id!}
                    />
                  ))
                ) : null
              ) : (
                <PostCommentSkeleton />
              )}
            </div>
          </div>
          <div className="max-w-3xl mx-auto w-full flex flex-col bg-white z-50">
            {commentList && commentList.data.length > 0 ? (
              <PlayAllButton
                totalComment={cachedPostData.total_comments}
                totalTime={secondsToString(cachedPostData.total_duration)}
                onClick={() => {
                  handlePlayPauseAllComments();
                }}
              />
            ) : null}

            <div className="px-4 py-2 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <Image
                  width={100}
                  height={100}
                  src="/profile-pic.jpg"
                  alt="profile-image"
                  className="w-full h-full aspect-auto object-cover"
                />
              </div>
              <div className="bg-grey-100 h-9 py-1 text-sm text-primary-500 rounded-lg flex-1 flex gap-2 items-center p-2">
                <Record size="26" className="text-accent" weight="duotone" />
                Record or share your comment
              </div>
            </div>
          </div>
        </>
      ) : (
        <PostLoadingSkeleton />
      )}
    </div>
  );
}
