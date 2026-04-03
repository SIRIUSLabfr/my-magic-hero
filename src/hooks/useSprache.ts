import { useCallback } from 'react';

export function useSprache() {
  const sppielen = useCallback((laut: string) => {
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(laut);
      utterance.lang = 'de-DE';
      utterance.rate = 0.7;
      utterance.pitch = 1.1;
      speechSynthesis.speak(utterance);
    } catch {
      // Speech not available
    }
  }, []);

  return { sppielen };
}
