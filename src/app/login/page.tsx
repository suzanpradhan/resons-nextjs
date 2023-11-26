'use client';
import { apiPaths } from '@/core/api/apiConstants';
import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import Button from '@/core/ui/components/Button';
import TextField from '@/core/ui/components/TextField';
import loginAPI from '@/modules/login/loginAPI';
import socialApi from '@/modules/social/socialAPI';
import { useFormik } from 'formik';
import Cookies from 'js-cookie';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { z } from 'zod';
import { toFormikValidate } from 'zod-formik-adapter';
import { GoogleSignInButton } from '../(components)/authButtons';

export default function SignIn() {
  const navigator = useRouter();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [authenticateChecked, setAuthenticateChecked] = useState(false);
  const [isAllow, setIsAllow] = useState(() => {
    // Check if the authentication cookie is present
    const isAuthenticated = Cookies.get('authenticated') === 'true';
    return isAuthenticated;
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const [password, setPassword] = useState('');
  const defaultPasss = process.env.NEXT_PUBLIC_DEFAULT_PASS
    ? process.env.NEXT_PUBLIC_DEFAULT_PASS
    : '';

  const handlePasswordCheck = () => {
    // Replace 'your_expected_password' with the actual expected password
    if (password === defaultPasss) {
      // Set a cookie to indicate the user is authenticated
      Cookies.set('authenticated', 'true', { expires: 365 }); // Cookie expires in 1 year
      navigator.push('/');
    } else {
      alert('Worng password!');
    }
  };

  const handleChange = (event: any) => {
    formik.setFieldValue(event.target.name, event.target.value);
  };

  const loginFormSchema = z.object({
    email: z.string().email(),
    password: z.string(),
  });

  type LoginRequestType = z.infer<typeof loginFormSchema>;

  const onSubmit = async (values: LoginRequestType) => {
    setIsLoading(true);

    if (!values.email || values.email === '') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: 'Email is required.',
      }));
      setIsLoading(false);
      return false;
    } else {
      const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      const isValidEmail = emailPattern.test(values.email);

      if (isValidEmail) {
        setErrors((prevErrors) => ({ ...prevErrors, email: '' }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: 'Invalid email format.',
        }));
      }
    }

    if (!values.password || values.password === '') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: 'Password is required.',
      }));
      setIsLoading(false);
      return false;
    }

    const csrfToken = await fetch(`${apiPaths.rootPath}${apiPaths.csrfPath}`);

    if (csrfToken?.status === 204) {
      const response = await dispatch(
        loginAPI.endpoints.login.initiate(values)
      );

      if (response && 'error' in response) {
        navigator.push('/login');
      } else {
        const { optional, data } = response.data;
        console.log(response);
        // Cookies.set('user_id', data.id);
        // Cookies.set('user_name', data.name);
        // Cookies.set('email', data.email);
        Cookies.set('token', optional.token, { expires: 365 });

        navigator.push('/');
      }
    } else {
      setIsLoading(false);
      toast.error('Failed to Login');
    }

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

  const handleSocialUrl = async () => {
    setIsLoading(true); // Set isLoading to true before making the API request
    await dispatch(socialApi.endpoints.getSocialUrl.initiate(undefined));
    setIsLoading(false); // Set isLoading to false after the request is completed
  };

  const socialUrl = useAppSelector(
    (state: RootState) => state.baseApi.queries?.data as any
  );

  // useEffect(() => {
  //   // Check if the authentication cookie is present
  //   const isAuthenticated = Cookies.get('authenticated') === 'true';
  //   const isToken = Cookies.get('token');

  //   if (isAuthenticated) {
  //     if (isToken) {
  //       navigator.push('/');
  //       return;
  //     }
  //     setAuthenticateChecked(true);
  //     setIsAllow(true);
  //   } else {
  //     setAuthenticateChecked(true);
  //     setIsAllow(false);
  //   }
  // }, []);

  // if (!authenticateChecked) {
  //   return null;
  // }

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
          {/* Login Options */}
          <div className="flex flex-col items-center justify-center gap-4">
            {/* <button className="w-full max-w-sm py-2 px-3 bg-[#3578e5] border-[#3578e5] border text-white text-base font-medium rounded-full">
            Continue with Facebook
          </button> */}
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
          >
            <div className="flex flex-col mb-4">
              <TextField
                placeholder="Your Email Address"
                id="email"
                type="email"
                name="email"
                onChange={handleChange}
                // {...formik.getFieldProps('email')}
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
                name="password"
                onChange={handleChange}
                // {...formik.getFieldProps('password')}
              />
              {!!formik.errors.password && (
                <div className="text-accent text-sm">
                  {formik.errors.password}
                </div>
              )}
            </div>

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
            <Link href="#" className="text-xs text-accent font-medium">
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
