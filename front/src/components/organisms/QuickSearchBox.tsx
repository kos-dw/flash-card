import type { FC, ChangeEventHandler } from 'react';
import { useEffect } from 'react';
import { Input } from '@chakra-ui/react';
import type { WordSchema } from 'features/wordCollection';

interface Props {
  cards?: WordSchema[];
  helper: {
    isLoading: boolean;
    error: unknown;
  };
  setSearchedCard: React.Dispatch<
    React.SetStateAction<WordSchema[] | undefined>
  >;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export const QuickSearchBox: FC<Props> = ({
  cards,
  helper,
  setSearchedCard,
  onChange,
}) => {
  useEffect(() => {
    setSearchedCard(cards);
  }, [cards, helper.isLoading, setSearchedCard]);

  return (
    <>
      <Input placeholder="Quick search..." onChange={onChange} />
    </>
  );
};
