import { useState } from 'react';
import type { FC, ChangeEventHandler } from 'react';
import { useSpeechSynthesis } from 'features/speechSynthesis';
import { VoiceChangeBox } from './VoiceChangeBox';

export const VoiceChanger: FC = () => {
  const { isVoicesLoaded, voicesList } = useSpeechSynthesis();
  const [initSelectValue, setInitSelectValue] = useState<string | null>(
    localStorage.getItem(import.meta.env.VITE_API_VOICEURI)
  );

  const onChenge: ChangeEventHandler<HTMLSelectElement> = (e) => {
    localStorage.setItem(import.meta.env.VITE_API_VOICEURI, e.target.value);
    setInitSelectValue(e.target.value);
  };

  return (
    <VoiceChangeBox
      {...{
        isVoicesLoaded,
        voicesList,
        initSelectValue,
        onChenge,
      }}
    />
  );
};
