import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useSpring, useTransform, useMotionValue, animate } from 'framer-motion';

export interface CounterProps {
  value: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  separator?: string;
  variant?: 'roll' | 'slide' | 'flip' | 'scale' | 'typewriter' | 'slot-machine' | 'smooth' | 'bounce';
  className?: string;
  formatNumber?: (value: number) => string;
  springConfig?: {
    stiffness?: number;
    damping?: number;
    mass?: number;
  };
}

const defaultSpringConfig = { stiffness: 60, damping: 15, mass: 1 };

export const Counter: React.FC<CounterProps> = ({
  value,
  duration = 1.5,
  decimals = 0,
  prefix = '',
  suffix = '',
  separator = ',',
  variant = 'smooth',
  className = '',
  formatNumber,
  springConfig = defaultSpringConfig
}) => {
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, springConfig);
  const prevValueRef = useRef(0);
  
  const display = useTransform(springValue, (latest) => {
    const formatted = formatNumber 
      ? formatNumber(latest)
      : latest.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    return `${prefix}${formatted}${suffix}`;
  });

  useEffect(() => {
    const controls = animate(motionValue, value, {
      duration: variant === 'smooth' ? duration : duration * 0.8,
      ease: variant === 'bounce' ? [0.68, -0.55, 0.265, 1.55] : [0.25, 0.46, 0.45, 0.94]
    });
    
    prevValueRef.current = value;
    return controls.stop;
  }, [value, motionValue, duration, variant]);

  const renderDigits = (num: number) => {
    const str = Math.abs(Math.round(num)).toString();
    return str.split('').map((digit, index) => (
      <AnimatePresence key={index} mode="wait">
        <motion.span
          key={`${digit}-${index}-${num}`}
          initial={getVariantAnimation(variant).initial}
          animate={getVariantAnimation(variant).animate}
          exit={getVariantAnimation(variant).exit}
          transition={{ duration: duration / str.length, delay: index * 0.05 }}
          style={{ display: 'inline-block' }}
        >
          {digit}
        </motion.span>
      </AnimatePresence>
    ));
  };

  const getVariantAnimation = (type: string) => {
    switch (type) {
      case 'slide':
        return {
          initial: { y: 30, opacity: 0 },
          animate: { 
            y: 0, 
            opacity: 1,
            transition: {
              type: 'spring',
              stiffness: 200,
              damping: 20,
              mass: 0.8
            }
          },
          exit: { y: -30, opacity: 0 }
        };
      case 'flip':
        return {
          initial: { rotateX: 90, opacity: 0, scale: 0.8 },
          animate: { 
            rotateX: 0, 
            opacity: 1,
            scale: 1,
            transition: {
              type: 'spring',
              stiffness: 260,
              damping: 25
            }
          },
          exit: { rotateX: -90, opacity: 0, scale: 0.8 }
        };
      case 'scale':
        return {
          initial: { scale: 0, opacity: 0 },
          animate: { 
            scale: 1, 
            opacity: 1,
            transition: {
              type: 'spring',
              stiffness: 400,
              damping: 30,
              mass: 0.4
            }
          },
          exit: { scale: 0, opacity: 0 }
        };
      case 'typewriter':
        return {
          initial: { width: 0, opacity: 0 },
          animate: { 
            width: 'auto', 
            opacity: 1,
            transition: {
              width: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
              opacity: { duration: 0.2 }
            }
          },
          exit: { width: 0, opacity: 0 }
        };
      case 'slot-machine':
        return {
          initial: { y: -40, opacity: 0, filter: 'blur(8px)', scale: 0.95 },
          animate: { 
            y: 0, 
            opacity: 1, 
            filter: 'blur(0px)',
            scale: 1,
            transition: {
              type: 'spring',
              stiffness: 120,
              damping: 18,
              mass: 0.8
            }
          },
          exit: { y: 40, opacity: 0, filter: 'blur(8px)', scale: 0.95 }
        };
      case 'bounce':
        return {
          initial: { y: -50, opacity: 0, scale: 1.2 },
          animate: { 
            y: 0, 
            opacity: 1,
            scale: 1,
            transition: {
              y: {
                type: 'spring',
                stiffness: 500,
                damping: 15,
                mass: 0.5
              },
              scale: {
                type: 'spring',
                stiffness: 300,
                damping: 10
              }
            }
          },
          exit: { y: 50, opacity: 0, scale: 0.8 }
        };
      default: // roll
        return {
          initial: { rotateY: 90, opacity: 0, scale: 0.9 },
          animate: { 
            rotateY: 0, 
            opacity: 1,
            scale: 1,
            transition: {
              type: 'spring',
              stiffness: 200,
              damping: 25
            }
          },
          exit: { rotateY: -90, opacity: 0, scale: 0.9 }
        };
    }
  };

  if (variant === 'smooth' || variant === 'bounce') {
    return (
      <motion.span 
        className={className}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          type: 'spring', 
          stiffness: 300, 
          damping: 25,
          mass: 0.5
        }}
      >
        {display}
      </motion.span>
    );
  }

  if (variant === 'roll') {
    return (
      <motion.span className={className}>
        {display}
      </motion.span>
    );
  }

  return (
    <span className={className}>
      {prefix}
      {renderDigits(value)}
      {suffix}
    </span>
  );
};

// Advanced Counter with odometer-style animation
export const OdometerCounter: React.FC<CounterProps> = ({
  value,
  decimals = 0,
  className = '',
  prefix = '',
  suffix = ''
}) => {
  const [digits, setDigits] = useState<string[]>([]);
  const prevDigitsRef = useRef<string[]>([]);
  
  useEffect(() => {
    const formatted = value.toFixed(decimals);
    const newDigits = formatted.split('');
    prevDigitsRef.current = digits;
    setDigits(newDigits);
  }, [value, decimals]);

  return (
    <div 
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        fontFamily: 'monospace',
        fontSize: 'inherit',
        fontWeight: 'bold'
      }}
    >
      {prefix && (
        <span style={{ marginRight: '0.25em' }}>{prefix}</span>
      )}
      <div style={{ 
        display: 'inline-flex',
        position: 'relative'
      }}>
        {digits.map((digit, index) => (
          <div 
            key={index} 
            style={{ 
              position: 'relative',
              overflow: 'hidden',
              height: '1.5em',
              width: digit === '.' ? '0.3em' : '0.8em',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <AnimatePresence mode="popLayout">
              <motion.div
                key={`${digit}-${value}-${index}`}
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: index % 2 === 0 
                    ? 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0) 100%)'
                    : 'transparent'
                }}
                initial={{ 
                  y: prevDigitsRef.current[index] > digit ? '-100%' : '100%',
                  opacity: 0
                }}
                animate={{ 
                  y: 0,
                  opacity: 1
                }}
                exit={{ 
                  y: prevDigitsRef.current[index] > digit ? '100%' : '-100%',
                  opacity: 0
                }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 30,
                  mass: 0.8,
                  delay: index * 0.03
                }}
              >
                <span style={{
                  display: 'block',
                  lineHeight: 1,
                  transform: 'translateZ(0)'
                }}>
                  {digit}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>
        ))}
      </div>
      {suffix && (
        <span style={{ marginLeft: '0.25em' }}>{suffix}</span>
      )}
    </div>
  );
};

// Morphing number counter with liquid animation
export const MorphCounter: React.FC<CounterProps> = ({
  value,
  className = '',
  prefix = '',
  suffix = ''
}) => {
  const [displayValue, setDisplayValue] = useState(value);
  const motionValue = useMotionValue(value);
  
  useEffect(() => {
    const controls = animate(motionValue, value, {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
      onUpdate: (latest) => {
        setDisplayValue(Math.round(latest));
      }
    });
    
    return controls.stop;
  }, [value, motionValue]);

  return (
    <motion.div 
      className={className}
      initial={{ 
        filter: 'blur(20px) saturate(200%)',
        opacity: 0,
        scale: 0.3,
        rotateZ: -5
      }}
      animate={{ 
        filter: 'blur(0px) saturate(100%)',
        opacity: 1,
        scale: 1,
        rotateZ: 0
      }}
      transition={{
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1]
      }}
      style={{
        position: 'relative',
        display: 'inline-block'
      }}
    >
      <motion.span
        key={displayValue}
        initial={{ 
          opacity: 0,
          y: 20,
          filter: 'blur(10px)'
        }}
        animate={{ 
          opacity: 1,
          y: 0,
          filter: 'blur(0px)'
        }}
        exit={{ 
          opacity: 0,
          y: -20,
          filter: 'blur(10px)'
        }}
        transition={{
          duration: 0.5,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: 'bold',
          display: 'inline-block',
          fontSize: 'inherit'
        }}
      >
        {prefix}{displayValue}{suffix}
      </motion.span>
    </motion.div>
  );
};