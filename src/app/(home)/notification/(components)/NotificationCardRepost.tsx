/* eslint-disable @next/next/no-img-element */
import { More, Repeat } from 'iconsax-react';

const NotificationCardRepost = () => {
  return (
    <div className="flex justify-between items-center px-5 py-3">
      <div className="flex items-start md:items-center md:basis-4/5 w-full">
        {/* profile img */}
        <div className="w-[45px] h-auto sm:h-11 sm:w-11 overflow-hidden rounded-full hover:cursor-pointer">
          <img
            src="./images/18.jpg"
            alt="user-image"
            className="w-full h-full object-cover"
          />
        </div>
        {/* user detail */}
        <div className="flex flex-col ml-3 justify-around basis-[250px] sm:basis-auto">
          <h4 className="text-sm text-black font-bold">
            Niwesh Shrestha{' '}
            <span className="text-gray-400 font-normal">
              reposted your track &quot;
            </span>
            <span className="text-gray-400 font-normal truncate hover:text-clip">
              Hare Krishna
            </span>
            <span className="text-gray-400 font-normal">&quot;</span>
          </h4>
          <div className="flex items-center">
            <Repeat size="16" color="gray" variant="Bold" />{' '}
            <span className="text-gray-500 font-normal text-xs ml-1">
              25 minutes ago
            </span>
          </div>
        </div>
      </div>
      <div className="basis-[40px] md:basis-[132px] w-full flex justify-end items-center">
        <More size="18" className="text-dark-500" variant="Outline" />
      </div>
    </div>
  );
};

export default NotificationCardRepost;
