import type { Middleware } from '@reduxjs/toolkit';
import { isRejectedWithValue } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

export const rtkQueryErrorLogger: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    if (action.payload?.status == 401) {
      toast.error('Unauthorized');
      console.log(action);

      // signOut({ callbackUrl: '/login', redirect: true });
    }
  }

  return next(action);
};
