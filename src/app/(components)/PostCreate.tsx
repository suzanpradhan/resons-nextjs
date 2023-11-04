import { language_code, privacy_code } from '@/core/constants/appConstants';
import { useAppDispatch } from '@/core/redux/clientStore';
import { useSession } from 'next-auth/react';
import {
  ImageSquare,
  Microphone,
  PaperPlaneTilt,
  UploadSimple,
} from 'phosphor-react';
import { useState } from 'react';
import { toast } from 'react-toastify';

/* eslint-disable @next/next/no-img-element */
export default function PostCreate() {
  const dispatch = useAppDispatch();
  const session = useSession();
  const [isChecked, setIsChecked] = useState(false);
  const handleNotificationToggleChange = () => {
    setIsChecked(!isChecked);
    console.log(isChecked);
    // Hit the API here
    if (!isChecked) {
      try {
        console.log('');
      } catch (error) {
        // Handle error
        toast.success('Opps! cant set notification');
        setIsChecked(!isChecked);
        console.log(error);
      }
    }
  };

  return (
    <div className="bg-white rounded-md mt-6">
      <div className="py-4 px-6 border-0 border-gray-200 border-b">
        <h1 className="text-lg font-bold">Create Post</h1>
      </div>

      <div className="body">
        <div className="px-6 py-4">
          <div className="grid grid-cols-6 gap-4 place-items-stretch items-center">
            <div className="col-span-5 flex items-center">
              <div className="w-14 h-14 rounded-full overflow-hidden">
                <img
                  src="https://upload.wikimedia.org/wikipedia/en/e/e4/Ed_Sheeran_-_Subtract.png"
                  alt="profile-image"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="ml-3">
                <h3 className="text-lg text-black font-bold leading-5 flex items-center">
                  Ed Sheeran
                </h3>
              </div>
            </div>
            <div className="col-span-1 flex justify-self-end">
              <div className="relative w-8 h-8 bg-gray-200 flex items-center justify-center rounded-full">
                <ImageSquare size="21" color="#555" />
              </div>
            </div>
          </div>

          <div className="relative flex flex-col pt-4 pb-6">
            <label
              htmlFor="title"
              className="text-sm text-black font-bold mb-1"
            >
              Give a Title
            </label>
            <input
              id="title"
              type="text"
              
              name="title"
              placeholder="Type your title here"
              className="text-base md:text-lg text-black font-normal w-full pb-2 focus:outline-none bg-transparent border-0 border-b border-gray placeholder-gray placeholder:text-base placeholder:font-semibold"
              autoComplete=""
            />
            <p className="absolute bottom-0 right-0 text-black text-sm">
              0/150
            </p>
          </div>
        </div>

        <div className="pb-6 mx-6">
          <div>
            <div className="border-0 border-gray-400">
              <label
                htmlFor="description"
                className="text-sm text-black font-bold mb-1"
              >
                Description
              </label>
              <textarea
                name=""
                id="description"
                cols={25}
                className="w-full mt-2 text-base md:text-lg placeholder:text-base placeholder:font-semibold focus:outline-none"
                placeholder="Describe your post here"
              />
            </div>
            <div className="flex justify-start text-gray-600 font-bold text-lg gap-3">
              <span className="bg-gray-100 w-5 h-5 rounded-sm inline-flex items-center justify-center p-2 mt-1">
                @
              </span>
              <span className="bg-gray-100 w-5 h-5 rounded-sm inline-flex items-center justify-center p-2 mt-1">
                #
              </span>
            </div>
          </div>

          <div className="mt-4">
            <label className="text-sm text-black font-bold mb-1">
              Use AI voice on your audio
            </label>
            <div className="flex">
              <label
                htmlFor="autoSaver"
                className="autoSaverSwitch relative inline-flex cursor-pointer select-none items-center"
              >
                <input
                  type="checkbox"
                  name="autoSaver"
                  id="autoSaver"
                  className="sr-only"
                  checked={isChecked}
                  onChange={handleNotificationToggleChange}
                />
                <span
                  className={`slider flex h-5 w-8 items-center rounded-full bg-gray-200 p-1 duration-200`}
                >
                  <span
                    className={`dot h-3 w-3 rounded-full duration-200 transition-transform ${isChecked
                        ? 'transform translate-x-3 bg-[#848ef5]'
                        : 'bg-gray-400'
                      }`}
                  ></span>
                </span>
              </label>
              <span
                className={`label flex items-center text-sm font-bold leading-3 ${isChecked ? 'text-gray-600' : 'text-gray-400'
                  }`}
              >
                <span className="pl-1">{isChecked ? 'on' : 'off'}</span>
              </span>
            </div>
          </div>

          <div className="flex flex-col mt-4">
            <label
              htmlFor="topic"
              className="text-sm text-black font-bold mb-2"
            >
              Topic
            </label>
            <select
              name="topic"
              id="topic"
              className="text-sm text-black font-normal py-2 px-3 rounded-sm focus:outline-none bg-slate-200"
            >
              <option value="">Select topic</option>
              <option>Wedding</option>
              <option>Event</option>
              <option>Guide</option>
            </select>
          </div>

          <div className="flex flex-col mt-4">
            <label
              htmlFor="language"
              className="text-sm text-black font-bold mb-2"
            >
              Language
            </label>
            <select
              name="language"
              id="language"
              className="text-sm text-black font-normal py-2 px-3 rounded-sm focus:outline-none bg-slate-200"
            >
              <option value="">Select a language</option>
              {language_code?.length > 0
                ? language_code.map((value, index) => (
                  <option value={value.code} key={index}>
                    {value.name}
                  </option>
                ))
                : null}
            </select>
            <div className="mt-2 flex gap-2 items-center">
              <input
                type="checkbox"
                id="remember-language"
                className="w-4 h-4 text-cyan-600 bg-gray-100 border-gray-300 rounded focus:outline-none"
              />
              <label
                htmlFor="remember-language"
                className="text-sm text-black font-bold"
              >
                Remember my language
              </label>
            </div>
          </div>

          <div className="flex flex-col mt-4">
            <label
              htmlFor="topic"
              className="text-sm text-black font-bold mb-2"
            >
              Privacy
            </label>
            <select
              name="topic"
              id="topic"
              className="text-sm text-black font-normal py-2 px-3 rounded-sm focus:outline-none bg-slate-200"
            >
              {privacy_code?.length > 0
                ? privacy_code.map((value) => {
                  return (
                    <option value={value.id} key={value.id}>
                      {value.name}
                    </option>
                  );
                })
                : null}
            </select>
          </div>

          <div className="flex flex-col mt-4">
            <label className="text-sm text-black font-bold mb-2">
              Expiration
            </label>
            <ul className="flex items-center gap-1 w-full text-xs font-medium">
              <li className="w-full">
                <div className="flex items-center">
                  <input
                    id="day-expire"
                    type="radio"
                    value=""
                    name="list-radio"
                    className="hidden peer"
                  />
                  <label
                    htmlFor="day-expire"
                    className="w-full py-1 px-2 border border-gray-300 peer-checked:text-white peer-checked:bg-[#de5b6d] text-center"
                  >
                    Day{' '}
                  </label>
                </div>
              </li>
              <li className="w-full">
                <div className="flex items-center">
                  <input
                    id="week-expire"
                    type="radio"
                    value=""
                    name="list-radio"
                    className="hidden peer"
                  />
                  <label
                    htmlFor="week-expire"
                    className="w-full py-1 px-2 border border-gray-300 peer-checked:text-white peer-checked:bg-[#de5b6d] text-center"
                  >
                    Week
                  </label>
                </div>
              </li>
              <li className="w-full">
                <div className="flex items-center">
                  <input
                    id="month-expire"
                    type="radio"
                    value=""
                    name="list-radio"
                    className="hidden peer"
                  />
                  <label
                    htmlFor="month-expire"
                    className="w-full py-1 px-2 border border-gray-300 peer-checked:text-white peer-checked:bg-[#de5b6d] text-center"
                  >
                    Month
                  </label>
                </div>
              </li>
              <li className="w-full">
                <div className="flex items-center">
                  <input
                    id="year-expire"
                    type="radio"
                    value=""
                    name="list-radio"
                    className="hidden peer"
                  />
                  <label
                    htmlFor="year-expire"
                    className="w-full py-1 px-2 border border-gray-300 peer-checked:text-white peer-checked:bg-[#de5b6d] text-center"
                  >
                    Year
                  </label>
                </div>
              </li>
              <li className="w-full">
                <div className="flex items-center">
                  <input
                    id="never-expire"
                    type="radio"
                    value=""
                    name="list-radio"
                    className="hidden peer"
                  />
                  <label
                    htmlFor="never-expire"
                    className="w-full py-1 px-2 border border-gray-300 peer-checked:text-white peer-checked:bg-[#de5b6d] text-center"
                  >
                    Never
                  </label>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="py-6 mx-6 border-0 border-t border-gray-200">
        <div className="flex items-center justify-between gap-5">
          <div className="flex gap-3 items-center">
            <div className="relative w-8 h-8 bg-gray-200 flex items-center justify-center rounded-full">
              <UploadSimple size="21" color="#555" />
            </div>
            <div className="relative w-8 h-8 bg-gray-200 flex items-center justify-center rounded-full">
              <Microphone size="21" color="#555" />
            </div>
          </div>

          <div className="basis-2/3 w-full">
            <button type="submit" className="bg-[#478ba2] w-full text-base text-white px-4 py-2 rounded-sm">
              <PaperPlaneTilt
                size="21"
                color="white"
                className="inline-block mr-1"
              />
              Post data now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
