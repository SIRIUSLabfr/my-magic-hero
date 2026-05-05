import { useState, useEffect } from 'react';
import ParticleBackground from '@/components/ui/ParticleBackground';
import WelcomeScreen from '@/components/onboarding/WelcomeScreen';
import HautfarbeScreen from '@/components/onboarding/HautfarbeScreen';
import HaarfarbeScreen from '@/components/onboarding/HaarfarbeScreen';
import FrisurScreen from '@/components/onboarding/FrisurScreen';
import OutfitScreen from '@/components/onboarding/OutfitScreen';
import UmhangfarbeScreen from '@/components/onboarding/UmhangfarbeScreen';
import WeltSoundScreen from '@/components/onboarding/WeltSoundScreen';
import HeldinErwachtScreen from '@/components/onboarding/HeldinErwachtScreen';
import HeldenPlatz from '@/components/home/HeldenPlatz';
import GeheimschriftTurm from '@/components/lesen/GeheimschriftTurm';
import KreativHoehle from '@/components/kreativ/KreativHoehle';
import MeeresAbenteuer from '@/components/abenteuer/MeeresAbenteuer';
import { useProfil } from '@/hooks/useProfil';
import type { Frisur, Outfit } from '@/types/profil';

type Screen =
  | 'welcome' | 'hautfarbe' | 'haarfarbe' | 'frisur' | 'outfit' | 'umhangfarbe' | 'weltsound' | 'heldin'
  | 'home' | 'geheimschrift' | 'kreativ' | 'abenteuer';

export default function Index() {
  const {
    profil, existingProfil, updateAvatarConfig,
    setWelt, setSoundProfil, setName,
    trackScreenTime, updateLernfortschritt, save, reset,
  } = useProfil();

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

  const handleFinish = () => { trackScreenTime(); save(); goTo('home'); };
  const handleNewStart = () => { reset(); goTo('welcome'); };

  const heldenfarbe = profil.avatar.config.umhangfarbe || '#facc15';

  if (screen === 'kreativ') {
    return <KreativHoehle onZurueck={() => setScreen('home')} />;
  }

  if (screen === 'abenteuer') {
    return (
      <MeeresAbenteuer
        avatarConfig={profil.avatar.config}
        heldenfarbe={heldenfarbe}
        heldName={profil.avatar.name}
        lernfortschritt={profil.lernfortschritt}
        onUpdate={updateLernfortschritt}
        onZurueck={() => setScreen('home')}
      />
    );
  }

  if (screen === 'geheimschrift') {
    return (
      <div className="relative min-h-screen overflow-hidden bg-background">
        <ParticleBackground color={heldenfarbe} count={15} />
        <div className="relative z-10">
          <GeheimschriftTurm
            heldenfarbe={heldenfarbe}
            avatarConfig={profil.avatar.config}
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
      <ParticleBackground color={heldenfarbe} />
      <div className={`relative z-10 transition-opacity duration-400 ${transitioning ? 'opacity-0' : 'opacity-100'}`}>

        {screen === 'welcome' && <WelcomeScreen onNext={() => goTo('hautfarbe')} />}

        {screen === 'hautfarbe' && (
          <HautfarbeScreen
            avatarConfig={profil.avatar.config}
            onSelect={(hex) => { updateAvatarConfig({ hautfarbe: hex }); goTo('haarfarbe'); }}
            onZurueck={() => goTo('welcome')}
          />
        )}

        {screen === 'haarfarbe' && (
          <HaarfarbeScreen
            avatarConfig={profil.avatar.config}
            onSelect={(hex) => { updateAvatarConfig({ haarfarbe: hex }); goTo('frisur'); }}
            onZurueck={() => goTo('hautfarbe')}
          />
        )}

        {screen === 'frisur' && (
          <FrisurScreen
            avatarConfig={profil.avatar.config}
            onSelect={(f: Frisur) => { updateAvatarConfig({ frisur: f }); goTo('outfit'); }}
            onZurueck={() => goTo('haarfarbe')}
          />
        )}

        {screen === 'outfit' && (
          <OutfitScreen
            avatarConfig={profil.avatar.config}
            onSelect={(o: Outfit) => { updateAvatarConfig({ outfit: o }); goTo('umhangfarbe'); }}
            onZurueck={() => goTo('frisur')}
          />
        )}

        {screen === 'umhangfarbe' && (
          <UmhangfarbeScreen
            avatarConfig={profil.avatar.config}
            onSelect={(hex) => { updateAvatarConfig({ umhangfarbe: hex }); goTo('weltsound'); }}
            onZurueck={() => goTo('outfit')}
          />
        )}

        {screen === 'weltsound' && (
          <WeltSoundScreen
            avatarConfig={profil.avatar.config}
            onSelect={({ maskeAktiv, gehoerschutzAktiv, gehoerschutzFarbe, brilleAktiv, welt, explored, sound, playCount }) => {
              updateAvatarConfig({ maskeAktiv, gehoerschutzAktiv, gehoerschutzFarbe, brilleAktiv });
              setWelt(welt, explored);
              setSoundProfil(sound, playCount);
              goTo('heldin');
            }}
            onZurueck={() => goTo('umhangfarbe')}
          />
        )}

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
