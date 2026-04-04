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
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [isUnlocked, setIsUnlocked] = useState(false);

  const memeSrcs = ["/mem1.png", "/mem2.png", "/mem3.png"];
  const confettiColors = ["#FF6B9D", "#C44569", "#FFC312", "#12CBC4", "#FDA7DF", "#ED4C67", "#F79F1F", "#A3CB38", "#FF5733", "#C70039", "#900C3F", "#581845"];

  // Calculate time until midnight
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const midnight = new Date();
      
      // Set to next midnight (tomorrow at 00:00:00)
      midnight.setDate(midnight.getDate() + 1);
      midnight.setHours(0, 0, 0, 0);
      
      const difference = midnight.getTime() - now.getTime();
      
      if (difference <= 0) {
        setIsUnlocked(true);
        return { hours: 0, minutes: 0, seconds: 0 };
      }
      
      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      setIsUnlocked(false);
      return { hours, minutes, seconds };
    };

    // Initial calculation
    setTimeLeft(calculateTimeLeft());

    // Update every second
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleOpen = () => {
    if (!isUnlocked || isOpen) return;
    setIsOpen(true);

    // Generate Memes with more randomization
    const memeCount = 100;
    const generatedMemes = Array.from({ length: memeCount }).map((_, i) => {
      const angle = (Math.random() * Math.PI * 2);
      const distance = 300 + Math.random() * 600;
      const xOffset = Math.cos(angle) * distance;
      
      return {
        id: `meme-${i}`,
        src: memeSrcs[Math.floor(Math.random() * memeSrcs.length)],
        x: xOffset,
        peak: 200 + Math.random() * 300,
        rotate: (Math.random() - 0.5) * 1080,
        delay: Math.random() * 0.5,
        duration: 3.5 + Math.random() * 2.5,
        size: Math.random() > 0.7 ? "w-24 h-24" : Math.random() > 0.4 ? "w-20 h-20" : "w-16 h-16",
      };
    });

    // Generate Confetti with varied trajectories
    const confettiCount = 200;
    const generatedConfetti = Array.from({ length: confettiCount }).map((_, i) => {
      const angle = (Math.random() * Math.PI * 2);
      const distance = 200 + Math.random() * 700;
      const xOffset = Math.cos(angle) * distance;
      
      return {
        id: `confetti-${i}`,
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

    // Generate Particles with radial burst
    const particleCount = 100;
    const generatedParticles = Array.from({ length: particleCount }).map((_, i) => {
      const angle = (i / particleCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
      const distance = 250 + Math.random() * 450;
      return {
        id: `particle-${i}`,
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        delay: Math.random() * 0.15,
        duration: 1 + Math.random() * 0.6,
        color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
        size: Math.random() > 0.5 ? "w-3 h-3" : "w-2 h-2",
      };
    });

    setMemes(generatedMemes);
    setConfetti(generatedConfetti);
    setParticles(generatedParticles);

    // Auto reset after 10 seconds
    setTimeout(() => {
      handleReset();
    }, 70000);
  };

  const handleReset = () => {
    setIsOpen(false);
    setMemes([]);
    setConfetti([]);
    setParticles([]);
  };

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
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 transition-all duration-1000 pointer-events-none ${
          isOpen ? 'opacity-100 scale-110' : 'opacity-0 scale-0'
        }`}
        style={{ transitionDelay: '0.8s' }}
      >
        <img
          src="/mem1.png"
          alt="Meme"
          className="w-44 h-44 object-cover"
        />
      </div>

      {/* Easter Message - Appears after center meme */}
      <div 
        className={`fixed top-[60%] left-1/2 -translate-x-1/2 z-50 transition-all duration-1000 pointer-events-none ${
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
        style={{ transitionDelay: '1.5s' }}
      >
        <div className="bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 text-white px-8 py-4 rounded-2xl shadow-2xl border-4 border-white">
          <p className="text-2xl md:text-3xl font-bold text-center animate-pulse">
            Appo ellarkkum Easter Ashhamsakal!! 🐰🎉
          </p>
        </div>
      </div>

      {/* Main Card */}
      <div className="relative">
        <div 
          className={`bg-white/70 backdrop-blur-sm rounded-3xl shadow-2xl p-12 max-w-2xl mx-auto text-center ${
            isUnlocked ? 'cursor-pointer hover:shadow-3xl' : 'cursor-not-allowed'
          } transition-shadow relative z-20`}
          onClick={handleOpen}
        >
          <h1 className="text-6xl font-bold mb-2">
            <span className="text-rose-600">HAPPI EASTER</span>
          </h1>
          <h2 className="text-6xl font-bold mb-4">
            <span className="text-green-700">EGG-SURPRISE</span>
          </h2>
          <p className="text-amber-700 text-lg font-medium tracking-wider uppercase">
            The hunt for memes begins
          </p>

          {/* Interactive Egg or Countdown Timer */}
          <div className="mt-8 relative">
            {!isUnlocked ? (
              // Countdown Timer
              <div className="flex flex-col items-center">
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-6 rounded-2xl shadow-xl mb-4">
                  <p className="text-sm font-semibold mb-2 uppercase tracking-wide">Unlocks in</p>
                  <div className="flex gap-4 text-center">
                    <div className="flex flex-col">
                      <span className="text-4xl font-bold">{String(timeLeft.hours).padStart(2, '0')}</span>
                      <span className="text-xs mt-1 opacity-80">Hours</span>
                    </div>
                    <span className="text-4xl font-bold">:</span>
                    <div className="flex flex-col">
                      <span className="text-4xl font-bold">{String(timeLeft.minutes).padStart(2, '0')}</span>
                      <span className="text-xs mt-1 opacity-80">Minutes</span>
                    </div>
                    <span className="text-4xl font-bold">:</span>
                    <div className="flex flex-col">
                      <span className="text-4xl font-bold">{String(timeLeft.seconds).padStart(2, '0')}</span>
                      <span className="text-xs mt-1 opacity-80">Seconds</span>
                    </div>
                  </div>
                </div>
                <div className="opacity-50 grayscale pointer-events-none">
                  <div className="flex flex-col items-center">
                    <EggTop />
                    <div className="-mt-6">
                      <EggBottom />
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-sm text-gray-500 font-medium">
                  🔒 Egg locked until midnight
                </p>
              </div>
            ) : (
              // Interactive Egg (when unlocked)
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
                    Click to crack the egg! 🥚
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Reset Button */}
        {isOpen && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleReset();
            }}
            className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-800 px-6 py-2 rounded-full shadow-lg hover:bg-white transition z-50 font-medium"
          >
            Replay 🔄
          </button>
        )}
      </div>
    </>
  );
}
