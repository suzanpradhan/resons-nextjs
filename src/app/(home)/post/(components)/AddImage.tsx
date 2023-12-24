import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import { CoverImageDetailType } from '@/modules/coverImage/coverImageType';
import classNames from 'classnames';
import Image from 'next/image';
import { UploadSimple } from 'phosphor-react';
import { ChangeEvent } from 'react';

interface AddImageTypes {
  coverImageId: string;
  handleImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleCoverImageIdChange: (id: number) => void;
}

const AddImage = ({
  coverImageId,
  handleCoverImageIdChange,
  handleImageChange,
}: AddImageTypes) => {
  const dispatch = useAppDispatch();

  const coverImages = useAppSelector((state: RootState) => {
    return state.baseApi.queries['getCoverImage']
      ?.data as CoverImageDetailType[];
  });

  return (
    <>
      <div className="flex items-center px-4 py-3">
        <div className="text-gray-500 text-sm font-normal flex w-full">
          <p className="grow">Choose or upload background</p>
          <label htmlFor="coverImageInput" className="flex text-red-500">
            <UploadSimple size={20} weight="fill" />
            <span>Upload</span>
          </label>
        </div>
        <input
          id="coverImageInput"
          type="file"
          accept="image/*" // Specify the file types you want to allow (e.g., images)
          style={{ display: 'none' }}
          name="cover_image"
          onChange={handleImageChange}
          // {...formik.getFieldProps('cover_image')} // Hide the input element
        />
      </div>
      <div className="h-full overflow-y-scroll">
        {coverImages && (
          <div className="grid grid-cols-3 gap-0 w-full overflow-y-scroll">
            {coverImages?.map((item: CoverImageDetailType) => (
              <div key={item.id}>
                <label
                  className={classNames(
                    `mb-0 w-full h-20   peer-checked:bg-red-500`,
                    Number(coverImageId) === item.id &&
                      'border-[3px] border-white-400'
                  )}
                  htmlFor={'cover_image_id_' + item.id}
                >
                  <Image
                    src={item.file_path}
                    alt="cover image"
                    height={100}
                    width={100}
                    // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="w-full h-full aspect-auto object-cover"
                  />
                </label>
                <input
                  hidden
                  className={`peer`}
                  id={'cover_image_id_' + item.id}
                  type="radio"
                  name="cover_image_id"
                  value={item.id}
                  onChange={() => handleCoverImageIdChange(item.id)}
                  // {...formik.getFieldProps('cover_image_id')}
                />
              </div>
            ))}
          </div>
        )}
        <div className="h-56"></div>
      </div>
    </>
  );
};

export default AddImage;
