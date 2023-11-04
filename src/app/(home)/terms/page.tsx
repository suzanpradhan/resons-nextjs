'use client';

import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import pagesApi from '@/modules/pages/pagesApi';
import { TermsDetailType } from '@/modules/pages/pagesType';
import { useEffect } from 'react';

export default function TermsPage() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(pagesApi.endpoints.getTerms.initiate());
  }, [dispatch]);

  const getTerms = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries[`getTerms(undefined)`]?.data as TermsDetailType[]
  );

  return (
    <>
      <div className="container mx-auto mb-20 px-4 min-h-screen">
        Terms & Conditions
      </div>
    </>
  );
}
