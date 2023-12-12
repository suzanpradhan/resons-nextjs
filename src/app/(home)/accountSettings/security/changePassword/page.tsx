'use client';

import { useAppDispatch } from '@/core/redux/clientStore';
import profileApi from '@/modules/profile/profileApi';
import {
  ChangePasswordFormType,
  passwordChangeSchema,
} from '@/modules/profile/profileType';
import { useFormik } from 'formik';
import { ZodError } from 'zod';

export default function ChangePasswordPage() {
  const dispatch = useAppDispatch();

  const onSubmit = async (data: ChangePasswordFormType) => {
    try {
      await Promise.resolve(
        dispatch(
          profileApi.endpoints.myPasswordChange.initiate({
            current_password: data.current_password,
            password: data.password,
            password_confirmation: data.password_confirmation,
          })
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const validateForm = (values: ChangePasswordFormType) => {
    try {
      passwordChangeSchema.parse(values);
    } catch (error) {
      if (error instanceof ZodError) {
        console.log(error);
        return error.formErrors.fieldErrors;
      }
    }
  };

  const formik = useFormik<ChangePasswordFormType>({
    enableReinitialize: true,
    initialValues: {
      current_password: '',
      password: '',
      password_confirmation: '',
    },
    validateOnChange: false,
    validate: validateForm,
    onSubmit,
  });

  return (
    <div className="sm:container md:container lg:container mx-auto h-full">
      <h2 className="h-11 w-full px-4 bg-white shadow-sm flex gap-2 mb-0 fixed z-50">
        <span className="text-3xl font-light flex items-center">&#60;</span>
        <span className="text-sm font-medium flex items-center">
          Change Password
        </span>
      </h2>

      <div className="overflow-y-scroll h-screen px-4 bg-white pt-11">
        <h3 className="text-sm font-semibold text-gray-700 my-4">
          Change password
        </h3>
        <div className="bg-slate-50 rounded-lg px-4 py-2">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              console.log(e.target);
              formik.handleSubmit(e);
            }}
          >
            <div className="relative flex flex-col pb-6">
              <label
                htmlFor="current_password"
                className="text-sm text-gray-700 font-semibold mb-1"
              >
                Current Password
              </label>
              <input
                id="current_password"
                type="password"
                className={`${
                  formik.errors.current_password
                    ? 'bg-red-50 border-red-300'
                    : 'bg-slate-50 border-slate-300'
                }  border text-sm text-gray-700 font-normal py-2 px-3 rounded-md focus:outline-none autofill:bg-white`}
                autoComplete=""
                {...formik.getFieldProps('current_password')}
              />
              {!!formik.errors.current_password && (
                <div className="absolute bottom-1 text-red-500 text-xs">
                  {formik.errors.current_password}
                </div>
              )}
            </div>
            <div className="relative flex flex-col pb-6">
              <label
                htmlFor="new_password"
                className="text-sm text-gray-700 font-semibold mb-1"
              >
                New Password
              </label>
              <input
                id="new_password"
                type="password"
                className={`${
                  formik.errors.password
                    ? 'bg-red-50 border-red-300'
                    : 'bg-slate-50 border-slate-300'
                }  border text-sm text-gray-700 font-normal py-2 px-3 rounded-md focus:outline-none autofill:bg-white`}
                autoComplete=""
                {...formik.getFieldProps('password')}
              />
              {!!formik.errors.password && (
                <div className="absolute bottom-1 text-red-500 text-xs">
                  {formik.errors.password}
                </div>
              )}
            </div>
            <div className="relative flex flex-col pb-6">
              <label
                htmlFor="password_confirmation"
                className="text-sm text-gray-700 font-semibold mb-1"
              >
                Confirm Password
              </label>
              <input
                id="password_confirmation"
                type="password"
                className={`${
                  formik.errors.password_confirmation
                    ? 'bg-red-50 border-red-300'
                    : 'bg-slate-50 border-slate-300'
                }  border text-sm text-gray-700 font-normal py-2 px-3 rounded-md focus:outline-none autofill:bg-white`}
                autoComplete=""
                {...formik.getFieldProps('password_confirmation')}
              />
              {!!formik.errors.password_confirmation && (
                <div className="absolute bottom-1 text-red-500 text-xs">
                  {formik.errors.password_confirmation}
                </div>
              )}
            </div>
            <div className="py-2 flex justify-end">
              <button
                type="submit"
                className="bg-[#d8566c] py-2 px-3 text-white rounded-md"
              >
                {/* {isLoadingPasswordChange ? 'Changing...' : 'Change'} */}
                Change
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
