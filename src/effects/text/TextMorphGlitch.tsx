import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TextMorphGlitchProps {
  texts: string[];
  interval?: number;
  glitchIntensity?: number;
  morphDuration?: number;
  className?: string;
  cyberpunk?: boolean;
}

/**
 * Futuristic text morph with glitch transitions
 * Inspired by cyberpunk aesthetics and modern tech sites
 */
export const TextMorphGlitch: React.FC<TextMorphGlitchProps> = ({
  texts,
  interval = 3000,
  glitchIntensity = 5,
  morphDuration = 0.8,
  className = '',
  cyberpunk = true,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % texts.length);
        setIsGlitching(false);
      }, 200);
    }, interval);
    
    return () => clearInterval(timer);
  }, [texts.length, interval]);
  
  const currentText = texts[currentIndex];
  const chars = currentText.split('');
  
  const glitchVariants = {
    hidden: {
      opacity: 0,
      filter: 'blur(10px)',
    },
    visible: (i: number) => ({
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        delay: i * 0.03,
        duration: morphDuration,
        ease: [0.11, 0, 0.5, 0],
      },
    }),
    glitch: {
      x: [0, -glitchIntensity, glitchIntensity, 0],
      y: [0, glitchIntensity, -glitchIntensity, 0],
      filter: [
        'hue-rotate(0deg) brightness(100%)',
        'hue-rotate(90deg) brightness(150%)',
        'hue-rotate(-90deg) brightness(150%)',
        'hue-rotate(0deg) brightness(100%)',
      ],
      transition: {
        duration: 0.2,
        times: [0, 0.33, 0.66, 1],
      },
    },
  };
  
  return (
    <div className={`text-morph-glitch ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className="morph-container"
          initial="hidden"
          animate="visible"
          exit="glitch"
          style={{
            position: 'relative',
            display: 'inline-block',
          }}
        >
          {chars.map((char, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={glitchVariants}
              style={{
                display: 'inline-block',
                position: 'relative',
              }}
            >
              {/* Main character */}
              <span
                style={{
                  display: 'inline-block',
                  position: 'relative',
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
              
              {/* Glitch layers */}
              {cyberpunk && isGlitching && (
                <>
                  <motion.span
                    className="glitch-layer-1"
                    animate={{
                      x: [0, -2, 2, 0],
                      opacity: [0, 1, 1, 0],
                    }}
                    transition={{
                      duration: 0.2,
                      repeat: 2,
                      repeatType: 'mirror',
                    }}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      color: '#ff006e',
                      mixBlendMode: 'screen',
                      opacity: 0.8,
                    }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                  
                  <motion.span
                    className="glitch-layer-2"
                    animate={{
                      x: [0, 2, -2, 0],
                      opacity: [0, 1, 1, 0],
                    }}
                    transition={{
                      duration: 0.2,
                      delay: 0.05,
                      repeat: 2,
                      repeatType: 'mirror',
                    }}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      color: '#00ffff',
                      mixBlendMode: 'screen',
                      opacity: 0.8,
                    }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                  
                  {/* Data corruption effect */}
                  <motion.span
                    className="corruption-layer"
                    animate={{
                      opacity: [0, 1, 0],
                      scaleY: [1, 1.5, 1],
                    }}
                    transition={{
                      duration: 0.1,
                      repeat: 3,
                    }}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      color: '#ffff00',
                      mixBlendMode: 'difference',
                      fontFamily: 'monospace',
                      fontSize: '0.8em',
                    }}
                  >
                    {Math.random() > 0.5 ? '█' : '▓'}
                  </motion.span>
                </>
              )}
              
              {/* Scan line effect */}
              {cyberpunk && (
                <motion.div
                  className="scan-line"
                  animate={{
                    y: [-20, 20],
                    opacity: [0, 0.5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.1,
                    ease: 'linear',
                  }}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: 'linear-gradient(90deg, transparent, #00ffff, transparent)',
                    pointerEvents: 'none',
                  }}
                />
              )}
            </motion.span>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};