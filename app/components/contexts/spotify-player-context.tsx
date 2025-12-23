'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface Song {
  id: number;
  title: string;
  artist: string;
  src: string;
  cover: string;
}

interface SpotifyPlayerContextType {
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  currentSong: Song | null;
  setCurrentSong: (song: Song | null) => void;
}

const SpotifyPlayerContext = createContext<SpotifyPlayerContextType | undefined>(undefined);

export function SpotifyPlayerProvider({ children }: { children: ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);

  return (
    <SpotifyPlayerContext.Provider value={{ isPlaying, setIsPlaying, currentSong, setCurrentSong }}>
      {children}
    </SpotifyPlayerContext.Provider>
  );
}

export function useSpotifyPlayer() {
  const context = useContext(SpotifyPlayerContext);
  if (context === undefined) {
    throw new Error('useSpotifyPlayer must be used within a SpotifyPlayerProvider');
  }
  return context;
}
