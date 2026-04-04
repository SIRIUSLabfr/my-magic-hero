import { useState, useCallback, useRef } from 'react';
import type { HeldenschuleProfil, Welt, SoundProfil, Superkraft, Lernfortschritt, AvatarConfig } from '@/types/profil';
import { createEmptyAvatarConfig } from '@/types/profil';

const STORAGE_KEY = 'heldenschule-profil';

const createEmptyLernfortschritt = (): Lernfortschritt => ({
  buchstaben: {},
  sessionsGesamt: 0,
  durchschnittlicheSessionDauer: 0,
});

const createEmptyProfil = (): HeldenschuleProfil => ({
  avatar: {
    name: null,
    config: createEmptyAvatarConfig(),
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
  lernfortschritt: createEmptyLernfortschritt(),
  erstellungsDatum: new Date().toISOString(),
});

// Migrate old outfit types to new ones
function migrateOutfit(outfit: string): AvatarConfig['outfit'] {
  const map: Record<string, AvatarConfig['outfit']> = {
    anzug: 'spinne',
    kleid: 'glueck',
    cape: 'krieger',
    ruestung: 'ozean',
  };
  return map[outfit] || (outfit as AvatarConfig['outfit']) || 'spinne';
}

export function useProfil() {
  const [profil, setProfil] = useState<HeldenschuleProfil>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return createEmptyProfil();
    const parsed = JSON.parse(saved);
    if (!parsed.lernfortschritt) parsed.lernfortschritt = createEmptyLernfortschritt();
    // Migrate old profiles without config
    if (!parsed.avatar.config) {
      parsed.avatar.config = createEmptyAvatarConfig();
      if (parsed.avatar.hauptfarbe) {
        const FARBEN_MAP: Record<string, string> = {
          rot: '#e63462', lila: '#9333ea', blau: '#3b82f6',
          gruen: '#22c55e', gold: '#facc15', pink: '#ec4899',
        };
        parsed.avatar.config.umhangfarbe = FARBEN_MAP[parsed.avatar.hauptfarbe] || '#e63462';
      }
    }
    // Migrate old outfit values
    if (parsed.avatar.config) {
      const o = parsed.avatar.config.outfit;
      if (o === 'anzug' || o === 'kleid' || o === 'cape' || o === 'ruestung') {
        parsed.avatar.config.outfit = migrateOutfit(o);
      }
    }
    return parsed;
  });

  const screenStartTime = useRef<number>(Date.now());
  const decisionStartTime = useRef<number>(Date.now());

  const existingProfil = (): HeldenschuleProfil | null => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return null;
    const p = JSON.parse(saved) as HeldenschuleProfil;
    return p.avatar.config?.umhangfarbe ? p : null;
  };

  const update = useCallback((updater: (p: HeldenschuleProfil) => HeldenschuleProfil) => {
    setProfil(prev => updater(prev));
  }, []);

  const updateAvatarConfig = useCallback((partial: Partial<AvatarConfig>) => {
    const tempo = Date.now() - decisionStartTime.current;
    update(p => ({
      ...p,
      avatar: { ...p.avatar, config: { ...p.avatar.config, ...partial } },
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

  const updateLernfortschritt = useCallback((lf: Lernfortschritt) => {
    setProfil(prev => {
      const next = { ...prev, lernfortschritt: lf };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

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
    updateAvatarConfig,
    setWelt,
    setSoundProfil,
    setSuperkraefte,
    setName,
    trackScreenTime,
    updateLernfortschritt,
    save,
    reset,
  };
}
