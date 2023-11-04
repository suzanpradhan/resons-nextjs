import Image from 'next/image';

export default function ImagePreview({ src, alt, ...props }: any) {
  const defaultImage = '/images/default.jpg'; // Provide a default image path

  // Handle image loading error
  const handleImageError = (e: any) => {
    e.target.onerror = null;
    e.target.src = defaultImage;
  };

  return (
    <Image
      src={src || defaultImage}
      alt={alt}
      onError={handleImageError}
      {...props}
    />
  );
}
