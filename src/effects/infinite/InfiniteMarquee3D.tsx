import React, { useRef, useEffect, useState } from 'react';
import { motion, useAnimationFrame, useMotionValue } from 'framer-motion';

interface InfiniteMarquee3DProps {
  children: React.ReactNode[];
  speed?: number;
  perspective?: number;
  rotateOnHover?: boolean;
  pauseOnHover?: boolean;
  gradient?: boolean;
  gap?: number;
  direction?: 'left' | 'right' | 'up' | 'down';
}

/**
 * Next-gen 3D infinite marquee with perspective transforms
 * Creates Apple-style smooth infinite scroll with depth
 */
export const InfiniteMarquee3D: React.FC<InfiniteMarquee3DProps> = ({
  children,
  speed = 1,
  perspective = 1000,
  rotateOnHover = true,
  pauseOnHover = true,
  gradient = true,
  gap = 20,
  direction = 'left',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [items, setItems] = useState<React.ReactNode[]>([]);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Double the items for seamless loop
  useEffect(() => {
    setItems([...children, ...children, ...children]);
  }, [children]);
  
  useAnimationFrame((_, delta) => {
    if (isPaused) return;
    
    const moveAmount = (delta / 1000) * speed * 100;
    
    if (direction === 'left') {
      x.set(x.get() - moveAmount);
      if (Math.abs(x.get()) >= (children.length * 200)) {
        x.set(0);
      }
    } else if (direction === 'right') {
      x.set(x.get() + moveAmount);
      if (x.get() >= (children.length * 200)) {
        x.set(0);
      }
    } else if (direction === 'up') {
      y.set(y.get() - moveAmount);
      if (Math.abs(y.get()) >= (children.length * 200)) {
        y.set(0);
      }
    } else {
      y.set(y.get() + moveAmount);
      if (y.get() >= (children.length * 200)) {
        y.set(0);
      }
    }
  });
  
  const isHorizontal = direction === 'left' || direction === 'right';
  
  return (
    <div
      ref={containerRef}
      className="marquee-3d-container"
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
      style={{
        position: 'relative',
        overflow: 'hidden',
        perspective: `${perspective}px`,
        width: '100%',
        height: '100%',
      }}
    >
      {/* Gradient masks for fade effect */}
      {gradient && (
        <>
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              pointerEvents: 'none',
              zIndex: 10,
              background: isHorizontal
                ? `linear-gradient(90deg, 
                    rgba(255,255,255,1) 0%, 
                    rgba(255,255,255,0) 10%, 
                    rgba(255,255,255,0) 90%, 
                    rgba(255,255,255,1) 100%)`
                : `linear-gradient(180deg, 
                    rgba(255,255,255,1) 0%, 
                    rgba(255,255,255,0) 10%, 
                    rgba(255,255,255,0) 90%, 
                    rgba(255,255,255,1) 100%)`,
            }}
          />
        </>
      )}
      
      <motion.div
        className="marquee-track"
        style={{
          display: 'flex',
          flexDirection: isHorizontal ? 'row' : 'column',
          gap: `${gap}px`,
          x: isHorizontal ? x : 0,
          y: !isHorizontal ? y : 0,
          transformStyle: 'preserve-3d',
        }}
      >
        {items.map((item, index) => {
          // Calculate 3D transform values based on position
          const calculateRotateY = () => {
            if (!rotateOnHover || !isHorizontal) return 0;
            const currentX = x.get();
            const itemPosition = index * 200;
            const distance = currentX - itemPosition;
            const maxDistance = 200;
            const rotation = (distance / maxDistance) * 15;
            return Math.max(-15, Math.min(15, rotation));
          };
          
          const calculateScale = () => {
            const currentX = x.get();
            const itemPosition = index * 200;
            const distance = Math.abs(currentX - itemPosition);
            const maxDistance = 400;
            const scaleFactor = 1 - (distance / maxDistance) * 0.2;
            return Math.max(0.8, Math.min(1, scaleFactor));
          };
          
          const calculateZ = () => {
            const currentX = x.get();
            const itemPosition = index * 200;
            const distance = Math.abs(currentX - itemPosition);
            const maxDistance = 200;
            const depth = 50 - (distance / maxDistance) * 150;
            return Math.max(-100, Math.min(50, depth));
          };
          
          return (
            <motion.div
              key={index}
              className="marquee-item"
              style={{
                flexShrink: 0,
                transformStyle: 'preserve-3d',
              }}
              animate={{
                rotateY: calculateRotateY(),
                scale: calculateScale(),
                z: calculateZ(),
              }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
              }}
              whileHover={
                rotateOnHover
                  ? {
                      scale: 1.1,
                      z: 100,
                      rotateY: 0,
                      transition: { duration: 0.3 },
                    }
                  : {}
              }
            >
              {item}
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};