import { apiPaths } from '@/core/api/apiConstants';
import { authOptions } from '@/core/utils/authOptions';
import { getServerSession } from 'next-auth';
import FeedPostListing from '../(components)/FeedPostListing';

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  const res = await fetch(
    `${apiPaths.baseUrl}${
      session?.user?.token ? apiPaths.myFeedUrl : apiPaths.postUrl
    }?page=1&paginate=${10}`,
    {
      next: { revalidate: 60 },
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        ...(session?.user?.token && {
          Authorization: 'Bearer ' + session?.user?.token,
        }),
      },
    }
  );
  const response = await res.json();

  return <FeedPostListing preloadedPosts={response?.data} />;
}
