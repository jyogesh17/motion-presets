import React, { useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

interface StackedCardsEntranceProps {
  cards: Array<{
    id: string;
    content: React.ReactNode;
    backgroundColor?: string;
    image?: string;
  }>;
  entranceStyle?: 'cascade' | 'burst' | 'spiral' | 'flip' | 'unfold';
  staggerDelay?: number;
  springConfig?: { stiffness: number; damping: number };
  className?: string;
}

/**
 * Dramatic entrance animations for stacked cards
 * Cards animate in with various cinematic effects
 */
export const StackedCardsEntrance: React.FC<StackedCardsEntranceProps> = ({
  cards,
  entranceStyle = 'cascade',
  staggerDelay = 0.1,
  springConfig = { stiffness: 100, damping: 15 },
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  const getEntranceVariants = () => {
    switch (entranceStyle) {
      case 'cascade':
        return {
          hidden: () => ({
            opacity: 0,
            y: 100,
            x: -50,
            rotateZ: -10,
            scale: 0.8,
          }),
          visible: (i: number) => ({
            opacity: 1,
            y: i * 30,
            x: 0,
            rotateZ: 0,
            scale: 1 - i * 0.05,
            transition: {
              type: 'spring',
              ...springConfig,
              delay: i * staggerDelay,
            },
          }),
        };

      case 'burst':
        return {
          hidden: () => ({
            opacity: 0,
            scale: 0,
            rotate: 180,
            x: -100,
            y: -100,
          }),
          visible: (i: number) => ({
            opacity: 1,
            scale: 1 - i * 0.05,
            rotate: 0,
            x: 0,
            y: i * 30,
            transition: {
              type: 'spring',
              ...springConfig,
              delay: i * staggerDelay,
            },
          }),
        };

      case 'spiral':
        return {
          hidden: () => ({
            opacity: 0,
            scale: 0,
            rotate: 360 * 2,
            x: 200,
            y: 200,
          }),
          visible: (i: number) => ({
            opacity: 1,
            scale: 1 - i * 0.05,
            rotate: 0,
            x: 0,
            y: i * 30,
            transition: {
              type: 'spring',
              ...springConfig,
              delay: i * staggerDelay,
              duration: 1,
            },
          }),
        };

      case 'flip':
        return {
          hidden: () => ({
            opacity: 0,
            rotateY: 180,
            scale: 0.5,
            y: -100,
          }),
          visible: (i: number) => ({
            opacity: 1,
            rotateY: 0,
            scale: 1 - i * 0.05,
            y: i * 30,
            transition: {
              type: 'spring',
              ...springConfig,
              delay: i * staggerDelay,
            },
          }),
        };

      case 'unfold':
        return {
          hidden: () => ({
            opacity: 0,
            scaleY: 0,
            originY: 'top',
            y: -50,
          }),
          visible: (i: number) => ({
            opacity: 1,
            scaleY: 1,
            y: i * 30,
            transition: {
              type: 'spring',
              ...springConfig,
              delay: i * staggerDelay * 1.5,
            },
          }),
        };

      default:
        return {};
    }
  };

  const variants = getEntranceVariants();

  return (
    <div
      ref={containerRef}
      className={`stacked-cards-entrance ${className}`}
      style={{
        position: 'relative',
        height: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        perspective: '1200px',
      }}
    >
      <AnimatePresence>
        {isInView && cards.map((card, index) => (
          <motion.div
            key={card.id}
            custom={index}
            initial="hidden"
            animate="visible"
            variants={variants}
            className="stacked-card-entrance"
            style={{
              position: 'absolute',
              width: '90%',
              maxWidth: '600px',
              height: '400px',
              borderRadius: '20px',
              overflow: 'hidden',
              background: card.backgroundColor || '#ffffff',
              boxShadow: `0 ${20 + index * 10}px ${40 + index * 10}px -10px rgba(0,0,0,${0.3 - index * 0.05})`,
              zIndex: cards.length - index,
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'hidden',
            }}
            whileHover={{
              y: index * 30 - 10,
              scale: 1.02,
              transition: { type: 'spring', stiffness: 300, damping: 20 },
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
                opacity: 0.5,
              }}
              whileHover={{ opacity: 0.7 }}
            />
            
            {/* Card content */}
            {card.image && (
              <img
                src={card.image}
                alt=""
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
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

            {/* Shimmer effect on hover */}
            <motion.div
              className="shimmer"
              style={{
                position: 'absolute',
                top: '-50%',
                left: '-50%',
                width: '200%',
                height: '200%',
                background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.3) 50%, transparent 60%)',
                transform: 'rotate(45deg)',
              }}
              initial={{ x: '-100%', y: '-100%' }}
              whileHover={{
                x: '100%',
                y: '100%',
                transition: { duration: 0.6, ease: 'easeInOut' },
              }}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};