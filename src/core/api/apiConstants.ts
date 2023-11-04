import Cookies from 'js-cookie';
import { getServerSession } from 'next-auth';
import { getSession } from 'next-auth/react';
import { authOptions } from '../utils/authOptions';

export const apiConfig = {
  headers: {
    'content-type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
};

export const getHeaders = async () => {
  const session = await getServerSession(authOptions);

  const token = (session as any)?.user.accessToken as string;
  if (token) {
    (apiConfig as any)['headers']['authorization'] = `Bearer ${token}`;
  }

  return apiConfig;
};

export async function setHeaders(headers: Headers) {
  // const session = await getSession();
  // if (session) {
  //   const token = session?.user?.token;
  //   if (token) {
  //     headers.set('authorization', `Bearer ${token}`);
  //   }
  // }
  // headers.set('content-type', 'application/json');
  const getToken = Cookies.get('token');
  headers.set('Access-Control-Allow-Origin', '*');
  headers.set(
    'authorization',
    `Bearer ${getToken}`
  );

  headers.set('accept', 'application/json');
  return headers;
}

export async function setFormDataHeaders(headers: Headers) {
  const session = await Promise.resolve(await getSession());
  if (session) {
    const token = session.user?.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
  }

  headers.set('Content-Type', 'multipart/form-data');
  console.log(headers);
  // headers.set('Access-Control-Allow-Origin', '*');
  return headers;
}

export const apiPaths = {
  baseUrl: process.env.NEXT_PUBLIC_SERVER_URL + '/api',
  rootPath: process.env.NEXT_PUBLIC_SERVER_URL,
  csrfPath: '/sanctum/csrf-cookie',
  // SingIn/Up
  loginUrl: '/login/email',
  registerUrl: '/register/email',
  // Profile
  profileUrl: '/me',
  viewProfile: '/viewProfile',
  profileUpdateUrl: '/updateProfile',
  accountDeleteUrl: '/socialnetwork/settings/delete-account',
  accountPasswrodChangeUrl: '/change-password',
  // Story
  storyCreateUrl: '/socialnetwork/story/store',
  storyListUrl: '/socialnetwork/story/list',
  myStoryListUrl: '/socialnetwork/story/my-story',
  // Post
  postUrl: '/socialnetwork/post/list',
  postDeleteUrl: '/socialnetwork/post/delete',
  allPostDeleteUrl: '/socialnetwork/settings/delete-all-posts',
  myPostUrl: '/socialnetwork/post/my-posts?paginate=',
  userPostUrl: '/socialnetwork/profile/list-posts',
  postSingleUrl: '/socialnetwork/post/display',
  postCreateUrl: '/socialnetwork/post/create',
  postAudioDownload: '/socialnetwork/audio/download/',
  // Comment
  commentUrl: '/socialnetwork/post/comment/create',
  postAllCommentsUrl: '/socialnetwork/post/comment/list',
  // Actions
  likeUrl: '/socialnetwork/post/interact',
  getPostlikeUrl: '/socialnetwork/post/likes',
  getCommentlikeUrl: '/socialnetwork/post/comment/likes',
  likeCommentUrl: '/socialnetwork/post/comment/interact',
  search_q: '/socialnetwork/search?q=',
  // Follow
  unFollowUrl: '/socialnetwork/profile/unfollow',
  followUrl: '/socialnetwork/profile/follow',
  userFollower: '/socialnetwork/profile/list-followers',
  userFollowing: '/socialnetwork/profile/list-following',
  // Playlist
  myPlaylistsUrl: '/socialnetwork/playlist/list',
  playlistAudioUrl: '/socialnetwork/playlist/list-audio',
  playlistMinUrl: '/socialnetwork/playlist/min-list',
  addAudioToPlaylistUrl: '/socialnetwork/playlist/add-audio',
  removeAudioToPlaylistUrl: '/socialnetwork/playlist/remove-audio',
  addPlaylistUrl: '/socialnetwork/playlist/create',
  // Geners
  getGenresUrl: '/socialnetwork/list-genre',
  // Notification
  setNotificationUrl: '/socialnetwork/settings/update',
  getNotificationListUrl: '/notification/list',
  getUnreadNotificationListUrl: '/notification/list-unread',
  markNotificationAsReadUrl: '/notification/mark-as-read/',
  unreadNotificationCountUrl: '/notification/unread-count',
  // Pages
  getTermsUrl: '/socialnetwork/content/terms-and-conditions',
  getPoliciesUrl: '/socialnetwork/content/privacy-policy',
  // Countries
  countriesListUrl: '/countries',
  //Topic List
  getTopicsListUrl: '/socialnetwork/api-topics/lists',
  //Cover Image
  getCoverImageUrl: '/socialnetwork/cover-images',

  // Social Auth
  socialUrl: '/login/social',
};
