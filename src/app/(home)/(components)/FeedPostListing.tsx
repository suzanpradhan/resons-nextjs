'use client';

import PostLoadingSkeleton from '@/app/(components)/(skeletons)/PostLoadingSkeleton';
import PostCardV4 from '@/app/(components)/PostCardV4';
import StoryList from '@/app/(components)/StoryList';
import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import { PaginatedResponseType } from '@/core/types/reponseTypes';
import postApi from '@/modules/post/postApi';
import { updatedCurrentPage } from '@/modules/post/postListingReducer';
import { PostDetailType } from '@/modules/post/postType';
import { Howl } from 'howler';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useRef, useState } from 'react';

interface FeedPostListingProps {
  preloadedPosts?: PaginatedResponseType<PostDetailType>;
}

const FeedPostListing = (props: FeedPostListingProps) => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const session = useSession();
  const scrollableDivRef = useRef<any>(null);
  // const [currentPage, setCurrentPage] = useState(1);
  const currentPage = useAppSelector(
    (state: RootState) => state.postListing.currentPage
  );
  const [hasMoreData, setHasMoreData] = useState(true);

  useEffect(() => {
    const patchCollection = dispatch(
      postApi.util.upsertQueryData('getPostList', 1, props.preloadedPosts!)
    );
    if (window) {
      window.onbeforeunload = function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      };
    }
    var tempAudio = new Howl({
      src: ['/sweed_app.mp3'],
      html5: true,
    });
    tempAudio.play();
    tempAudio.stop();
    tempAudio.unload();
  }, []);

  const handleScroll = useCallback(() => {
    const scrollableDiv = scrollableDivRef.current;
    if (
      scrollableDiv.scrollHeight - scrollableDiv.scrollTop <=
        scrollableDiv.clientHeight + 5000 &&
      !isLoading &&
      hasMoreData
    ) {
      setIsLoading(true);
      dispatch(updatedCurrentPage(currentPage + 1));
    }
  }, [isLoading, hasMoreData]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Set isLoading to true before making the API request
      const response = await dispatch(
        postApi.endpoints.getPostList.initiate(currentPage)
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
      fetchData();
    }
  }, [dispatch, currentPage, hasMoreData]);

  useEffect(() => {
    const scrollableDiv = scrollableDivRef.current;
    scrollableDiv.addEventListener('scroll', handleScroll);
    return () => {
      scrollableDiv.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  const postListData = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries.getPostList
        ?.data as PaginatedResponseType<PostDetailType>
  );

  return (
    <div
      className="w-full flex flex-col items-center h-screen max-h-screen gap-6 pt-16 pb-17 overflow-scroll"
      ref={scrollableDivRef}
      id="feed-listing"
    >
      {session.data?.user && <StoryList />}

      {postListData?.data.map((post, index) => {
        // console.log("Post Data:", post); // Add this line to log each post data
        return <PostCardV4 key={`post_detail_${index}`} post={post} />;
      })}
      {hasMoreData ? (
        <PostLoadingSkeleton />
      ) : (
        <>
          <div className="bg-transparent py-4 px-8 mb-10 text-center text-sm text-primary-500">
            No more posts
          </div>
        </>
      )}
    </div>
  );
};

export default FeedPostListing;
