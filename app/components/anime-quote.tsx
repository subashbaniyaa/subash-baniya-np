'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

interface AnimeQuote {
  character: string;
  quote: string;
  anime: string;
}

export default function AnimeQuote() {
  const [quote, setQuote] = useState<AnimeQuote | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [usedQuotes, setUsedQuotes] = useState<Set<number>>(new Set());
  const usedQuotesRef = useRef<Set<number>>(new Set());

  usedQuotesRef.current = usedQuotes;

  const fetchRandomQuote = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/anime.json');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Response is not JSON');
      }
      
      const quotes: AnimeQuote[] = await response.json();
      
      const currentUsedQuotes = usedQuotesRef.current;
      const availableIndices = quotes.map((_, index) => index).filter(index => !currentUsedQuotes.has(index));
      
      if (availableIndices.length === 0) {
        setUsedQuotes(new Set());
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const randomQuote = quotes[randomIndex];
        setQuote(randomQuote);
        setUsedQuotes(new Set([randomIndex]));
      } else {
        const randomAvailableIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
        const randomQuote = quotes[randomAvailableIndex];
        setQuote(randomQuote);
        setUsedQuotes(prev => new Set([...prev, randomAvailableIndex]));
      }
    } catch (error) {
      console.error('Failed to fetch anime quotes:', error);
      // Set a fallback quote if fetch fails
      setQuote({
        character: "Naruto Uzumaki",
        quote: "If you don't like your destiny, don't accept it. Instead, have the courage to change it the way you want it to be.",
        anime: "Naruto"
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRandomQuote();
  }, [fetchRandomQuote]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        fetchRandomQuote();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [fetchRandomQuote]);

  if (isLoading) {
    return (
      <div className="mt-6 animate-pulse">
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
      </div>
    );
  }

  if (!quote) {
    return (
      <div className="mt-6 max-w-md">
        <blockquote className="text-black dark:text-white text-base italic text-shadow-lg">
          &ldquo;If you don&#39;t like your destiny, don&#39;t accept it. Instead, have the courage to change it the way you want it to be.&rdquo; — Naruto Uzumaki, Naruto
        </blockquote>
      </div>
    );
  }

  return (
    <div className="mt-6 max-w-md">
      <blockquote className="text-black dark:text-white text-base italic text-shadow-lg">
        &ldquo;{quote.quote}&rdquo; — {quote.character}, {quote.anime}
      </blockquote>
    </div>
  );
}
