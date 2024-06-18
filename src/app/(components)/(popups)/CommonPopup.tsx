import {
  AddPlaylistFormType,
  addPlaylistFormSchema,
} from '@/modules/playlist/playlistTypes';
import { X } from 'phosphor-react';
import { ZodError } from 'zod';

import classNames from 'classnames';
import { Dispatch, SetStateAction, useEffect, useRef } from 'react';

interface CommonPopupType {
  toggleModelOpen: Dispatch<SetStateAction<boolean>>;
  isModalOpen: boolean;
  popupName: string;
  children: React.ReactNode;
  className?: string;
}

const CommonPopup = ({
  children,
  toggleModelOpen,
  isModalOpen,
  popupName,
  className,
}: CommonPopupType) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  useEffect(() => {
    isModalOpen ? dialogRef.current?.showModal() : dialogRef.current?.close();
  }, [isModalOpen]);

  const validateForm = (values: AddPlaylistFormType) => {
    try {
      addPlaylistFormSchema.parse(values);
    } catch (error) {
      if (error instanceof ZodError) {
        console.log(error);

        return error.formErrors.fieldErrors;
      }
    }
  };

  //   const formik = useFormik<AddPlaylistFormType>({
  //     enableReinitialize: true,
  //     initialValues: {
  //       playlist_name: '',
  //       playlist_cover: undefined,
  //     },
  //     validateOnChange: false,
  //     validate: validateForm,
  //     onSubmit,
  //   });

  return (
    isModalOpen && (
      <dialog
        ref={dialogRef}
        className={classNames(
          'p-0 bg-white/90 backdrop-filter backdrop-blur-lg',
          className
        )}
      >
        <div className="flex mb-4 px-4 pt-3">
          <h3 className="grow font-semibold text-base max-[356px]:text-sm">
            {popupName}
          </h3>
          <button onClick={() => toggleModelOpen(false)}>
            <X size={20} weight="bold" />
          </button>
        </div>
        {children}
      </dialog>
    )
  );
};

export default CommonPopup;
