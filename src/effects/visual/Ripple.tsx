import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RippleItem {
  id: number;
  x: number;
  y: number;
  size: number;
  color?: string;
}

interface RippleProps {
  color?: string;
  duration?: number;
  size?: 'small' | 'medium' | 'large' | 'full';
  gradient?: boolean;
  multiple?: boolean;
  blur?: boolean;
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  rippleCount?: number;
  onRipple?: (x: number, y: number) => void;
}

/**
 * Material Design inspired ripple effect with enhancements
 * Creates beautiful touch/click feedback
 */
export const Ripple: React.FC<RippleProps> = ({
  color = 'rgba(255, 255, 255, 0.5)',
  duration = 1,
  gradient = false,
  multiple = true,
  blur = false,
  className = '',
  children,
  disabled = false,
  rippleCount = 1,
  onRipple,
}) => {
  const [ripples, setRipples] = useState<RippleItem[]>([]);


  const addRipple = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const rippleSize = Math.max(rect.width, rect.height) * 2;
    
    const newRipples: RippleItem[] = [];
    
    for (let i = 0; i < rippleCount; i++) {
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      
      // Add offset for multiple ripples
      const offsetX = rippleCount > 1 ? (Math.random() - 0.5) * 20 : 0;
      const offsetY = rippleCount > 1 ? (Math.random() - 0.5) * 20 : 0;
      
      newRipples.push({
        id: Date.now() + i,
        x: x + offsetX,
        y: y + offsetY,
        size: rippleSize,
        color: gradient 
          ? `radial-gradient(circle, ${color} 0%, transparent 70%)`
          : color,
      });
    }

    if (multiple) {
      setRipples(prev => [...prev, ...newRipples]);
    } else {
      setRipples(newRipples);
    }

    if (onRipple) {
      onRipple(event.clientX - rect.left, event.clientY - rect.top);
    }

    // Clean up after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(r => !newRipples.find(nr => nr.id === r.id)));
    }, duration * 1000);
  }, [disabled, rippleCount, gradient, color, multiple, duration, onRipple]);

  const getRippleStyle = (ripple: RippleItem) => ({
    position: 'absolute' as const,
    left: ripple.x - ripple.size / 2,
    top: ripple.y - ripple.size / 2,
    width: ripple.size,
    height: ripple.size,
    borderRadius: '50%',
    background: ripple.color || color,
    pointerEvents: 'none' as const,
    filter: blur ? 'blur(4px)' : 'none',
    zIndex: 10,
  });

  return (
    <div
      className={`ripple-container ${className}`}
      onClick={addRipple}
      style={{
        position: 'relative',
        overflow: 'hidden',
        cursor: disabled ? 'default' : 'pointer',
        width: '100%',
        height: '100%',
        display: 'inline-block',
      }}
    >
      {children}
      
      <div style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        borderRadius: 'inherit',
        pointerEvents: 'none',
      }}>
        <AnimatePresence>
          {ripples.map((ripple) => (
            <motion.span
              key={ripple.id}
              initial={{
                scale: 0,
                opacity: 1,
              }}
              animate={{
                scale: 4,
                opacity: 0,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                duration,
                ease: 'easeOut',
              }}
              style={getRippleStyle(ripple)}
          >
            {/* Inner ripple for double effect */}
            {rippleCount > 1 && (
              <motion.span
                initial={{
                  scale: 0,
                  opacity: 0.8,
                }}
                animate={{
                  scale: 2,
                  opacity: 0,
                }}
                transition={{
                  duration: duration * 0.7,
                  ease: 'easeOut',
                  delay: 0.1,
                }}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: '100%',
                  height: '100%',
                  transform: 'translate(-50%, -50%)',
                  borderRadius: '50%',
                  background: gradient 
                    ? `radial-gradient(circle, ${color} 0%, transparent 50%)`
                    : color,
                }}
              />
            )}
          </motion.span>
        ))}
      </AnimatePresence>
      </div>

      {/* Hover effect overlay */}
      <motion.div
        className="ripple-hover-overlay"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: disabled ? 0 : 0.1 }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'absolute',
          inset: 0,
          background: color,
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};

/**
 * Advanced ripple button component
 */
export const RippleButton: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  className?: string;
}> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'medium',
  className = '',
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
        };
      case 'secondary':
        return {
          background: 'white',
          color: '#667eea',
          border: '2px solid #667eea',
        };
      case 'ghost':
        return {
          background: 'transparent',
          color: '#667eea',
        };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return { padding: '0.5rem 1rem', fontSize: '0.875rem' };
      case 'medium':
        return { padding: '0.75rem 1.5rem', fontSize: '1rem' };
      case 'large':
        return { padding: '1rem 2rem', fontSize: '1.125rem' };
    }
  };

  return (
    <motion.button
      className={`ripple-button ${className}`}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{
        position: 'relative',
        overflow: 'hidden',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: 600,
        transition: 'all 0.3s',
        ...getVariantStyles(),
        ...getSizeStyles(),
      }}
    >
      <Ripple
        color={variant === 'primary' ? 'rgba(255,255,255,0.3)' : 'rgba(102,126,234,0.3)'}
        gradient
        multiple
      >
        {children}
      </Ripple>
    </motion.button>
  );
};