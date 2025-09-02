import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';

interface TextLiquidRevealProps {
  text: string;
  className?: string;
  liquidIntensity?: number;
  revealSpeed?: number;
}

/**
 * Liquid metal text reveal effect - text appears to melt and form from liquid
 * Inspired by luxury brand websites
 */
export const TextLiquidReveal: React.FC<TextLiquidRevealProps> = ({
  text,
  className = '',
  liquidIntensity = 20,
  revealSpeed = 0.03,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.5 });
  
  const words = text.split(' ');
  
  return (
    <div ref={containerRef} className={`liquid-text-container ${className}`}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="word-wrapper">
          {word.split('').map((char, charIndex) => {
            const totalIndex = wordIndex * 10 + charIndex;
            const delay = totalIndex * revealSpeed;
            
            return (
              <motion.span
                key={charIndex}
                className="liquid-char"
                initial={{
                  opacity: 0,
                  y: liquidIntensity,
                  scale: 0.7,
                  filter: `blur(${liquidIntensity}px) contrast(200%) brightness(150%)`,
                  textShadow: `0 ${liquidIntensity}px ${liquidIntensity * 2}px rgba(0,0,0,0.5)`,
                }}
                animate={isInView ? {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  filter: 'blur(0px) contrast(100%) brightness(100%)',
                  textShadow: '0 0px 0px rgba(0,0,0,0)',
                } : {}}
                transition={{
                  delay,
                  duration: 0.8,
                  ease: [0.215, 0.61, 0.355, 1],
                  opacity: { duration: 0.4, delay },
                  filter: { duration: 1, delay: delay + 0.2 },
                }}
                style={{
                  display: 'inline-block',
                  position: 'relative',
                  transformStyle: 'preserve-3d',
                }}
              >
                {char}
                <motion.span
                  className="liquid-reflection"
                  initial={{ 
                    opacity: 0.8,
                    scaleY: -0.8,
                  }}
                  animate={isInView ? {
                    opacity: 0,
                    scaleY: -1,
                  } : {}}
                  transition={{
                    delay: delay + 0.3,
                    duration: 0.6,
                  }}
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    width: '100%',
                    height: '100%',
                    display: 'inline-block',
                    transform: 'scaleY(-1)',
                    transformOrigin: 'top',
                    opacity: 0.3,
                    filter: 'blur(2px)',
                    background: 'linear-gradient(to bottom, currentColor, transparent)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                  }}
                >
                  {char}
                </motion.span>
              </motion.span>
            );
          })}
          {wordIndex < words.length - 1 && '\u00A0'}
        </span>
      ))}
    </div>
  );
};