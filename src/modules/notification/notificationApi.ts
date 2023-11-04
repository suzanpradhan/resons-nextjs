import { apiPaths } from '@/core/api/apiConstants';
import { baseApi } from '@/core/api/apiQuery';
import { NotificationFormDetailType, NotificationListDetailType } from './notificationType';

const notificationApi = baseApi
    .enhanceEndpoints({ addTagTypes: ['Notifiations'] })
    .injectEndpoints({
        endpoints: (builder) => ({
            // Set Notification
            setNotification: builder.mutation<any, NotificationFormDetailType>({
                query: ({ ...payload }) => {
                    return {
                        url: `${apiPaths.setNotificationUrl}`,
                        method: 'POST',
                        body: payload,
                    };
                },
                transformResponse: (response) => {
                    return (response as any)?.data as NotificationFormDetailType;
                },
            }),

            // Get All Notification List
            getNotificationList: builder.query<NotificationListDetailType[], string>({
                query: (selectedType = '') => `${apiPaths.getNotificationListUrl}?type=${selectedType}&paginate=50&page=1`,
                async onQueryStarted(queryFulfilled) {
                    try {
                        await queryFulfilled;
                    } catch (err) {
                        console.log(err);
                    }
                },
                transformResponse: (response) => {
                    console.log(response);
                    return (response as any)?.data?.notifications as NotificationListDetailType[];
                },
            }),

            // Get Unread Notification List
            getUnreadNotificationList: builder.query<NotificationListDetailType[], void>({
                query: () => `${apiPaths.getUnreadNotificationListUrl}`,
                async onQueryStarted(queryFulfilled) {
                    try {
                        await queryFulfilled;
                    } catch (err) {
                        console.log(err);
                    }
                },
                transformResponse: (response) => {
                    console.log(response);
                    return (response as any)?.data as NotificationListDetailType[];
                },
            }),

            // Mark as read
            markAsRead: builder.query<NotificationListDetailType, string>({
                query: (id) => `${apiPaths.markNotificationAsReadUrl}${id}`,
                async onQueryStarted(queryFulfilled) {
                    try {
                        await queryFulfilled;
                    } catch (err) {
                        console.log(err);
                    }
                },
                transformResponse: (response) => {
                    return (response as any)?.data?.notifications as any;
                },
            }),

            unreadNotificationCount: builder.query<any, void>({
                query: () => `${apiPaths.unreadNotificationCountUrl}`,
                async onQueryStarted(queryFulfilled) {
                    try {
                        await queryFulfilled;
                    } catch (err) {
                        console.log(err);
                    }
                },
                transformResponse: (response) => {
                    console.log(response)
                    return (response as any)?.data as number;
                },
            }),
        }),
        overrideExisting: true,
    });

export default notificationApi;
