import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface StackedCardsHoverProps {
  cards: Array<{
    id: string;
    content: React.ReactNode;
    backgroundColor?: string;
    image?: string;
  }>;
  hoverEffect?: 'fanOut' | 'tilt3d' | 'peek' | 'magnetic' | 'glow';
  springConfig?: { stiffness: number; damping: number };
  className?: string;
}

/**
 * Interactive hover effects for stacked cards
 * Creates engaging mouse interactions with smooth physics
 */
export const StackedCardsHover: React.FC<StackedCardsHoverProps> = ({
  cards,
  hoverEffect = 'fanOut',
  springConfig = { stiffness: 200, damping: 20 },
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springMouseX = useSpring(mouseX, springConfig);
  const springMouseY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setHoveredIndex(null);
  };

  const getHoverStyles = (index: number) => {
    const isHovered = hoveredIndex === index;
    const baseY = index * 15;
    
    switch (hoverEffect) {
      case 'fanOut':
        return {
          y: isHovered ? baseY - 30 : hoveredIndex !== null ? baseY + index * 20 : baseY,
          x: hoveredIndex !== null ? (index - hoveredIndex) * 80 : 0,
          rotate: hoveredIndex !== null ? (index - hoveredIndex) * 5 : 0,
          scale: isHovered ? 1.05 : 1 - index * 0.05,
        };

      case 'tilt3d':
        return {
          y: baseY,
          rotateX: 0,
          rotateY: 0,
          scale: isHovered ? 1.05 : 1 - index * 0.05,
          z: isHovered ? 50 : 0,
        };

      case 'peek':
        return {
          y: hoveredIndex !== null && index > hoveredIndex 
            ? baseY + (index - hoveredIndex) * 40 
            : baseY,
          scale: isHovered ? 1.02 : 1 - index * 0.05,
          opacity: hoveredIndex !== null && index < hoveredIndex ? 0.5 : 1,
        };

      case 'magnetic':
        return {
          y: baseY,
          x: 0,
          scale: isHovered ? 1.05 : 1 - index * 0.05,
        };

      case 'glow':
        return {
          y: isHovered ? baseY - 10 : baseY,
          scale: isHovered ? 1.02 : 1 - index * 0.05,
        };

      default:
        return { y: baseY, scale: 1 - index * 0.05 };
    }
  };

  return (
    <div
      ref={containerRef}
      className={`stacked-cards-hover ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative',
        height: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        perspective: '1200px',
        cursor: 'pointer',
      }}
    >
      {cards.map((card, index) => {
        const hoverStyles = getHoverStyles(index);
        const isHovered = hoveredIndex === index;

        return (
          <motion.div
            key={card.id}
            className="stacked-card-hover"
            onMouseEnter={() => setHoveredIndex(index)}
            initial={{ y: index * 15, scale: 1 - index * 0.05 }}
            animate={hoverStyles}
            transition={{ type: 'spring', ...springConfig }}
            style={{
              position: 'absolute',
              width: '90%',
              maxWidth: '600px',
              height: '400px',
              borderRadius: '20px',
              overflow: 'hidden',
              background: card.backgroundColor || '#ffffff',
              boxShadow: isHovered 
                ? `0 30px 60px -10px rgba(0,0,0,0.4)` 
                : `0 ${20 + index * 10}px ${40 + index * 10}px -10px rgba(0,0,0,${0.3 - index * 0.05})`,
              zIndex: cards.length - index + (isHovered ? 10 : 0),
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'hidden',
              willChange: 'transform',
            }}
          >
            {/* Glow effect */}
            {hoverEffect === 'glow' && isHovered && (
              <motion.div
                className="glow-effect"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  position: 'absolute',
                  inset: '-20px',
                  background: 'radial-gradient(circle, rgba(102,126,234,0.4) 0%, transparent 70%)',
                  filter: 'blur(20px)',
                  zIndex: -1,
                }}
              />
            )}

            {/* Glass morphism overlay */}
            <motion.div
              className="glass-overlay"
              style={{
                position: 'absolute',
                inset: 0,
                background: `linear-gradient(135deg, 
                  rgba(255,255,255,${isHovered ? 0.15 : 0.1}) 0%, 
                  rgba(255,255,255,${isHovered ? 0.08 : 0.05}) 100%)`,
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
                animate={{ scale: isHovered ? 1.1 : 1 }}
                transition={{ duration: 0.4 }}
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

            {/* Hover indicator */}
            <motion.div
              className="hover-indicator"
              style={{
                position: 'absolute',
                bottom: '2rem',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '60px',
                height: '4px',
                borderRadius: '2px',
                backgroundColor: 'rgba(255,255,255,0.5)',
              }}
              animate={{
                scaleX: isHovered ? 1 : 0.3,
                opacity: isHovered ? 1 : 0.5,
              }}
              transition={{ duration: 0.3 }}
            />

            {/* Magnetic cursor follower */}
            {hoverEffect === 'magnetic' && isHovered && (
              <motion.div
                className="cursor-follower"
                style={{
                  position: 'absolute',
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)',
                  pointerEvents: 'none',
                  x: springMouseX,
                  y: springMouseY,
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              />
            )}
          </motion.div>
        );
      })}
    </div>
  );
};