import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { CardBrowser, QuickSearcher } from 'components/ecosystems';
import { VoiceChanger } from 'features/speechSynthesis';
import type { WordSchema } from 'features/wordCollection';
import { useCardFindAll } from 'features/wordCollection';

const Home: FC = () => {
  const [cards] = useCardFindAll();
  const [searchedCard, setSearchedCard] = useState<WordSchema[]>();

  useEffect(() => {
    if (cards != null) setSearchedCard(cards);
  }, [cards]);

  return (
    <>
      <section className="container my-3">
        <ul className="flex flex-wrap items-center justify-between">
          <li className="en mb-3 w-full">
            <QuickSearcher {...{ searchedCard, setSearchedCard }} />
          </li>
          <li className="en mr-3 shrink-0 grow-0">
            <b>音声選択</b>
          </li>
          <li className="en shrink grow">
            <VoiceChanger />
          </li>
        </ul>
      </section>
      <section className="container my-3">
        <CardBrowser {...{ cards: searchedCard }} />
      </section>
    </>
  );
};

export default Home;
