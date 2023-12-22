import { useAppDispatch } from '@/core/redux/clientStore';

/* eslint-disable @next/next/no-img-element */
const TopicListScroll = ({ title }: { title: string }) => {
  const dispatch = useAppDispatch();

  const group = [
    {
      groupTitle: title,
      slides: [
        {
          img_url:
            'https://marketplace.canva.com/EAEqlr422aw/1/0/1600w/canva-falling-modern-aesthetic-music-album-cover-KsRCFSNg4XA.jpg',
          title: 'Slide 1',
        },
        {
          img_url:
            'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/artistic-album-cover-design-template-d12ef0296af80b58363dc0deef077ecc_screen.jpg?ts=1561488440',
          title: 'Slide 2',
        },
        {
          img_url:
            'https://images.template.net/wp-content/uploads/2022/06/Thriller-Album-Cover.jpg',
          title: 'Slide 3',
        },
        {
          img_url:
            'https://cdn.create.vista.com/downloads/7cac6f71-10bc-4d55-9da8-10a67cb46cce_450.jpeg',
          title: 'Slide 4',
        },
        {
          img_url:
            'https://cdn.create.vista.com/downloads/7cac6f71-10bc-4d55-9da8-10a67cb46cce_450.jpeg',
          title: 'Slide 5',
        },
        {
          img_url:
            'https://cdn.create.vista.com/downloads/7cac6f71-10bc-4d55-9da8-10a67cb46cce_450.jpeg',
          title: 'Slide 6',
        },
        {
          img_url:
            'https://cdn.create.vista.com/downloads/7cac6f71-10bc-4d55-9da8-10a67cb46cce_450.jpeg',
          title: 'Slide 7',
        },
        {
          img_url:
            'https://cdn.create.vista.com/downloads/7cac6f71-10bc-4d55-9da8-10a67cb46cce_450.jpeg',
          title: 'Slide 8',
        },
        {
          img_url:
            'https://marketplace.canva.com/EAEqlr422aw/1/0/1600w/canva-falling-modern-aesthetic-music-album-cover-KsRCFSNg4XA.jpg',
          title: 'Slide 9',
        },
        {
          img_url:
            'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/artistic-album-cover-design-template-d12ef0296af80b58363dc0deef077ecc_screen.jpg?ts=1561488440',
          title: 'Slide 10',
        },
      ],
    },
  ];

  // return <MultiCarousel slides={group} routeName="likes" />;
  return <></>;
};

export default TopicListScroll;
