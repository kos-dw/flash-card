import { useState } from 'react';
import { useAuth } from 'features/authentication';
import { useCardCreateMutation } from 'features/graphql';
import type { UseCardCreate, onPost } from '../types';

export const useCardCreate = (): UseCardCreate => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown | undefined>();
  const [auth] = useAuth();
  const [_, createCard] = useCardCreateMutation();

  const onPost: onPost = async (formdata, beforeRequest, afterResponse) => {
    try {
      setIsLoading(true);

      if (auth != null) {
        beforeRequest();
        const result = await createCard({
          title: formdata.英文,
          japanese: formdata.意味,
          category: formdata.カテゴリ,
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

  return [onPost, { isLoading, error }];
};
