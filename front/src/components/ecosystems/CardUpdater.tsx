import type { FC } from 'react';
import { CardUpdatingBox } from 'components/organisms';
import type { WordSchema } from 'features/wordCollection';
import { UpdatingForm } from './SimpleForm';

interface Props {
  card: WordSchema;
  setIsProcessing: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CardUpdater: FC<Props> = ({ card, setIsProcessing }) => {
  return <CardUpdatingBox {...{ card, setIsProcessing, UpdatingForm }} />;
};
