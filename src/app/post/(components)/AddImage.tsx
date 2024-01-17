import { useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import { CoverImageDetailType } from '@/modules/coverImage/coverImageType';
import classNames from 'classnames';
import Image from 'next/image';
import { UploadSimple } from 'phosphor-react';
import { ChangeEvent, useState } from 'react';

interface AddImageTypes {
  currentCoverImage: CoverImageDetailType | undefined;
  handleCoverImageIdChange: (coverImageItem: CoverImageDetailType) => void;
  hasError: boolean;
}

const AddImage = ({
  currentCoverImage,
  hasError,
  handleCoverImageIdChange,
}: AddImageTypes) => {
  const [localCoverImage, setLocalCoverImage] = useState<
    CoverImageDetailType | undefined
  >(undefined);

  const coverImages = useAppSelector((state: RootState) => {
    return state.baseApi.queries['getCoverImage']
      ?.data as CoverImageDetailType[];
  });

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const temp = {
        id: 0,
        file_path: URL.createObjectURL(e.target.files?.[0]),
        file: e.target.files?.[0],
      } as CoverImageDetailType;
      setLocalCoverImage(temp);
      handleCoverImageIdChange(temp);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div
        className={classNames(
          'flex items-center px-4 py-2',
          hasError ? 'bg-red-200' : 'bg-white'
        )}
      >
        <label
          className="text-dark-400 h-full text-base max-[356px]:text-sm m-0 font-normal flex items-center w-full cursor-pointer"
          htmlFor="coverImageInput"
        >
          <p className={classNames('grow', hasError ? 'text-accent' : '')}>
            Choose or upload background
          </p>
          <div className="flex text-accent font-normal gap-1 text-base max-[356px]:text-sm">
            <UploadSimple size={20} weight="fill" />
            <span>Upload</span>
          </div>
        </label>
        <input
          id="coverImageInput"
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          name="cover_image"
          onChange={handleImageChange}
          className="hidden"
        />
      </div>
      <div className="flex-1 overflow-y-scroll">
        <div className="grid grid-cols-3 gap-0 w-full flex-1 overflow-y-scroll">
          {localCoverImage ? (
            <CoverImageItem
              key={'local_image'}
              currentItem={currentCoverImage}
              handleCoverImageIdChange={handleCoverImageIdChange}
              item={localCoverImage}
            />
          ) : (
            <></>
          )}
          {coverImages?.map((item: CoverImageDetailType) => (
            <CoverImageItem
              key={item.id}
              currentItem={currentCoverImage}
              handleCoverImageIdChange={handleCoverImageIdChange}
              item={item}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

interface CoverImageItemType {
  item: CoverImageDetailType;
  currentItem: CoverImageDetailType | undefined;
  handleCoverImageIdChange: (coverImageItem: CoverImageDetailType) => void;
}

const CoverImageItem = ({
  item,
  currentItem,
  handleCoverImageIdChange,
}: CoverImageItemType) => {
  return (
    <div className="border border-dark-500">
      <label
        className={classNames(
          `mb-0 w-full h-20   peer-checked:bg-red-500`,
          currentItem && currentItem.id === item.id
            ? 'border-[3px] border-white'
            : ''
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
        onChange={() => handleCoverImageIdChange(item)}
      />
    </div>
  );
};

export default AddImage;
