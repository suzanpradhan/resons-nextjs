'use client';

import MultiCarousel, {
  Slide,
} from '@/app/(components)/(carousel)/MultiCarousel';
import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import genresApi from '@/modules/genres/genresApi';
import { GenresDetailType } from '@/modules/genres/genresType';
import { useEffect, useState } from 'react';

/* eslint-disable @next/next/no-img-element */
const TopicGenres = ({ title }: { title: string }) => {
  const dispatch = useAppDispatch();

  const [slides, setSlides] = useState<Slide[]>([]);

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

  useEffect(() => {
    if (getGenresListRaw && getGenresListRaw.length > 0) {
      var newGenres = getGenresListRaw.map((item: any) => ({
        id: item.id,
        img_url: item.image,
        title: item.title,
      }));
      setSlides(newGenres);
    }
  }, [getGenresListRaw]);

  // var updatedGenres = [...group]; // Create a copy of the original genres array
  // var targetGenres = updatedGenres[0]; // Assuming you want to modify the first genres
  //
  // Insert the new data into the slides array of the target genres
  // targetGenres.slides = newGenres;

  // console.log(targetGenres);
  // }

  return <MultiCarousel slides={slides} routeName="genres" />;
};

export default TopicGenres;
