import {
  PlaylistDetailType,
  PlaylistFormType,
  playlitsFormType,
} from '@/modules/playlist/playlistTypes';
import { ZodError } from 'zod';

import { useAppDispatch } from '@/core/redux/clientStore';
import TextField from '@/core/ui/components/TextField';
import playlistApi from '@/modules/playlist/playlistApi';
import { useFormik } from 'formik';
import Image from 'next/image';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import CommonPopup from './CommonPopup';

interface EditPlaylistPopUpType {
  toggleModelOpen: Dispatch<SetStateAction<boolean>>;
  isModalOpen: boolean;
  playlist: PlaylistDetailType;
}

const EditPlaylistPopUp = ({
  toggleModelOpen,
  isModalOpen,
  playlist,
}: EditPlaylistPopUpType) => {
  const dispatch = useAppDispatch();
  console.log(playlist);
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const [image, setImage] = useState<File | undefined>(undefined);

  useEffect(() => {
    isModalOpen ? dialogRef.current?.showModal() : dialogRef.current?.close();
  }, [isModalOpen]);

  const onSubmit = async (data: PlaylistFormType) => {
    console.log(data);

    try {
      const responseData = await Promise.resolve(
        dispatch(
          playlistApi.endpoints.updatePlaylist.initiate({
            id: data.id,
            title: data.title,
            description: data.description,
            image: image,
          })
        )
      );
      console.log(responseData);
      toggleModelOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const validateForm = (values: PlaylistFormType) => {
    try {
      playlitsFormType.parse(values);
    } catch (error) {
      if (error instanceof ZodError) {
        return error.formErrors.fieldErrors;
      }
    }
  };

  const formik = useFormik<PlaylistFormType>({
    enableReinitialize: true,
    initialValues: {
      id: playlist?.id,
      privacy_code: playlist?.privacy_code,
      title: playlist?.title,
      description: playlist?.description ?? '',
    },
    validateOnChange: false,
    validate: validateForm,
    onSubmit,
  });

  const supportedImageTypes = [
    'image/png',
    'image/jpeg',
    'image/gif',
    'image/webp',
  ];

  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      if (supportedImageTypes.includes(file.type)) {
        const imageUrl = URL.createObjectURL(file);
        setImage(event.target.files[0]);
      }
    }
  };

  return (
    <CommonPopup
      isModalOpen={isModalOpen}
      popupName="Edit Playlist"
      toggleModelOpen={toggleModelOpen}
      className="rounded-lg w-screen"
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit(e);
        }}
      >
        <div className="flex px-4 pb-4">
          <label
            className="w-20 h-20 rounded-md relative"
            htmlFor="playlist-image-input"
          >
            <Image
              src={
                image
                  ? URL.createObjectURL(image)
                  : playlist?.image != undefined
                  ? playlist.image
                  : '/images/audio_no_image.png'
              }
              alt="song cover image"
              sizes="(max-width: 768px) 100vw, 33vw"
              className="rounded-md"
              fill
              objectFit="cover"
            />
          </label>
          <input
            type="file"
            id="playlist-image-input"
            hidden
            onChange={handleImageChange}
          />
          <div className="flex flex-col flex-1 ml-2 overflow-hidden gap-2">
            <TextField
              id="title"
              type="text"
              placeholder="Title"
              decorationClassName="bg-transparent border-gray-400 placeholder:text-gray-400"
              {...formik.getFieldProps('title')}
            />
            <TextField
              id="description"
              type="text"
              placeholder="Description"
              isMulti={true}
              decorationClassName="bg-transparent border-gray-400 placeholder:text-gray-400"
              {...formik.getFieldProps('description')}
            />
            <button
              type="submit"
              className={'bg-accent px-4 py-1 rounded text-white'}
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </CommonPopup>
  );
};

export default EditPlaylistPopUp;
