'use client';
import { apiPaths } from '@/core/api/apiConstants';
import { useAppDispatch } from '@/core/redux/clientStore';
import Button from '@/core/ui/components/Button';
import TextField from '@/core/ui/components/TextField';
import signUpApi from '@/modules/register/signUpAPI';
import { SignUpRequestType } from '@/modules/register/signUpType';
import { useFormik } from 'formik';
import Cookies from 'js-cookie';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

interface ApiError {
  error: {
    data: {
      errors: {
        name?: string;
        email?: string;
        password?: string;
        password_confirmation?: string;
      };
    };
  };
}

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useRouter();
  const [authenticateChecked, setAuthenticateChecked] = useState(false);
  const [isAllow, setIsAllow] = useState(() => {
    // Check if the authentication cookie is present
    const isAuthenticated = Cookies.get('authenticated') === 'true';
    return isAuthenticated;
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
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
      // setIsAllow(true);
      navigate.push('/login');
    } else {
      alert('Worng password!');
    }
  };

  const handleChange = (event: any) => {
    formik.setFieldValue(event.target.name, event.target.value);
  };

  const onSubmit = async (values: SignUpRequestType) => {
    setIsLoading(true);
    console.log(values);

    if (values.name === '') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: 'Full name is required.',
      }));
      setIsLoading(false);
      return false;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, name: '' }));
    }

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

    if (!values.password_confirmation || values.password_confirmation === '') {
      // Passwords don't match, set validation error message
      setErrors((prevErrors) => ({
        ...prevErrors,
        password_confirmation: 'Confirm password is required.',
      }));
      setIsLoading(false);
      return false;
    } else if (values.password != values.password_confirmation) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password_confirmation: 'Confirm password does not match.',
      }));
      setIsLoading(false);
      return false;
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password_confirmation: '',
      }));
    }

    const csrfToken = await fetch(`${apiPaths.rootPath}${apiPaths.csrfPath}`);

    if (csrfToken?.status === 204) {
      try {
        const response = await dispatch(
          signUpApi.endpoints.signUp.initiate(values)
        );

        if ((response as ApiError).error) {
          const errorResponse = response as ApiError;
          setErrors((prevErrors) => ({
            ...prevErrors,
            name: errorResponse.error.data.errors.name || '',
            email: errorResponse.error.data.errors.email || '',
            password: errorResponse.error.data.errors.password || '',
            password_confirmation:
              errorResponse.error.data.errors.password_confirmation || '',
          }));
        } else {
          console.log('Signup successful!', response);
          navigate.push('/login');
        }
      } catch (error) {
        console.log('An error occurred:', error);
      }
    } else {
      setIsLoading(false);
      toast.error('Failed to Login');
    }
    setIsLoading(false);
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
    },
    onSubmit,
  });

  // useEffect(() => {
  //   // Check if the authentication cookie is present
  //   const isAuthenticated = Cookies.get('authenticated') === 'true';
  //   const isToken = Cookies.get('token');

  //   if (isAuthenticated) {
  //     if (isToken) {
  //       navigate.push('/');
  //       return;
  //     }
  //     setAuthenticateChecked(true);
  //     setIsAllow(true);
  //     // navigate.push('/login');
  //   } else {
  //     setAuthenticateChecked(true);
  //     setIsAllow(false);
  //   }
  // }, []);

  // if (!authenticateChecked) {
  //   return null;
  // }

  // console.log('authenticateChecked');
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
            <button className="w-full max-w-md py-2 px-3 bg-white border-gray-300 border text-black text-base font-medium rounded-full">
              Continue with Google
            </button>
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
                placeholder="Your Full Name"
                id="name"
                type="text"
                name="name"
                onChange={handleChange}
              />
              {errors.name && (
                <p className="text-xs font-normal pt-2 text-accent">
                  {errors.name}
                </p>
              )}
            </div>

            <div className="flex flex-col mb-4">
              <TextField
                placeholder="Your Email Address"
                id="email"
                type="email"
                name="email"
                onChange={handleChange}
              />
              {errors.email && (
                <p className="text-xs font-normal pt-2 text-accent">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="flex flex-col mb-4">
              <TextField
                placeholder="Enter Your Password"
                id="password"
                type="password"
                name="password"
                onChange={handleChange}
              />
              {errors.password && (
                <p className="text-xs font-normal pt-2 text-accent">
                  {errors.password}
                </p>
              )}
            </div>

            <div className="flex flex-col mb-4">
              <TextField
                placeholder="Confirm Your Password"
                id="password_confirmation"
                type="password"
                name="password_confirmation"
                onChange={handleChange}
              />
              {errors.password_confirmation && (
                <p className="text-xs font-normal pt-2 text-accent">
                  {errors.password_confirmation}
                </p>
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
            <Link href="/login" className="text-xs text-accent font-medium">
              Already have an account? Sign in
            </Link>
            <a href="#" className="text-xs text-blue-700 font-medium">
              Need Help?
            </a>
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
