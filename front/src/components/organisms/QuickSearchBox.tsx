import type { FC, ChangeEventHandler } from 'react';
import { Input } from '@chakra-ui/react';

interface Props {
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export const QuickSearchBox: FC<Props> = ({ onChange }) => {
  return (
    <>
      <Input placeholder="Quick search..." onChange={onChange} />
    </>
  );
};
