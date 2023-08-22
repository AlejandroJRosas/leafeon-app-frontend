// material-ui

import { useEffect, useState, useCallback } from 'react';
import getPaginate from 'services/wallets/get-paginate';
import { Wallet } from 'services/wallets/types';
import { PaginateData } from 'services/types';
import BackendError from 'exceptions/backend-error';
import { useAppDispatch } from 'store';
import { setErrorMessage, setIsLoading } from 'store/customizationSlice';

export default function usePaginate() {
  const dispatch = useAppDispatch();
  const [items, setItems] = useState<Wallet[]>([]);
  const [page, setPage] = useState(1);
  const [paginate, setPaginate] = useState<PaginateData>({
    total: 0,
    page: 1,
    perPage: 5,
    pages: 0,
  });

  const fetchWallets = useCallback(async (page?: number) => {
    try {
      dispatch(setIsLoading(true));
      const response = await getPaginate({
        page: page || 1,
        size: paginate.perPage,
      });
      setItems(response.items);
      setPaginate(response.paginate);
    } catch (error) {
      if (error instanceof BackendError)
        dispatch(setErrorMessage(error.getMessage()));
    } finally {
     dispatch(setIsLoading(false));
    }
  }, [dispatch, paginate.perPage]);

  useEffect(() => {
    fetchWallets(page);
  }, [fetchWallets, page]);

  return { items, page, paginate, setPage, fetchWallets } as const;
}