import { signIn } from 'next-auth/react';
import Image from 'next/image';
import googleLogo from '../../../public/images/search.png';

export function GoogleSignInButton() {
  const handleClick = () => {
    signIn('google');
  };
  return (
    <button
      onClick={handleClick}
      className="flex gap-2 items-center justify-center w-full max-w-md py-2 px-3 bg-white border-gray-300 border text-black text-base font-medium rounded-sm"
    >
      <Image
        src={googleLogo}
        alt="icon"
        width={20}
        height={20}
        className="w-5 h-5 object-contain"
      />{' '}
      Continue with Google
    </button>
  );
}
