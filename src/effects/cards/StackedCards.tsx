import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface StackedCardsProps {
  cards: Array<{
    id: string;
    content: React.ReactNode;
    backgroundColor?: string;
    image?: string;
  }>;
  overlap?: number;
  scaleOffset?: number;
  rotateOnScroll?: boolean;
  stickyContainer?: boolean;
  className?: string;
}

/**
 * Apple-inspired stacked cards that reveal on scroll
 * Creates a premium storytelling experience
 */
export const StackedCards: React.FC<StackedCardsProps> = ({
  cards,
  overlap = 40,
  scaleOffset = 0.05,
  rotateOnScroll = true,
  stickyContainer = true,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });
  
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  
  return (
    <div
      ref={containerRef}
      className={`stacked-cards-container ${className}`}
      style={{
        position: 'relative',
        height: `${100 * cards.length}vh`,
      }}
    >
      <div
        style={{
          position: stickyContainer ? 'sticky' : 'relative',
          top: 0,
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          perspective: '1200px',
        }}
      >
        {cards.map((card, index) => {
          const cardProgress = useTransform(
            smoothProgress,
            [
              (index - 0.5) / cards.length,
              index / cards.length,
              (index + 1) / cards.length,
            ],
            [0, 0, 1]
          );
          
          const y = useTransform(cardProgress, [0, 1], [0, -overlap * index]);
          const scale = useTransform(
            cardProgress,
            [0, 0.5, 1],
            [1 - scaleOffset * index, 1 - scaleOffset * index, 1]
          );
          const rotateX = useTransform(
            cardProgress,
            [0, 0.5, 1],
            rotateOnScroll ? [15, 0, -5] : [0, 0, 0]
          );
          const opacity = useTransform(cardProgress, [0, 0.1, 0.9, 1], [0.7, 1, 1, 0.9]);
          const blurValue = useTransform(
            cardProgress,
            [0, 0.5, 1],
            index === 0 ? [0, 0, 0] : [5, 0, 0]
          );
          
          const filter = useTransform(
            blurValue,
            (value) => `blur(${value}px)`
          );
          
          // Z-index based on scroll
          const zIndex = useTransform(
            smoothProgress,
            [
              (index - 1) / cards.length,
              index / cards.length,
              (index + 1) / cards.length,
            ],
            [cards.length - index, cards.length - index + 10, cards.length - index]
          );
          
          return (
            <motion.div
              key={card.id}
              className="stacked-card"
              style={{
                position: 'absolute',
                width: '90%',
                maxWidth: '800px',
                height: '70vh',
                borderRadius: '20px',
                overflow: 'hidden',
                background: card.backgroundColor || '#ffffff',
                boxShadow: '0 50px 100px -20px rgba(0,0,0,0.3)',
                y,
                scale,
                rotateX,
                opacity,
                filter,
                zIndex,
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'hidden',
              }}
            >
              {/* Glass morphism overlay */}
              <motion.div
                className="glass-overlay"
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: `linear-gradient(135deg, 
                    rgba(255,255,255,0.1) 0%, 
                    rgba(255,255,255,0.05) 100%)`,
                  backdropFilter: 'blur(10px)',
                  opacity: useTransform(cardProgress, [0, 0.5, 1], [0, 0.5, 0]),
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
                    scale: useTransform(cardProgress, [0, 1], [1.1, 1]),
                  }}
                />
              )}
              
              <motion.div
                className="card-content"
                style={{
                  position: 'relative',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '3rem',
                  transform: 'translateZ(50px)',
                }}
              >
                {card.content}
              </motion.div>
              
              {/* Reveal indicator */}
              <motion.div
                className="reveal-indicator"
                style={{
                  position: 'absolute',
                  bottom: '2rem',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '60px',
                  height: '4px',
                  borderRadius: '2px',
                  backgroundColor: 'rgba(255,255,255,0.5)',
                  scaleX: useTransform(cardProgress, [0, 1], [0, 1]),
                  transformOrigin: 'left',
                }}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};