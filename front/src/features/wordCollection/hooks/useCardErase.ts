import { useState } from 'react';
import { useAuth } from 'features/authentication';
import { kyClient } from 'utils';
import type { UseCardErase, OnDelete } from '../types';

export const useCardErase = (): UseCardErase => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown | undefined>();
  const [auth] = useAuth();

  const onDelete: OnDelete = async (uid, beforeRequest, afterResponse) => {
    setIsLoading(true);

    try {
      if (auth != null) {
        await kyClient.delete(`word-collections/${uid}`, {
          searchParams: { populate: 'category' },
          headers: {
            Authorization: `Bearer ${auth.jwt}`,
          },
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

  return [onDelete, { isLoading, error }];
};
