import { useEffect } from 'react';
import { useCardFindAll } from 'features/wordCollection';
import type { WordSchema } from 'features/wordCollection/types';
import { atom, useAtom } from 'jotai';

export const listAtom = atom(async () => {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  return ['item a', 'item b', 'item c'];
});

export const useWordList = (): [
  WordSchema[] | undefined,
  (update?: WordSchema[]) => void | Promise<void>,
  boolean
] => {
  const [cards, { isLoading }] = useCardFindAll();
  const wordSchemaAtom = atom<WordSchema[] | undefined>([]);
  const [wordList, setWordList] = useAtom(wordSchemaAtom);

  // useEffect(() => {
  //   setWordList(cards);
  // }, [cards, setWordList]);

  return [wordList, setWordList, isLoading];
};

export const ListMain = (): string[] => {
  const [list] = useAtom<string[]>(listAtom);

  return list;
};
