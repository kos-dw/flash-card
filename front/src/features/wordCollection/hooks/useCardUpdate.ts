import { useState } from 'react';
import { useAuth } from 'features/authentication';
import { kyClient } from 'utils';
import type { UseCardUpdate, OnPut } from '../types';

export const useCardUpdate = (): UseCardUpdate => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown | undefined>();
  const [auth] = useAuth();

  const onPut: OnPut = async (formdata, beforeRequest, afterResponse) => {
    setIsLoading(true);

    const additionalData = {
      data: {
        title: formdata.英文,
        japanese: formdata.意味,
        category: {
          id: Number(formdata.カテゴリ),
        },
      },
    };

    try {
      if (auth != null) {
        await kyClient.put(`word-collections/${formdata.uid}`, {
          searchParams: { populate: 'category' },
          headers: {
            Authorization: `Bearer ${auth.jwt}`,
          },
          json: additionalData,
          hooks: {
            beforeRequest: [beforeRequest],
            afterResponse: [afterResponse],
          },
        });
      }
      setIsLoading(false);
    } catch (e) {
      setError(e);
      setIsLoading(false);
    }
  };

  return [onPut, { isLoading, error }];
};
