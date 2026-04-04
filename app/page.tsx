import EasterEgg from "./components/easteregg";

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Animated Light Beams */}
      <div className="light-beam bg-yellow-300" style={{ top: '10%', left: '10%', animationDelay: '0s' } as any}></div>
      <div className="light-beam bg-pink-300" style={{ top: '20%', right: '10%', animationDelay: '1s' } as any}></div>
      <div className="light-beam bg-purple-300" style={{ bottom: '20%', left: '25%', animationDelay: '2s' } as any}></div>
      <div className="light-beam bg-blue-300" style={{ bottom: '10%', right: '30%', animationDelay: '1.5s' } as any}></div>

      {/* Falling Eggs Animation */}
      <div className="falling-egg" style={{ left: '0%', animationDuration: '8s', animationDelay: '0s' } as any}>🥚</div>
      <div className="falling-egg" style={{ left: '20%', animationDuration: '10s', animationDelay: '2s' } as any}>🐣</div>
      <div className="falling-egg" style={{ left: '30%', animationDuration: '12s', animationDelay: '4s' } as any}>🥚</div>
      <div className="falling-egg" style={{ left: '40%', animationDuration: '9s', animationDelay: '1s' } as any}>🐰</div>
      <div className="falling-egg" style={{ left: '50%', animationDuration: '11s', animationDelay: '3s' } as any}>🥚</div>
      <div className="falling-egg" style={{ left: '60%', animationDuration: '10s', animationDelay: '5s' } as any}>🐣</div>
      <div className="falling-egg" style={{ left: '70%', animationDuration: '13s', animationDelay: '2.5s' } as any}>🥚</div>
      <div className="falling-egg" style={{ left: '80%', animationDuration: '9.5s', animationDelay: '4.5s' } as any}>🐰</div>
      <div className="falling-egg" style={{ left: '90%', animationDuration: '11.5s', animationDelay: '1.5s' } as any}>🥚</div>
      <div className="falling-egg" style={{ left: '15%', animationDuration: '10.5s', animationDelay: '6s' } as any}>🐣</div>
      <div className="falling-egg" style={{ left: '25%', animationDuration: '12.5s', animationDelay: '3.5s' } as any}>🥚</div>
      <div className="falling-egg" style={{ left: '35%', animationDuration: '8.5s', animationDelay: '5.5s' } as any}>🐰</div>
      <div className="falling-egg" style={{ left: '60%', animationDuration: '8s', animationDelay: '0s' } as any}>🥚</div>
      <div className="falling-egg" style={{ left: '28%', animationDuration: '10s', animationDelay: '2s' } as any}>🐣</div>
      <div className="falling-egg" style={{ left: '40%', animationDuration: '12s', animationDelay: '4s' } as any}>🥚</div>
      <div className="falling-egg" style={{ left: '40%', animationDuration: '9s', animationDelay: '1s' } as any}>🐰</div>
      <div className="falling-egg" style={{ left: '50%', animationDuration: '11s', animationDelay: '3s' } as any}>🥚</div>
      <div className="falling-egg" style={{ left: '60%', animationDuration: '10s', animationDelay: '5s' } as any}>🐣</div>

      {/* Floating Background Eggs */}
      <div className="floating-egg bg-pink-200 w-32 h-40 top-[5%] left-[8%] z-[1]" style={{ animation: 'float 6s ease-in-out infinite' } as any}></div>
      <div className="floating-egg bg-green-200 w-28 h-36 top-[0%] right-[15%] z-[1]" style={{ animation: 'floatSlow 7s ease-in-out infinite', animationDelay: '1s' } as any}></div>
      <div className="floating-egg bg-blue-200 w-24 h-32 bottom-[5%] left-[5%] z-[1]" style={{ animation: 'floatReverse 8s ease-in-out infinite', animationDelay: '2s' } as any}></div>
      
      {/* Floating Icons */}
      <div className="floating-icon text-4xl top-[45%] left-[20%] z-[1]" style={{ animation: 'float 5s ease-in-out infinite', animationDelay: '0.5s' } as any}>🌸</div>
      <div className="floating-icon text-3xl top-[60%] right-[25%] z-[1]" style={{ animation: 'floatSlow 6s ease-in-out infinite', animationDelay: '1.5s' } as any}>🍃</div>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen relative z-10 px-4">
        <EasterEgg />
      </div>

      {/* Bunny Ears at Bottom */}
      <div className="fixed bottom-20 left-1/2 -translate-x-1/2 flex gap-8 opacity-20 pointer-events-none z-[1]">
        <div className="w-16 h-32 bg-pink-200 rounded-full transform -rotate-12"></div>
        <div className="w-16 h-32 bg-pink-200 rounded-full transform rotate-12"></div>
      </div>
    </main>
  );
}