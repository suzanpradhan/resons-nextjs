import { apiPaths } from '@/core/api/apiConstants';
import { baseApi } from '@/core/api/apiQuery';
import { toast } from 'react-toastify';
import { TermsDetailType } from './pagesType';

const pagesApi = baseApi
    .enhanceEndpoints({ addTagTypes: ['Pages'] })
    .injectEndpoints({
        endpoints: (builder) => ({
            // Get Terms & Conditions
            getTerms: builder.query<TermsDetailType, void>({
                query: () => `${apiPaths.getTermsUrl}`,
                providesTags: ['Pages'],
                async onQueryStarted(payload, { queryFulfilled }) {
                    try {
                        await queryFulfilled;
                    } catch (err) {
                        console.log(err);
                        toast.error(JSON.stringify(err));
                    }
                },
                transformResponse: (response) => {
                    return (response as any)?.data as TermsDetailType;
                },
            }),
        }),
        overrideExisting: true,
    });

export default pagesApi;
