import { useEffect, useState, useCallback } from 'react';
import { useAuth } from 'features/authentication';
import { useCardFindAllQuery } from 'features/graphql';
import { isWordListWithGql } from '../types';
import type { WordSchema, UseCardFindAll } from '../types';
import { useConnecting } from './useConnecting';

export const useCardFindAll = (): UseCardFindAll => {
  const [auth] = useAuth();
  const [isConnecting] = useConnecting();
  const [cards, setCards] = useState<WordSchema[]>();
  const [result, reexecuteQuery] = useCardFindAllQuery();
  const { data, fetching, error } = result;

  const createCollection = useCallback((): void => {
    const collections = data?.wordCollections?.data as unknown;

    if (isWordListWithGql(collections)) {
      const mutatedCollection = collections.map((row) => ({
        uid: row.id,
        英文: row.attributes.title,
        意味: row.attributes.japanese,
        カテゴリ: row.attributes.category.data.id,
      }));
      setCards(mutatedCollection);
    } else {
      throw Error('API type error');
    }
  }, [data]);

  const refresh = useCallback(() => {
    reexecuteQuery({ requestPolicy: 'network-only' });
  }, [reexecuteQuery]);

  useEffect(() => {
    try {
      if (auth != null) createCollection();
      if (isConnecting) refresh();
    } catch (e) {
      if (e instanceof Error) {
        console.error('Oh no! We got an error:', e.message);
      } else if (typeof e === 'string') {
        console.error('Oh no! We got an error:', e);
      } else {
        console.log('Unexpected error');
      }
    }
  }, [auth, isConnecting, fetching, createCollection, refresh]);

  return [cards, { isLoading: fetching, error }];
};
