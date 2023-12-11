'use client';
import { useAppDispatch } from '@/core/redux/clientStore';
import Button from '@/core/ui/components/Button';
import TextField from '@/core/ui/components/TextField';
import { LoginRequestType, loginFormSchema } from '@/modules/login/loginType';
import { useFormik } from 'formik';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { toFormikValidate } from 'zod-formik-adapter';
import { GoogleSignInButton } from '../(components)/authButtons';

export default function SignIn() {
  const navigator = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callback');
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const onSubmit = async (values: LoginRequestType) => {
    console.log(callbackUrl);
    setIsLoading(true);
    await signIn('credentials', {
      email: values.email,
      password: values.password,
      platform: 'mobile',
      redirect: false,
    }).then((response) => {
      if (response?.ok) {
        if (callbackUrl) {
          window.location.href = callbackUrl;
          if (callbackUrl.includes('#')) window.location.reload();
        } else {
          navigator.refresh();
        }
      } else {
        setError(response?.error!);
      }
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
      <div className="flex h-screen items-center justify-center">
        <div className="w-full max-w-md bg-white py-10 px-5">
          <div className="flex flex-col items-center justify-center pb-4">
            <div className="w-14 h-14 overflow-hidden cursor-pointer">
              <Image
                src="/images/logo.png"
                alt="profile-image"
                width={100}
                height={100}
                className="w-14 h-14 object-contain"
              />
            </div>
            <h1 className="font-bold text-gray-700">Resons</h1>
          </div>
          <div className="flex flex-col items-center justify-center gap-4">
            <GoogleSignInButton />
          </div>

          <div className="relative z-10 divider text-center py-5 text-base text-gray-800 font-medium before:absolute before:left-0 before:top-1/2 before:transform before:-translate-y-1/2 before:w-[40%] before:border-t before:border-0 before:border-black before:z-0 after:absolute after:right-0 after:top-1/2 after:transform after:-translate-y-1/2 after:w-[40%] after:border-black after:border-t after:border-0 after:z-0">
            <span className="px-3">or</span>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              formik.handleSubmit(e);
            }}
            onChange={(e) => setError(undefined)}
          >
            <div className="flex flex-col mb-4">
              <TextField
                placeholder="Your Email Address"
                id="email"
                type="email"
                {...formik.getFieldProps('email')}
              />
              {!!formik.errors.email && (
                <div className="text-accent text-sm">{formik.errors.email}</div>
              )}
            </div>

            <div className="flex flex-col mb-4">
              <TextField
                placeholder="Your Password"
                id="password"
                type="password"
                {...formik.getFieldProps('password')}
              />
              {!!formik.errors.password && (
                <div className="text-accent text-sm">
                  {formik.errors.password}
                </div>
              )}
            </div>
            {error && (
              <div className="text-accent text-sm mb-4">
                Please input valid credentials
              </div>
            )}

            <div className="mb-4">
              <Button
                text="Continue"
                type="submit"
                isLoading={isLoading}
                className="hover:shadow-lg"
              />
            </div>
          </form>

          <div className="flex items-center justify-between mb-4">
            <Link href="/signup" className="text-xs text-accent font-medium">
              Don&apos;t have an account? Sign up
            </Link>
            <Link href="#" className="text-xs text-blue-700 font-medium">
              Need Help?
            </Link>
          </div>

          <p className="text-xs text-gray-400 font-normal mt-2 leading-5">
            By registering, you consent to the use of your data for registration
            purposes and to receive product and service notifications. You can
            opt-out of notifications anytime in your settings. Refer to our{' '}
            <a href="#" className="text-xs text-blue-700 font-medium">
              Privacy Policy{' '}
            </a>{' '}
            for more details.
          </p>
        </div>
      </div>
    </>
  );
}
