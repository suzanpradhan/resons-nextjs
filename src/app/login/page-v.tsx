'use client';

/* eslint-disable @next/next/no-img-element */
import Button from '@/core/ui/components/Button';
import TextField from '@/core/ui/components/TextField';
import { useFormik } from 'formik';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css'; // remove letter
import { z } from 'zod';
import { toFormikValidate } from 'zod-formik-adapter';

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);

  const loginFormSchema = z.object({
    email: z.string().email(),
    password: z.string(),
  });

  type LoginRequestType = z.infer<typeof loginFormSchema>;

  const onSubmit = async (values: LoginRequestType) => {
    setIsLoading(true);
    await signIn('credentials', {
      email: values.email,
      password: values.password,
      platform: 'mobile',
      redirect: true,
    })
      .then(() => {
        // if (response?.ok) {
        //   // router.push('/');
        // } else {
        //   alert(JSON.stringify(response));
        // }
      })
      .catch((errorResponse) => {
        // alert(JSON.stringify(errorResponse));
      });
    setIsLoading(false);
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate: toFormikValidate(loginFormSchema),
    onSubmit,
  });
  return (
    <>
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
            <div className="font-bold text-dark text-xl">Welcome back!</div>
            <div className="text-primaryGray text-base">
              Login with your email and password.
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
                {...formik.getFieldProps('email')}
              />
              {!!formik.errors.email && (
                <div className="text-red-500">{formik.errors.email}</div>
              )}
              <TextField
                placeholder="•••••••••••"
                id="password"
                type="password"
                className="mt-2"
                label="Password"
                {...formik.getFieldProps('password')}
              />
              {!!formik.errors.password && (
                <div className="text-red-500">{formik.errors.password}</div>
              )}
              <a
                href="/reset-password"
                className="flex justify-end mt-4 text-primaryGray underline text-base"
              >
                Forgot Password?
              </a>
              <Button
                text="Login"
                type="submit"
                isLoading={isLoading}
                className="mt-3 font-bold w-full shadow-accent-400 shadow-md"
              />

              <div className="flex text-primaryGray mt-3 justify-center gap-1 text-base">
                {" Don't have an account?"}
                <a href="#" className="text-dark underline">
                  Sign up
                </a>
              </div>
            </form>
          </div>
          <div className="flex gap-1 m-4 whitespace-nowrap text-sm">
            By continuing, you agree to our
            <span>
              <Link
                href="/terms"
                className="text-dark underline pointer-events-none"
              >
                Terms and Conditions
              </Link>
            </span>
            and
            <Link
              href="/policies"
              className="text-dark underline pointer-events-none"
            >
              Privacy Policy
            </Link>
            .
          </div>
        </div>
      </section>
    </>
  );
};
export default SignIn;
