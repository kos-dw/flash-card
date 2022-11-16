import type { FC } from 'react';
import type { UseSpeechSynthesis } from 'features/speechSynthesis';
import type { WordSchema } from 'features/wordCollection';
import { BsVolumeUp } from 'react-icons/bs';

interface Props {
  cards?: WordSchema[];
  speak?: UseSpeechSynthesis['speak'];
}

const DEFAULT_VALUE = {
  cards: [
    {
      uid: '1',
      英文: 'Lorem ipsum',
      意味: 'あのイーハトーヴォのすきとおった風',
      カテゴリ: 'sentence',
      追加日: '0000年00月00日 00:00',
    },
    {
      uid: '2',
      英文: 'Tenetur, sit placeat.',
      意味: '山路を登りながら、こう考えた。',
      カテゴリ: 'sentence',
      追加日: '0000年00月00日 00:00',
    },
  ],
  speak: (): void => console.error('Missing voice'),
};
export const CardBrowsingBox: FC<Props> = ({
  cards = DEFAULT_VALUE.cards,
  speak = DEFAULT_VALUE.speak,
}) => {
  return (
    <ul>
      {cards.map((word) => (
        <li className="mb-3 flex items-center" key={word.uid}>
          <dl className="border-gray grow border-b">
            <dt className="en text-xl">{word.英文}</dt>
            <dd>{word.意味}</dd>
          </dl>
          <div className="pl-5">
            <button onClick={() => speak(word.英文)}>
              <BsVolumeUp className="text-3xl" />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};
