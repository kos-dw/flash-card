import type { FC } from 'react';
import { CardErasingBox } from 'components/organisms';
import type { WordSchema } from 'features/wordCollection';
import { useCardErase } from 'features/wordCollection';

interface Props {
  card: WordSchema;
}

export const CardEraser: FC<Props> = ({ card }) => {
  const [onDelete, helper] = useCardErase();

  return <CardErasingBox {...{ card, onDelete, helper }} />;
};
