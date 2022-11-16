import type { FC } from 'react';
import { useState } from 'react';
import { CardBrowser, QuickSearcher } from 'components/ecosystems';
import { VoiceChanger } from 'features/speechSynthesis';
import type { WordSchema } from 'features/wordCollection';

const Home: FC = () => {
  const [searchedCard, setSearchedCard] = useState<WordSchema[]>();

  return (
    <>
      <section className="container my-3">
        <ul className="flex flex-wrap items-center justify-between">
          <li className="en mb-3 w-full">
            <QuickSearcher {...{ setSearchedCard }} />
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
