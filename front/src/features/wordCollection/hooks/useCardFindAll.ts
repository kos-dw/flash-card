import { useEffect, useState } from 'react';
import { useAuth } from 'features/authentication';
import { kyClient } from 'utils';
import { isWordList } from '../types';
import type {
  WordSchema,
  WCResponse,
  WordColection,
  UseCardFindAll,
} from '../types';
import { useConnecting } from './useConnecting';

export const useCardFindAll = (): UseCardFindAll => {
  const [cards, setCards] = useState<WordSchema[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [isConnecting] = useConnecting();
  const [error, setError] = useState<unknown | undefined>();
  const [auth] = useAuth();

  const fetchCardFindAll = async (
    endpoint: string,
    token: string
  ): Promise<void> => {
    const json: WCResponse<WordColection[]> = await kyClient
      .get(endpoint, {
        searchParams: { populate: 'category' },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json();

    if (!isWordList(json.data)) throw Error('API type error');

    setCards(
      json.data.map((row) => ({
        uid: typeof row.id === 'number' ? row.id.toString() : row.id,
        英文: row.attributes.title,
        意味: row.attributes.japanese,
        カテゴリ: row.attributes.category.data.id.toString(),
      }))
    );
  };

  useEffect(() => {
    try {
      setIsLoading(true);
      if (auth != null) void fetchCardFindAll('word-collections', auth.jwt);
      setIsLoading(false);
    } catch (e) {
      setError(e);
      setIsLoading(false);
    }
  }, [auth, isLoading, isConnecting]);

  return [cards, { isLoading, error, setIsLoading }];
};
