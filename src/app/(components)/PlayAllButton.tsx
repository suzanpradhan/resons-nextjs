'use client';

import { useAppDispatch } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import { updateHomePage } from '@/modules/post/homePageReducer';
import { Play } from 'phosphor-react';
import { useSelector } from 'react-redux';

interface PlayAllButtonProps {
  totalComment: number;
  totalTime?: string;
  postId?: number;
  onClick?: () => void;
}

const PlayAllButton = (props: PlayAllButtonProps) => {
  const commentCount = props.totalComment;
  const dispatch = useAppDispatch();

  const isPlaying = useSelector(
    (state: RootState) => state.nowPlaying.isPlaying
  );

  return props.postId ? (
    <div
      className="border-y border-y-grey-200 bg-white px-4 py-3 flex items-center gap-2 cursor-pointer hover:bg-grey-100 active:bg-grey-200"
      onClick={() => {
        dispatch(updateHomePage({ page: 2, id: props.postId }));
        if (props.onClick) {
          props.onClick();
        }
      }}
    >
      <div className={`border-none rounded-full p-2 bg-primary-900`}>
        <Play size="21" className="text-white" weight="fill" />
      </div>
      <div className="text-sm select-none">
        <span className="text-base font-medium">Play all | </span>
        {commentCount} {commentCount > 1 ? 'comments ' : 'comment '}{' '}
        {props.totalTime ? props.totalTime : ''}
      </div>
    </div>
  ) : (
    <div
      className={`border-y border-y-grey-200 bg-white px-4 py-3 flex items-center gap-2 cursor-pointer hover:bg-grey-100 active:bg-grey-200 ${isPlaying ? 'hidden' : ''
        }`}
      onClick={props.onClick}
    >
      <div className={`border-none rounded-full p-2 bg-primary-900`}>
        <Play size="21" className="text-white" weight="fill" />
      </div>
      <div className="text-sm select-none">
        <span className="text-base font-medium">Play all | </span>
        {commentCount} {commentCount > 1 ? 'comments ' : 'comment '}{' '}
        {props.totalTime ? props.totalTime : ''}
      </div>
    </div>
  );
};

export default PlayAllButton;
