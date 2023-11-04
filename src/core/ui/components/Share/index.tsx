import { ShareDetailType } from '@/modules/share/shareType';
import { Send2 } from 'iconsax-react';
interface ShareProps {
  shareProps: ShareDetailType;
}

function ShareButton(props: ShareProps) {
  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          // title: props.shareProps.title,
          // text: props.shareProps.user,
          url: window.location.href + props.shareProps.url,
        })
        .then(() => {
          console.log('Successfully shared');
        })
        .catch((error) => {
          console.error('Error sharing:', error);
        });
    } else {
      console.log('Web Share API not supported');
    }
  };

  return (
    <button onClick={handleShare}>
      <Send2 size="21" color="gray" variant="TwoTone" />
    </button>
  );
}

export default ShareButton;
