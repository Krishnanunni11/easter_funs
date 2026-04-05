"use client";

import { useState, useEffect } from "react";

const EggTop = () => (
  <svg width="120" height="90" viewBox="0 0 160 120">
    <path
      d="M160 120C160 53.7 124 0 80 0S0 53.7 0 120L40 100L80 120L120 100L160 120Z"
      fill="#FDE68A"
      stroke="#F59E0B"
      strokeWidth="3"
    />
  </svg>
);

const EggBottom = () => (
  <svg width="120" height="75" viewBox="0 0 160 100">
    <path
      d="M0 0C0 55 35 100 80 100S160 55 160 0L120 20L80 0L40 20L0 0Z"
      fill="#FDE68A"
      stroke="#F59E0B"
      strokeWidth="3"
    />
  </svg>
);

export default function EasterEgg() {
  const [isOpen, setIsOpen] = useState(false);
  const [memes, setMemes] = useState<any[]>([]);
  const [confetti, setConfetti] = useState<any[]>([]);
  const [particles, setParticles] = useState<any[]>([]);
  const [popCount, setPopCount] = useState(0);
  const [isSpecialMode, setIsSpecialMode] = useState(false);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);
  const [explosionInterval, setExplosionInterval] = useState<NodeJS.Timeout | null>(null);
  const [popSound, setPopSound] = useState<HTMLAudioElement | null>(null);
  const [bgMusic, setBgMusic] = useState<HTMLAudioElement | null>(null);

  const memeSrcs = ["/mem1.png", "/mem2.png", "/mem3.png"];
  const confettiColors = ["#FF6B9D", "#C44569", "#FFC312", "#12CBC4", "#FDA7DF", "#ED4C67", "#F79F1F", "#A3CB38", "#FF5733", "#C70039", "#900C3F", "#581845"];

  // Preload audio files
  useEffect(() => {
    console.log('Preloading audio files...');
    const pop = new Audio('/pop.mp3');
    pop.preload = 'auto';
    pop.addEventListener('canplaythrough', () => console.log('Pop sound loaded'));
    pop.addEventListener('error', (e) => console.error('Pop sound error:', e));
    setPopSound(pop);

    const music = new Audio('/easter-music.mp3');
    music.preload = 'auto';
    music.loop = true;
    music.addEventListener('canplaythrough', () => console.log('Easter music loaded'));
    music.addEventListener('error', (e) => console.error('Easter music error:', e));
    setBgMusic(music);

    // Cleanup only on unmount
    return () => {
      pop.pause();
      pop.src = '';
      music.pause();
      music.src = '';
    };
  }, []);

  const generateExplosion = () => {
    const timestamp = Date.now();
    const random = Math.random();

    // Generate Memes
    const memeCount = 70;
    const generatedMemes = Array.from({ length: memeCount }).map((_, i) => {
      const angle = (Math.random() * Math.PI * 2);
      const distance = 300 + Math.random() * 600;
      const xOffset = Math.cos(angle) * distance;
      
      return {
        id: `meme-${i}-${timestamp}-${random}`,
        src: memeSrcs[Math.floor(Math.random() * memeSrcs.length)],
        x: xOffset,
        peak: 200 + Math.random() * 300,
        rotate: (Math.random() - 0.5) * 1080,
        delay: Math.random() * 0.5,
        duration: 3.5 + Math.random() * 2.5,
        size: Math.random() > 0.7 ? "w-24 h-24" : Math.random() > 0.4 ? "w-20 h-20" : "w-16 h-16",
      };
    });

    // Generate Confetti
    const confettiCount = 200;
    const generatedConfetti = Array.from({ length: confettiCount }).map((_, i) => {
      const angle = (Math.random() * Math.PI * 2);
      const distance = 200 + Math.random() * 700;
      const xOffset = Math.cos(angle) * distance;
      
      return {
        id: `confetti-${i}-${timestamp}-${random}`,
        color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
        x: xOffset,
        peak: 250 + Math.random() * 350,
        rotate: Math.random() * 1440,
        delay: Math.random() * 0.4,
        duration: 2.5 + Math.random() * 2,
        shape: Math.random() > 0.6 ? "rounded-full" : Math.random() > 0.3 ? "rounded-sm" : "",
        size: Math.random() > 0.7 ? "w-4 h-4" : Math.random() > 0.4 ? "w-3 h-3" : "w-2 h-8",
      };
    });

    // Generate Particles
    const particleCount = 100;
    const generatedParticles = Array.from({ length: particleCount }).map((_, i) => {
      const angle = (i / particleCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
      const distance = 250 + Math.random() * 450;
      return {
        id: `particle-${i}-${timestamp}-${random}`,
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        delay: Math.random() * 0.15,
        duration: 1 + Math.random() * 0.6,
        color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
        size: Math.random() > 0.5 ? "w-3 h-3" : "w-2 h-2",
      };
    });

    setMemes(prev => [...prev, ...generatedMemes]);
    setConfetti(prev => [...prev, ...generatedConfetti]);
    setParticles(prev => [...prev, ...generatedParticles]);

    // Clean up old explosions after they finish animating
    setTimeout(() => {
      setMemes(prev => prev.filter(m => !generatedMemes.find(gm => gm.id === m.id)));
      setConfetti(prev => prev.filter(c => !generatedConfetti.find(gc => gc.id === c.id)));
      setParticles(prev => prev.filter(p => !generatedParticles.find(gp => gp.id === p.id)));
    }, 6000);
  };

  const handleOpen = () => {
    console.log('Egg clicked! isOpen:', isOpen);
    if (isOpen) return;
    setIsOpen(true);

    // Play pop sound on every click (instant playback)
    if (popSound) {
      popSound.currentTime = 0; // Reset to start
      popSound.play().catch(err => console.log('Pop sound failed:', err));
    }

    // Increment pop count
    const newPopCount = popCount + 1;
    setPopCount(newPopCount);
    console.log('Pop count:', newPopCount);

    // Generate explosion
    generateExplosion();

    // Check if this is the 2nd pop
    if (newPopCount === 2 && !isSpecialMode) {
      setIsSpecialMode(true);
      console.log('🎉 Special mode activated!');
      
      // Play background music with a small delay to avoid conflicts
      setTimeout(() => {
        if (bgMusic) {
          console.log('Attempting to play easter music...');
          bgMusic.currentTime = 0;
          bgMusic.volume = 0.7;
          
          const playPromise = bgMusic.play();
          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                console.log('✅ Easter music playing!');
                setAudioElement(bgMusic);
              })
              .catch(err => {
                console.error('❌ Music play failed:', err);
              });
          }
        } else {
          console.error('❌ bgMusic is null!');
        }
      }, 100);

      // Start infinite explosions every 3 seconds
      const interval = setInterval(() => {
        generateExplosion();
      }, 3000);
      setExplosionInterval(interval);

      // Activate DJ mode
      const mainContainer = document.getElementById('main-container');
      const djLights = document.getElementById('dj-lights');
      if (mainContainer && djLights) {
        mainContainer.classList.add('dj-mode');
        djLights.classList.remove('hidden');
      }
    }

    // Auto reset after 10 seconds (but keep special mode active)
    setTimeout(() => {
      handleReset();
    }, 5000);
  };

  const handleReset = () => {
    setIsOpen(false);
    // Don't clear memes/confetti/particles in special mode - they clean themselves up
    if (!isSpecialMode) {
      setMemes([]);
      setConfetti([]);
      setParticles([]);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (explosionInterval) {
        clearInterval(explosionInterval);
      }
      // Don't cleanup audio if it's playing
      // Audio will be cleaned up when component unmounts completely
    };
  }, [explosionInterval]);

  return (
    <>
      {/* Particles Burst - Above everything */}
      <div className="fixed inset-0 pointer-events-none z-50">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className={`absolute ${particle.size} rounded-full left-1/2 top-1/2`}
            style={{
              backgroundColor: particle.color,
              animation: `particleBurst ${particle.duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`,
              animationDelay: `${particle.delay}s`,
              '--particle-x': `${particle.x}px`,
              '--particle-y': `${particle.y}px`,
            } as any}
          />
        ))}
      </div>

      {/* Confetti Poppers - Above everything */}
      <div className="fixed inset-0 pointer-events-none z-50">
        {confetti.map((conf) => (
          <div
            key={conf.id}
            className={`absolute ${conf.size} ${conf.shape} left-1/2 top-1/2`}
            style={{
              backgroundColor: conf.color,
              animation: `confettiPop ${conf.duration}s cubic-bezier(0.22, 0.61, 0.36, 1) forwards`,
              animationDelay: `${conf.delay}s`,
              '--confetti-x': `${conf.x}px`,
              '--confetti-peak': `${conf.peak}px`,
              '--confetti-rotate': `${conf.rotate}deg`,
            } as any}
          />
        ))}
      </div>

      {/* Meme Images (pop and fall) - Above everything */}
      <div className="fixed inset-0 pointer-events-none z-50">
        {memes.map((meme) => (
          <div
            key={meme.id}
            className={`absolute ${meme.size} left-1/2 top-1/2`}
            style={{
              animation: `memePopAndFall ${meme.duration}s cubic-bezier(0.34, 1.56, 0.64, 1) forwards`,
              animationDelay: `${meme.delay}s`,
              '--meme-x': `${meme.x}px`,
              '--meme-peak': `${meme.peak}px`,
              '--meme-rotate': `${meme.rotate}deg`,
            } as any}
          >
            <img
              src={meme.src}
              alt="Meme"
              className="w-full h-full object-cover rounded-lg shadow-xl"
            />
          </div>
        ))}
      </div>

      {/* Center Meme - Above card */}
      <div 
        className={`fixed ${isSpecialMode ? 'spinning-orbit' : 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'} z-50 transition-all duration-1000 pointer-events-none ${
          isOpen || isSpecialMode ? 'opacity-100 scale-110' : 'opacity-0 scale-0'
        }`}
        style={{ transitionDelay: isSpecialMode ? '0s' : '0.8s' }}
      >
        <img
          src="/mem1.png"
          alt="Meme"
          className="w-44 h-44 rounded-full border-8 border-white shadow-2xl object-cover"
        />
      </div>

      {/* Easter Message - Appears after center meme (only in normal mode) */}
      <div 
        className={`fixed top-[60%] left-1/2 -translate-x-1/2 z-50 transition-all duration-1000 pointer-events-none ${
          isOpen && !isSpecialMode ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
        style={{ transitionDelay: '1.5s' }}
      >
        <div className="bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 text-white px-8 py-4 rounded-2xl shadow-2xl border-4 border-white">
          <p className="text-2xl md:text-3xl font-bold text-center animate-pulse">
            Appo ellarkkum Easter Ashhamsakal!! 🐰🎉
          </p>
        </div>
      </div>

      {/* Special Mode Message */}
      {isSpecialMode && (
        <div className="fixed top-[20%] left-1/2 -translate-x-1/2 z-50 pointer-events-none">
          <div className="bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 text-white px-10 py-6 rounded-3xl shadow-2xl border-4 border-white animate-bounce">
            <p className="text-3xl md:text-4xl font-bold text-center fast-blink">
              🎉 EASTER MODE ACTIVATED! 🎉
            </p>
            <p className="text-lg text-center mt-2 fast-blink">Infinite Explosions!</p>
          </div>
        </div>
      )}

      {/* Main Card */}
      <div className={`relative z-20 transition-opacity duration-1000 ${isSpecialMode ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <div 
          className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-2xl p-12 max-w-2xl mx-auto text-center cursor-pointer hover:shadow-3xl transition-shadow relative"
          onClick={handleOpen}
        >
          <h1 className="text-6xl font-bold mb-2">
            <span className="text-rose-600">EASTER</span>
          </h1>
          <h2 className="text-6xl font-bold mb-4">
            <span className="text-green-700">EGG-CELLENCE</span>
          </h2>
          <p className="text-amber-700 text-lg font-medium tracking-wider uppercase">
            The hunt for memes begins
          </p>

          {/* Interactive Egg */}
          <div className="mt-8 relative">
            <div 
              className={`transition-all duration-700 ${isOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`}
              style={{ transformOrigin: 'center' }}
            >
              <div className="flex flex-col items-center">
                <div 
                  className={`transition-all duration-700 ${isOpen ? '-translate-y-96 -rotate-90' : ''}`}
                >
                  <EggTop />
                </div>
                <div 
                  className={`-mt-6 transition-all duration-700 ${isOpen ? 'translate-y-96 rotate-60' : ''}`}
                >
                  <EggBottom />
                </div>
              </div>
              {!isOpen && (
                <p className="mt-4 text-sm text-gray-600 font-medium animate-pulse">
                  Click to crack the egg! 🥚 {popCount > 0 && `(${popCount}/2)`}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
