import MultiCarouselAlt from '@/app/(components)/(carousel)/MultiCarouselAlt';

/* eslint-disable @next/next/no-img-element */
const Suggestion = ({ title }: { title: string }) => {
  const group = [
    {
      groupTitle: title,
      slides: [
        {
          id: 1,
          img_url:
            'data:image/jpeg;base64,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',
          title: 'Kung Fu Panda',
          follow_count: 4506,
        },
        {
          id: 1,
          img_url:
            'https://images.mubicdn.net/images/cast_member/16515/cache-4006-1606461441/image-w856.jpg',
          title: 'Will Smith',
          follow_count: 1450,
        },
        {
          id: 1,
          img_url: 'https://placekitten.com/205/200',
          title: 'John Doe',
          follow_count: 650,
        },
        {
          id: 1,
          img_url:
            'https://static.standard.co.uk/2022/08/18/12/ron-harry-potter-35799188-1518-916.jpg?width=968&auto=webp&quality=50&crop=968%3A645%2Csmart',
          title: 'Harry Potter',
          follow_count: 2369,
        },
        {
          id: 1,
          img_url:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbl8jtzEUZRuqF7qAlSQ2YaU7eRSwnSz-9leEDQ9td3KU1dfRL3-GCZ1NFOCFFJYgYty0&usqp=CAU',
          title: 'Professor Dumledore',
          follow_count: 3654,
        },
        {
          id: 1,
          img_url:
            'https://img.asmedia.epimg.net/resizer/HuI2lDxJIQdjvdcKGF9E-cEgOdk=/1472x1104/cloudfront-eu-central-1.images.arcpublishing.com/diarioas/6QQALBL24FESZKKBLK3Q2PBXSE.jpg',
          title: 'Thanos',
          follow_count: 5523,
        },
      ],
    },
  ];
  // circle must be type boolean
  return <MultiCarouselAlt slides={group} circle={true} />;
};

export default Suggestion;
