import { useEffect, useState } from 'react';
import { useAuth } from 'features/authentication';
import { kyClient, isKyError } from 'utils';
import { isCategories } from '../types';
import type {
  CategorySchema,
  WCResponse,
  Category,
  UseCategoryFindAll,
} from '../types';

export const useCategoryFindAll = (): UseCategoryFindAll => {
  const [categories, setCategories] = useState<CategorySchema[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown | undefined>();
  const [auth] = useAuth();

  const fetchCategoryFindAll = async (
    endpoint: string,
    token: string
  ): Promise<void> => {
    try {
      const json: WCResponse<Category[]> = await kyClient
        .get(endpoint, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .json();
      if (!isCategories(json.data)) throw Error('API type error');

      setCategories(
        json.data.map((row) => ({
          uid: typeof row.id === 'number' ? row.id.toString() : row.id,
          カテゴリ: row.attributes.name,
        }))
      );
    } catch (e) {
      if (e instanceof Error) {
        console.error(e);
      } else if (isKyError(e)) {
        console.error(e.response.statusText);
      } else if (typeof e === 'string') {
        console.error(e);
      }
    }
  };

  useEffect(() => {
    try {
      setIsLoading(true);
      if (auth != null) void fetchCategoryFindAll('categories', auth.jwt);
      setIsLoading(false);
    } catch (e) {
      setError(e);
      setIsLoading(false);
    }
  }, [auth, isLoading]);

  return [categories, { isLoading, error }];
};
