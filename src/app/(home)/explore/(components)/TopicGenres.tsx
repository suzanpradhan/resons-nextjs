import MultiCarousel from '@/app/(components)/(carousel)/MultiCarousel';
import { apiPaths } from '@/core/api/apiConstants';
import { authOptions } from '@/core/utils/authOptions';
import { getServerSession } from 'next-auth';

interface TopicGenresType {
  title: string;
}

/* eslint-disable @next/next/no-img-element */
const TopicGenres = async ({ title }: TopicGenresType) => {
  const session = await getServerSession(authOptions);
  const res = await fetch(`${apiPaths.baseUrl}${apiPaths.getGenresUrl}`, {
    next: { revalidate: 60 },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      ...(session?.user?.token && {
        Authorization: 'Bearer ' + session?.user?.token,
      }),
    },
  });
  const response = await res.json();
  const genreListRaw = response.data;
  const group = [
    {
      groupTitle: title,
      slides: genreListRaw as {
        id: number;
        image: string;
        title: string;
      }[],
    },
  ];

  console.log(group);

  return <MultiCarousel slides={group} routeName="genres" />;
};

export default TopicGenres;
