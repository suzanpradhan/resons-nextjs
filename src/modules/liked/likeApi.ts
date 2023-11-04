import { apiPaths } from '@/core/api/apiConstants';
import { baseApi } from '@/core/api/apiQuery';
import { PaginatedResponseType } from '@/core/types/reponseTypes';
import { GetPostLikeDetailType, LikeFormCommentType, LikeFormType } from './likeType';

const likeApi = baseApi
    .injectEndpoints({
        endpoints: (builder) => ({
            // Get Post Like List
            getPostLike: builder.query<PaginatedResponseType<GetPostLikeDetailType>, { postId: number, page: number }>({
                query: ({ ...props }) => `${apiPaths.getPostlikeUrl}/${props.postId}?page=${props.page}&paginate=10`,
                providesTags: (result) =>
                    result
                        ? [
                            ...result.data.map(({ user }) => ({ type: 'PostLikes', id: user.id } as const)),
                            { type: 'PostLikes', id: 'LIST' },
                        ]
                        : [{ type: 'PostLikes', id: 'LIST' }],
                serializeQueryArgs: ({ queryArgs, endpointName }) => {
                    return endpointName + "-" + queryArgs.postId;
                },
                merge: (currentCache, newItems) => {
                    currentCache.pagination = newItems.pagination;
                    currentCache.data.push(...newItems.data);
                },
                forceRefetch({ currentArg, previousArg }) {
                    return currentArg !== previousArg;
                },
                transformResponse: (response: any) => {
                    return response?.data as PaginatedResponseType<GetPostLikeDetailType>;
                },
            }),
            // Get Comment Like List
            getCommentLike: builder.query<PaginatedResponseType<GetPostLikeDetailType>, { commentId: number, page: number }>({
                query: ({ ...props }) => `${apiPaths.getCommentlikeUrl}/${props.commentId}?page=${props.page}&paginate=10`,
                providesTags: (result) =>
                    result
                        ? [
                            ...result.data.map(({ user }) => ({ type: 'CommentLikes', id: user.id } as const)),
                            { type: 'CommentLikes', id: 'LIST' },
                        ]
                        : [{ type: 'CommentLikes', id: 'LIST' }],
                serializeQueryArgs: ({ queryArgs, endpointName }) => {
                    return endpointName + "-" + queryArgs.commentId;
                },
                merge: (currentCache, newItems) => {
                    currentCache.pagination = newItems.pagination;
                    console.log(newItems.data);
                    currentCache.data.push(...newItems.data);
                },
                forceRefetch({ currentArg, previousArg }) {
                    return currentArg !== previousArg;
                },
                transformResponse: (response: any) => {
                    return response?.data as PaginatedResponseType<GetPostLikeDetailType>;
                },
            }),
            // Upload Ticket Attachments
            addLiked: builder.mutation<any, LikeFormType>({
                query: ({ ...payload }) => {
                    return {
                        url: `${apiPaths.likeUrl}`,
                        method: 'POST',
                        body: payload,
                    };
                },
                transformResponse: (response) => {
                    console.log(response)
                    return (response as any)?.data as LikeFormType;
                },
            }),

            // Upload Ticket Attachments
            addLikedComment: builder.mutation<any, LikeFormCommentType>({
                query: ({ ...payload }) => {
                    return {
                        url: `${apiPaths.likeCommentUrl}`,
                        method: 'POST',
                        body: payload,
                    };
                },
                transformResponse: (response) => {
                    console.log(response)
                    return (response as any)?.data as LikeFormCommentType;
                },
            }),
        }),
        overrideExisting: true,
    });

export default likeApi;
