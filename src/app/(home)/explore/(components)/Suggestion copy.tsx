/* eslint-disable @next/next/no-img-element */
const Suggestion = ({ title }: { title: string }) => {
  return (
    <div className="flex flex-col py-4 bg-white mx-4 rounded-xl">
      <h3 className="text-[1.2rem] text-gray-800 font-bold mb-4 pb-2 capitalize border border-solid border-gray-300 border-t-0 border-l-0 border-r-0 mx-4">
        {title}
      </h3>
      <div className="flex flex-nowrap w-full overflow-y-auto full-hide-scrollbar gap-4">
        <a
          href="/library/1"
          className="flex flex-col items-center last-of-type:mr-0 ml-4"
        >
          <div className="w-[150px] h-[150px] sm:w-[150px] sm:h-[150px] rounded-full overflow-hidden drop-shadow-xl">
            <img
              src="https://upload.wikimedia.org/wikipedia/en/6/63/Tool_-_Lateralus.jpg"
              alt=""
              className="w-[100%] h-[100%] object-cover"
            />
          </div>
          <h4 className="text-[1rem] w-max text-gray-800 font-bold py-0 my-3 capitalize">
            John Doe
          </h4>
          <button className="px-3 py-1 border-gray-300 text-sm text-gray-700 border">
            Follow
          </button>
        </a>
        <a
          href="/library/1"
          className="flex flex-col items-center last-of-type:mr-0"
        >
          <div className="w-[150px] h-[150px] sm:w-[150px] sm:h-[150px] rounded-full overflow-hidden drop-shadow-xl">
            <img
              src="https://upload.wikimedia.org/wikipedia/en/6/63/Tool_-_Lateralus.jpg"
              alt=""
              className="w-[100%] h-[100%] object-cover"
            />
          </div>
          <h4 className="text-[1rem] w-max text-gray-800 font-bold py-0 my-3 capitalize">
            John Doe
          </h4>
          <button className="px-3 py-1 border-gray-300 text-sm text-gray-700 border">
            Follow
          </button>
        </a>
        <a
          href="/library/1"
          className="flex flex-col items-center last-of-type:mr-0"
        >
          <div className="w-[150px] h-[150px] sm:w-[150px] sm:h-[150px] rounded-full overflow-hidden drop-shadow-xl">
            <img
              src="https://upload.wikimedia.org/wikipedia/en/6/63/Tool_-_Lateralus.jpg"
              alt=""
              className="w-[100%] h-[100%] object-cover"
            />
          </div>
          <h4 className="text-[1rem] w-max text-gray-800 font-bold py-0 my-3 capitalize">
            John Doe
          </h4>
          <button className="px-3 py-1 border-gray-300 text-sm text-gray-700 border">
            Follow
          </button>
        </a>
        <a
          href="/library/1"
          className="flex flex-col items-center last-of-type:mr-0"
        >
          <div className="w-[150px] h-[150px] sm:w-[150px] sm:h-[150px] rounded-full overflow-hidden drop-shadow-xl">
            <img
              src="https://upload.wikimedia.org/wikipedia/en/6/63/Tool_-_Lateralus.jpg"
              alt=""
              className="w-[100%] h-[100%] object-cover"
            />
          </div>
          <h4 className="text-[1rem] w-max text-gray-800 font-bold py-0 my-3 capitalize">
            John Doe
          </h4>
          <button className="px-3 py-1 border-gray-300 text-sm text-gray-700 border">
            Follow
          </button>
        </a>
        <a href="/library/1" className="flex flex-col items-center mr-4">
          <div className="w-[150px] h-[150px] sm:w-[150px] sm:h-[150px] rounded-full overflow-hidden drop-shadow-xl">
            <img
              src="https://upload.wikimedia.org/wikipedia/en/6/63/Tool_-_Lateralus.jpg"
              alt=""
              className="w-[100%] h-[100%] object-cover"
            />
          </div>
          <h4 className="text-[1rem] w-max text-gray-800 font-bold py-0 my-3 capitalize">
            John Doe
          </h4>
          <button className="px-3 py-1 border-gray-300 text-sm text-gray-700 border">
            Follow
          </button>
        </a>
      </div>
    </div>
  );
};

export default Suggestion;
