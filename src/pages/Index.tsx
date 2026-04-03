import { useState, useEffect } from 'react';
import ParticleBackground from '@/components/ui/ParticleBackground';
import WelcomeScreen from '@/components/onboarding/WelcomeScreen';
import FarbwahlScreen from '@/components/onboarding/FarbwahlScreen';
import WeltwahlScreen from '@/components/onboarding/WeltwahlScreen';
import SoundwahlScreen from '@/components/onboarding/SoundwahlScreen';
import KraeftewahlScreen from '@/components/onboarding/KraeftewahlScreen';
import HeldinErwachtScreen from '@/components/onboarding/HeldinErwachtScreen';
import MagicButton from '@/components/ui/MagicButton';
import { useProfil } from '@/hooks/useProfil';
import { FARBEN } from '@/types/profil';
import type { Welt, SoundProfil, Superkraft } from '@/types/profil';

type Screen = 'welcome' | 'farbe' | 'welt' | 'sound' | 'kraefte' | 'heldin' | 'home';

export default function Index() {
  const { profil, existingProfil, setFarbe, setWelt, setSoundProfil, setSuperkraefte, setName, trackScreenTime, save, reset } = useProfil();
  const [screen, setScreen] = useState<Screen>('welcome');
  const [transitioning, setTransitioning] = useState(false);

  // Check for existing profile on mount
  useEffect(() => {
    const existing = existingProfil();
    if (existing) {
      setScreen('home');
    }
  }, []);

  const goTo = (next: Screen) => {
    trackScreenTime();
    setTransitioning(true);
    setTimeout(() => {
      setScreen(next);
      setTransitioning(false);
    }, 400);
  };

  const handleFarbe = (farbe: string) => {
    setFarbe(farbe);
    goTo('welt');
  };

  const handleWelt = (welt: Welt, explored: string[]) => {
    setWelt(welt, explored);
    goTo('sound');
  };

  const handleSound = (sound: SoundProfil, playCount: number) => {
    setSoundProfil(sound, playCount);
    goTo('kraefte');
  };

  const handleKraefte = (kraefte: Superkraft[]) => {
    setSuperkraefte(kraefte);
    goTo('heldin');
  };

  const handleFinish = () => {
    trackScreenTime();
    save();
    goTo('home');
  };

  const handleNewStart = () => {
    reset();
    goTo('welcome');
  };

  // Particle color based on chosen color
  const particleColor = profil.avatar.hauptfarbe
    ? FARBEN.find(f => f.id === profil.avatar.hauptfarbe)?.hex || '#facc15'
    : '#facc15';

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <ParticleBackground color={particleColor} />

      <div
        className={`relative z-10 transition-opacity duration-400 ${transitioning ? 'opacity-0' : 'opacity-100'}`}
      >
        {screen === 'welcome' && <WelcomeScreen onNext={() => goTo('farbe')} />}
        {screen === 'farbe' && <FarbwahlScreen onSelect={handleFarbe} />}
        {screen === 'welt' && <WeltwahlScreen onSelect={handleWelt} />}
        {screen === 'sound' && <SoundwahlScreen onSelect={handleSound} />}
        {screen === 'kraefte' && <KraeftewahlScreen onSelect={handleKraefte} />}
        {screen === 'heldin' && (
          <HeldinErwachtScreen
            profil={profil}
            onSetName={setName}
            onFinish={handleFinish}
          />
        )}
        {screen === 'home' && (
          <div className="flex flex-col items-center justify-center min-h-screen gap-8 px-8 animate-screen-enter">
            <div
              className="w-32 h-32 rounded-full flex items-center justify-center animate-gentle-pulse"
              style={{
                backgroundColor: FARBEN.find(f => f.id === profil.avatar.hauptfarbe)?.hex || '#e63462',
                boxShadow: `0 0 30px ${FARBEN.find(f => f.id === profil.avatar.hauptfarbe)?.hex || '#e63462'}60`,
              }}
            >
              <span className="text-5xl">✨</span>
            </div>
            <h1 className="text-hero text-center font-display text-foreground">
              {profil.avatar.name
                ? `Willkommen zurück, ${profil.avatar.name}!`
                : 'Willkommen zurück!'}
            </h1>
            <p className="text-body-lg text-muted-foreground text-center">
              Deine Heldenschule wartet auf dich...
            </p>
            <MagicButton onClick={handleNewStart} variant="secondary" size="lg">
              Neue Heldin erschaffen ✨
            </MagicButton>
          </div>
        )}
      </div>
    </div>
  );
}
