import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface StackedCardsInfiniteProps {
  cards: Array<{
    id: string;
    content: React.ReactNode;
    backgroundColor?: string;
    image?: string;
  }>;
  autoPlay?: boolean;
  interval?: number;
  pauseOnHover?: boolean;
  direction?: 'forward' | 'backward';
  springConfig?: { stiffness: number; damping: number };
  className?: string;
}

/**
 * Auto-rotating infinite carousel of stacked cards
 * Creates a continuous loop with smooth transitions
 */
export const StackedCardsInfinite: React.FC<StackedCardsInfiniteProps> = ({
  cards,
  autoPlay = true,
  interval = 3000,
  pauseOnHover = true,
  direction = 'forward',
  springConfig = { stiffness: 100, damping: 20 },
  className = '',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!autoPlay || isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex(prev => {
        if (direction === 'forward') {
          return (prev + 1) % cards.length;
        } else {
          return prev === 0 ? cards.length - 1 : prev - 1;
        }
      });
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, isPaused, interval, direction, cards.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? cards.length - 1 : prev - 1));
  };

  const getCardPosition = (cardIndex: number) => {
    const diff = (cardIndex - currentIndex + cards.length) % cards.length;
    
    if (diff === 0) {
      // Current card - front
      return {
        scale: 1,
        y: 0,
        zIndex: 30,
        opacity: 1,
        rotateY: 0,
      };
    } else if (diff === 1 || diff === cards.length - 1) {
      // Next/Previous cards
      const isNext = diff === 1;
      return {
        scale: 0.85,
        y: 40,
        x: isNext ? 100 : -100,
        zIndex: 20,
        opacity: 0.7,
        rotateY: isNext ? -25 : 25,
      };
    } else if (diff === 2 || diff === cards.length - 2) {
      // Second next/previous cards
      const isNext = diff === 2;
      return {
        scale: 0.7,
        y: 80,
        x: isNext ? 150 : -150,
        zIndex: 10,
        opacity: 0.4,
        rotateY: isNext ? -35 : 35,
      };
    } else {
      // Hidden cards
      return {
        scale: 0.6,
        y: 100,
        x: 0,
        zIndex: 0,
        opacity: 0,
        rotateY: 0,
      };
    }
  };

  return (
    <div
      className={`stacked-cards-infinite ${className}`}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
      style={{
        position: 'relative',
        height: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        perspective: '1200px',
      }}
    >
      {/* Cards */}
      <AnimatePresence mode="sync">
        {cards.map((card, index) => {
          const position = getCardPosition(index);
          const isCurrent = index === currentIndex;

          return (
            <motion.div
              key={card.id}
              className="stacked-card-infinite"
              animate={position}
              initial={position}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ type: 'spring', ...springConfig }}
              style={{
                position: 'absolute',
                width: '90%',
                maxWidth: '600px',
                height: '400px',
                borderRadius: '20px',
                overflow: 'hidden',
                background: card.backgroundColor || '#ffffff',
                boxShadow: isCurrent 
                  ? '0 50px 100px -20px rgba(0,0,0,0.4)'
                  : '0 20px 40px -10px rgba(0,0,0,0.3)',
                cursor: 'pointer',
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'hidden',
              }}
              onClick={() => !isCurrent && setCurrentIndex(index)}
              whileHover={isCurrent ? { scale: 1.02 } : {}}
            >
              {/* Glass morphism overlay */}
              <motion.div
                className="glass-overlay"
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: `linear-gradient(135deg, 
                    rgba(255,255,255,${isCurrent ? 0.15 : 0.1}) 0%, 
                    rgba(255,255,255,${isCurrent ? 0.08 : 0.05}) 100%)`,
                  backdropFilter: 'blur(10px)',
                }}
              />
              
              {/* Card content */}
              {card.image && (
                <motion.img
                  src={card.image}
                  alt=""
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                  animate={{ scale: isCurrent ? 1 : 1.1 }}
                  transition={{ duration: 0.6 }}
                />
              )}
              
              <div
                className="card-content"
                style={{
                  position: 'relative',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '3rem',
                  zIndex: 1,
                }}
              >
                {card.content}
              </div>

              {/* Progress indicator */}
              {isCurrent && autoPlay && (
                <motion.div
                  className="progress-indicator"
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    height: '4px',
                    background: 'rgba(255,255,255,0.5)',
                    borderRadius: '2px',
                  }}
                  initial={{ width: '0%' }}
                  animate={{ width: isPaused ? '0%' : '100%' }}
                  transition={{
                    duration: interval / 1000,
                    ease: 'linear',
                  }}
                />
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Navigation Controls */}
      <motion.button
        className="nav-button prev"
        onClick={handlePrev}
        style={{
          position: 'absolute',
          left: '2rem',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.2)',
          color: 'white',
          fontSize: '1.5rem',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 50,
        }}
        whileHover={{ scale: 1.1, background: 'rgba(255,255,255,0.2)' }}
        whileTap={{ scale: 0.95 }}
      >
        ←
      </motion.button>

      <motion.button
        className="nav-button next"
        onClick={handleNext}
        style={{
          position: 'absolute',
          right: '2rem',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.2)',
          color: 'white',
          fontSize: '1.5rem',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 50,
        }}
        whileHover={{ scale: 1.1, background: 'rgba(255,255,255,0.2)' }}
        whileTap={{ scale: 0.95 }}
      >
        →
      </motion.button>

      {/* Dots indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '0.5rem',
          zIndex: 50,
        }}
      >
        {cards.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentIndex(index)}
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: index === currentIndex 
                ? 'rgba(255,255,255,0.9)' 
                : 'rgba(255,255,255,0.3)',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
            }}
            whileHover={{ scale: 1.2 }}
            animate={{
              width: index === currentIndex ? '30px' : '10px',
            }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>

      {/* Pause indicator */}
      {pauseOnHover && isPaused && (
        <motion.div
          className="pause-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'absolute',
            top: '2rem',
            right: '2rem',
            padding: '0.5rem 1rem',
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(10px)',
            borderRadius: '20px',
            color: 'white',
            fontSize: '0.9rem',
          }}
        >
          ⏸ Paused
        </motion.div>
      )}
    </div>
  );
};