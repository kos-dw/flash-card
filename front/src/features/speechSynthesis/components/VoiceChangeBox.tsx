import type { ChangeEventHandler, FC } from 'react';
import { Select, Button } from '@chakra-ui/react';

interface Props {
  isVoicesLoaded: boolean;
  voicesList: SpeechSynthesisVoice[];
  initSelectValue: string | null;
  onChenge: ChangeEventHandler<HTMLSelectElement>;
}

export const VoiceChangeBox: FC<Props> = ({
  isVoicesLoaded,
  voicesList,
  initSelectValue,
  onChenge,
}) => {
  return (
    <>
      {isVoicesLoaded ? (
        <Select onChange={onChenge} value={initSelectValue ?? undefined}>
          {voicesList.map((row) => (
            <option value={row.voiceURI} key={row.voiceURI}>
              {row.name} ― {row.lang}
            </option>
          ))}
        </Select>
      ) : (
        <Button onClick={() => window.location.reload()}>音声のロード</Button>
      )}
    </>
  );
};
