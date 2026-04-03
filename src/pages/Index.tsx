import { useState, useEffect } from 'react';
import ParticleBackground from '@/components/ui/ParticleBackground';
import WelcomeScreen from '@/components/onboarding/WelcomeScreen';
import FarbwahlScreen from '@/components/onboarding/FarbwahlScreen';
import WeltwahlScreen from '@/components/onboarding/WeltwahlScreen';
import SoundwahlScreen from '@/components/onboarding/SoundwahlScreen';
import KraeftewahlScreen from '@/components/onboarding/KraeftewahlScreen';
import HeldinErwachtScreen from '@/components/onboarding/HeldinErwachtScreen';
import HeldenPlatz from '@/components/home/HeldenPlatz';
import GeheimschriftTurm from '@/components/lesen/GeheimschriftTurm';
import KreativHoehle from '@/components/kreativ/KreativHoehle';
import { useProfil } from '@/hooks/useProfil';
import { FARBEN } from '@/types/profil';
import type { Welt, SoundProfil, Superkraft } from '@/types/profil';

type Screen = 'welcome' | 'farbe' | 'welt' | 'sound' | 'kraefte' | 'heldin' | 'home' | 'geheimschrift' | 'kreativ';

export default function Index() {
  const { profil, existingProfil, setFarbe, setWelt, setSoundProfil, setSuperkraefte, setName, trackScreenTime, updateLernfortschritt, save, reset } = useProfil();
  const [screen, setScreen] = useState<Screen>('welcome');
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    if (existingProfil()) setScreen('home');
  }, []);

  const goTo = (next: Screen) => {
    trackScreenTime();
    setTransitioning(true);
    setTimeout(() => {
      setScreen(next);
      setTransitioning(false);
    }, 400);
  };

  const handleFarbe = (farbe: string) => { setFarbe(farbe); goTo('welt'); };
  const handleWelt = (welt: Welt, explored: string[]) => { setWelt(welt, explored); goTo('sound'); };
  const handleSound = (sound: SoundProfil, playCount: number) => { setSoundProfil(sound, playCount); goTo('kraefte'); };
  const handleKraefte = (kraefte: Superkraft[]) => { setSuperkraefte(kraefte); goTo('heldin'); };
  const handleFinish = () => { trackScreenTime(); save(); goTo('home'); };
  const handleNewStart = () => { reset(); goTo('welcome'); };

  const particleColor = profil.avatar.hauptfarbe
    ? FARBEN.find(f => f.id === profil.avatar.hauptfarbe)?.hex || '#facc15'
    : '#facc15';

  // Full-screen modules without particle overlay
  if (screen === 'kreativ') {
    return <KreativHoehle onZurueck={() => setScreen('home')} />;
  }

  if (screen === 'geheimschrift') {
    return (
      <div className="relative min-h-screen overflow-hidden bg-background">
        <ParticleBackground color={particleColor} count={15} />
        <div className="relative z-10">
          <GeheimschriftTurm
            heldenfarbe={particleColor}
            lernfortschritt={profil.lernfortschritt}
            onUpdate={updateLernfortschritt}
            onZurueck={() => setScreen('home')}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <ParticleBackground color={particleColor} />
      <div className={`relative z-10 transition-opacity duration-400 ${transitioning ? 'opacity-0' : 'opacity-100'}`}>
        {screen === 'welcome' && <WelcomeScreen onNext={() => goTo('farbe')} />}
        {screen === 'farbe' && <FarbwahlScreen onSelect={handleFarbe} />}
        {screen === 'welt' && <WeltwahlScreen onSelect={handleWelt} />}
        {screen === 'sound' && <SoundwahlScreen onSelect={handleSound} />}
        {screen === 'kraefte' && <KraeftewahlScreen onSelect={handleKraefte} />}
        {screen === 'heldin' && (
          <HeldinErwachtScreen profil={profil} onSetName={setName} onFinish={handleFinish} />
        )}
        {screen === 'home' && (
          <HeldenPlatz
            profil={profil}
            onNavigate={(target) => {
              if (target === 'neustart') handleNewStart();
              else setScreen(target);
            }}
          />
        )}
      </div>
    </div>
  );
}
