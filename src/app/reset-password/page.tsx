'use client';

/* eslint-disable @next/next/no-img-element */
import Button from '@/core/ui/components/Button';
import TextField from '@/core/ui/components/TextField';
import { signUpFormSchema } from '@/modules/register/signUpType';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css'; // remove letter
import { toFormikValidate } from 'zod-formik-adapter';

const ResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
    },
    validate: toFormikValidate(signUpFormSchema),
    onSubmit: async (values: any) => {
      setIsLoading(true);
      console.log(values);
      setIsLoading(false);
    },
  });

  return (
    <section className="bg-whiteShade border border-white h-screen w-full sm:grid sm:grid-cols-2 xl:grid-cols-3">
      <div className="hidden sm:block sm:visible sm:col-span-1 xl:col-span-2 h-screen">
        <img
          src="/images/login-cover.jpg"
          alt="authentication_graphic"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex sm:col-span-1 h-screen overflow-y-auto overflow-x-hidden custom-scrollbar flex-col items-center w-full">
        <div className="flex flex-col w-full sm:min-w-[240px] sm:w-96 sm:max-w-[440px] h-full mt-8 px-4 sm:mt-4 flex-1 justify-start sm:justify-center">
          <div className="w-20 overflow-hidden">
            <img
              src="/images/logo.png"
              alt="logo"
              className="h-auto w-[15rem] object-contain mb-12"
            />
          </div>
          <div className="font-bold text-dark text-xl">Forgot Password</div>
          <div className="text-primaryGray text-base">
            Provide your email address
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              formik.handleSubmit(e);
            }}
            className="mt-4"
          >
            <TextField
              placeholder="Email Address"
              id="email"
              type="email"
              label="Email"
              className="mt-2"
              {...formik.getFieldProps('email')}
            />
            {/* {!!formik.errors.email && (
              <div className="text-red-500">{formik.errors.email}</div>
            )} */}
            <Button
              text="Verify Email"
              type="submit"
              isLoading={isLoading}
              className="mt-3 font-bold w-full shadow-accent-400 shadow-md"
            />

            <div className="flex text-primaryGray mt-3 justify-center gap-1 text-base">
              {' Already have an account?'}
              <a href="/login" className="text-dark underline">
                Log in
              </a>
            </div>
          </form>
        </div>
        <div className="flex gap-1 m-4 whitespace-nowrap text-sm">
          By continuing, you agree to our
          <span>
            <Link href="/" className="text-dark underline pointer-events-none">
              Terms and Conditions
            </Link>
          </span>
          and
          <Link href="/" className="text-dark underline pointer-events-none">
            Privacy Policy
          </Link>
          .
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
