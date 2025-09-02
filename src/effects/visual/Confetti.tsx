import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  rotation: number;
  color: string;
  size: number;
  velocity: { x: number; y: number; rotation: number };
  shape: 'square' | 'circle' | 'triangle' | 'star';
}

interface ConfettiProps {
  trigger?: boolean;
  count?: number;
  duration?: number;
  colors?: string[];
  spread?: number;
  startVelocity?: number;
  gravity?: number;
  scalar?: number;
  shapes?: Array<'square' | 'circle' | 'triangle' | 'star'>;
  origin?: { x: number; y: number };
  className?: string;
  continuous?: boolean;
}

/**
 * Celebration confetti effect with physics
 * Perfect for success states, achievements, and celebrations
 */
export const Confetti: React.FC<ConfettiProps> = ({
  trigger = true,
  count = 100,
  duration = 3000,
  colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722'],
  spread = 50,
  startVelocity = 45,
  gravity = 0.5,
  scalar = 1,
  shapes = ['square', 'circle', 'triangle'],
  origin = { x: 0.5, y: 0.5 },
  className = '',
  continuous = false,
}) => {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (!trigger) return;

    const newPieces: ConfettiPiece[] = [];
    const angleStep = (Math.PI * 2) / count;

    for (let i = 0; i < count; i++) {
      const angle = angleStep * i + (Math.random() - 0.5) * spread * (Math.PI / 180);
      const velocity = startVelocity * (0.5 + Math.random() * 0.5);
      
      newPieces.push({
        id: Date.now() + i,
        x: origin.x * window.innerWidth,
        y: origin.y * window.innerHeight,
        rotation: Math.random() * 360,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: (10 + Math.random() * 10) * scalar,
        velocity: {
          x: Math.cos(angle) * velocity,
          y: Math.sin(angle) * velocity - 20,
          rotation: (Math.random() - 0.5) * 10,
        },
        shape: shapes[Math.floor(Math.random() * shapes.length)],
      });
    }

    setPieces(newPieces);
    setKey(prev => prev + 1);

    if (!continuous) {
      const timer = setTimeout(() => {
        setPieces([]);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [trigger, count, duration, colors, spread, startVelocity, scalar, shapes, origin, continuous]);

  const renderShape = (shape: string, size: number, color: string) => {
    switch (shape) {
      case 'circle':
        return (
          <div
            style={{
              width: size,
              height: size,
              borderRadius: '50%',
              backgroundColor: color,
            }}
          />
        );
      case 'triangle':
        return (
          <div
            style={{
              width: 0,
              height: 0,
              borderLeft: `${size/2}px solid transparent`,
              borderRight: `${size/2}px solid transparent`,
              borderBottom: `${size}px solid ${color}`,
            }}
          />
        );
      case 'star':
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        );
      default:
        return (
          <div
            style={{
              width: size,
              height: size,
              backgroundColor: color,
            }}
          />
        );
    }
  };

  return (
    <div className={`confetti-container ${className}`} style={{ 
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: 9999,
      overflow: 'hidden',
    }}>
      <AnimatePresence>
        {pieces.map((piece) => (
          <motion.div
            key={`${key}-${piece.id}`}
            initial={{
              x: piece.x,
              y: piece.y,
              rotate: piece.rotation,
              opacity: 1,
              scale: 0,
            }}
            animate={{
              x: piece.x + piece.velocity.x * 100,
              y: [
                piece.y,
                piece.y + piece.velocity.y * 20,
                piece.y + piece.velocity.y * 40 + gravity * 500,
              ],
              rotate: piece.rotation + piece.velocity.rotation * 100,
              opacity: [1, 1, 0],
              scale: [0, 1, 1],
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: duration / 1000,
              ease: [0.25, 0.46, 0.45, 0.94],
              times: [0, 0.2, 1],
            }}
            style={{
              position: 'absolute',
              transformStyle: 'preserve-3d',
            }}
          >
            {renderShape(piece.shape, piece.size, piece.color)}
            
            {/* 3D effect with shadow */}
            <motion.div
              style={{
                position: 'absolute',
                top: 2,
                left: 2,
                width: piece.size,
                height: piece.size,
                backgroundColor: 'rgba(0,0,0,0.2)',
                filter: 'blur(2px)',
                borderRadius: piece.shape === 'circle' ? '50%' : 0,
                transform: 'translateZ(-10px)',
              }}
            />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Continuous mode particles */}
      {continuous && (
        <motion.div
          animate={{
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '2rem',
          }}
        >
          🎉
        </motion.div>
      )}
    </div>
  );
};