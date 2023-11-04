/* eslint-disable @next/next/no-img-element */
import { ArrowForward, Heart, Link21, More, Play, Repeat } from 'iconsax-react';

const TopicListMix = () => {
  return (
    <>
      <div className="my-5 pt-5 px-5 bg-white rounded-lg">
        <div className="flex flex-col justify-between">
          <div className="my-2">
            <div className="flex gap-4">
              <div className="w-[150px] h-[150px] sm:w-[150px] sm:h-[150px] rounded-2xl overflow-hidden drop-shadow-xl">
                <img
                  src="https://upload.wikimedia.org/wikipedia/en/6/63/Tool_-_Lateralus.jpg"
                  alt=""
                  className="w-[100%] h-[100%] object-cover"
                />
              </div>
              <div className="flex flex-col">
                <h3 className="text-3xl font-bold text-gray-900">
                  Psychodelic Topic
                </h3>
                <p className="text-sm text-gray-400"></p>
              </div>
            </div>
          </div>
          <div className="py-4">
            <div className="flex topic-gradient items-center rounded-md overflow-hidden">
              {/* <div className="w-full basis-60 py-3 px-3">
                <div className="w-[100px] h-[100px] sm:w-full sm:h-full overflow-hidden rounded-sm drop-shadow-2xl">
                  <img
                    src="https://static-cse.canva.com/blob/1067801/1600w-1Nr6gsUndKw.jpg"
                    alt="post_owner_avatar"
                    onError={(e) => {
                      (e.target as any).onError = null;
                      (e.target as any).src = '/images/avatar.jpg';
                    }}
                    className="w-[100%] h-[100%] object-cover"
                  />
                </div>
              </div> */}

              <div className="w-full flex flex-col px-3 py-4">
                <div className="overflow-hidden overflow-y-scroll h-80 hide-scrollbar">
                  <div className="flex justify-between items-center py-2 border border-solid border-gray-300 border-b border-t-0 border-l-0 border-r-0 group cursor-pointer">
                    <h4 className="text-base text-gray-200 font-normal truncate basis-3/4 group-hover:basis-2/4 group-hover:w-full">
                      Two Friends Big Heart -
                      <span className="text-white font-bold">2F Big Heart</span>
                    </h4>
                    <div className="basis-1/4 flex justify-end items-center text-base text-white group-hover:hidden">
                      <Play size="16" color="#fff" variant="TwoTone" />
                      &nbsp;306k
                    </div>
                    <div className="hidden group-hover:flex justify-end basis-1/4 px-2">
                      <a
                        href=""
                        className="block border border-solid p-[2px] mr-1 last-of-type:mr-0"
                        title="Like"
                      >
                        <Heart size="16" color="#fff" variant="Bold" />
                      </a>
                      <a
                        href=""
                        className="block border border-solid p-[2px] mr-1 last-of-type:mr-0"
                        title="Repost"
                      >
                        <Repeat size="16" color="#fff" variant="Bulk" />
                      </a>
                      <a
                        href=""
                        className="block border border-solid p-[2px] mr-1 last-of-type:mr-0"
                        title="Share"
                      >
                        <ArrowForward
                          size="16"
                          color="#fff"
                          variant="Outline"
                        />
                      </a>
                      <a
                        href=""
                        className="block border border-solid p-[2px] mr-1 last-of-type:mr-0"
                        title="Link"
                      >
                        <Link21 size="16" color="#fff" variant="Outline" />
                      </a>
                      <a
                        href=""
                        className="block border border-solid p-[2px] mr-1 last-of-type:mr-0"
                        title="More"
                      >
                        <More size="16" color="#fff" variant="Outline" />
                      </a>
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-2 border border-solid border-gray-300 border-b border-t-0 border-l-0 border-r-0 group cursor-pointer">
                    <h4 className="text-base text-gray-200 font-normal truncate basis-3/4 group-hover:basis-2/4 group-hover:w-full">
                      Linkin pard best topic collection travel song list night
                      topic enjoy the travel -
                      <span className="text-white font-bold">2F Big Heart</span>
                    </h4>
                    <div className="basis-1/4 flex justify-end items-center text-base text-white group-hover:hidden">
                      <Play size="16" color="#fff" variant="TwoTone" />
                      &nbsp;306k
                    </div>
                    <div className="hidden group-hover:flex justify-end basis-1/4 px-2">
                      <a
                        href=""
                        className="block border border-solid p-[2px] mr-1 last-of-type:mr-0"
                        title="Like"
                      >
                        <Heart size="16" color="#fff" variant="Bold" />
                      </a>
                      <a
                        href=""
                        className="block border border-solid p-[2px] mr-1 last-of-type:mr-0"
                        title="Repost"
                      >
                        <Repeat size="16" color="#fff" variant="Bulk" />
                      </a>
                      <a
                        href=""
                        className="block border border-solid p-[2px] mr-1 last-of-type:mr-0"
                        title="Share"
                      >
                        <ArrowForward
                          size="16"
                          color="#fff"
                          variant="Outline"
                        />
                      </a>
                      <a
                        href=""
                        className="block border border-solid p-[2px] mr-1 last-of-type:mr-0"
                        title="Link"
                      >
                        <Link21 size="16" color="#fff" variant="Outline" />
                      </a>
                      <a
                        href=""
                        className="block border border-solid p-[2px] mr-1 last-of-type:mr-0"
                        title="More"
                      >
                        <More size="16" color="#fff" variant="Outline" />
                      </a>
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-2 border border-solid border-gray-300 border-b border-t-0 border-l-0 border-r-0 group cursor-pointer">
                    <h4 className="text-base text-gray-200 font-normal truncate basis-3/4 group-hover:basis-2/4 group-hover:w-full">
                      Linkin pard best topic collection travel song list night
                      topic enjoy the travel -
                      <span className="text-white font-bold">2F Big Heart</span>
                    </h4>
                    <div className="basis-1/4 flex justify-end items-center text-base text-white group-hover:hidden">
                      <Play size="16" color="#fff" variant="TwoTone" />
                      &nbsp;306k
                    </div>
                    <div className="hidden group-hover:flex justify-end basis-1/4 px-2">
                      <a
                        href=""
                        className="block border border-solid p-[2px] mr-1 last-of-type:mr-0"
                        title="Like"
                      >
                        <Heart size="16" color="#fff" variant="Bold" />
                      </a>
                      <a
                        href=""
                        className="block border border-solid p-[2px] mr-1 last-of-type:mr-0"
                        title="Repost"
                      >
                        <Repeat size="16" color="#fff" variant="Bulk" />
                      </a>
                      <a
                        href=""
                        className="block border border-solid p-[2px] mr-1 last-of-type:mr-0"
                        title="Share"
                      >
                        <ArrowForward
                          size="16"
                          color="#fff"
                          variant="Outline"
                        />
                      </a>
                      <a
                        href=""
                        className="block border border-solid p-[2px] mr-1 last-of-type:mr-0"
                        title="Link"
                      >
                        <Link21 size="16" color="#fff" variant="Outline" />
                      </a>
                      <a
                        href=""
                        className="block border border-solid p-[2px] mr-1 last-of-type:mr-0"
                        title="More"
                      >
                        <More size="16" color="#fff" variant="Outline" />
                      </a>
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-2 border border-solid border-gray-300 border-b border-t-0 border-l-0 border-r-0 group cursor-pointer">
                    <h4 className="text-base text-gray-200 font-normal truncate basis-3/4 group-hover:basis-2/4 group-hover:w-full">
                      Linkin pard best topic collection travel song list night
                      topic enjoy the travel -
                      <span className="text-white font-bold">2F Big Heart</span>
                    </h4>
                    <div className="basis-1/4 flex justify-end items-center text-base text-white group-hover:hidden">
                      <Play size="16" color="#fff" variant="TwoTone" />
                      &nbsp;306k
                    </div>
                    <div className="hidden group-hover:flex justify-end basis-1/4 px-2">
                      <a
                        href=""
                        className="block border border-solid p-[2px] mr-1 last-of-type:mr-0"
                        title="Like"
                      >
                        <Heart size="16" color="#fff" variant="Bold" />
                      </a>
                      <a
                        href=""
                        className="block border border-solid p-[2px] mr-1 last-of-type:mr-0"
                        title="Repost"
                      >
                        <Repeat size="16" color="#fff" variant="Bulk" />
                      </a>
                      <a
                        href=""
                        className="block border border-solid p-[2px] mr-1 last-of-type:mr-0"
                        title="Share"
                      >
                        <ArrowForward
                          size="16"
                          color="#fff"
                          variant="Outline"
                        />
                      </a>
                      <a
                        href=""
                        className="block border border-solid p-[2px] mr-1 last-of-type:mr-0"
                        title="Link"
                      >
                        <Link21 size="16" color="#fff" variant="Outline" />
                      </a>
                      <a
                        href=""
                        className="block border border-solid p-[2px] mr-1 last-of-type:mr-0"
                        title="More"
                      >
                        <More size="16" color="#fff" variant="Outline" />
                      </a>
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-2 border border-solid border-gray-300 border-b border-t-0 border-l-0 border-r-0 group cursor-pointer">
                    <h4 className="text-base text-gray-200 font-normal truncate basis-3/4 group-hover:basis-2/4 group-hover:w-full">
                      Linkin pard best topic collection travel song list night
                      topic enjoy the travel -
                      <span className="text-white font-bold">2F Big Heart</span>
                    </h4>
                    <div className="basis-1/4 flex justify-end items-center text-base text-white group-hover:hidden">
                      <Play size="16" color="#fff" variant="TwoTone" />
                      &nbsp;306k
                    </div>
                    <div className="hidden group-hover:flex justify-end basis-1/4 px-2">
                      <a
                        href=""
                        className="block border border-solid p-[2px] mr-1 last-of-type:mr-0"
                        title="Like"
                      >
                        <Heart size="16" color="#fff" variant="Bold" />
                      </a>
                      <a
                        href=""
                        className="block border border-solid p-[2px] mr-1 last-of-type:mr-0"
                        title="Repost"
                      >
                        <Repeat size="16" color="#fff" variant="Bulk" />
                      </a>
                      <a
                        href=""
                        className="block border border-solid p-[2px] mr-1 last-of-type:mr-0"
                        title="Share"
                      >
                        <ArrowForward
                          size="16"
                          color="#fff"
                          variant="Outline"
                        />
                      </a>
                      <a
                        href=""
                        className="block border border-solid p-[2px] mr-1 last-of-type:mr-0"
                        title="Link"
                      >
                        <Link21 size="16" color="#fff" variant="Outline" />
                      </a>
                      <a
                        href=""
                        className="block border border-solid p-[2px] mr-1 last-of-type:mr-0"
                        title="More"
                      >
                        <More size="16" color="#fff" variant="Outline" />
                      </a>
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-2 border border-solid border-gray-300 border-b border-t-0 border-l-0 border-r-0 group cursor-pointer">
                    <h4 className="text-base text-gray-200 font-normal truncate basis-3/4 group-hover:basis-2/4 group-hover:w-full">
                      Linkin pard best topic collection travel song list night
                      topic enjoy the travel -
                      <span className="text-white font-bold">2F Big Heart</span>
                    </h4>
                    <div className="basis-1/4 flex justify-end items-center text-base text-white group-hover:hidden">
                      <Play size="16" color="#fff" variant="TwoTone" />
                      &nbsp;306k
                    </div>
                    <div className="hidden group-hover:flex justify-end basis-1/4 px-2">
                      <a
                        href=""
                        className="block border border-solid p-[2px] mr-1 last-of-type:mr-0"
                        title="Like"
                      >
                        <Heart size="16" color="#fff" variant="Bold" />
                      </a>
                      <a
                        href=""
                        className="block border border-solid p-[2px] mr-1 last-of-type:mr-0"
                        title="Repost"
                      >
                        <Repeat size="16" color="#fff" variant="Bulk" />
                      </a>
                      <a
                        href=""
                        className="block border border-solid p-[2px] mr-1 last-of-type:mr-0"
                        title="Share"
                      >
                        <ArrowForward
                          size="16"
                          color="#fff"
                          variant="Outline"
                        />
                      </a>
                      <a
                        href=""
                        className="block border border-solid p-[2px] mr-1 last-of-type:mr-0"
                        title="Link"
                      >
                        <Link21 size="16" color="#fff" variant="Outline" />
                      </a>
                      <a
                        href=""
                        className="block border border-solid p-[2px] mr-1 last-of-type:mr-0"
                        title="More"
                      >
                        <More size="16" color="#fff" variant="Outline" />
                      </a>
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-2 border border-solid border-gray-300 border-b border-t-0 border-l-0 border-r-0 group cursor-pointer">
                    <h4 className="text-base text-gray-200 font-normal truncate basis-3/4 group-hover:basis-2/4 group-hover:w-full">
                      Linkin pard best topic collection travel song list night
                      topic enjoy the travel -
                      <span className="text-white font-bold">2F Big Heart</span>
                    </h4>
                    <div className="basis-1/4 flex justify-end items-center text-base text-white group-hover:hidden">
                      <Play size="16" color="#fff" variant="TwoTone" />
                      &nbsp;306k
                    </div>
                    <div className="hidden group-hover:flex justify-end basis-1/4 px-2">
                      <a
                        href=""
                        className="block border border-solid p-[2px] mr-1 last-of-type:mr-0"
                        title="Like"
                      >
                        <Heart size="16" color="#fff" variant="Bold" />
                      </a>
                      <a
                        href=""
                        className="block border border-solid p-[2px] mr-1 last-of-type:mr-0"
                        title="Repost"
                      >
                        <Repeat size="16" color="#fff" variant="Bulk" />
                      </a>
                      <a
                        href=""
                        className="block border border-solid p-[2px] mr-1 last-of-type:mr-0"
                        title="Share"
                      >
                        <ArrowForward
                          size="16"
                          color="#fff"
                          variant="Outline"
                        />
                      </a>
                      <a
                        href=""
                        className="block border border-solid p-[2px] mr-1 last-of-type:mr-0"
                        title="Link"
                      >
                        <Link21 size="16" color="#fff" variant="Outline" />
                      </a>
                      <a
                        href=""
                        className="block border border-solid p-[2px] mr-1 last-of-type:mr-0"
                        title="More"
                      >
                        <More size="16" color="#fff" variant="Outline" />
                      </a>
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-2 border border-solid border-gray-300 border-b border-t-0 border-l-0 border-r-0 group cursor-pointer">
                    <h4 className="text-base text-gray-200 font-normal truncate basis-3/4 group-hover:basis-2/4 group-hover:w-full">
                      Linkin pard best topic collection travel song list night
                      topic enjoy the travel -
                      <span className="text-white font-bold">2F Big Heart</span>
                    </h4>
                    <div className="basis-1/4 flex justify-end items-center text-base text-white group-hover:hidden">
                      <Play size="16" color="#fff" variant="TwoTone" />
                      &nbsp;306k
                    </div>
                    <div className="hidden group-hover:flex justify-end basis-1/4 px-2">
                      <a
                        href=""
                        className="block border border-solid p-[2px] mr-1 last-of-type:mr-0"
                        title="Like"
                      >
                        <Heart size="16" color="#fff" variant="Bold" />
                      </a>
                      <a
                        href=""
                        className="block border border-solid p-[2px] mr-1 last-of-type:mr-0"
                        title="Repost"
                      >
                        <Repeat size="16" color="#fff" variant="Bulk" />
                      </a>
                      <a
                        href=""
                        className="block border border-solid p-[2px] mr-1 last-of-type:mr-0"
                        title="Share"
                      >
                        <ArrowForward
                          size="16"
                          color="#fff"
                          variant="Outline"
                        />
                      </a>
                      <a
                        href=""
                        className="block border border-solid p-[2px] mr-1 last-of-type:mr-0"
                        title="Link"
                      >
                        <Link21 size="16" color="#fff" variant="Outline" />
                      </a>
                      <a
                        href=""
                        className="block border border-solid p-[2px] mr-1 last-of-type:mr-0"
                        title="More"
                      >
                        <More size="16" color="#fff" variant="Outline" />
                      </a>
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-2 border border-solid border-gray-300 border-b border-t-0 border-l-0 border-r-0 group cursor-pointer">
                    <h4 className="text-base text-gray-200 font-normal truncate basis-3/4 group-hover:basis-2/4 group-hover:w-full">
                      Linkin pard best topic collection travel song list night
                      topic enjoy the travel -
                      <span className="text-white font-bold">2F Big Heart</span>
                    </h4>
                    <div className="basis-1/4 flex justify-end items-center text-base text-white group-hover:hidden">
                      <Play size="16" color="#fff" variant="TwoTone" />
                      &nbsp;306k
                    </div>
                    <div className="hidden group-hover:flex justify-end basis-1/4 px-2">
                      <a
                        href=""
                        className="block border border-solid p-[2px] mr-1 last-of-type:mr-0"
                        title="Like"
                      >
                        <Heart size="16" color="#fff" variant="Bold" />
                      </a>
                      <a
                        href=""
                        className="block border border-solid p-[2px] mr-1 last-of-type:mr-0"
                        title="Repost"
                      >
                        <Repeat size="16" color="#fff" variant="Bulk" />
                      </a>
                      <a
                        href=""
                        className="block border border-solid p-[2px] mr-1 last-of-type:mr-0"
                        title="Share"
                      >
                        <ArrowForward
                          size="16"
                          color="#fff"
                          variant="Outline"
                        />
                      </a>
                      <a
                        href=""
                        className="block border border-solid p-[2px] mr-1 last-of-type:mr-0"
                        title="Link"
                      >
                        <Link21 size="16" color="#fff" variant="Outline" />
                      </a>
                      <a
                        href=""
                        className="block border border-solid p-[2px] mr-1 last-of-type:mr-0"
                        title="More"
                      >
                        <More size="16" color="#fff" variant="Outline" />
                      </a>
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-2 border border-solid border-gray-300 border-b border-t-0 border-l-0 border-r-0 group cursor-pointer">
                    <h4 className="text-base text-gray-200 font-normal truncate basis-3/4 group-hover:basis-2/4 group-hover:w-full">
                      Linkin pard best topic collection travel song list night
                      topic enjoy the travel -
                      <span className="text-white font-bold">2F Big Heart</span>
                    </h4>
                    <div className="basis-1/4 flex justify-end items-center text-base text-white group-hover:hidden">
                      <Play size="16" color="#fff" variant="TwoTone" />
                      &nbsp;306k
                    </div>
                    <div className="hidden group-hover:flex justify-end basis-1/4 px-2">
                      <a
                        href=""
                        className="block border border-solid p-[2px] mr-1 last-of-type:mr-0"
                        title="Like"
                      >
                        <Heart size="16" color="#fff" variant="Bold" />
                      </a>
                      <a
                        href=""
                        className="block border border-solid p-[2px] mr-1 last-of-type:mr-0"
                        title="Repost"
                      >
                        <Repeat size="16" color="#fff" variant="Bulk" />
                      </a>
                      <a
                        href=""
                        className="block border border-solid p-[2px] mr-1 last-of-type:mr-0"
                        title="Share"
                      >
                        <ArrowForward
                          size="16"
                          color="#fff"
                          variant="Outline"
                        />
                      </a>
                      <a
                        href=""
                        className="block border border-solid p-[2px] mr-1 last-of-type:mr-0"
                        title="Link"
                      >
                        <Link21 size="16" color="#fff" variant="Outline" />
                      </a>
                      <a
                        href=""
                        className="block border border-solid p-[2px] mr-1 last-of-type:mr-0"
                        title="More"
                      >
                        <More size="16" color="#fff" variant="Outline" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="flex justify-end mb-4">
            <button className="hidden sm:flex justify-evenly items-center py-[.151rem] px-[.5rem] border-solid border-[1px] text-base border-gray-300 bg-white text-gray-600 leading-[25px]">
              Go to topic
            </button>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default TopicListMix;
