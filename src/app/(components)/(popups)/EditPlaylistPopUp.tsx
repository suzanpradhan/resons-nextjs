// import {
//   PlaylistDetailType,
//   PlaylistFormType,
//   playlistDetailSchema,
// } from '@/modules/playlist/playlistTypes';
// import { ZodError } from 'zod';

// import { privacy_code } from '@/core/constants/appConstants';
// import { useAppDispatch } from '@/core/redux/clientStore';
// import TextField from '@/core/ui/components/TextField';
// import playlistApi from '@/modules/playlist/playlistApi';
// import { useFormik } from 'formik';
// import Image from 'next/image';
// import { Plus } from 'phosphor-react';
// import {
//   ChangeEvent,
//   Dispatch,
//   SetStateAction,
//   useEffect,
//   useRef,
//   useState,
// } from 'react';
// import CommonPopup from './CommonPopup';

// interface EditPlaylistPopUpType {
//   toggleModelOpen: Dispatch<SetStateAction<boolean>>;
//   isModalOpen: boolean;
//   playlist: PlaylistDetailType;
// }

// const EditPlaylistPopUp = ({
//   toggleModelOpen,
//   isModalOpen,
//   playlist,
// }: EditPlaylistPopUpType) => {
//   const dispatch = useAppDispatch();
//   const dialogRef = useRef<HTMLDialogElement | null>(null);

//   const [image, setImage] = useState<File | undefined>(undefined);

//   useEffect(() => {
//     isModalOpen ? dialogRef.current?.showModal() : dialogRef.current?.close();
//   }, [isModalOpen]);

//   const onSubmit = async (data: PlaylistFormType) => {
//     console.log(data);

//     try {
//       const responseData = await Promise.resolve(
//         dispatch(
//           playlistApi.endpoints.updatePlaylist.initiate({
//             id: data.id,
//             title: data.title,
//             description: data.description,
//             privacy_code: data.privacy_code,
//             image: image,
//           })
//         )
//       );

//       toggleModelOpen(false);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const validateForm = (values: PlaylistFormType) => {
//     try {
//       playlistDetailSchema.parse(values);
//     } catch (error) {
//       if (error instanceof ZodError) {
//         return error.formErrors.fieldErrors;
//       }
//     }
//   };

//   const formik = useFormik<PlaylistFormType>({
//     enableReinitialize: true,
//     initialValues: {
//       id: playlist?.id,
//       title: playlist?.title,
//       description: playlist?.description ?? '',
//       privacy_code: playlist.privacy_code ?? undefined,
//     },
//     validateOnChange: false,
//     validate: validateForm,
//     onSubmit: onSubmit,
//   });

//   const supportedImageTypes = [
//     'image/png',
//     'image/jpeg',
//     'image/gif',
//     'image/webp',
//   ];

//   const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
//     console.log('here');
//     const file = e.target.files?.[0];
//     if (file) {
//       if (supportedImageTypes.includes(file.type)) {
//         setImage(e.target.files?.[0]);
//       }
//     }
//     formik.setFieldValue('image', image);
//     console.log(formik.values.image);
//   };

//   return (
//     <CommonPopup
//       isModalOpen={isModalOpen}
//       popupName="Edit Playlist"
//       toggleModelOpen={toggleModelOpen}
//       className="rounded-lg w-screen"
//     >
//       <form
//         onSubmit={(e) => {
//           e.preventDefault();
//           formik.handleSubmit(e);
//         }}
//       >
//         <div className="flex px-4 pb-4">
//           <label
//             className="w-20 h-20 rounded-md relative flex items-center justify-center bg-primaryGray-200"
//             htmlFor="playlist-image-input"
//           >
//             {image || playlist.image ? (
//               <Image
//                 src={
//                   image
//                     ? URL.createObjectURL(image)
//                     : playlist?.image ?? playlist.image!
//                 }
//                 alt="song cover image"
//                 sizes="(max-width: 768px) 100vw, 33vw"
//                 className="rounded-md"
//                 fill
//                 objectFit="cover"
//               />
//             ) : (
//               <Plus size={68} weight="bold" className="text-primaryGray-500" />
//             )}
//           </label>
//           <input
//             name="image"
//             type="file"
//             id="playlist-image-input"
//             hidden
//             onChange={(e) => handleImageChange(e)}
//           />
//           <div className="flex flex-col flex-1 ml-2 overflow-hidden gap-2">
//             <TextField
//               id="title"
//               type="text"
//               placeholder="Title"
//               decorationclassname="bg-transparent border-gray-400 placeholder:text-gray-400"
//               {...formik.getFieldProps('title')}
//             />
//             <TextField
//               id="description"
//               type="text"
//               placeholder="Description"
//               isMulti={true}
//               decorationclassname="bg-transparent border-gray-400 placeholder:text-gray-400"
//               {...formik.getFieldProps('description')}
//             />
//             <select
//               {...formik.getFieldProps('privacy_code')}
//               className="text-gray-700 text-sm py-2 px-2 bg-transparent border-gray-400 border-[1px] rounded-md focus:outline-0"
//             >
//               <option>Select Privacy </option>
//               {privacy_code.map((item, index) => (
//                 <option key={index} value={item.id}>
//                   {item.nameV2}
//                 </option>
//               ))}
//             </select>
//             <button
//               type="submit"
//               className={'bg-accent px-4 py-1 rounded text-white'}
//             >
//               Save
//             </button>
//           </div>
//         </div>
//       </form>
//     </CommonPopup>
//   );
// };

// export default EditPlaylistPopUp;

import {
  PlaylistDetailType,
  PlaylistFormType,
  playlistFormSchema,
} from '@/modules/playlist/playlistTypes';
import { ZodError } from 'zod';

import { privacy_code } from '@/core/constants/appConstants';
import { useAppDispatch } from '@/core/redux/clientStore';
import TextField from '@/core/ui/components/TextField';
import playlistApi from '@/modules/playlist/playlistApi';
import { useFormik } from 'formik';
import Image from 'next/image';
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
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
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const [image, setImage] = useState<File | undefined>(undefined);

  useEffect(() => {
    isModalOpen ? dialogRef.current?.showModal() : dialogRef.current?.close();
  }, [isModalOpen]);

  const onSubmit = async (data: PlaylistFormType) => {
    console.log('submission');
    console.log(data);

    try {
      const responseData = await Promise.resolve(
        dispatch(
          playlistApi.endpoints.updatePlaylist.initiate({
            id: data.id,
            title: data.title,
            description: data.description,
            image: image,
            privacy_code: data.privacy_code,
          })
        )
      );
      toggleModelOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const validateForm = (values: PlaylistFormType) => {
    try {
      playlistFormSchema.parse(values);
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
      title: playlist?.title,
      description: playlist?.description ?? '',
      privacy_code: playlist?.privacy_code,
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

  const handlePrivacyChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const privacyCode: number = Number(e.target.value);
    formik.setFieldValue('privacy_code', privacyCode);
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
          console.log(typeof formik.values.privacy_code);
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
              decorationclassname="bg-transparent border-gray-400 placeholder:text-gray-400"
              {...formik.getFieldProps('title')}
            />
            <TextField
              id="description"
              type="text"
              placeholder="Description"
              isMulti={true}
              decorationclassname="bg-transparent border-gray-400 placeholder:text-gray-400"
              {...formik.getFieldProps('description')}
            />
            <select
              // {...formik.getFieldProps('privacy_code')}
              onChange={(e) => handlePrivacyChange(e)}
              name="privacy_code"
              className="border-gray-400 border-[1px] rounded-md px-2 py-1 focus:outline-none"
            >
              {privacy_code.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
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
