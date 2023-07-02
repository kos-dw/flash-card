import type { FC, ChangeEventHandler } from 'react';
import { QuickSearchBox } from 'components/organisms';

import type { WordSchema } from 'features/wordCollection';

interface Props {
  searchedCard: WordSchema[] | undefined;
  setSearchedCard: React.Dispatch<
    React.SetStateAction<WordSchema[] | undefined>
  >;
}

export const QuickSearcher: FC<Props> = ({ searchedCard, setSearchedCard }) => {
  const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const list = searchedCard?.filter((row) =>
      new RegExp(event.target.value, 'i').test(row.英文)
    );
    if (list != null) {
      setSearchedCard(list);
    }
  };

  return (
    <QuickSearchBox
      {...{
        onChange,
      }}
    />
  );
};
