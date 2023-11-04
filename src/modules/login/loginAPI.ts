import { apiPaths } from '@/core/api/apiConstants';
import { baseApi } from '@/core/api/apiQuery';
import { toast } from 'react-toastify';
import { LoginRequestType } from './loginType';


const getPlatform = () => {
    // Use the navigator.userAgent to detect the user's device/browser.
    const userAgent = window.navigator.userAgent.toLowerCase();

    if (userAgent.includes('android')) {
        return 'android';
    } else if (userAgent.includes('iphone') || userAgent.includes('ipad')) {
        return 'ios';
    } else if (userAgent.includes('windows')) {
        return 'windows';
    } else if (userAgent.includes('mac')) {
        return 'mac';
    } else {
        return 'unknown';
    }
};

const loginApi = baseApi
    .injectEndpoints({
        endpoints: (builder) => ({
            // register
            login: builder.mutation<any, LoginRequestType>({
                query: ({ ...payload }) => {
                    var formData = new FormData();
                    formData.append('email', payload.email);
                    formData.append('password', payload.password);
                    // Get the platform information
                    const platform = getPlatform();
                    formData.append('platform', platform);
                    return {
                        url: `${apiPaths.loginUrl}`,
                        method: 'POST',
                        body: formData,
                        formData: true,
                    };
                },
                invalidatesTags: ['Signup'],
                async onQueryStarted(payload, { queryFulfilled }) {
                    try {
                        await queryFulfilled;
                        toast.success('Login Successful');
                    } catch (err) {
                        console.log(err);
                        toast.error('Failed to Login');
                    }
                },

                transformResponse: (response) => {
                    console.log(response);
                    return response as any;
                },
            }),
        }),
        overrideExisting: true,
    });
export default loginApi;
