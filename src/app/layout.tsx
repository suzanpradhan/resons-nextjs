import Notification from '@/core/ui/components/notification';
// import 'react-dropdown/style.css';
import Provider from '@/core/redux/provider';
import { Poppins } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import 'react-toastify/dist/ReactToastify.css';
import './globals.css';

export const metadata = {
  title: 'Resons',
  applicationName: 'Resons',
  description: 'Cloud of Voices',
  manifest: '/manifest.json',
  appleWebApp: true,
  formatDetection: {
    telephone: false,
  },
  themeColor: '#000000',
  // shortcutIcon: '/favicon.ico',
};

const poppins = Poppins({
  variable: '--font-poppins',
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
});

// const sfProDisplay = localFont({
//   src: [
//     {
//       path: '../../public/fonts/SF-Pro-Display-Thin.otf',
//       weight: '200',
//     },
//     {
//       path: '../../public/fonts/SF-Pro-Display-Light.otf',
//       weight: '300',
//     },
//     {
//       path: '../../public/fonts/SF-Pro-Display-Regular.otf',
//       weight: '400',
//     },
//     {
//       path: '../../public/fonts/SF-Pro-Display-Medium.otf',
//       weight: '500',
//     },
//     {
//       path: '../../public/fonts/SF-Pro-Display-Semibold.otf',
//       weight: '600',
//     },
//     {
//       path: '../../public/fonts/SF-Pro-Display-Bold.otf',
//       weight: '700',
//     },
//     {
//       path: '../../public/fonts/SF-Pro-Display-Heavy.otf',
//       weight: '800',
//     },
//     {
//       path: '../../public/fonts/SF-Pro-Display-Black.otf',
//       weight: '900',
//     },
//   ],
//   variable: '--font-sfProDisplay',
// });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} font-sans`}>
      <body className="bg-whiteShade">
        <NextTopLoader
          color="#de5b6d"
          initialPosition={0.08}
          crawlSpeed={200}
          height={4}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #de5b6d,0 0 5px #de5b6d"
        />
        <Notification />
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
