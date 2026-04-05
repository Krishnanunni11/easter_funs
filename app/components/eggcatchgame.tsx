"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface FallingEgg {
  id: number;
  x: number;
  y: number;
  speed: number;
  emoji: string;
}

export default function EggCatchGame({ onClose }: { onClose: () => void }) {
  const [basketX, setBasketX] = useState(50);
  const [eggs, setEggs] = useState<FallingEgg[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [missed, setMissed] = useState(0);
  const gameRef = useRef<HTMLDivElement>(null);
  const bgMusicRef = useRef<HTMLAudioElement | null>(null);
  const popSoundRef = useRef<HTMLAudioElement | null>(null);
  const eggIdCounter = useRef(0);
  const animationFrameRef = useRef<number>();
  const lastUpdateRef = useRef<number>(Date.now());

  const eggEmojis = ["🥚", "🐣", "🐥", "🥚", "🐣"];

  // Initialize audio
  useEffect(() => {
    const bgMusic = new Audio('/easter-music.mp3');
    bgMusic.loop = true;
    bgMusic.volume = 0.5;
    bgMusic.play().catch(err => console.log('Background music error:', err));
    bgMusicRef.current = bgMusic;

    const popSound = new Audio('/pop.mp3');
    popSound.preload = 'auto';
    popSoundRef.current = popSound;

    return () => {
      bgMusic.pause();
      bgMusic.src = '';
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Optimized mouse movement with throttling
  useEffect(() => {
    let rafId: number;
    let lastX = basketX;

    const handleMouseMove = (e: MouseEvent) => {
      if (gameRef.current && !gameOver) {
        if (rafId) cancelAnimationFrame(rafId);
        
        rafId = requestAnimationFrame(() => {
          const rect = gameRef.current!.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width) * 100;
          const newX = Math.max(5, Math.min(95, x));
          if (Math.abs(newX - lastX) > 0.5) {
            setBasketX(newX);
            lastX = newX;
          }
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [gameOver]);

  // Spawn eggs - reduced frequency
  useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(() => {
      const newEgg: FallingEgg = {
        id: eggIdCounter.current++,
        x: Math.random() * 90 + 5,
        y: -5,
        speed: 2 + Math.random() * 1,
        emoji: eggEmojis[Math.floor(Math.random() * eggEmojis.length)]
      };
      setEggs(prev => [...prev, newEgg]);
    }, 1200);

    return () => clearInterval(interval);
  }, [gameOver]);

  // Optimized game loop using requestAnimationFrame
  useEffect(() => {
    if (gameOver) return;

    const gameLoop = () => {
      const now = Date.now();
      const deltaTime = (now - lastUpdateRef.current) / 16.67; // Normalize to 60fps
      lastUpdateRef.current = now;

      setEggs(prev => {
        const updated = prev.map(egg => ({
          ...egg,
          y: egg.y + (egg.speed * deltaTime * 0.5)
        }));

        // Check for catches
        const toRemove = new Set<number>();
        updated.forEach(egg => {
          if (egg.y >= 85 && egg.y <= 95) {
            const distance = Math.abs(egg.x - basketX);
            if (distance < 10) {
              toRemove.add(egg.id);
              if (popSoundRef.current) {
                popSoundRef.current.currentTime = 0;
                popSoundRef.current.play().catch(() => {});
              }
              setScore(s => s + 1);
            }
          }
        });

        // Remove caught eggs and check for missed
        const filtered = updated.filter(egg => {
          if (toRemove.has(egg.id)) return false;
          
          if (egg.y > 100) {
            setMissed(m => {
              const newMissed = m + 1;
              if (newMissed >= 10) {
                setGameOver(true);
              }
              return newMissed;
            });
            return false;
          }
          return true;
        });

        return filtered;
      });

      animationFrameRef.current = requestAnimationFrame(gameLoop);
    };

    animationFrameRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [basketX, gameOver]);

  const handleRestart = useCallback(() => {
    setScore(0);
    setMissed(0);
    setGameOver(false);
    setEggs([]);
    lastUpdateRef.current = Date.now();
    if (bgMusicRef.current) {
      bgMusicRef.current.currentTime = 0;
      bgMusicRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-sky-300 via-sky-200 to-green-200 z-[100] overflow-hidden">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-red-600 transition z-50 font-bold text-lg"
      >
        ✕ Close
      </button>

      {/* Score Display */}
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-lg z-50">
        <p className="text-2xl font-bold text-green-600">Score: {score}</p>
        <p className="text-lg font-semibold text-red-600">Missed: {missed}/10</p>
      </div>

      {/* Game Area */}
      <div ref={gameRef} className="relative w-full h-full">
        {/* Falling Eggs */}
        {eggs.map(egg => (
          <div
            key={egg.id}
            className="absolute text-6xl pointer-events-none will-change-transform"
            style={{
              left: `${egg.x}%`,
              top: `${egg.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            {egg.emoji}
          </div>
        ))}

        {/* Basket */}
        <div
          className="absolute bottom-8 pointer-events-none will-change-transform"
          style={{
            left: `${basketX}%`,
            transform: 'translateX(-50%)'
          }}
        >
          <img 
            src="/mem2.png" 
            alt="Catcher" 
            className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-xl"
          />
        </div>
      </div>

      {/* Game Over Screen */}
      {gameOver && (
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-12 text-center shadow-2xl max-w-md">
            <h2 className="text-5xl font-bold text-red-600 mb-4">Game Over!</h2>
            <p className="text-3xl font-bold text-green-600 mb-2">Final Score: {score}</p>
            <p className="text-xl text-gray-600 mb-6">You missed {missed} eggs</p>
            <button
              onClick={handleRestart}
              className="bg-green-500 text-white px-8 py-4 rounded-full shadow-lg hover:bg-green-600 transition font-bold text-xl mr-4"
            >
              🔄 Play Again
            </button>
            <button
              onClick={onClose}
              className="bg-gray-500 text-white px-8 py-4 rounded-full shadow-lg hover:bg-gray-600 transition font-bold text-xl"
            >
              Exit
            </button>
          </div>
        </div>
      )}

      {/* Instructions */}
      {!gameOver && score === 0 && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-2xl text-center pointer-events-none">
          <h3 className="text-3xl font-bold text-purple-600 mb-4">🐰 Catch the Eggs! 🥚</h3>
          <p className="text-xl text-gray-700">Move your mouse to control the basket</p>
          <p className="text-lg text-gray-600 mt-2">Don't miss more than 10 eggs!</p>
        </div>
      )}
    </div>
  );
}
