import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { apiPaths } from '../api/apiConstants';

export const authOptions: NextAuthOptions = {
  secret: process.env.JWT_SECRET,
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          // const { email, password, platform } = credentials as any;

          const res = await fetch(apiPaths.baseUrl + apiPaths.loginUrl, {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: { 'Content-Type': 'application/json' },
          });
          const data = await res.json();
          if (data.error) {
            throw data;
            // return null;
          }

          if (!data?.error && data) {
            console.log("data:" + data.data);

            return {
              token: data.optional.token,
              ...data.data,
            };
          }
          return null;
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger }) {
      if (trigger == 'update') {
        const response = await fetch(
          `${apiPaths.baseUrl}${apiPaths.profileUrl}`,
          {
            method: 'GET',
            headers: {
              authorization: `Bearer ${token.token}`,
              accept: 'application/json',
            },
          }
        );
        if (response.ok) {
          const responseData = await response.json();
          token.name = responseData.data.user.name;
          token.profile_image = responseData.data.user.profile_image;
          return Promise.resolve(token);
        }
      }

      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.token = user.token;
        token.profile_image = user.profile_image;
        token.token = user.token;
        token.email = user.email;
      }
      return Promise.resolve(token);
    },
    async session({ session, token }) {
      session.user = token;

      return Promise.resolve(session);
    },
  },
  pages: {
    signIn: '/login',
    signOut: '/login',
  },
};
