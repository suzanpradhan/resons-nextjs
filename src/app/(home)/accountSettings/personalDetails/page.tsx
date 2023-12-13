'use client';
import { language_code } from '@/core/constants/appConstants';
import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import TextField from '@/core/ui/components/TextField';
import countriesApi from '@/modules/countries/countriesApi';
import { CountriesDetailType } from '@/modules/countries/countriesType';
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
  { datailName: 'Username', formikName: 'nickname' },
  { datailName: 'Date of Birth', formikName: 'date_of_birth' },
];

const PersonalDetailsPage = () => {
  const navigate = useRouter();
  const dispatch = useAppDispatch();
  const [imageFile, setImageFile] = useState<string | undefined>(undefined);

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
          profileApi.endpoints.getMyProfileData.initiate('?load=true', {
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
        console.log(typeof formik.values.country_id);
        return error.formErrors.fieldErrors;
      }
    }
  };

  const formik = useFormik<ProfileUpdateFormType>({
    enableReinitialize: true,
    initialValues: {
      name: myProfile?.name!,
      phone_number: myProfile?.phone_number,
      date_of_birth: myProfile?.date_of_birth,
      nickname: myProfile?.nickname,
      user_language: myProfile?.user_language,
      country_id: myProfile?.country?.id,
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
    <div className="sm:container md:container lg:container mx-auto h-full">
      <div className="overflow-y-scroll h-full px-4 bg-white pt-11">
        <h2 className="text-xl font-semibold">Personal Information</h2>
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
          <div className="flex gap-2 w-fit mx-auto mt-3 text-[#a5a5a5]">
            <label
              className="border-[1px] p-1 rounded mb-0"
              htmlFor="profile_image"
            >
              <PencilSimpleLine size={30} />
            </label>
            <input
              id="profile_image"
              type="file"
              accept="image/*" // Specify the file types you want to allow (e.g., images)
              style={{ display: 'none' }}
              name="profile_image"
              onChange={handleImageChange}
              value={undefined}
              // Hide the input element
            />
            <div className="border-[1px] p-1 rounded">
              <Trash size={30} />
            </div>
          </div>
        </div>
        <form
          className="flex flex-col gap-4 mb-16"
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
            // <div key={index}>
            //   <label
            //     htmlFor={item.formikName}
            //     className="text-base font-normal"
            //   >
            //     {item.datailName}
            //   </label>
            //   <input
            //     id={item.formikName}
            //     type="text"
            //     {...formik.getFieldProps(item.formikName)}
            //   />
            // </div>
          ))}
          <div className="flex flex-col">
            <label className="text-base font-normal " htmlFor="language">
              Language
            </label>
            <select
              // name="language"
              className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-3 rounded leading-tight focus:outline-none focus:shadow-outline"
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
            <label htmlFor="country" className="text-base font-normal">
              Country
            </label>
            <select
              id="country_id"
              className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-3 rounded leading-tight focus:outline-none focus:shadow-outline"
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
            className="w-28 bg-red-400 py-2 text-white font-semibold rounded-lg self-end"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default PersonalDetailsPage;