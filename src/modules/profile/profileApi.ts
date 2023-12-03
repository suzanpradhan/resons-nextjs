import { apiPaths } from '@/core/api/apiConstants';
import { baseApi } from '@/core/api/apiQuery';
import { APIResponseType } from '@/core/types/reponseTypes';
import { toast } from 'react-toastify';
import { ChangePasswordFormType, ProfileDetailType, ProfileUpdateFormType, ProfileUpdateResponseType } from './profileType';
import { ProfileViewType } from './profileViewType';

const profileApi = baseApi
    .enhanceEndpoints({ addTagTypes: ['Profile'] })
    .injectEndpoints({
        endpoints: (builder) => ({
            // Get user Profile
            getMyProfile: builder.query<ProfileDetailType, void>({
                query: () => `${apiPaths.profileUrl}`,
                providesTags: ['Profile'],
                async onQueryStarted(payload, { queryFulfilled }) {
                    try {
                        await queryFulfilled;
                    } catch (err) {
                        console.log(err);
                        toast.error(JSON.stringify(err));
                    }
                },
                transformResponse: (response) => {
                    return (response as any)?.data as ProfileDetailType;
                },
            }),

            getMyProfileData: builder.query<ProfileDetailType, string>({
                query: (query: string) => `${apiPaths.profileUrl}/${query}`,
                providesTags: ['Profile'],
                serializeQueryArgs: ({ endpointName }) => {
                    return endpointName;
                },
                async onQueryStarted(payload, { queryFulfilled }) {
                    try {
                        await queryFulfilled;
                    } catch (err) {
                        console.log(err);
                        toast.error(JSON.stringify(err));
                    }
                },
                transformResponse: (response) => {
                    return (response as any)?.data as ProfileDetailType;
                },
            }),

            // View user Profile
            viewProfile: builder.query<ProfileViewType, number>({
                query: (id) => `${apiPaths.viewProfile}/${id}`,
                providesTags: ['Profile'],
                async onQueryStarted(payload, { queryFulfilled }) {
                    try {
                        await queryFulfilled;
                    } catch (err) {
                        console.log(err);
                        toast.error(JSON.stringify(err));
                    }
                },
                transformResponse: (response: any) => {
                    return response?.data?.user as ProfileViewType;
                },
            }),

            // Update Profile
            updateProfile: builder.mutation<APIResponseType<ProfileUpdateResponseType>, ProfileUpdateFormType>({
                query: ({ ...payload }) => {
                    var formData = new FormData();
                    formData.append('name', payload.name);
                    if (payload.phone_number !== undefined) {
                        formData.append('phone_number', payload.phone_number);
                    }
                    if (payload.profile_image instanceof File) {
                        formData.append('profile_image', payload.profile_image);
                    }
                    if (payload.date_of_birth !== undefined) {
                        formData.append('date_of_birth', payload.date_of_birth);
                    }
                    if (payload.nickname !== undefined) {
                        formData.append('nickname', payload.nickname);
                    }
                    if (payload.religion !== undefined) {
                        formData.append('religion', payload.religion);
                    }
                    if (payload.about !== undefined) {
                        formData.append('about', payload.about);
                    }
                    if (payload.country_id !== undefined) {
                        formData.append('country_id', payload.country_id.toString());
                    }
                    if (payload.user_language !== undefined) {
                        formData.append('user_language', payload.user_language);
                    }

                    return {
                        url: `${apiPaths.profileUpdateUrl}`,
                        method: 'POST',
                        body: formData,
                        formData: true,
                    };
                },
                invalidatesTags: ['Profile'],
                async onQueryStarted(payload, { queryFulfilled }) {
                    try {
                        await queryFulfilled;
                        toast.success('Profile updated.');
                    } catch (err) {
                        console.log(err);
                        toast.error('Failed updating profile.');
                    }
                },
                transformResponse: (response: any) => {
                    return response as APIResponseType<ProfileUpdateResponseType>;
                },
            }),

            // Update Profile
            myPasswordChange: builder.query<any, ChangePasswordFormType>({
                query: ({ ...payload }) => {
                    var formData = new FormData();
                    if (payload.current_password !== undefined) {
                        formData.append('current_password', payload.current_password);
                    }

                    if (payload.password !== undefined) {
                        formData.append('password', payload.password);
                    }

                    if (payload.password_confirmation !== undefined) {
                        formData.append('password_confirmation', payload.password_confirmation);
                    }

                    return {
                        url: `${apiPaths.accountPasswrodChangeUrl}`,
                        method: 'POST',
                        body: formData,
                        formData: true,
                    };
                },
                async onQueryStarted(payload, { queryFulfilled }) {
                    try {
                        await queryFulfilled;
                        toast.success('Password Changed');
                    } catch (err) {
                        console.log(err);
                        toast.error('Failed changing account password.');
                    }
                },
                transformResponse: (response) => {
                    return response as any;
                },
            }),

            // Delete Account
            accountDelete: builder.mutation<any, void>({
                query: () => {
                    return {
                        url: `${apiPaths.accountDeleteUrl}`,
                        method: 'GET',
                    };
                },
                transformResponse: (response) => {
                    return (response as any)?.data;
                },
            }),

        }),
        overrideExisting: true,
    });
export default profileApi;
