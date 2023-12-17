import MultiCarousel from '@/app/(components)/(carousel)/MultiCarousel';

interface LanggatePostListType {
  title: string;
}

const LanguagePostList = ({ title }: LanggatePostListType) => {
  const group = [
    {
      groupTitle: title,
      slides: [
        {
          image:
            'https://marketplace.canva.com/EAEqlr422aw/1/0/1600w/canva-falling-modern-aesthetic-music-album-cover-KsRCFSNg4XA.jpg',
          title: 'English',
        },
        {
          image:
            'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/artistic-album-cover-design-template-d12ef0296af80b58363dc0deef077ecc_screen.jpg?ts=1561488440',
          title: 'Nepali',
        },
        {
          image:
            'https://images.template.net/wp-content/uploads/2022/06/Thriller-Album-Cover.jpg',
          title: 'Hindi',
        },
        {
          image:
            'https://cdn.create.vista.com/downloads/7cac6f71-10bc-4d55-9da8-10a67cb46cce_450.jpeg',
          title: 'Chinese',
        },
        {
          image:
            'https://cdn.create.vista.com/downloads/7cac6f71-10bc-4d55-9da8-10a67cb46cce_450.jpeg',
          title: 'Korean',
        },
        {
          image:
            'https://cdn.create.vista.com/downloads/7cac6f71-10bc-4d55-9da8-10a67cb46cce_450.jpeg',
          title: 'Spanish',
        },
        {
          image:
            'https://cdn.create.vista.com/downloads/7cac6f71-10bc-4d55-9da8-10a67cb46cce_450.jpeg',
          title: 'Telugu',
        },
        {
          image:
            'https://cdn.create.vista.com/downloads/7cac6f71-10bc-4d55-9da8-10a67cb46cce_450.jpeg',
          title: 'Mongolian',
        },
        {
          image:
            'https://marketplace.canva.com/EAEqlr422aw/1/0/1600w/canva-falling-modern-aesthetic-music-album-cover-KsRCFSNg4XA.jpg',
          title: 'Arabian',
        },
        {
          image:
            'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/artistic-album-cover-design-template-d12ef0296af80b58363dc0deef077ecc_screen.jpg?ts=1561488440',
          title: 'African',
        },
      ],
    },
  ];
  return <MultiCarousel slides={group} routeName="languages" />;
};

export default LanguagePostList;
