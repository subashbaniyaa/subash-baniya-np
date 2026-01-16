'use client';

import { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause, FaBackward, FaForward } from 'react-icons/fa';
import Image from 'next/image';
import { motion } from 'motion/react';
import { useTheme } from 'next-themes';
import { usePathname } from 'next/navigation';
import { useSpotifyPlayer } from './contexts/spotify-player-context';

interface Song {
  id: number;
  title: string;
  artist: string;
  src: string;
  cover: string;
}

const song: Song = {
  id: 1,
  title: "Knockin' On Heaven's Door",
  artist: "Guns N' Roses",
  src: "/static/music/Knockin'OnHeaven'sDoor.mp3",
  cover: "/static/images/GunsNRoses.jpg"
};

function MusicWaveform({ isPlaying, size = 'small' }: { isPlaying: boolean; size?: 'small' | 'medium' | 'large' }) {
  const config = {
    small: { barCount: 4, height: 14, barWidth: 3, gap: 3 },
    medium: { barCount: 4, height: 14, barWidth: 3, gap: 3 },
    large: { barCount: 5, height: 18, barWidth: 4, gap: 4 },
  };
  const { barCount, height, barWidth, gap } = config[size];
  
  return (
    <div className="flex items-center" style={{ gap: `${gap}px`, height: `${height}px` }}>
      <style jsx>{`
        @keyframes wave1 {
          0%, 100% { height: 20%; }
          50% { height: 100%; }
        }
        @keyframes wave2 {
          0%, 100% { height: 70%; }
          50% { height: 30%; }
        }
        @keyframes wave3 {
          0%, 100% { height: 40%; }
          50% { height: 85%; }
        }
        @keyframes wave4 {
          0%, 100% { height: 55%; }
          50% { height: 25%; }
        }
        @keyframes wave5 {
          0%, 100% { height: 30%; }
          50% { height: 90%; }
        }
        .wave-bar {
          border-radius: 2px;
          background-color: #1DB954;
        }
        .wave-1 { animation: wave1 0.45s ease-in-out infinite; }
        .wave-2 { animation: wave2 0.35s ease-in-out infinite 0.1s; }
        .wave-3 { animation: wave3 0.5s ease-in-out infinite 0.05s; }
        .wave-4 { animation: wave4 0.4s ease-in-out infinite 0.15s; }
        .wave-5 { animation: wave5 0.42s ease-in-out infinite 0.08s; }
        .wave-paused {
          animation-play-state: paused !important;
          background-color: #6b7280 !important;
        }
      `}</style>
      {Array.from({ length: barCount }, (_, i) => (
        <div
          key={i}
          className={`wave-bar wave-${i + 1} ${!isPlaying ? 'wave-paused' : ''}`}
          style={{
            width: `${barWidth}px`,
            height: !isPlaying ? `${30 + (i % 3) * 20}%` : undefined,
          }}
        />
      ))}
    </div>
  );
}

export default function SpotifyPlayer() {
  const { resolvedTheme } = useTheme();
  const pathname = usePathname();
  const { setIsPlaying: setGlobalIsPlaying, setCurrentSong } = useSpotifyPlayer();
  const [mounted, setMounted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [displayedSong] = useState(song);
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  
  const isDark = resolvedTheme === 'dark';
  const isArticlesPage = pathname?.startsWith('/articles');
  const shouldDim = isArticlesPage && !isHovered && !isExpanded;

  useEffect(() => {
    setGlobalIsPlaying(isPlaying);
    if (isPlaying) {
      setCurrentSong(displayedSong);
    } else {
      setCurrentSong(null);
    }
  }, [isPlaying, displayedSong, setGlobalIsPlaying, setCurrentSong]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const img = document.createElement('img');
    img.src = song.cover;
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.src = song.src;
    audio.load();
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const handleEnded = () => {
      setIsPlaying(false);
    };
    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (playerRef.current && !playerRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    };

    if (isExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isExpanded]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const skipBackward = (e: React.MouseEvent) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.max(0, audio.currentTime - 10);
  };

  const skipForward = (e: React.MouseEvent) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.min(audio.duration, audio.currentTime + 10);
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleExpand = () => {
    if (!isExpanded && !isDragging) {
      setIsExpanded(true);
    }
  };

  const [isDragging, setIsDragging] = useState(false);

  const playerContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      className="fixed inset-6 pointer-events-none z-50"
      ref={playerContainerRef}
    >
      <div 
        className="absolute bottom-0 right-0 pointer-events-auto"
        ref={playerRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <audio ref={audioRef} />
        
        <motion.div 
          drag
          dragConstraints={playerContainerRef}
          dragElastic={0}
          dragMomentum={false}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => {
            setTimeout(() => setIsDragging(false), 50);
          }}
          onClick={handleExpand}
          initial={false}
          animate={{
            width: isExpanded ? 280 : 'auto',
            height: isExpanded ? 'auto' : 44,
            borderRadius: isExpanded ? 40 : 22,
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 35,
            mass: 0.8,
          }}
          className={`select-none shadow-2xl overflow-hidden transition-colors duration-300 ${
            mounted && isDark ? 'bg-white shadow-white/20' : 'bg-black shadow-black/50'
          } ${
            isExpanded 
              ? 'cursor-default' 
              : 'cursor-grab active:cursor-grabbing'
          }`}
        >
          <motion.div
            initial={false}
            animate={{
              opacity: isExpanded ? 1 : 0,
              scale: isExpanded ? 1 : 0.95,
            }}
            transition={{
              opacity: { duration: 0.2, delay: isExpanded ? 0.1 : 0 },
              scale: { duration: 0.2, delay: isExpanded ? 0.1 : 0 },
            }}
            className="p-4"
            style={{
              display: isExpanded ? 'block' : 'none',
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="relative w-[55px] h-[55px] rounded-[16px] overflow-hidden flex-shrink-0 select-none bg-gradient-to-br from-gray-800 to-gray-900">
                  {!imageError ? (
                    <Image
                      key={`${displayedSong.id}-${displayedSong.cover}`}
                      src={displayedSong.cover}
                      alt={displayedSong.title}
                      fill
                      sizes="55px"
                      className={`object-cover select-none pointer-events-none transition-opacity duration-200 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                      draggable={false}
                      onContextMenu={(e) => e.preventDefault()}
                      onDragStart={(e) => e.preventDefault()}
                      onLoad={() => setImageLoaded(true)}
                      onError={() => {
                        setImageError(true);
                        setImageLoaded(false);
                      }}
                      unoptimized={false}
                      priority={false}
                    />
                  ) : null}
                  {(imageError || !imageLoaded) && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xl select-none">🎵</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-col">
                  <h3 className={`font-semibold text-sm leading-tight truncate max-w-[110px] ${mounted && isDark ? 'text-black' : 'text-white'}`}>
                    {displayedSong.title}
                  </h3>
                  <p className={`text-xs truncate max-w-[110px] ${mounted && isDark ? 'text-gray-600' : 'text-gray-400'}`}>
                    {displayedSong.artist}
                  </p>
                </div>
              </div>

              <MusicWaveform isPlaying={isPlaying} size="medium" />
            </div>

            <div className="flex items-center gap-2 mb-3">
              <span className={`text-[10px] font-bold min-w-[28px] ${mounted && isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                {formatTime(currentTime)}
              </span>
              <div className={`flex-1 h-1 rounded-full overflow-hidden ${mounted && isDark ? 'bg-gray-300' : 'bg-gray-700'}`}>
                <div 
                  className={`h-full rounded-full transition-all duration-100 ${mounted && isDark ? 'bg-black' : 'bg-white'}`}
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className={`text-[10px] font-bold min-w-[28px] text-right ${mounted && isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                {formatTime(duration)}
              </span>
            </div>

            <div className="flex items-center justify-center gap-5">
              <button
                onClick={skipBackward}
                className={`transition-colors ${mounted && isDark ? 'text-black hover:text-gray-600' : 'text-white hover:text-gray-300'}`}
                aria-label="Skip backward"
              >
                <FaBackward size={16} />
              </button>

              <button
                onClick={togglePlay}
                className={`transition-colors ${mounted && isDark ? 'text-black hover:text-gray-600' : 'text-white hover:text-gray-300'}`}
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <FaPause size={26} /> : <FaPlay size={26} />}
              </button>

              <button
                onClick={skipForward}
                className={`transition-colors ${mounted && isDark ? 'text-black hover:text-gray-600' : 'text-white hover:text-gray-300'}`}
                aria-label="Skip forward"
              >
                <FaForward size={16} />
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={false}
            animate={{
              opacity: isExpanded ? 0 : 1,
            }}
            transition={{
              opacity: { duration: 0.15 },
            }}
            className="flex items-center justify-between px-[6px] h-[44px]"
            style={{
              display: isExpanded ? 'none' : 'flex',
            }}
          >
            <div className="relative w-[28px] h-[28px] rounded-full overflow-hidden flex-shrink-0 bg-gradient-to-br from-gray-800 to-gray-900">
              {!imageError ? (
                <Image
                  src={displayedSong.cover}
                  alt={displayedSong.title}
                  fill
                  sizes="28px"
                  className={`object-cover select-none pointer-events-none ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                  draggable={false}
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm">🎵</span>
                </div>
              )}
            </div>
            
            <div className="pl-10 pr-4">
              <MusicWaveform isPlaying={isPlaying} size="small" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
