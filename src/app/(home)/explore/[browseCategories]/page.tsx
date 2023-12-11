'use client';

import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import genresApi from '@/modules/genres/genresApi';
import { GenresDetailType } from '@/modules/genres/genresType';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

const BrowseCategoriesPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const params = useParams();
  console.log(params);
  const getCategoryName = params.browseCategories;
  let convertToString: string;
  if (!Array.isArray(getCategoryName)) {
    convertToString = getCategoryName.replace(/%20/g, ' ');
  }

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(genresApi.endpoints.getGenres.initiate());
    };

    fetchData();
  }, [dispatch]);

  const getGenresListRaw = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries[`getGenres`]?.data as GenresDetailType[]
  );
  return (
    <div className="sm:container md:container lg:container mx-auto pt-10 flex flex-col h-full">
      <div className="overflow-y-scroll bg-white">
        <h2 className="px-4 py-3 flex items-center gap-2 text-lg my-0">
          <button
            onClick={() => router.back()}
            className="text-4xl -my-2 font-light"
          >
            &#60;
          </button>
          <span className="font-medium">{convertToString!}</span>
        </h2>
        <div className="px-4">
          <input
            type="search"
            className="border-[1px] w-full border-[#ccc] py-3 px-4 rounded"
            placeholder="search"
          />
          <div className="grid grid-cols-2 gap-4 mt-4">
            {getGenresListRaw?.length > 0 &&
              getGenresListRaw.map((item) => (
                <Link
                  href={`/explore/${convertToString}/${item.title}`}
                  key={item.id}
                  className="h-44 relative rounded-md"
                >
                  <Image
                    className="rounded-md "
                    alt="category image"
                    fill
                    objectFit="cover"
                    src={item.image!}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  {/* {item.image} */}
                  <p className="z-50 sticky mx-4 mt-4 font-semibold text-white">
                    {item.title}
                  </p>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowseCategoriesPage;
