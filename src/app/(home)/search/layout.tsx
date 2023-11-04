
import AppBar from '@/app/(components)/AppBar';
export default function NotificationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>
  <div className="relative h-[calc(100dvh)] max-h-screen overflow-hidden">
        <AppBar />
        <div
          id="homePageScroller"
          className={`absolute transition-all duration-200 ease-in-out w-full -translate-x-full'
            } h-[calc(100dvh)] top-0`}
        >
          {children}
        </div>
      </div>
  </>;
}
