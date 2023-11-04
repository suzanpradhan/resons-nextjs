import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import { PaginatedResponseType } from '@/core/types/reponseTypes';
import likeApi from '@/modules/liked/likeApi';
import { GetPostLikeDetailType } from '@/modules/liked/likeType';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { X } from 'phosphor-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import LikeViewSkeleton from '../(skeletons)/LikeViewSkeleton';

interface LikeListProps {
  onClose: () => void;
  commentId: number;
}

export default function CommentLikeList(props: LikeListProps) {
  const dispatch = useAppDispatch();
  const [follow, setFollow] = useState(false);
  const likeBottomSheetRef = useRef<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);

  const popupContentRef = useRef<any>();

  const handleClickOutside = (e: MouseEvent) => {
    if (
      likeBottomSheetRef.current &&
      !likeBottomSheetRef.current?.contains(e.target)
    ) {
      props.onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleFollow = async () => {
    if (!follow) {
      setFollow(!follow);
      //   try {
      //     if (props) {
      //       await Promise.resolve(
      //         dispatch(
      //           followApi.endpoints.follow.initiate({
      //             follow_user_id: props.viewProfile.id,
      //           })
      //         )
      //       );
      //     }
      //   } catch (error) {
      //     // Handle the error here
      //     console.error('Error occurred while following:', error);
      //   }
    } else {
      try {
        setFollow(!follow);
        // if (props) {
        //   await Promise.resolve(
        //     dispatch(
        //       followApi.endpoints.unfollow.initiate({
        //         unfollow_user_id: props.viewProfile.id,
        //       })
        //     )
        //   );
        // }
      } catch (error) {
        // Handle the error here
        console.error('Error occurred while unfollowing:', error);
      }
    }
  };

  const handleScroll = useCallback(() => {
    const popupContent = popupContentRef.current;
    if (!popupContent) return;

    // Check if the user has scrolled to the bottom of the pop-up content
    const isAtBottom =
      popupContent.scrollTop + popupContent.clientHeight >=
      popupContent.scrollHeight - 100;
    if (isAtBottom && !isLoading && hasMoreData) {
      setIsLoading(true);
      setCurrentPage(currentPage + 1);
    }
  }, [isLoading, hasMoreData]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Set isLoading to true before making the API request
      const response = await dispatch(
        likeApi.endpoints.getCommentLike.initiate({
          commentId: props.commentId,
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
      fetchData();
    }
  }, [dispatch, currentPage, hasMoreData]);

  //   useEffect(() => {
  //     window.addEventListener('scroll', handleScroll);

  //     return () => {
  //       window.removeEventListener('scroll', handleScroll);
  //     };
  //   }, [handleScroll]);

  const getCommentLikes = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries[`getCommentLike-${props.commentId}`]
        ?.data as PaginatedResponseType<GetPostLikeDetailType>
  );

  const dropIn = {
    hidden: {
      y: '200vh',
      opacity: 0,
    },
    visible: {
      y: '0',
      opacity: 1,
      transition: {
        duration: 0.2,
        type: 'spring',
        damping: 25,
        stiffness: 150,
      },
    },
    exit: {
      y: '100vh',
      opacity: 0,
    },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="fixed bottom-0 left-0 h-2/3 w-full bg-white z-[999] rounded-t-2xl shadow-[0px_0px_8px_0px_#1a202c]"
        ref={likeBottomSheetRef}
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="relative flex items-center justify-center border-0 border-b border-gray-200 h-12">
          <h3 className="font-medium text-base text-gray-800">Like</h3>
          <span
            onClick={() => {
              props.onClose();
            }}
            className="absolute right-4 top-1/2 transform translate-y-[-50%] cursor-pointer"
          >
            <X size={14} />
          </span>
        </div>
        <div
          className="px-4 pt-2 h-[calc(100%-3rem)] overflow-y-scroll bg-white"
          ref={popupContentRef}
          onScroll={handleScroll}
        >
          {getCommentLikes
            ? getCommentLikes.data.length > 0
              ? getCommentLikes.data.map((list, index) => (
                  <div
                    className="flex items-center justify-between pb-2"
                    key={index}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-max h-max border-solid border-0 border-white rounded-full p-1">
                        <div
                          className="w-11 h-11 rounded-full overflow-hidden cursor-pointer"
                          onClick={(e) => {
                            console.log('clicked');
                          }}
                        >
                          <Image
                            src={
                              list.user.profile_image &&
                              list.user.profile_image != null
                                ? list.user.profile_image
                                : '/images/avatar.jpg'
                            }
                            alt="profile-image"
                            onError={(e) => {
                              (e.target as any).onError = null;
                              (e.target as any).src = '/images/avatar.jpg';
                            }}
                            width={100}
                            height={100}
                            className="w-11 h-11 object-cover"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col justify-center text-base text-gray-800 leading-5">
                        <h3 className="text-gray-800 font-medium">
                          {list.user.name}
                        </h3>
                        <span className="text-gray-400 text-xs">
                          {list.user.nickname}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              : null
            : null}
          {isLoading ? <LikeViewSkeleton /> : null}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
