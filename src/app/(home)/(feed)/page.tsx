import { apiPaths } from '@/core/api/apiConstants';
import FeedPostListing from '../(components)/FeedPostListing';

export default async function HomePage() {
  const res = await fetch(
    `${apiPaths.baseUrl}${apiPaths.postUrl}?page=1&paginate=${10}`,
    { next: { revalidate: 60 } }
  );
  const response = await res.json();
console.log(response);

  return <FeedPostListing preloadedPosts={response?.data} />;
}
