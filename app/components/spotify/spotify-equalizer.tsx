'use client';

export function SpotifyEqualizer({ isPlaying }: { isPlaying: boolean }) {
  if (!isPlaying) return null;

  return (
    <div className="flex items-center gap-0.5" style={{ height: '14px' }}>
      <style jsx>{`
        @keyframes eq1 {
          0%, 100% { height: 14px; }
          25% { height: 4px; }
          75% { height: 4px; }
        }
        @keyframes eq2 {
          0%, 100% { height: 4px; }
          25% { height: 14px; }
          75% { height: 14px; }
        }
        @keyframes eq3 {
          0%, 100% { height: 14px; }
          25% { height: 4px; }
          75% { height: 4px; }
        }
        .eq-bar {
          width: 2px;
          border-radius: 1px;
          background-color: #1DB954;
          transition: height 0.15s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .eq-bar-1 { animation: eq1 0.8s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
        .eq-bar-2 { animation: eq2 0.8s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
        .eq-bar-3 { animation: eq3 0.8s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
      `}</style>
      <div className="eq-bar eq-bar-1" />
      <div className="eq-bar eq-bar-2" />
      <div className="eq-bar eq-bar-3" />
    </div>
  );
}
