import { DefaultSession } from 'next-auth';

interface IUser {
  id: string;
  name?: string | null;
  email?: string | null;
  user_type: string;
  token: string;
  profile_image?: string;
}

declare module 'next-auth' {
  interface User extends IUser { }

  interface Session extends DefaultSession {
    user?: User;
  }
}



declare module 'next-auth/jwt' {
  interface JWT extends IUser { }
}
