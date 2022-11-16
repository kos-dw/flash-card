import type { FC } from 'react';
import { CardCreatingBox } from 'components/organisms';
import { CreatingForm } from './SimpleForm';

export const CardCreater: FC = () => {
  return <CardCreatingBox {...{ CreatingForm }} />;
};
