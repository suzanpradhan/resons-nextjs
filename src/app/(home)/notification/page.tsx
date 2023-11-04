/* eslint-disable @next/next/no-img-element */
'use client';

import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import notificationApi from '@/modules/notification/notificationApi';
import { NotificationListDetailType } from '@/modules/notification/notificationType';
import { useEffect, useState } from 'react';
import Connections from './(components)/Connections';
import NotificationCardComment from './(components)/NotificationCardComment';
import NotificationCardCommentLike from './(components)/NotificationCardCommentLike';
import NotificationCardFollow from './(components)/NotificationCardFollow';
import NotificationCardLike from './(components)/NotificationCardLike';
import NotificationFilterBar from './(components)/NotificationFilterBar';

export default function NotificationPage() {
  const dispatch = useAppDispatch();
  const [selectedTab, setSelectedTab] = useState('');

  const handleTypeChange = (selectedType: any) => {
    setSelectedTab(selectedType);
  };

  useEffect(() => {
    if (selectedTab === 'unread') {
      dispatch(notificationApi.endpoints.getUnreadNotificationList.initiate());
    } else {
      dispatch(
        notificationApi.endpoints.getNotificationList.initiate(selectedTab)
      );
    }
  }, [dispatch, selectedTab]);

  const notificationListData = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries[`getNotificationList("${selectedTab}")`]
        ?.data as NotificationListDetailType[]
  );

  const unreadNotificationListData = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries[`getUnreadNotificationList(undefined)`]
        ?.data as NotificationListDetailType[]
  );

  return (
    <div className="sm:container md:container lg:container mx-auto mb-16 sm:mb-0 min-h-screen">
      <div className="bg-white flex flex-col lg:flex-row pt-5">
        <div className="w-full basis-full lg:basis-3/4">
          <div className="top px-5 border border-t-0 border-r-0 border-l-0 border-gray-200">
            <h3 className=" text-gray-900 text-md md:text-xl mb-3 font-bold">
              Notifications
            </h3>
          </div>
          <div className="flex">
            <div className="basis-[180px] w-full hidden lg:block">
              <NotificationFilterBar onTypeChange={handleTypeChange} />
            </div>

            <div className="w-full border border-t-0 border-r-0 border-b-0 border-l-0 lg:border-l lg:border-r border-gray-200">
              {selectedTab !== 'unread' && (
                <>
                  {notificationListData ? (
                    notificationListData.length > 0 ? (
                      notificationListData.map((notification: any) => {
                        let notificationComponent = null;

                        if (notification.data.type === 'post_like') {
                          notificationComponent = (
                            <NotificationCardLike
                              key={notification.id}
                              id={notification.id}
                              post={notification.data?.post}
                              user={notification.data?.user}
                              createdAt={notification.created_at_human}
                              readAt={notification.read_at}
                            />
                          );
                        } else if (notification.data.type === 'post_comment') {
                          notificationComponent = (
                            <NotificationCardComment
                              key={notification.id}
                              id={notification.id}
                              post={notification.data?.post}
                              user={notification.data?.user}
                              createdAt={notification.created_at_human}
                              readAt={notification.read_at}
                            />
                          );
                        } else if (notification.data.type === 'comment_like') {
                          notificationComponent = (
                            <NotificationCardCommentLike
                              key={notification.id}
                              id={notification.id}
                              comment={notification.data?.comment}
                              user={notification.data?.user}
                              createdAt={notification.created_at_human}
                              readAt={notification.read_at}
                            />
                          );
                        } else {
                          if (notification.data.follower) {
                            notificationComponent = (
                              <NotificationCardFollow
                                key={notification.id}
                                id={notification.id}
                                follower={notification.data?.follower}
                                createdAt={notification.created_at_human}
                                readAt={notification.read_at}
                              />
                            );
                          }
                        }

                        return notificationComponent;
                      })
                    ) : (
                      <>
                        <div
                          className={`flex justify-between items-center px-5 py-3`}
                        >
                          No Data Found
                        </div>
                      </>
                    )
                  ) : (
                    <div
                      className={`flex justify-between items-center px-5 py-3`}
                    >
                      loading...
                    </div>
                  )}
                </>
              )}

              {selectedTab === 'unread' && (
                <>
                  {unreadNotificationListData ? (
                    unreadNotificationListData.length > 0 ? (
                      unreadNotificationListData.map((notification: any) => {
                        let notificationComponent = null;

                        if (notification.data.type === 'post_like') {
                          notificationComponent = (
                            <NotificationCardLike
                              key={notification.id}
                              id={notification.id}
                              post={notification.data?.post}
                              user={notification.data?.user}
                              createdAt={notification.created_at_human}
                              readAt={notification.read_at}
                            />
                          );
                        } else if (notification.data.type === 'post_comment') {
                          notificationComponent = (
                            <NotificationCardComment
                              key={notification.id}
                              id={notification.id}
                              post={notification.data?.post}
                              user={notification.data?.user}
                              createdAt={notification.created_at_human}
                              readAt={notification.read_at}
                            />
                          );
                        } else if (notification.data.type === 'comment_like') {
                          notificationComponent = (
                            <NotificationCardCommentLike
                              key={notification.id}
                              id={notification.id}
                              comment={notification.data?.comment}
                              user={notification.data?.user}
                              createdAt={notification.created_at_human}
                              readAt={notification.read_at}
                            />
                          );
                        } else {
                          if (notification.data.follower) {
                            notificationComponent = (
                              <NotificationCardFollow
                                key={notification.id}
                                id={notification.id}
                                follower={notification.data?.follower}
                                createdAt={notification.created_at_human}
                                readAt={notification.read_at}
                              />
                            );
                          }
                        }

                        return notificationComponent;
                      })
                    ) : (
                      <>
                        <div
                          className={`flex justify-between items-center px-5 py-3`}
                        >
                          No Data Found
                        </div>
                      </>
                    )
                  ) : (
                    <div
                      className={`flex justify-between items-center px-5 py-3`}
                    >
                      loading...
                    </div>
                  )}
                </>
              )}

              {/* <NotificationCardComment />
              <NotificationCardLike />
              <NotificationCardRepost />
              <NotificationCardFollow follow={true} />
              <NotificationCardFollow follow={false} /> */}
            </div>
          </div>
        </div>
        <div className="w-full basis-full lg:basis-1/4">
          <div className="top px-5 border border-t-0 border-r-0 border-l-0 border-gray-200">
            <h3 className="text-gray-900 text-md md:text-xl mb-3 font-bold">
              Suggestions
            </h3>
          </div>
          <div className="px-4 py-4">
            <Connections
              name="Niwesh Shrestha"
              imgPath="https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?size=626&ext=jpg"
              followers="37.4k"
              vip={true}
              music_count="156"
            />
            <Connections
              name="Pratik Joshi"
              imgPath="https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?size=626&ext=jpg"
              followers="37.4k"
              vip={true}
              music_count="156"
            />
            <Connections
              name="Saroj Khanal"
              imgPath="https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?size=626&ext=jpg"
              followers="37.4k"
              vip={true}
              music_count="156"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
