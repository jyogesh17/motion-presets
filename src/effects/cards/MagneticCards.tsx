import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface MagneticCardProps {
  children: React.ReactNode;
  className?: string;
  magneticStrength?: number;
  springConfig?: { stiffness: number; damping: number };
  glowEffect?: boolean;
  distortOnHover?: boolean;
}

/**
 * Ultra-modern magnetic card that responds to mouse with elastic physics
 * Creates a premium, fluid interaction
 */
export const MagneticCard: React.FC<MagneticCardProps> = ({
  children,
  className = '',
  magneticStrength = 30,
  springConfig = { stiffness: 150, damping: 15 },
  glowEffect = true,
  distortOnHover = true,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);
  
  const rotateX = useTransform(springY, [-magneticStrength, magneticStrength], [10, -10]);
  const rotateY = useTransform(springX, [-magneticStrength, magneticStrength], [-10, 10]);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const x = e.clientX - centerX;
    const y = e.clientY - centerY;
    
    mouseX.set(x / 10);
    mouseY.set(y / 10);
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };
  
  return (
    <motion.div
      ref={cardRef}
      className={`magnetic-card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        perspective: 1000,
        x: springX,
        y: springY,
        rotateX,
        rotateY,
      }}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
    >
      {/* Holographic gradient overlay */}
      <motion.div
        className="holographic-overlay"
        animate={{
          background: isHovered
            ? [
                'linear-gradient(45deg, rgba(255,0,150,0.3), rgba(0,255,255,0.3))',
                'linear-gradient(90deg, rgba(0,255,255,0.3), rgba(255,0,150,0.3))',
                'linear-gradient(135deg, rgba(255,0,150,0.3), rgba(0,255,255,0.3))',
                'linear-gradient(180deg, rgba(0,255,255,0.3), rgba(255,0,150,0.3))',
                'linear-gradient(45deg, rgba(255,0,150,0.3), rgba(0,255,255,0.3))',
              ]
            : 'linear-gradient(45deg, transparent, transparent)',
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 'inherit',
          pointerEvents: 'none',
          mixBlendMode: 'overlay',
        }}
      />
      
      {/* Dynamic glow effect */}
      {glowEffect && (
        <motion.div
          className="glow-effect"
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1.2 : 0.8,
          }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'absolute',
            inset: '-20px',
            borderRadius: 'inherit',
            background: 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(120,119,198,0.3), transparent 50%)',
            filter: 'blur(20px)',
            pointerEvents: 'none',
            zIndex: -1,
          }}
        />
      )}
      
      {/* Distortion mesh effect */}
      {distortOnHover && (
        <svg
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            opacity: 0,
          }}
        >
          <defs>
            <filter id="distortion">
              <feTurbulence
                type="turbulence"
                baseFrequency={isHovered ? 0.02 : 0}
                numOctaves="3"
                result="turbulence"
              />
              <feDisplacementMap
                in2="turbulence"
                in="SourceGraphic"
                scale={isHovered ? 5 : 0}
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </defs>
        </svg>
      )}
      
      <motion.div
        className="card-content"
        style={{
          position: 'relative',
          transform: 'translateZ(50px)',
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};