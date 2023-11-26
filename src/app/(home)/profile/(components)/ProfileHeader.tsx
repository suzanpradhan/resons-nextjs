/* eslint-disable @next/next/no-img-element */
'use client';

import { ProfileDetailType } from '@/modules/profile/profileType';
import Image from 'next/image';
import Link from 'next/link';
import { GearSix, NotePencil } from 'phosphor-react';

interface ProfileHeaderProps {
  viewProfile: ProfileDetailType;
}

const ProfileHeader = (props: ProfileHeaderProps) => {
  console.log('props', props);

  const PROFILE_DETAILS = [
    {
      detailName: 'Followers',
      detailNumber: props.viewProfile.followers,
    },
    {
      detailName: 'Following',
      detailNumber: props.viewProfile.following,
    },
    {
      detailName: 'Posts',
      detailNumber: props.viewProfile.total_posts,
    },
  ];

  return (
    <div className="bg-white mb-5 mt-12 drop-shadow-2xl p-4 flex gap-2 items-center border-red-400 border-b-2">
      <div className="relative w-28 md:w-36 h-28 md:h-36 rounded-full overflow-hidden border-red-400 shrink-0">
        <Image
          src={
            props.viewProfile?.profile_image &&
            props.viewProfile?.profile_image != null
              ? props.viewProfile.profile_image
              : '/images/avatar.jpg'
          }
          alt="post_owner_avatar"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          objectFit="cover"
        />
      </div>
      <div className="flex flex-col grow gap-1 max-w-2xl">
        <div className="flex justify-between">
          <h2 className="m-0 font-bold text-xl md:text-3xl truncate shrink">
            {props.viewProfile.name}
          </h2>
          <div className="flex gap-1 text-slate-500">
            <Link href="/">
              <NotePencil size={24} />
            </Link>
            <Link href="/settings">
              <GearSix size={24} />
            </Link>
          </div>
        </div>
        <p>{props.viewProfile.about}</p>

        <div className="flex gap-2 justify-between">
          {PROFILE_DETAILS.map((detail, index) => (
            <Link
              href={`profile/${props.viewProfile.id}/connections`}
              className="flex flex-col"
              key={index}
            >
              <h3 className="font-bold text-base md:text-xl">
                {detail.detailNumber}
              </h3>
              <p className="text-slate-500 text-base md:text-xl">
                {detail.detailName}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
    // <div className="bg-white mb-5 mt-10 drop-shadow-2xl">
    //   <div className="relative">
    //     <div className="flex justify-between items-center py-2 px-4 md:px-8 border-0 border-b border-gray-300">
    //       <h3 className="text-xl font-bold w-max text-slate-800 py-0 mb-0">
    //         {props.viewProfile?.name}
    //       </h3>

    //       <div className="">
    //         <Link href="/settings">
    //           <Setting2 size="24" color="#333" />
    //         </Link>
    //       </div>
    //     </div>

    //     <div className="relative flex px-4 pb-4 md:px-8 pt-14">
    //       <div className="absolute h-2/4 bg-gradient-to-tr to-[#196da9] from-[#14b5b5] w-full top-0 left-0"></div>
    //       <div className="relative -translate-y-1/4 w-full basis-32 mr-4">
    //         <div className="w-max h-max border-solid border border-gray-300 rounded-full drop-shadow-2xl p-[3px]">
    //           <div className="w-[70px] md:w-[100px] h-[70px] md:h-[100px] rounded-full overflow-hidden">
    //             <img
    //               src={
    //                 props.viewProfile?.profile_image &&
    //                 props.viewProfile?.profile_image != null
    //                   ? props.viewProfile.profile_image
    //                   : '/images/avatar.jpg'
    //               }
    //               alt="post_owner_avatar"
    //               onError={(e) => {
    //                 (e.target as any).onError = null;
    //                 (e.target as any).src = '/images/avatar.jpg';
    //               }}
    //               className="w-[100%] h-[100%] object-cover"
    //             />
    //           </div>
    //         </div>
    //       </div>

    //       <div className="w-full">
    //         <div className="flex flex-col sm:justify-evenly sm:mt-0 sm:h-full">
    //           <div className="justify-between w-full lg:w-1/2 text-gray-800 flex">
    //             <Link
    //               // href={`profile/${props.viewProfile.id}/connections`}
    //               href={{
    //                 pathname: `profile/${props.viewProfile.id}/connections`,
    //                 query: {
    //                   activeTab: 'following',
    //                 },
    //               }}
    //               className="flex flex-col items-center justify-center"
    //             >
    //               <span className="text-base md:text-xl font-bold leading-7 text-white relative z-0">
    //                 {props.viewProfile?.following}
    //               </span>
    //               <span className="text-sm md:text-base font-bold leading-7">
    //                 Listening
    //               </span>
    //             </Link>
    //             <Link
    //               href={{
    //                 pathname: `profile/${props.viewProfile.id}/connections`,
    //                 query: {
    //                   activeTab: 'followers',
    //                 },
    //               }}
    //               className="flex flex-col items-center justify-center"
    //             >
    //               <span className="text-base md:text-xl font-bold leading-7 text-white relative z-0">
    //                 {props.viewProfile?.followers}
    //               </span>
    //               <span className="text-sm md:text-base font-bold leading-7">
    //                 Listeners
    //               </span>
    //             </Link>
    //             <div className="flex flex-col items-center justify-center">
    //               <span className="text-base md:text-xl font-bold leading-7 text-white relative z-0">
    //                 {props.viewProfile?.total_tracks}
    //               </span>
    //               <span className="text-sm md:text-base font-bold leading-7">
    //                 Posts
    //               </span>
    //             </div>
    //           </div>
    //           <div className="flex mt-1">
    //             <Link
    //               href="/settings"
    //               className="mr-1 last-of-type:mr-0 border border-gray-300 bg-transparent py-1 px-3 text-xs md:px-6 md:text-base font-medium text-gray-700 cursor-pointer hover:shadow-sm rounded-sm hover:bg-slate-50 hover:text-gray-900"
    //             >
    //               Edit Profile
    //             </Link>
    //             {/* <a
    //               href="/settings"
    //               className="mr-1 last-of-type:mr-0 border border-gray-300 bg-transparent py-1 px-3 text-xs md:px-6 md:text-base font-medium text-gray-700 cursor-pointer hover:shadow-sm rounded-sm hover:bg-slate-50 hover:text-gray-900"
    //             >
    //               Share Profile
    //             </a> */}
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //   {/* <div className="justify-between text-black flex sm:hidden mt-16 w-10/12 px-8 pb-5">
    //     <a
    //       href={`profile/${props.viewProfile.id}/connections`}
    //       className="flex flex-col justify-center items-center"
    //     >
    //       <span className="text-md font-bold leading-7">
    //         {props.viewProfile?.following}
    //       </span>
    //       <span className="text-base leading-7">following</span>
    //     </a>
    //     <a
    //       href={`profile/${props.viewProfile.id}/connections`}
    //       className="flex flex-col justify-center items-center"
    //     >
    //       <span className="text-md font-bold leading-7">
    //         {props.viewProfile?.followers}
    //       </span>
    //       <span className="text-base leading-7">followers</span>
    //     </a>
    //     <div className="flex flex-col justify-center items-center">
    //       <span className="text-md font-bold leading-7">
    //         {props.viewProfile?.total_tracks}
    //       </span>
    //       <span className="text-sm leading-7">tracks</span>
    //     </div>
    //   </div> */}
    // </div>
  );
};

export default ProfileHeader;
