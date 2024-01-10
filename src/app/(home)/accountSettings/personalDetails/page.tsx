'use client';
import { language_code } from '@/core/constants/appConstants';
import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import TextField from '@/core/ui/components/TextField';
import countriesApi from '@/modules/countries/countriesApi';
import { CountriesDetailType } from '@/modules/countries/countriesType';
import postApi from '@/modules/post/postApi';
import profileApi from '@/modules/profile/profileApi';
import {
  ProfileDetailType,
  ProfileUpdateFormType,
  profileUpdateFormSchema,
} from '@/modules/profile/profileType';
import { useFormik } from 'formik';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { PencilSimpleLine, Trash } from 'phosphor-react';
import { ChangeEvent, useEffect, useState } from 'react';
import { ZodError } from 'zod';

const FORM_DETAILS = [
  { datailName: 'Name', formikName: 'name' },
  { datailName: 'Phone Number', formikName: 'phone_number' },
  // { datailName: 'Username', formikName: 'nickname' },
  // { datailName: 'Date of Birth', formikName: 'date_of_birth' },
];

const PersonalDetailsPage = () => {
  const navigate = useRouter();
  const dispatch = useAppDispatch();
  const [imageFile, setImageFile] = useState<string | undefined>(undefined);
  const currentPage = useAppSelector(
    (state: RootState) => state.postListing.currentPage
  );

  useEffect(() => {
    dispatch(profileApi.endpoints.getMyProfile.initiate());
  }, [dispatch]);

  useEffect(() => {
    dispatch(countriesApi.endpoints.getCountriesList.initiate());
  }, [dispatch]);

  const getCountriesList = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries[`getCountriesList`]?.data as CountriesDetailType[]
  );

  const onSubmit = async (data: ProfileUpdateFormType) => {
    console.log(data);
    try {
      const responseData = await Promise.resolve(
        dispatch(
          profileApi.endpoints.updateProfile.initiate({
            name: data.name,
            phone_number: data.phone_number,
            profile_image: data.profile_image,
            date_of_birth: data.date_of_birth,
            nickname: data.nickname,
            user_language: data.user_language,
            country_id: data.country_id,
          })
        )
      );
      if (Object.prototype.hasOwnProperty.call(responseData, 'data')) {
        await dispatch(
          postApi.endpoints.getMyPostList.initiate(currentPage, {
            forceRefetch: true,
          })
        );

        navigate.push('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const myProfile = useAppSelector((state: RootState) => {
    return state.baseApi.queries[`getMyProfile(undefined)`]
      ?.data as ProfileDetailType;
  });

  const validateForm = (values: ProfileUpdateFormType) => {
    try {
      profileUpdateFormSchema.parse(values);
    } catch (error) {
      if (error instanceof ZodError) {
        console.log(error);
        return error.formErrors.fieldErrors;
      }
    }
  };

  const formik = useFormik<ProfileUpdateFormType>({
    enableReinitialize: true,
    initialValues: {
      name: myProfile?.name!,
      phone_number: myProfile?.phone_number!,
      date_of_birth: myProfile?.date_of_birth!,
      nickname: myProfile?.nickname!,
      user_language: myProfile?.user_language!,
      country_id: myProfile?.country?.id!,
    },
    validateOnChange: false,
    validate: validateForm,
    onSubmit,
  });

  // const handleCountryChange = (e: ChangeEvent<HTMLSelectElement>) => {
  //   formik.setFieldValue('country_id', Number(e.target.value));
  // };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.files?.[0] &&
      setImageFile(URL.createObjectURL(e.target.files?.[0]));
    formik.setFieldValue(e.target.name, e.target.files?.[0]);
    console.log('formik profile images', formik.values.profile_image);
  };

  return (
    <div className="w-full h-screen max-h-screen bg-white pb-16 overflow-scroll">
      <div className="mx-4 pt-14">
        <h2 className="text-base font-medium">Personal Information</h2>
        <div className="mx-auto w-fit">
          <div className="w-32 h-32 relative rounded-full">
            <Image
              src={
                imageFile
                  ? imageFile!
                  : myProfile?.profile_image && myProfile.profile_image!
                  ? myProfile.profile_image
                  : '/images/avatar.jpg'
              }
              alt="avatar"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              objectFit="cover"
              className="rounded-full "
            />
          </div>
          <div className="flex gap-2 w-fit mx-auto mt-2 text-[#a5a5a5]">
            <label
              className="border w-10 h-10 flex justify-center items-center rounded active:bg-whiteShade"
              htmlFor="profile_image"
            >
              <PencilSimpleLine size={24} />
            </label>
            <input
              id="profile_image"
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              name="profile_image"
              onChange={handleImageChange}
              value={undefined}
            />
            <div className="border w-10 h-10 flex justify-center items-center rounded active:bg-whiteShade">
              <Trash size={24} />
            </div>
          </div>
        </div>
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            formik.handleSubmit(e);
          }}
        >
          {FORM_DETAILS.map((item, index) => (
            <TextField
              label={item.datailName}
              isLabelBold={false}
              key={index}
              id={item.formikName}
              type="text"
              {...formik.getFieldProps(item.formikName)}
            />
          ))}

          <div className="flex flex-col">
            <label htmlFor="username" className="mb-2 text-sm font-normal">
              Username
            </label>
            <div className="">
              <label
                htmlFor="username"
                className="flex rounded-md border-gray-200 border-[1px] items-center m-0 text-gray-400 font-normal text-xs pl-3 gap-2"
              >
                <span>https://resons.com/</span>
                <input
                  id="nickname"
                  type="text"
                  {...formik.getFieldProps('nickname')}
                  className="!border-0 bg-whiteShade inline w-full text-sm text-gray-700 border-gray-200 font-normal py-2 pr-3 rounded-sm outline-none "
                  autoComplete=""
                />
              </label>
            </div>
          </div>
          <TextField
            label="Date of Birth"
            isLabelBold={false}
            id="date_of_birth"
            type="text"
            {...formik.getFieldProps('date_of_birth')}
          />
          <div className="flex flex-col">
            <label className="text-sm font-normal" htmlFor="language">
              Language
            </label>
            <select
              // name="language"
              className="block appearance-none w-full border-gray-200 bg-white border text-dark-500 text-sm py-3 px-3 rounded leading-tight focus:outline-none focus:shadow-outline"
              id="language"
              // onChange={handleChange}
              {...formik.getFieldProps('user_language')}
            >
              <option>Select your language</option>
              {language_code?.length > 0
                ? language_code.map((value, index) => (
                    <option value={value.code} key={index}>
                      {value.name}
                    </option>
                  ))
                : null}
            </select>
            {/* {!!formik.errors.user_language && (
              <div className="text-red-500 text-sm -mt-2">
                {formik.errors.user_language}
              </div>
            )} */}
          </div>
          <div className="flex flex-col pb-2">
            <label htmlFor="country" className="text-sm font-normal">
              Country
            </label>
            <select
              id="country_id"
              className="block appearance-none w-full bg-white border border-gray-200 text-dark-500 py-3 text-sm px-3 rounded leading-tight focus:outline-none focus:shadow-outline"
              name="country_id"
              value={formik.values.country_id}
              // onChange={(e) => handleCountryChange(e)}
            >
              <option>Select a country</option>
              {getCountriesList &&
                getCountriesList.length > 0 &&
                getCountriesList.map((country) => (
                  <option value={country.id as number} key={country.id}>
                    {country.name}
                  </option>
                ))}
            </select>
          </div>
          <button
            type="submit"
            className="px-4 bg-accentRed h-10 text-white text-sm font-medium rounded-lg self-end"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default PersonalDetailsPage;
