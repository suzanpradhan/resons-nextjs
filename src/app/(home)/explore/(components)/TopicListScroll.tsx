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
          title: 'Slide 4',
        },
        {
          img_url:
            'https://cdn.create.vista.com/downloads/7cac6f71-10bc-4d55-9da8-10a67cb46cce_450.jpeg',
          title: 'Slide 4',
        },
        {
          img_url:
            'https://cdn.create.vista.com/downloads/7cac6f71-10bc-4d55-9da8-10a67cb46cce_450.jpeg',
          title: 'Slide 4',
        },
        {
          img_url:
            'https://cdn.create.vista.com/downloads/7cac6f71-10bc-4d55-9da8-10a67cb46cce_450.jpeg',
          title: 'Slide 4',
        },
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
      ],
    },
  ];

  // const group = [
  //   {
  //     groupTitle: title,
  //     slides: [{ img_url: '', title: '' }] as {
  //       img_url: string;
  //       title: string;
  //     }[],
  //   },
  // ];

  // useEffect(() => {
  //   const fetchData = async () => {
  //     await dispatch(genresApi.endpoints.getGenres.initiate());
  //   };

  //   fetchData();
  // }, [dispatch]);

  // const getGenresListRaw = useAppSelector(
  //   (state: RootState) =>
  //     state.baseApi.queries[`getGenres`]?.data as GenresDetailType[]
  // );

  // if (getGenresListRaw && getGenresListRaw.length > 0) {
  //   var newGenres = getGenresListRaw.map((item) => ({
  //     img_url:
  //       'https://marketplace.canva.com/EAEqlr422aw/1/0/1600w/canva-falling-modern-aesthetic-music-album-cover-KsRCFSNg4XA.jpg',
  //     title: item.title,
  //   }));

  //   var updatedGenres = [...group]; // Create a copy of the original genres array
  //   var targetGenres = updatedGenres[0]; // Assuming you want to modify the first genres

  //   // Insert the new data into the slides array of the target genres
  //   targetGenres.slides = newGenres;

  //   console.log(targetGenres);
  //   console.log(newGenres);
  // }

  return (
    <>
      <MultiCarousel slides={group} />
    </>
  );
};

export default TopicListScroll;
