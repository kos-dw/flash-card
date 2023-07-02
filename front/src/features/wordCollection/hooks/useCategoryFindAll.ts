import { useEffect, useState, useCallback } from 'react';
import { useAuth } from 'features/authentication';
import { useCategoryFindAllQuery } from 'features/graphql';
import { isCategoriesGql } from '../types';
import type { CategorySchema, UseCategoryFindAll } from '../types';

export const useCategoryFindAll = (): UseCategoryFindAll => {
  const [categories, setCategories] = useState<CategorySchema[]>();
  const [auth] = useAuth();
  const [result] = useCategoryFindAllQuery();
  const { data, fetching, error } = result;

  const createCollection = useCallback((): void => {
    const collection = data?.categories?.data as unknown;

    if (isCategoriesGql(collection)) {
      const mutatedCollection = collection.map((row) => ({
        uid: row.id,
        カテゴリ: row.attributes.name,
      }));
      setCategories(mutatedCollection);
    } else {
      throw Error('API type error');
    }
  }, [data]);

  useEffect(() => {
    try {
      if (auth != null) createCollection();
    } catch (e) {
      if (e instanceof Error) {
        console.error('Oh no! We got an error:', e.message);
      } else if (typeof e === 'string') {
        console.error('Oh no! We got an error:', e);
      } else {
        console.log('Unexpected error');
      }
    }
  }, [auth, createCollection, fetching]);

  return [categories, { isLoading: fetching, error }];
};
