const Explore = ({ title }: { title: string }) => {
  return (
    <div className="bg-white mb-5">
      <div className="flex flex-col px-8 py-5">
        <h3 className="text-[1.2rem] text-gray-800 font-bold py-0 mb-4 pb-3 capitalize border border-solid border-gray-300 border-t-0 border-l-0 border-r-0">
          {title}
        </h3>
        <div className="flex flex-nowrap mt-2 w-full overflow-y-auto gap-5">
          <a
            href="/library/1"
            className="flex flex-col items-center last-of-type:mr-0"
          >
            <div className="w-[150px] h-[150px] sm:w-[150px] sm:h-[150px] rounded-2xl overflow-hidden drop-shadow-xl">
              <img
                src="https://upload.wikimedia.org/wikipedia/en/6/63/Tool_-_Lateralus.jpg"
                alt=""
                className="w-[100%] h-[100%] object-cover"
              />
            </div>
            <h4 className="text-[1rem] w-max text-gray-800 font-bold py-0 my-3 capitalize">
              Psychodelic
            </h4>
          </a>
          <a
            href="/library/1"
            className="flex flex-col items-center last-of-type:mr-0"
          >
            <div className="w-[150px] h-[150px] sm:w-[150px] sm:h-[150px] rounded-2xl overflow-hidden drop-shadow-xl">
              <img
                src="https://res.cloudinary.com/ybmedia/image/upload/c_crop,h_1371,w_1500,x_0,y_0/c_scale,f_auto,q_auto,w_700/v1/m/0/4/048b7b7c950a997078f994b8b9b2f4ba477c6635/4-touch-too.jpg"
                alt=""
                className="w-[100%] h-[100%] object-cover"
              />
            </div>
            <h4 className="text-[1rem] w-max text-gray-800 font-bold py-0 my-3 capitalize">
              AC/DC Collection
            </h4>
          </a>
          <a
            href="/library/1"
            className="flex flex-col items-center last-of-type:mr-0"
          >
            <div className="w-[150px] h-[150px] sm:w-[150px] sm:h-[150px] rounded-2xl overflow-hidden drop-shadow-xl">
              <img
                src="https://upload.wikimedia.org/wikipedia/en/2/2a/Linkin_Park_Hybrid_Theory_Album_Cover.jpg"
                alt=""
                className="w-[100%] h-[100%] object-cover"
              />
            </div>
            <h4 className="text-[1rem] w-max text-gray-800 font-bold py-0 my-3 capitalize">
              Linkin Park Songs
            </h4>
          </a>
          <a
            href="/library/1"
            className="flex flex-col items-center last-of-type:mr-0"
          >
            <div className="w-[150px] h-[150px] sm:w-[150px] sm:h-[150px] rounded-2xl overflow-hidden drop-shadow-xl">
              <img
                src="https://upload.wikimedia.org/wikipedia/en/2/2a/Linkin_Park_Hybrid_Theory_Album_Cover.jpg"
                alt=""
                className="w-[100%] h-[100%] object-cover"
              />
            </div>
            <h4 className="text-[1rem] w-max text-gray-800 font-bold py-0 my-3 capitalize">
              Linkin Park Songs
            </h4>
          </a>
          <a
            href="/library/1"
            className="flex flex-col items-center last-of-type:mr-0"
          >
            <div className="w-[150px] h-[150px] sm:w-[150px] sm:h-[150px] rounded-2xl overflow-hidden drop-shadow-xl">
              <img
                src="https://upload.wikimedia.org/wikipedia/en/2/2a/Linkin_Park_Hybrid_Theory_Album_Cover.jpg"
                alt=""
                className="w-[100%] h-[100%] object-cover"
              />
            </div>
            <h4 className="text-[1rem] w-max text-gray-800 font-bold py-0 my-3 capitalize">
              Linkin Park Songs
            </h4>
          </a>
          <a
            href="/library/1"
            className="flex flex-col items-center last-of-type:mr-0"
          >
            <div className="w-[150px] h-[150px] sm:w-[150px] sm:h-[150px] rounded-2xl overflow-hidden drop-shadow-xl">
              <img
                src="https://upload.wikimedia.org/wikipedia/en/2/2a/Linkin_Park_Hybrid_Theory_Album_Cover.jpg"
                alt=""
                className="w-[100%] h-[100%] object-cover"
              />
            </div>
            <h4 className="text-[1rem] w-max text-gray-800 font-bold py-0 my-3 capitalize">
              Linkin Park Songs
            </h4>
          </a>
          <a
            href="/library/1"
            className="flex flex-col items-center last-of-type:mr-0"
          >
            <div className="w-[150px] h-[150px] sm:w-[150px] sm:h-[150px] rounded-2xl overflow-hidden drop-shadow-xl">
              <img
                src="https://upload.wikimedia.org/wikipedia/en/2/2a/Linkin_Park_Hybrid_Theory_Album_Cover.jpg"
                alt=""
                className="w-[100%] h-[100%] object-cover"
              />
            </div>
            <h4 className="text-[1rem] w-max text-gray-800 font-bold py-0 my-3 capitalize">
              Linkin Park Songs
            </h4>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Explore;
