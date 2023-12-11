import {
  PlaylistDetailType,
  playlistDetailSchema,
} from '@/modules/playlist/playlistTypes';
import { MusicNotes } from 'phosphor-react';
import { ZodError } from 'zod';

import { useAppDispatch } from '@/core/redux/clientStore';
import playlistApi from '@/modules/playlist/playlistApi';
import { useFormik } from 'formik';
import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import CommonPopup from './CommonPopup';

interface EditPlaylistPopUpType {
  toggleModelOpen: Dispatch<SetStateAction<boolean>>;
  isModalOpen: boolean;
}

const EditPlaylistPopUp = ({
  toggleModelOpen,
  isModalOpen,
}: EditPlaylistPopUpType) => {
  const dispatch = useAppDispatch();
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  useEffect(() => {
    isModalOpen ? dialogRef.current?.showModal() : dialogRef.current?.close();
  }, [isModalOpen]);

  const onSubmit = async (data: PlaylistDetailType) => {
    console.log(data);
    try {
      const responseData = await Promise.resolve(
        dispatch(
          playlistApi.endpoints.addPlaylist.initiate({
            title: data.title,
            privacy_code: 1,
          })
        )
      );
      console.log(responseData);
      toggleModelOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const validateForm = (values: PlaylistDetailType) => {
    try {
      playlistDetailSchema.parse(values);
    } catch (error) {
      if (error instanceof ZodError) {
        console.log(error);

        return error.formErrors.fieldErrors;
      }
    }
  };

  const formik = useFormik<PlaylistDetailType>({
    enableReinitialize: true,
    initialValues: {
      privacy_code: 1,
      title: '',
    },
    validateOnChange: false,
    validate: validateForm,
    onSubmit,
  });

  return (
    <CommonPopup
      isModalOpen={isModalOpen}
      popupName="Edit Playlist"
      toggleModelOpen={toggleModelOpen}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit(e);
        }}
      >
        <div className="flex gap-4">
          <label
            className="bg-[#ebeef0] p-8 mb-0 text-slate-600 rounded-md"
            htmlFor="playlist-image-input"
          >
            <MusicNotes size={52} weight="fill" />
          </label>
          <input type="file" id="playlist-image-input" hidden />
          <div className="flex flex-col gap-1">
            <p>Name</p>
            <input
              placeholder="Name of Playlist"
              type="text"
              {...formik.getFieldProps('title')}
            />
            <button className="bg-red-400 w-16 py-1 mt-1 rounded" type="submit">
              Save
            </button>
          </div>
        </div>
      </form>
    </CommonPopup>
  );
};

export default EditPlaylistPopUp;
