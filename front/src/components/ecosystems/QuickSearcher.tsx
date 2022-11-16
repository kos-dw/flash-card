import type { FC, ChangeEventHandler } from 'react';
import { QuickSearchBox } from 'components/organisms';
import { useCardFindAll } from 'features/wordCollection';
import type { WordSchema } from 'features/wordCollection';

interface Props {
  setSearchedCard: React.Dispatch<
    React.SetStateAction<WordSchema[] | undefined>
  >;
}

export const QuickSearcher: FC<Props> = ({ setSearchedCard }) => {
  const [cards, helper] = useCardFindAll();

  const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const list = cards?.filter((row) =>
      new RegExp(event.target.value, 'i').test(row.英文)
    );
    if (list != null) {
      setSearchedCard(list);
    }
  };

  return (
    <QuickSearchBox
      {...{
        cards,
        helper,
        setSearchedCard,
        onChange,
      }}
    />
  );
};
