import { useState, useCallback, useRef } from 'react';
import type { HeldenschuleProfil, Welt, SoundProfil, Superkraft } from '@/types/profil';

const STORAGE_KEY = 'heldenschule-profil';

const createEmptyProfil = (): HeldenschuleProfil => ({
  avatar: {
    name: null,
    hauptfarbe: '',
    welt: 'wald',
    soundProfil: 'mutig',
    superkraefte: [],
  },
  profil: {
    entscheidungsTempo: [],
    explorationsVerhalten: [],
    audioEngagement: 0,
    explorationsStil: 'unbekannt',
    zeitAufScreen: [],
  },
  erstellungsDatum: new Date().toISOString(),
});

export function useProfil() {
  const [profil, setProfil] = useState<HeldenschuleProfil>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : createEmptyProfil();
  });

  const screenStartTime = useRef<number>(Date.now());
  const decisionStartTime = useRef<number>(Date.now());

  const existingProfil = (): HeldenschuleProfil | null => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return null;
    const p = JSON.parse(saved) as HeldenschuleProfil;
    return p.avatar.hauptfarbe ? p : null;
  };

  const update = useCallback((updater: (p: HeldenschuleProfil) => HeldenschuleProfil) => {
    setProfil(prev => {
      const next = updater(prev);
      return next;
    });
  }, []);

  const setFarbe = useCallback((farbe: string) => {
    const tempo = Date.now() - decisionStartTime.current;
    update(p => ({
      ...p,
      avatar: { ...p.avatar, hauptfarbe: farbe },
      profil: { ...p.profil, entscheidungsTempo: [...p.profil.entscheidungsTempo, tempo] },
    }));
  }, [update]);

  const setWelt = useCallback((welt: Welt, explored: string[]) => {
    const tempo = Date.now() - decisionStartTime.current;
    update(p => ({
      ...p,
      avatar: { ...p.avatar, welt },
      profil: {
        ...p.profil,
        entscheidungsTempo: [...p.profil.entscheidungsTempo, tempo],
        explorationsVerhalten: [...p.profil.explorationsVerhalten, ...explored],
      },
    }));
  }, [update]);

  const setSoundProfil = useCallback((sound: SoundProfil, playCount: number) => {
    const tempo = Date.now() - decisionStartTime.current;
    update(p => ({
      ...p,
      avatar: { ...p.avatar, soundProfil: sound },
      profil: {
        ...p.profil,
        entscheidungsTempo: [...p.profil.entscheidungsTempo, tempo],
        audioEngagement: p.profil.audioEngagement + playCount,
        explorationsStil: playCount <= 1 ? 'sofort' : 'probierend',
      },
    }));
  }, [update]);

  const setSuperkraefte = useCallback((kraefte: Superkraft[]) => {
    const tempo = Date.now() - decisionStartTime.current;
    update(p => ({
      ...p,
      avatar: { ...p.avatar, superkraefte: kraefte },
      profil: { ...p.profil, entscheidungsTempo: [...p.profil.entscheidungsTempo, tempo] },
    }));
  }, [update]);

  const setName = useCallback((name: string | null) => {
    update(p => ({ ...p, avatar: { ...p.avatar, name } }));
  }, [update]);

  const trackScreenTime = useCallback(() => {
    const elapsed = Math.round((Date.now() - screenStartTime.current) / 1000);
    update(p => ({
      ...p,
      profil: { ...p.profil, zeitAufScreen: [...p.profil.zeitAufScreen, elapsed] },
    }));
    screenStartTime.current = Date.now();
    decisionStartTime.current = Date.now();
  }, [update]);

  const save = useCallback(() => {
    setProfil(prev => {
      const final = { ...prev, erstellungsDatum: new Date().toISOString() };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(final));
      return final;
    });
  }, []);

  const reset = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setProfil(createEmptyProfil());
  }, []);

  return {
    profil,
    existingProfil,
    setFarbe,
    setWelt,
    setSoundProfil,
    setSuperkraefte,
    setName,
    trackScreenTime,
    save,
    reset,
  };
}
