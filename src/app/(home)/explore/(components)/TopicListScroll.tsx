import MultiCarousel from '@/app/(components)/(carousel)/MultiCarousel';
import { useAppDispatch } from '@/core/redux/clientStore';

/* eslint-disable @next/next/no-img-element */
const TopicListScroll = ({ title }: { title: string }) => {
  const dispatch = useAppDispatch();

  const group = [
    {
      groupTitle: title,
      slides: [
        {
          image:
            'https://marketplace.canva.com/EAEqlr422aw/1/0/1600w/canva-falling-modern-aesthetic-music-album-cover-KsRCFSNg4XA.jpg',
          title: 'Slide 1',
        },
        {
          image:
            'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/artistic-album-cover-design-template-d12ef0296af80b58363dc0deef077ecc_screen.jpg?ts=1561488440',
          title: 'Slide 2',
        },
        {
          image:
            'https://images.template.net/wp-content/uploads/2022/06/Thriller-Album-Cover.jpg',
          title: 'Slide 3',
        },
        {
          image:
            'https://cdn.create.vista.com/downloads/7cac6f71-10bc-4d55-9da8-10a67cb46cce_450.jpeg',
          title: 'Slide 4',
        },
        {
          image:
            'https://cdn.create.vista.com/downloads/7cac6f71-10bc-4d55-9da8-10a67cb46cce_450.jpeg',
          title: 'Slide 5',
        },
        {
          image:
            'https://cdn.create.vista.com/downloads/7cac6f71-10bc-4d55-9da8-10a67cb46cce_450.jpeg',
          title: 'Slide 6',
        },
        {
          image:
            'https://cdn.create.vista.com/downloads/7cac6f71-10bc-4d55-9da8-10a67cb46cce_450.jpeg',
          title: 'Slide 7',
        },
        {
          image:
            'https://cdn.create.vista.com/downloads/7cac6f71-10bc-4d55-9da8-10a67cb46cce_450.jpeg',
          title: 'Slide 8',
        },
        {
          image:
            'https://marketplace.canva.com/EAEqlr422aw/1/0/1600w/canva-falling-modern-aesthetic-music-album-cover-KsRCFSNg4XA.jpg',
          title: 'Slide 9',
        },
        {
          image:
            'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/artistic-album-cover-design-template-d12ef0296af80b58363dc0deef077ecc_screen.jpg?ts=1561488440',
          title: 'Slide 10',
        },
      ],
    },
  ];

  return <MultiCarousel slides={group} routeName="likes" />;
};

export default TopicListScroll;
