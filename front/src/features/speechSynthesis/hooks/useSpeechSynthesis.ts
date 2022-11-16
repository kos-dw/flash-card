import { useState, useEffect } from 'react';

export interface UseSpeechSynthesis {
  speak: (T: string) => void;
  voicesList: SpeechSynthesisVoice[];
  isVoicesLoaded: boolean;
}

const narrowDownTheVoices = ['Kathy', 'Ralph', 'Samantha', 'Daniel'];

export const useSpeechSynthesis = (): UseSpeechSynthesis => {
  const [uttr, setUttr] = useState<SpeechSynthesisUtterance>();
  const [voicesList, setVoicesList] = useState<SpeechSynthesisVoice[]>([]);
  const [isVoicesLoaded, setIsVoicesLoaded] = useState(false);

  const speak = (text: string) => {
    if (uttr != null) {
      uttr.pitch = 1;
      uttr.rate = 1;
      uttr.text = text;
      uttr.voice =
        voicesList.find(
          (row) =>
            row.voiceURI ===
            localStorage.getItem(import.meta.env.VITE_API_VOICEURI)
        ) ?? null;
      uttr.volume = 1;
      speechSynthesis.speak(uttr);
    }
  };

  const initSpeechSynthesis = () => {
    setIsVoicesLoaded(false);

    // prettier-ignore
    const initialVoice = speechSynthesis.getVoices().find((row) => narrowDownTheVoices.includes(row.name));
    // prettier-ignore
    const provideVoices = speechSynthesis.getVoices().filter((row) => narrowDownTheVoices.some((str) => new RegExp(`^.*${str}.*$`, 'i').test(row.name)));
    const storedVoice = import.meta.env.VITE_API_VOICEURI;

    if (initialVoice != null && localStorage.getItem(storedVoice) == null) {
      localStorage.setItem(storedVoice, initialVoice.voiceURI);
    }

    setVoicesList(provideVoices);
    setUttr(new SpeechSynthesisUtterance());
    setIsVoicesLoaded(true);
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      speechSynthesis.addEventListener('voiceschanged', initSpeechSynthesis);
    }

    return initSpeechSynthesis;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { speak, voicesList, isVoicesLoaded };
};
