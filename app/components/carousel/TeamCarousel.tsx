'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import './carousel.css';

interface AnimeQuote {
  character: string;
  quote: string;
  anime: string;
}

const NUMBER_OF_CARDS = 6;

export default function TeamCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [quotes, setQuotes] = useState<AnimeQuote[]>([]);
  const [displayedQuotes, setDisplayedQuotes] = useState<AnimeQuote[]>([]);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const dotsRef = useRef<HTMLDivElement[]>([]);
  const touchStartY = useRef(0);
  const touchStartX = useRef(0);
  const usedIndicesRef = useRef<number[]>([]);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await fetch('/anime.json');
        const data: AnimeQuote[] = await response.json();
        setQuotes(data);
        generateRandomQuotes(data);
      } catch (error) {
        console.error('Failed to fetch quotes:', error);
      }
    };

    fetchQuotes();
  }, []);

  const generateRandomQuotes = (quotesData: AnimeQuote[]) => {
    const newQuotes: AnimeQuote[] = [];
    const usedIndices: number[] = [];

    for (let i = 0; i < NUMBER_OF_CARDS; i++) {
      let randomIndex = Math.floor(Math.random() * quotesData.length);
      while (usedIndices.includes(randomIndex)) {
        randomIndex = Math.floor(Math.random() * quotesData.length);
      }
      usedIndices.push(randomIndex);
      newQuotes.push(quotesData[randomIndex]);
    }

    usedIndicesRef.current = usedIndices;
    setDisplayedQuotes(newQuotes);
  };

  const updateCarousel = (newIndex: number) => {
    if (isAnimating || quotes.length === 0) return;
    setIsAnimating(true);

    const cardCount = NUMBER_OF_CARDS;
    const nextIndex = (newIndex + cardCount) % cardCount;
    setCurrentIndex(nextIndex);

    setTimeout(() => {
      setIsAnimating(false);
    }, 800);
  };

  const getRandomQuote = () => {
    if (quotes.length === 0) return null;
    
    let randomIndex = Math.floor(Math.random() * quotes.length);
    while (usedIndicesRef.current.includes(randomIndex)) {
      randomIndex = Math.floor(Math.random() * quotes.length);
    }
    return quotes[randomIndex];
  };

  const handleUpClick = () => {
    const newQuote = getRandomQuote();
    if (newQuote) {
      const newQuotes = [...displayedQuotes];
      newQuotes[currentIndex] = newQuote;
      setDisplayedQuotes(newQuotes);
    }
    updateCarousel(currentIndex - 1);
  };

  const handleDownClick = () => {
    const newQuote = getRandomQuote();
    if (newQuote) {
      const newQuotes = [...displayedQuotes];
      newQuotes[currentIndex] = newQuote;
      setDisplayedQuotes(newQuotes);
    }
    updateCarousel(currentIndex + 1);
  };

  const handleDotClick = (index: number) => {
    updateCarousel(index);
  };

  const handleCardClick = (index: number) => {
    updateCarousel(index);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      updateCarousel(currentIndex - 1);
    } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      updateCarousel(currentIndex + 1);
    }
  };

  const handleTouchStart = (e: TouchEvent) => {
    const target = e.target as HTMLElement;
    const card = target.closest('.card');
    const isCenterCard = card?.classList.contains('center');
    
    if (isCenterCard) {
      touchStartY.current = e.changedTouches[0].screenY;
      touchStartX.current = e.changedTouches[0].screenX;
    }
  };

  const handleTouchEnd = (e: TouchEvent) => {
    const target = e.target as HTMLElement;
    const card = target.closest('.card');
    const isCenterCard = card?.classList.contains('center');
    
    if (!isCenterCard) return;
    
    const touchEndY = e.changedTouches[0].screenY;
    const touchEndX = e.changedTouches[0].screenX;
    const diffY = touchStartY.current - touchEndY;
    const diffX = touchStartX.current - touchEndX;
    const swipeThreshold = 50;

    if (Math.abs(diffY) > swipeThreshold || Math.abs(diffX) > swipeThreshold) {
      if (Math.abs(diffX) > Math.abs(diffY)) {
        // Horizontal swipe
        if (diffX > 0) {
          updateCarousel(currentIndex + 1);
        } else {
          updateCarousel(currentIndex - 1);
        }
      } else {
        // Vertical swipe
        if (diffY > 0) {
          updateCarousel(currentIndex + 1);
        } else {
          updateCarousel(currentIndex - 1);
        }
      }
    }
  };

  const getCardClass = (index: number): string => {
    const offset = (index - currentIndex + NUMBER_OF_CARDS) % NUMBER_OF_CARDS;
    let classes = 'card';

    if (offset === 0) {
      classes += ' center';
    } else if (offset === 1) {
      classes += ' down-1';
    } else if (offset === 2) {
      classes += ' down-2';
    } else if (offset === NUMBER_OF_CARDS - 1) {
      classes += ' up-1';
    } else if (offset === NUMBER_OF_CARDS - 2) {
      classes += ' up-2';
    } else {
      classes += ' hidden';
    }

    return classes;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      updateCarousel(currentIndex + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex, isAnimating]);

  return (
    <div className="carousel-wrapper">
      <div className="main-container">
        <div className="carousel-section">
          <div className="carousel-container">
            <div className="carousel-track">
              {Array.from({ length: NUMBER_OF_CARDS }).map((_, i) => (
                <div
                  key={i}
                  className={getCardClass(i)}
                  ref={(el) => {
                    if (el) cardsRef.current[i] = el;
                  }}
                  onClick={() => handleCardClick(i)}
                  data-index={i}
                >
                  <img
                    src={`https://ik.imagekit.io/gopichakradhar/luffy/o${i + 1}.jpeg?updatedAt=1754289569411`}
                    alt={`Card ${i + 1}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
