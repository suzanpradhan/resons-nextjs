import { apiPaths } from '@/core/api/apiConstants';
import { baseApi } from '@/core/api/apiQuery';
import { toast } from 'react-toastify';
import { SignUpRequestType } from './signUpType';

const signUpApi = baseApi
    .injectEndpoints({
        endpoints: (builder) => ({
            // register
            signUp: builder.mutation<any, SignUpRequestType>({
                query: ({ ...payload }) => {
                    var formData = new FormData();
                    formData.append('name', payload.name);
                    formData.append('email', payload.email);
                    formData.append('password', payload.password);
                    formData.append('password_confirmation', payload.password_confirmation);
                    formData.append('platform', 'mobile');
                    return {
                        url: `${apiPaths.registerUrl}`,
                        method: 'POST',
                        body: formData,
                        formData: true,
                    };
                },
                invalidatesTags: ['Signup'],
                async onQueryStarted(payload, { queryFulfilled }) {
                    try {
                        await queryFulfilled;
                        toast.success('Registration Successful');
                    } catch (err) {
                        console.log(err);
                        toast.error('Failed to Registration');
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
export default signUpApi;
