'use client';
import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import notificationApi from '@/modules/notification/notificationApi';
import profileApi from '@/modules/profile/profileApi';
import { ProfileDetailType } from '@/modules/profile/profileType';
import { useRouter } from 'next/navigation';
import { CaretLeft } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function NotificationPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    dispatch(profileApi.endpoints.getMyProfile.initiate());
  }, [dispatch]);

  const myProfile = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries['getMyProfile(undefined)']
        ?.data as ProfileDetailType
  );

  useEffect(() => {
    if (myProfile) {
      const notificationValue =
        myProfile.settings &&
        myProfile.settings.find((setting) => setting.key === 'NOTIFICATION')
          ?.value;

      if (notificationValue === 'allow') {
        setIsChecked(true);
      }

      if (notificationValue === 'deny') {
        setIsChecked(false);
      }
    }
  }, [myProfile]);

  const handleNotificationToggleChange = () => {
    setIsChecked(!isChecked);
    console.log(isChecked);
    // Hit the API here
    if (!isChecked) {
      try {
        dispatch(
          notificationApi.endpoints.setNotification.initiate({
            key: 'NOTIFICATION',
            value: 'allow',
          })
        );
      } catch (error) {
        // Handle error
        toast.success('Opps! cant set notification');
        setIsChecked(!isChecked);
        console.log(error);
      }
    } else {
      try {
        dispatch(
          notificationApi.endpoints.setNotification.initiate({
            key: 'NOTIFICATION',
            value: 'deny',
          })
        );
      } catch (error) {
        // Handle error
        toast.success('Opps! cant set notification');
        setIsChecked(!isChecked);
        console.log(error);
      }
    }
  };

  return (
    <div className="sm:container md:container lg:container mx-auto h-full">
      <h2 className="h-11 w-full px-4 bg-white shadow-sm flex gap-2 mb-0 fixed z-50">
        <span
          onClick={() => router.back()}
          className="text-3xl font-light flex items-center"
        >
          <CaretLeft size={18} weight="bold" />
        </span>
        <span className="text-sm font-medium flex items-center">
          Notifications Settings
        </span>
      </h2>

      <div className="overflow-y-scroll h-screen px-4 bg-white pt-11">
        <h3 className="text-sm font-semibold text-gray-700 my-4">
          Notifications
        </h3>
        <div className="flex flex-col gap-5">
          <div className="bg-slate-100 rounded-lg overflow-hidden px-4 py-2">
            <div className="flex justify-between gap-6">
              <div className="flex flex-col gap-2">
                <h3 className="text-sm font-medium text-gray-700 block">
                  Enable Notification
                </h3>
                <p className="text-xs font-normal text-gray-500 block">
                  You can enable or disable all Notification and Alerts here.
                  You can change this setting any time.
                </p>
              </div>
              <form>
                <label
                  htmlFor="autoSaver"
                  className="autoSaverSwitch relative cursor-pointer select-none flex flex-col gap-1"
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
                    className={`slider flex h-[26px] w-[45px] items-center rounded-full bg-gray-200 p-1 duration-200`}
                  >
                    <span
                      className={`dot h-[18px] w-[18px] rounded-full duration-200 transition-transform ${
                        isChecked
                          ? 'transform translate-x-[18px] bg-[#d8566c]'
                          : 'bg-gray-500'
                      }`}
                    ></span>
                  </span>
                  <span className="label flex items-center text-sm font-medium text-black">
                    <span
                      className={`${
                        isChecked
                          ? 'bg-[#d8566c] text-white'
                          : 'bg-gray-500 text-white'
                      } px-2 py-1 rounded-md text-xs w-full text-center`}
                    >
                      {isChecked ? 'On' : 'Off'}
                    </span>
                  </span>
                </label>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
