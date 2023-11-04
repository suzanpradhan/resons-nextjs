import PostDetailComponent from '../../../../(components)/PostDetailComponent';

export default function EachPostLayout({
  params,
}: {
  params?: { id: number };
}) {
  return <PostDetailComponent params={params} />;
}
