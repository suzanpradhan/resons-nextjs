interface LanggatePostListType {
  title: string;
}

const LanguagePostList = ({ title }: LanggatePostListType) => {
  const group = [
    {
      groupTitle: title,
      slides: [
        {
          img_url:
            'https://marketplace.canva.com/EAEqlr422aw/1/0/1600w/canva-falling-modern-aesthetic-music-album-cover-KsRCFSNg4XA.jpg',
          title: 'English',
        },
        {
          img_url:
            'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/artistic-album-cover-design-template-d12ef0296af80b58363dc0deef077ecc_screen.jpg?ts=1561488440',
          title: 'Nepali',
        },
        {
          img_url:
            'https://images.template.net/wp-content/uploads/2022/06/Thriller-Album-Cover.jpg',
          title: 'Hindi',
        },
        {
          img_url:
            'https://cdn.create.vista.com/downloads/7cac6f71-10bc-4d55-9da8-10a67cb46cce_450.jpeg',
          title: 'Chinese',
        },
        {
          img_url:
            'https://cdn.create.vista.com/downloads/7cac6f71-10bc-4d55-9da8-10a67cb46cce_450.jpeg',
          title: 'Korean',
        },
        {
          img_url:
            'https://cdn.create.vista.com/downloads/7cac6f71-10bc-4d55-9da8-10a67cb46cce_450.jpeg',
          title: 'Spanish',
        },
        {
          img_url:
            'https://cdn.create.vista.com/downloads/7cac6f71-10bc-4d55-9da8-10a67cb46cce_450.jpeg',
          title: 'Telugu',
        },
        {
          img_url:
            'https://cdn.create.vista.com/downloads/7cac6f71-10bc-4d55-9da8-10a67cb46cce_450.jpeg',
          title: 'Mongolian',
        },
        {
          img_url:
            'https://marketplace.canva.com/EAEqlr422aw/1/0/1600w/canva-falling-modern-aesthetic-music-album-cover-KsRCFSNg4XA.jpg',
          title: 'Arabian',
        },
        {
          img_url:
            'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/artistic-album-cover-design-template-d12ef0296af80b58363dc0deef077ecc_screen.jpg?ts=1561488440',
          title: 'African',
        },
      ],
    },
  ];
  // return <MultiCarousel slides={group} routeName="languages" />;
  return <></>;
};

export default LanguagePostList;
