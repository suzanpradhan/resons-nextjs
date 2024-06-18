'use client';

import { MusicNotes, Pen } from 'phosphor-react';
import { useState } from 'react';

const CreateNewPlaylistPage = () => {
  const [isModalOpen, toggleModelOpen] = useState(false);
  return (
    <div className="sm:container md:container lg:container mx-auto mb-[4.6rem] h-full bg-[#ffffff] ">
      <div className="mt-10 ">
        <div className="bg-[#f9fafa] flex pt-12 pb-8 px-6 gap-2 items-center">
          <div className="bg-[#ebeef0] p-6 text-slate-600 rounded-md ">
            <MusicNotes size={52} weight="fill" />
          </div>
          <div className="grow">
            <h2 className="mb-0 text-xl font-semibold">My Playlist</h2>
            <p className="text-sm">No audios</p>
          </div>
          <button onClick={() => toggleModelOpen(true)}>
            <Pen size={32} weight="fill" />
          </button>
        </div>
        <div className="mx-4 my-4">
          <input type="text" placeholder="Search" />
          <p className="text-center text-[#909090] mt-8 ">No audios</p>
        </div>
        {/* <EditPlaylistPopUp
          isModalOpen={isModalOpen}
          toggleModelOpen={toggleModelOpen}
        /> */}
      </div>
    </div>
  );
};

export default CreateNewPlaylistPage;
