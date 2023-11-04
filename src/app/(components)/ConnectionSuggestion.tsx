'use client';

import { Musicnote, People, ProfileAdd } from 'iconsax-react';

/* eslint-disable @next/next/no-img-element */

interface ConnectionSuggestionProps {
  name: string;
  imgPath: string;
  followers: string;
  music_count: string;
  vip: boolean;
}

const ConnectionSuggestion = (props: ConnectionSuggestionProps) => {
  return (
    <div className="flex flex-col mb-5">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-[55px] h-[55px] rounded-full overflow-hidden m-[.15rem] mr-3">
            <img
              src={props.imgPath}
              alt={props.name}
              className="w-[100%] h-[100%] object-cover"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center">
              <h3 className=" text-gray-800 text-[1rem] mr-2">{props.name}</h3>
              {props.vip && (
                <span className="text-[.9rem] text-blue-600">
                  <i className="fas fa-check-circle"></i>
                </span>
              )}
            </div>
            <div className="flex justify-between w-28">
              <span className="text-[.8rem] font-bold flex">
                <People size="17" color="#333" variant="TwoTone" />
                &nbsp; {props.followers}
              </span>
              <span className="text-[.8rem] font-bold flex">
                <Musicnote size="17" color="#333" variant="Outline" />{' '}
                {props.music_count}
              </span>
            </div>
          </div>
        </div>
        <button className="hidden sm:flex justify-evenly items-center py-[.151rem] px-[.5rem] border-solid border-[1px] text-[.8rem] border-gray-300 bg-white text-gray-600 leading-[25px]">
          Follow
        </button>
        <button className="sm:hidden p-2 border-solid border-[1px] border-gray-300 bg-white leading-[25px]">
          <ProfileAdd size="17" color="#333" variant="TwoTone" />
        </button>
      </div>
    </div>
  );
};

export default ConnectionSuggestion;
