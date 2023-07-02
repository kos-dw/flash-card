import { useState } from 'react';
import { useAuth } from 'features/authentication';
import { useCardEraseMutation } from 'features/graphql';
import type { UseCardErase, OnDelete } from '../types';

export const useCardErase = (): UseCardErase => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown | undefined>();
  const [auth] = useAuth();
  const [_, deleteCard] = useCardEraseMutation();

  const onDelete: OnDelete = async (uid, beforeRequest, afterResponse) => {
    try {
      setIsLoading(true);

      if (auth != null) {
        beforeRequest();
        const result = await deleteCard({
          id: uid,
        });
        afterResponse();

        if (result.error != null) {
          setError(result.error);
        }
      }

      setIsLoading(false);
    } catch (e) {
      if (e instanceof Error) {
        console.error('Oh no! We got an error:', e.message);
      } else if (typeof e === 'string') {
        console.error('Oh no! We got an error:', e);
      } else {
        console.log('Unexpected error');
      }
      setError(e);
      setIsLoading(false);
    }
  };

  return [onDelete, { isLoading, error }];
};
