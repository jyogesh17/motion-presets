import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence, useSpring, useMotionValue } from 'framer-motion';

interface TrailPoint {
  x: number;
  y: number;
  id: number;
  size: number;
  opacity: number;
  hue: number;
}

interface CursorTrailProps {
  trailLength?: number;
  particleSize?: number;
  colorful?: boolean;
  elastic?: boolean;
  glow?: boolean;
  morphing?: boolean;
  gravity?: boolean;
}

/**
 * Mesmerizing cursor trail with particle physics
 * Creates beautiful, fluid trail effects following the cursor
 */
export const CursorTrail: React.FC<CursorTrailProps> = ({
  trailLength = 20,
  particleSize = 20,
  colorful = true,
  elastic = true,
  glow = true,
  morphing = true,
  gravity = false,
}) => {
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const [isMoving, setIsMoving] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 200, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 200, damping: 20 });
  const idCounter = useRef(0);
  const moveTimeout = useRef<ReturnType<typeof setTimeout>>();
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      
      setIsMoving(true);
      if (moveTimeout.current) clearTimeout(moveTimeout.current);
      moveTimeout.current = setTimeout(() => setIsMoving(false), 100);
      
      const newPoint: TrailPoint = {
        x: e.clientX,
        y: e.clientY + (gravity ? Math.random() * 10 : 0),
        id: idCounter.current++,
        size: particleSize + (morphing ? Math.random() * 10 : 0),
        opacity: 1,
        hue: colorful ? (idCounter.current * 10) % 360 : 250,
      };
      
      setTrail(prev => {
        const updated = [newPoint, ...prev].slice(0, trailLength);
        return updated.map((point, index) => ({
          ...point,
          opacity: 1 - (index / trailLength),
          size: point.size * (1 - index / trailLength / 2),
        }));
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (moveTimeout.current) clearTimeout(moveTimeout.current);
    };
  }, [trailLength, particleSize, colorful, morphing, gravity, mouseX, mouseY]);
  
  // Clean up old trail points
  useEffect(() => {
    const interval = setInterval(() => {
      setTrail(prev => prev.filter((_, index) => index < trailLength));
    }, 100);
    return () => clearInterval(interval);
  }, [trailLength]);
  
  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    >
      {/* Main cursor */}
      <motion.div
        style={{
          position: 'absolute',
          x: elastic ? springX : mouseX,
          y: elastic ? springY : mouseY,
          width: particleSize,
          height: particleSize,
          marginLeft: -particleSize / 2,
          marginTop: -particleSize / 2,
          borderRadius: '50%',
          background: colorful 
            ? `radial-gradient(circle, hsla(${(idCounter.current * 10) % 360}, 100%, 50%, 1), transparent)`
            : 'radial-gradient(circle, rgba(120,119,198,1), transparent)',
          filter: glow ? 'blur(2px)' : 'none',
          mixBlendMode: 'screen',
        }}
        animate={{
          scale: isMoving ? 1.5 : 1,
        }}
        transition={{
          scale: { type: 'spring', stiffness: 300, damping: 10 },
        }}
      />
      
      {/* Trail particles */}
      <AnimatePresence>
        {trail.map((point, index) => (
          <motion.div
            key={point.id}
            initial={{ 
              x: point.x,
              y: point.y,
              scale: 0,
              opacity: 0,
            }}
            animate={{
              x: point.x + (elastic ? Math.sin(index) * 5 : 0),
              y: point.y + (gravity ? index * 2 : 0) + (elastic ? Math.cos(index) * 5 : 0),
              scale: morphing ? [1, 1.2, 1] : 1,
              opacity: point.opacity,
            }}
            exit={{
              scale: 0,
              opacity: 0,
              y: gravity ? point.y + 50 : point.y,
            }}
            transition={{
              type: elastic ? 'spring' : 'tween',
              stiffness: 200 - index * 5,
              damping: 20 + index,
              duration: elastic ? undefined : 0.5,
            }}
            style={{
              position: 'absolute',
              width: point.size,
              height: point.size,
              marginLeft: -point.size / 2,
              marginTop: -point.size / 2,
              borderRadius: morphing ? `${50 + Math.sin(index) * 20}%` : '50%',
              background: colorful
                ? `radial-gradient(circle, hsla(${point.hue}, 100%, ${50 + index * 2}%, ${point.opacity}), transparent)`
                : `radial-gradient(circle, rgba(120,119,198,${point.opacity}), transparent)`,
              filter: glow ? `blur(${1 + index * 0.1}px)` : 'none',
              mixBlendMode: 'screen',
            }}
          >
            {/* Inner glow */}
            {glow && (
              <motion.div
                style={{
                  position: 'absolute',
                  inset: '-50%',
                  borderRadius: '50%',
                  background: colorful
                    ? `radial-gradient(circle, hsla(${point.hue}, 100%, 70%, 0.3), transparent)`
                    : 'radial-gradient(circle, rgba(120,119,198,0.3), transparent)',
                  filter: 'blur(10px)',
                }}
                animate={{
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: index * 0.1,
                }}
              />
            )}
          </motion.div>
        ))}
      </AnimatePresence>
      
      {/* Ripple effect on click */}
      <motion.div
        style={{
          position: 'absolute',
          x: mouseX,
          y: mouseY,
          width: particleSize * 3,
          height: particleSize * 3,
          marginLeft: -particleSize * 1.5,
          marginTop: -particleSize * 1.5,
          borderRadius: '50%',
          border: '2px solid rgba(120,119,198,0.5)',
          pointerEvents: 'none',
        }}
        animate={{
          scale: [1, 3, 3],
          opacity: [0.5, 0.2, 0],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
        }}
      />
    </div>
  );
};