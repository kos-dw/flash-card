import type { FC } from 'react';
import { CardBrowsingBox } from 'components/organisms';
import { useSpeechSynthesis } from 'features/speechSynthesis';
import type { WordSchema } from 'features/wordCollection';

interface Props {
  cards?: WordSchema[];
}

const Loading: FC = () => <div className="text-center">Loading...</div>;

export const CardBrowser: FC<Props> = ({ cards }) => {
  const { speak } = useSpeechSynthesis();

  return cards != null ? (
    <CardBrowsingBox {...{ cards, speak }} />
  ) : (
    <Loading />
  );
};
