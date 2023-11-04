import { Facebook, Sound, Spotify, Youtube } from 'iconsax-react';
import Link from 'next/link';

const ProfileSocial = () => {
  return (
    <div>
      <div className="flex bg-transparent sm:bg-gray-100 rounded-full px-3 py-2 drop-shadow-2xl">
        <div className="icon-holder mr-2 last-of-type:mr-0">
          <Link href="">
            <Facebook size="21" color="#2374E1" variant="Bulk" />
          </Link>
        </div>
        <div className="icon-holder mr-2 last-of-type:mr-0">
          <Link href="">
            <Sound size="21" color="orange" variant="Bulk" />
          </Link>
        </div>
        <div className="icon-holder mr-2 last-of-type:mr-0">
          <Link href="">
            <Spotify size="21" color="green" variant="Bulk" />
          </Link>
        </div>
        <div className="icon-holder mr-2 last-of-type:mr-0">
          <Link href="">
            <Youtube size="21" color="red" variant="Bulk" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileSocial;
