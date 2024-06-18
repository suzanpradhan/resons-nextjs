'use client';

import { apiPaths } from '@/core/api/apiConstants';
import { language_code, privacy_code } from '@/core/constants/appConstants';
import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import countriesApi from '@/modules/countries/countriesApi';
import { CountriesDetailType } from '@/modules/countries/countriesType';
import notificationApi from '@/modules/notification/notificationApi';
import postDeleteApi from '@/modules/postDelete/postDeleteApi';
import profileApi from '@/modules/profile/profileApi';
import { ProfileDetailType } from '@/modules/profile/profileType';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
// import DatePicker from 'react-datepicker';
import { toast } from 'react-toastify';
const supportedImageTypes = [
  'image/png',
  'image/jpeg',
  'image/gif',
  'image/webp',
];

// import 'react-datepicker/dist/react-datepicker.css';

/* eslint-disable @next/next/no-img-element */
export default function SettingPage() {
  const dispatch = useAppDispatch();
  const session = useSession();
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPrivacy, setIsLoadingPrivacy] = useState(false);
  const [isLoadingPasswordChange, setIsLoadingPasswordChange] = useState(false);

  // const [countriesList, setCountriesList] = useState<CountriesDetailType[]>([]);
  const [errors, setErrors] = useState({
    fullname: '',
    dob: '',
    image: '',
  });

  const [passwordFormErrors, setPasswordFormErrors] = useState({
    current_password: '',
    password: '',
    confirm_password: '',
  });

  const navigate = useRouter();

  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [fullname, setFullname] = useState<string>('');
  const [phone, setPhone] = useState<string | undefined>('');
  const [image, setImage] = useState<File | undefined>(undefined);
  const [username, setUsername] = useState<string | undefined>('');
  const [selectedCountry, setSelectedCountry] = useState<number | undefined>(0);
  const [language, setLanguage] = useState<string | undefined>('');
  const [privacy, setPrivacy] = useState<string>('0');
  const [dateOfBirth, setDateOfBirth] = useState<string | undefined>('');
  const [imagePreview, setImagePreview] = useState<string | undefined>(
    undefined
  );

  const handleLogout = async () => {
    signOut({ callbackUrl: '/login', redirect: true });
  };

  const handleFullNameChange = (event: any) => {
    const fullnameValue = event.target.value;

    setFullname(fullnameValue);

    if (!fullnameValue) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        fullname: 'Full name is required.',
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, fullname: '' }));
    }
  };

  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    console.log('file', file);
    if (file) {
      if (supportedImageTypes.includes(file.type)) {
        const imageUrl = URL.createObjectURL(file);
        setImagePreview(imageUrl);
        setErrors((prevErrors) => ({ ...prevErrors, image: '' }));
        setImage(event.target.files[0]);
      } else {
        setImagePreview('');
        setErrors((prevErrors) => ({
          ...prevErrors,
          image: 'Please select a .png/.jpg/.webp/.gif file.',
        }));
      }
    }
  };

  const handlePhoneChange = (event: any) => {
    setPhone(event.target.value);
  };

  const handleDOBChange = (event: any) => {
    setDateOfBirth(event.target.value);
  };

  const handleUsernameChange = (event: any) => {
    setUsername(event.target.value);
  };

  const handleCountryChange = (event: any) => {
    const selectedValue = event.target.value;
    setSelectedCountry(selectedValue);
  };

  const handleLanguageChange = (event: any) => {
    setLanguage(event.target.value);
  };

  const handleSubmit = async (event: any) => {
    if (!fullname) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        fullname: 'Full name is required.',
      }));
      return;
    }
    setIsLoading(true);
    event.preventDefault();
    const csrfToken = await fetch(`${apiPaths.rootPath}${apiPaths.csrfPath}`);

    if (csrfToken?.status === 204) {
      try {
        const data = await Promise.resolve(
          dispatch(
            profileApi.endpoints.updateProfile.initiate({
              name: fullname,
              profile_image: image,
              user_language: language,
              nickname: username,
              phone_number: phone,
              date_of_birth: dateOfBirth,
              country_id: selectedCountry,
              religion: '',
              about: '',
            })
          )
        );
        if ('data' in data && data.data.data.user) {
          await session.update({
            user: {
              ...session.data?.user,
              profile_image: data.data.data.user.profile_image,
              name: data.data.data.user.name,
            },
          });
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setIsLoading(false);
      toast.error('Failed to Login');
    }
    setIsLoading(false);
  };

  const handleCurrentPasswordChange = (event: any) => {
    const currentPasswordValue = event.target.value;

    setCurrentPassword(currentPasswordValue);

    if (!currentPasswordValue) {
      setPasswordFormErrors((prevErrors) => ({
        ...prevErrors,
        current_password: 'Current Password is required.',
      }));
    } else {
      setPasswordFormErrors((prevErrors) => ({
        ...prevErrors,
        current_password: '',
      }));
    }
  };

  const handleNewPasswordChange = (event: any) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event: any) => {
    setConfirmPassword(event.target.value);
  };

  const handlePasswordChangeSubmit = async (event: any) => {
    setIsLoadingPasswordChange(true);
    event.preventDefault();
    if (currentPassword === '') {
      setPasswordFormErrors((prevErrors) => ({
        ...prevErrors,
        current_password: 'Current Password is required.',
      }));
      setIsLoadingPasswordChange(false);
      return false;
    }
    if (newPassword === '') {
      setPasswordFormErrors((prevErrors) => ({
        ...prevErrors,
        password: 'Password is required.',
      }));
      setIsLoadingPasswordChange(false);
      return false;
    }
    // Check if the passwords match
    if (newPassword === confirmPassword) {
      setPasswordFormErrors((prevErrors) => ({
        ...prevErrors,
        confirm_password: '',
      }));
      const csrfToken = await fetch(`${apiPaths.rootPath}${apiPaths.csrfPath}`);

      if (csrfToken?.status === 204) {
        try {
          await Promise.resolve(
            dispatch(
              profileApi.endpoints.myPasswordChange.initiate({
                current_password: currentPassword,
                password: newPassword,
                password_confirmation: confirmPassword,
              })
            )
          );
          setCurrentPassword('');
          setNewPassword('');
          setConfirmPassword('');
        } catch (error) {
          console.log(error);
        }
      } else {
        setIsLoading(false);
        toast.error('Failed to Login');
      }
    } else {
      // Passwords don't match, set validation error message
      setPasswordFormErrors((prevErrors) => ({
        ...prevErrors,
        confirm_password: 'Confirm password does not match.',
      }));
    }

    setIsLoadingPasswordChange(false);
  };

  const handlePrivacyChange = (event: any) => {
    setPrivacy(event.target.value);
  };

  const handleAccountPrivacySubmit = async (event: any) => {
    setIsLoadingPrivacy(true);
    event.preventDefault();
    try {
      await Promise.resolve(
        dispatch(
          notificationApi.endpoints.setNotification.initiate({
            key: 'PROFILE_VISIBILITY',
            value: privacy,
          })
        )
      );
      toast.success('Account privacy changed');
    } catch (error) {
      toast.success('Opps! cant set account privacy');
      console.log(error);
    }
    setIsLoadingPrivacy(false);
  };

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
      setFullname(myProfile.name);
      setPhone(myProfile.phone_number);
      setUsername(myProfile.nickname);
      setLanguage(myProfile.user_language);
      setDateOfBirth(myProfile.date_of_birth);
      setImagePreview(myProfile.profile_image);

      if (myProfile.country && myProfile.country.id) {
        setSelectedCountry(myProfile.country.id);
        console.log('here');
      } else {
        setSelectedCountry(0);
      }

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

      const accountPrivacyValue =
        myProfile.settings &&
        myProfile.settings.find(
          (setting) => setting.key === 'PROFILE_VISIBILITY'
        )?.value;

      setPrivacy(accountPrivacyValue ?? '0');
    }
  }, [myProfile]);

  useEffect(() => {
    dispatch(countriesApi.endpoints.getCountriesList.initiate());
  }, [dispatch]);

  const getCountriesList = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries[`getCountriesList`]?.data as CountriesDetailType[]
  );

  const handleAllPostDelete = async () => {
    try {
      await dispatch(postDeleteApi.endpoints.allPostDelete.initiate());
      toast.success('All post deleted');
    } catch (error) {
      // Handle error
      toast.error('Opps! cant delete post');
      console.log(error);
    }
  };

  const handleAccountDelete = async () => {
    try {
      await dispatch(profileApi.endpoints.accountDelete.initiate());
      toast.success('All account deleted');
      handleLogout();
      //navigate.push('/login');
    } catch (error) {
      // Handle error
      toast.success('Opps! cant delete account');
      console.log(error);
    }
  };

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
        toast.success('Notification disable');
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
        toast.success('Notification enable');
      } catch (error) {
        // Handle error
        toast.success('Opps! cant set notification');
        setIsChecked(!isChecked);
        console.log(error);
      }
    }
  };

  // const [startDate, setStartDate] = useState(new Date());

  return (
    <div className="sm:container md:container lg:container mx-auto flex flex-col h-full">
      <div className="overflow-y-scroll pb-16 md:pb-0 pt-11">
        <div className="flex flex-col md:flex-row md:justify-start md:items-start px-5 py-5 bg-white mb-5">
          <div className="rounded-sm py-2 basis-2/6 w-full md:mr-5">
            <h3 className="text-base text-gray-700 font-bold">
              Personal Detail
            </h3>
            <p className="text-sm text-gray-500 font-normal">
              Use a permanent address where you can receive mail.
            </p>
          </div>
          <div className="md:mt-0 md:py-0 mt-4 py-4 basis-4/6 w-full">
            <form onSubmit={handleSubmit}>
              <div className="flex justify-start items-center">
                <div className="w-full basis-2/6 sm:basis-1/6 mr-4">
                  <div className=" w-max h-max border-solid border border-gray-300 rounded-md drop-shadow-2xl p-[3px]">
                    <div className="w-[100px] h-[100px] rounded-sm overflow-hidden">
                      <img
                        src={
                          imagePreview && imagePreview != null
                            ? imagePreview
                            : '/images/avatar.jpg'
                        }
                        alt="post_owner_avatar"
                        onError={(e) => {
                          (e.target as any).onError = null;
                          (e.target as any).src = '/images/avatar.jpg';
                        }}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full basis-4/6 sm:basis-5/6">
                  <label
                    htmlFor="change-avatar"
                    className="py-2 px-3 text-sm text-white bg-gray-700 font-bold rounded-sm"
                  >
                    Change avatar
                  </label>
                  <input
                    id="change-avatar"
                    type="file"
                    name="profile_image"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <p className="text-sm font-bold pt-2 text-gray-700">
                    JPG, GIF or PNG. 1MB max.
                  </p>
                  {errors.image && (
                    <p className="text-sm font-bold pt-2 text-red-700">
                      {errors.image}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-col pt-4 py-2">
                <label
                  htmlFor="fullname"
                  className="text-sm text-gray-700 font-bold mb-1"
                >
                  Full Name
                </label>
                <input
                  id="fullname"
                  type="text"
                  name="fullname"
                  value={fullname ?? ''}
                  onChange={handleFullNameChange}
                  placeholder="Type your fullname here"
                  className="text-sm text-gray-700 font-normal py-2 px-3 rounded-sm focus:outline-none bg-slate-200"
                  autoComplete=""
                />
                {errors.fullname && (
                  <p className="text-sm font-bold pt-2 text-red-700">
                    {errors.fullname}
                  </p>
                )}
              </div>
              <div className="flex flex-col py-2">
                <label
                  htmlFor="phone"
                  className="text-sm text-gray-700 font-bold mb-1"
                >
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="text"
                  name="phone"
                  value={phone ?? ''}
                  onChange={handlePhoneChange}
                  placeholder="Type your phone number here"
                  className="text-sm text-gray-700 font-normal py-2 px-3 rounded-sm focus:outline-none bg-slate-200"
                />
              </div>
              <div className="flex flex-col py-2">
                <label
                  htmlFor="username"
                  className="text-sm text-gray-700 font-bold mb-1"
                >
                  Username
                </label>
                <div className="">
                  <label
                    htmlFor="username"
                    className="flex rounded-md border-gray-300 border-[1px] items-center m-0 bg-slate-200 text-sm text-gray-400 font-normal pl-3  "
                  >
                    <span>https://resons.com/</span>
                    <input
                      id="username"
                      type="text"
                      name="username"
                      value={username ?? ''}
                      onChange={handleUsernameChange}
                      className="bg-slate-200 !border-0 inline w-full text-sm text-gray-700 font-normal py-2 pr-3 rounded-sm outline-none "
                      autoComplete=""
                    />
                  </label>
                </div>
              </div>
              <div className="flex flex-col py-2">
                <label
                  htmlFor="dateOfBirth"
                  className="text-sm text-gray-700 font-bold mb-1"
                >
                  Date of birth
                </label>
                <input
                  id="dateOfBirth"
                  name="date_of_birth"
                  type="date"
                  value={dateOfBirth ?? ''}
                  onChange={handleDOBChange}
                  placeholder="yy-mm-dd"
                  className="text-sm text-gray-700 font-normal py-2 px-3 rounded-sm focus:outline-none bg-slate-200"
                />
              </div>
              <div className="flex flex-col py-2">
                <label
                  htmlFor="country"
                  className="text-sm text-gray-700 font-bold mb-1"
                >
                  Country
                </label>
                <select
                  name="country"
                  id="country"
                  onChange={handleCountryChange}
                  className="text-sm text-gray-700 font-normal py-2 px-3 rounded-sm focus:outline-none bg-slate-200"
                  value={selectedCountry ?? ''}
                >
                  <option value="">Select a country</option>
                  {getCountriesList &&
                    getCountriesList.length > 0 &&
                    getCountriesList.map((country) => (
                      <option value={country.id} key={country.id}>
                        {country.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="flex flex-col py-2">
                <label
                  htmlFor="language"
                  className="text-sm text-gray-700 font-bold mb-1"
                >
                  Language
                </label>
                <select
                  name="language"
                  id="language"
                  onChange={handleLanguageChange}
                  value={language ?? ''}
                  className="text-sm text-gray-700 font-normal py-2 px-3 rounded-sm focus:outline-none bg-slate-200"
                  autoComplete=""
                >
                  <option value="">Select a country</option>
                  {language_code?.length > 0
                    ? language_code.map((value, index) => (
                        <option value={value.code} key={index}>
                          {value.name}
                        </option>
                      ))
                    : null}
                </select>
              </div>
              <div className="py-2">
                <button
                  type="submit"
                  className="bg-[#848ef5] py-2 px-3 text-white rounded-md"
                >
                  {isLoading ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:justify-start md:items-start px-5 py-5 border-0 border-b border-gray-300 bg-white my-5">
          <div className="rounded-sm py-2 basis-2/6 w-full md:mr-5">
            <h3 className="text-base text-gray-700 font-bold">
              Change Password
            </h3>
            <p className="text-sm text-gray-500 font-normal">
              Update your password associated with your account.
            </p>
          </div>
          <div className="md:mt-0 md:py-0 mt-4 py-4 basis-4/6 w-full">
            <form onSubmit={handlePasswordChangeSubmit}>
              <div className="flex flex-col md:pt-0 pt-4 py-2">
                <label
                  htmlFor="current_password"
                  className="text-sm text-gray-700 font-bold mb-1"
                >
                  Current Password
                </label>
                <input
                  id="current_password"
                  minLength={6}
                  type="password"
                  className="bg-slate-200 text-sm text-gray-700 font-normal py-2 px-3 rounded-sm focus:outline-none autofill:bg-white"
                  autoComplete=""
                  value={currentPassword ?? ''}
                  onChange={handleCurrentPasswordChange}
                />
                {passwordFormErrors.current_password && (
                  <p className="text-sm font-bold pt-2 text-red-700">
                    {passwordFormErrors.current_password}
                  </p>
                )}
              </div>
              <div className="flex flex-col py-2">
                <label
                  htmlFor="new_password"
                  className="text-sm text-gray-700 font-bold mb-1"
                >
                  New Password
                </label>
                <input
                  id="new_password"
                  type="password"
                  minLength={6}
                  className="text-sm text-gray-700 font-normal py-2 px-3 rounded-sm focus:outline-none bg-slate-200"
                  autoComplete=""
                  onChange={handleNewPasswordChange}
                  value={newPassword ?? ''}
                />
                {passwordFormErrors.password && (
                  <p className="text-sm font-bold pt-2 text-red-700">
                    {passwordFormErrors.password}
                  </p>
                )}
              </div>
              <div className="flex flex-col py-2">
                <label
                  htmlFor="confirm_password"
                  className="text-sm text-gray-700 font-bold mb-1"
                >
                  Confirm Password
                </label>
                <input
                  id="confirm_password"
                  type="password"
                  minLength={6}
                  className="text-sm text-gray-700 font-normal py-2 px-3 rounded-sm focus:outline-none bg-slate-200"
                  autoComplete=""
                  onChange={handleConfirmPasswordChange}
                  value={confirmPassword ?? ''}
                />
                {passwordFormErrors.confirm_password && (
                  <p className="text-sm font-bold pt-2 text-red-700">
                    {passwordFormErrors.confirm_password}
                  </p>
                )}
              </div>
              <div className="py-2">
                <button
                  type="submit"
                  className="bg-[#848ef5] py-2 px-3 text-white rounded-md"
                >
                  {isLoadingPasswordChange ? 'Changing...' : 'Change'}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:justify-start md:items-start px-5 py-5 border-0 border-b border-gray-300 bg-white my-5">
          <div className="rounded-sm py-2 basis-2/6 w-full md:mr-5">
            <h3 className="text-base text-gray-700 font-bold">Notification</h3>
            <p className="text-sm text-gray-500 font-normal">
              You can enable or disable all Notification and Alerts here. You
              can change this setting any time.
            </p>
          </div>
          <div className="md:mt-0 md:py-0 mt-4 py-4 basis-4/6 w-full">
            <form>
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
                  className={`slider mr-3 flex h-[26px] w-[50px] items-center rounded-full bg-gray-200 p-1 duration-200`}
                >
                  <span
                    className={`dot h-[18px] w-[18px] rounded-full duration-200 transition-transform ${
                      isChecked
                        ? 'transform translate-x-[24px] bg-[#848ef5]'
                        : 'bg-gray-400'
                    }`}
                  ></span>
                </span>
                <span className="label flex items-center text-sm font-medium text-black">
                  <span className="pl-1">{isChecked ? 'on' : 'off'}</span>
                </span>
              </label>
            </form>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:justify-start md:items-start px-5 py-5 border-0 border-b border-gray-300 bg-white my-5">
          <div className="rounded-sm py-2 basis-2/6 w-full md:mr-5">
            <h3 className="text-base text-gray-700 font-bold">
              Protect Account
            </h3>
            <p className="text-sm text-gray-500 font-normal">
              You can change your account to public or private here. You can
              change this setting any time.
            </p>
          </div>
          <div className="md:mt-0 md:py-0 mt-4 py-4 basis-4/6 w-full">
            <form onSubmit={handleAccountPrivacySubmit}>
              <div className="flex flex-col">
                <select
                  name="privacy"
                  id="privacy"
                  className="text-sm text-gray-700 font-normal py-2 px-3 rounded-sm focus:outline-none bg-slate-200"
                  onChange={handlePrivacyChange}
                  value={privacy ?? '0'} // Set the value of the select element to the state variable `privacy`
                >
                  {privacy_code?.length > 0
                    ? privacy_code.map((value) => {
                        return value.show ? (
                          <option value={value.id} key={value.id}>
                            {value.nameV2}
                          </option>
                        ) : null;
                      })
                    : null}
                </select>
              </div>
              <div className="py-2">
                <button
                  type="submit"
                  className="bg-[#848ef5] py-2 px-3 text-white rounded-md"
                >
                  {isLoadingPrivacy ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:justify-start md:items-start px-5 py-5 border-0 border-b border-gray-300 bg-white my-5">
          <div className="rounded-sm py-2 basis-2/6 w-full md:mr-5">
            <h3 className="text-base text-gray-700 font-bold">
              Log Out My Account
            </h3>
            <p className="text-sm text-gray-500 font-normal">
              You can logout your account here. You can login in again by using
              your email and password.
            </p>
          </div>
          <div className="md:mt-0 md:py-0 mt-4 py-4 basis-4/6 w-full">
            <form>
              <div className="py-2">
                <button
                  onClick={handleLogout}
                  type="button"
                  className="bg-[#cd3328] py-2 px-3 text-white rounded-md"
                >
                  Yes, log me out
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:justify-start md:items-start px-5 py-5 border-0 border-b border-gray-300 bg-white my-5">
          <div className="rounded-sm py-2 basis-2/6 w-full md:mr-5">
            <h3 className="text-base text-gray-700 font-bold">
              Delete Account
            </h3>
            <p className="text-sm text-gray-500 font-normal">
              No longer want to use our service? You can delete your account
              here. This action is not reversible. All information related to
              this account will be deleted permanently.
            </p>
          </div>
          <div className="md:mt-0 md:py-0 mt-4 py-4 basis-4/6 w-full">
            <div className="py-2">
              <button
                onClick={handleAccountDelete}
                className="bg-[#cd3328] py-2 px-3 text-white rounded-md"
              >
                Yes, delete my account
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:justify-start md:items-start px-5 py-5 border-0 border-b border-gray-300 bg-white my-5">
          <div className="rounded-sm py-2 basis-2/6 w-full md:mr-5">
            <h3 className="text-base text-gray-700 font-bold">Delete Post</h3>
            <p className="text-sm text-gray-500 font-normal">
              You can delete your all post here. This action is not reversible.
              All information related to the post will be deleted permanently.
            </p>
          </div>
          <div className="md:mt-0 md:py-0 mt-4 py-4 basis-4/6 w-full">
            <div className="py-2">
              <button
                onClick={handleAllPostDelete}
                className="bg-[#cd3328] py-2 px-3 text-white rounded-md"
              >
                Yes, delete my all post
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:justify-start md:items-start px-5 py-5 border-0 border-b border-gray-300 bg-white my-5">
          <div className="rounded-sm py-2 basis-2/6 w-full md:mr-5">
            <h3 className="text-base text-gray-700 font-bold">
              Terms & Conditions / Privacy Policy
            </h3>
            <p className="text-sm text-gray-500 font-normal"></p>
          </div>
          <div className="md:mt-0 md:py-0 mt-4 py-4 basis-4/6 w-full">
            <form>
              <div className="py-2">
                <Link
                  href="/terms"
                  className="text-sm text-gray-500 font-medium underline hover:text-red-500"
                >
                  Terms & Condition
                </Link>
                <span className="mx-5"></span>
                <Link
                  href="/policies"
                  className="text-sm text-gray-500 font-medium underline hover:text-red-500"
                >
                  Privacy Policy
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
