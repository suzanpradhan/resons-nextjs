import SearchBar from '@/app/(components)/SearchBar';
import { apiPaths } from '@/core/api/apiConstants';
import { authOptions } from '@/core/utils/authOptions';
import { getServerSession } from 'next-auth';
import PopularPostsSection from './(components)/PopularPostsSection';
import TopicGenres from './(components)/TopicGenres';

export default async function TopicPage() {
  const session = await getServerSession(authOptions);
  const res = await fetch(`${apiPaths.baseUrl}${apiPaths.popularPostUrl}`, {
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
  const postsListData = response.data.data;
  return (
    <div className="sm:container md:container lg:container mx-auto pt-10 flex flex-col h-full">
      <div className="overflow-y-scroll">
        <div className="sm:px-0 my-4">
          <SearchBar />
        </div>

        <TopicGenres title="Top Categories" />
        <PopularPostsSection postsListData={postsListData} />
        {/* <TopicListScroll title="More you like" />
        <LanguagePostList title="Explore by language" /> */}
      </div>
    </div>
  );
}
