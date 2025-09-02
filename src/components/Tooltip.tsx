import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { createPortal } from 'react-dom';

export interface TooltipProps {
  children: React.ReactElement;
  content: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right' | 'auto';
  variant?: 'default' | 'glass' | 'gradient' | 'neon' | 'bubble';
  delay?: number;
  offset?: number;
  interactive?: boolean;
  arrow?: boolean;
  className?: string;
  contentClassName?: string;
  followCursor?: boolean;
  animation?: 'fade' | 'scale' | 'slide' | 'bounce' | 'flip';
}

const tooltipVariants: Record<string, Variants> = {
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  },
  scale: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 }
  },
  slide: {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 }
  },
  bounce: {
    hidden: { opacity: 0, scale: 0.5, y: -20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 500,
        damping: 15
      }
    },
    exit: { opacity: 0, scale: 0.5, y: -20 }
  },
  flip: {
    hidden: { opacity: 0, rotateX: -90 },
    visible: { 
      opacity: 1, 
      rotateX: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20
      }
    },
    exit: { opacity: 0, rotateX: 90 }
  }
};

export const Tooltip: React.FC<TooltipProps> = ({
  children,
  content,
  position = 'top',
  variant = 'default',
  delay = 0,
  offset = 8,
  interactive = false,
  arrow = true,
  className = '',
  contentClassName = '',
  followCursor = false,
  animation = 'scale'
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [actualPosition, setActualPosition] = useState(position);
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  const calculatePosition = () => {
    if (!triggerRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipWidth = 200; // Estimated width
    const tooltipHeight = 40; // Estimated height
    let x = 0;
    let y = 0;
    let finalPosition = position;

    if (followCursor) {
      x = cursorPos.x + offset;
      y = cursorPos.y - tooltipHeight - offset;
    } else {
      if (position === 'auto') {
        // Auto positioning logic
        const spaceTop = triggerRect.top;
        const spaceBottom = window.innerHeight - triggerRect.bottom;
        const spaceRight = window.innerWidth - triggerRect.right;

        if (spaceTop > tooltipHeight + offset) {
          finalPosition = 'top';
        } else if (spaceBottom > tooltipHeight + offset) {
          finalPosition = 'bottom';
        } else if (spaceRight > tooltipWidth + offset) {
          finalPosition = 'right';
        } else {
          finalPosition = 'left';
        }
      } else {
        finalPosition = position;
      }

      switch (finalPosition) {
        case 'top':
          x = triggerRect.left + triggerRect.width / 2;
          y = triggerRect.top - offset;
          break;
        case 'bottom':
          x = triggerRect.left + triggerRect.width / 2;
          y = triggerRect.bottom + offset;
          break;
        case 'left':
          x = triggerRect.left - offset;
          y = triggerRect.top + triggerRect.height / 2;
          break;
        case 'right':
          x = triggerRect.right + offset;
          y = triggerRect.top + triggerRect.height / 2;
          break;
      }
    }

    setActualPosition(finalPosition);
    setTooltipPosition({ x, y });
  };

  const handleMouseEnter = () => {
    if (delay > 0) {
      timeoutRef.current = setTimeout(() => {
        setIsVisible(true);
        calculatePosition();
      }, delay);
    } else {
      setIsVisible(true);
      calculatePosition();
    }
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (!interactive) {
      setIsVisible(false);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (followCursor) {
      setCursorPos({ x: e.clientX, y: e.clientY });
      calculatePosition();
    }
  };

  useEffect(() => {
    if (isVisible) {
      calculatePosition();
    }
  }, [cursorPos, isVisible]);

  const getVariantStyles = () => {
    switch (variant) {
      case 'glass':
        return {
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          color: 'white'
        };
      case 'gradient':
        return {
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white'
        };
      case 'neon':
        return {
          background: '#111',
          border: '1px solid #667eea',
          color: '#667eea',
          boxShadow: '0 0 20px #667eea40, inset 0 0 10px #667eea20',
          textShadow: '0 0 5px currentColor'
        };
      case 'bubble':
        return {
          background: 'white',
          border: '2px solid #e2e8f0',
          color: '#333',
          borderRadius: '20px',
          padding: '8px 16px'
        };
      default:
        return {
          background: '#333',
          color: 'white'
        };
    }
  };

  const getArrowStyles = () => {
    const baseArrow = {
      position: 'absolute' as const,
      width: 0,
      height: 0,
      borderStyle: 'solid',
      borderColor: 'transparent'
    };

    const variantColor = variant === 'gradient' 
      ? '#667eea' 
      : variant === 'neon'
      ? '#667eea'
      : variant === 'bubble'
      ? '#e2e8f0'
      : variant === 'glass'
      ? 'rgba(255, 255, 255, 0.2)'
      : '#333';

    switch (actualPosition) {
      case 'top':
        return {
          ...baseArrow,
          bottom: '-8px',
          left: '50%',
          transform: 'translateX(-50%)',
          borderWidth: '8px 8px 0 8px',
          borderTopColor: variantColor
        };
      case 'bottom':
        return {
          ...baseArrow,
          top: '-8px',
          left: '50%',
          transform: 'translateX(-50%)',
          borderWidth: '0 8px 8px 8px',
          borderBottomColor: variantColor
        };
      case 'left':
        return {
          ...baseArrow,
          right: '-8px',
          top: '50%',
          transform: 'translateY(-50%)',
          borderWidth: '8px 0 8px 8px',
          borderLeftColor: variantColor
        };
      case 'right':
        return {
          ...baseArrow,
          left: '-8px',
          top: '50%',
          transform: 'translateY(-50%)',
          borderWidth: '8px 8px 8px 0',
          borderRightColor: variantColor
        };
      default:
        return baseArrow;
    }
  };

  const tooltipContent = (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={tooltipRef}
          className={`fixed z-50 pointer-events-none ${contentClassName}`}
          style={{
            left: tooltipPosition.x,
            top: tooltipPosition.y,
            transform: actualPosition === 'top' ? 'translate(-50%, -100%)'
              : actualPosition === 'bottom' ? 'translate(-50%, 0)'
              : actualPosition === 'left' ? 'translate(-100%, -50%)'
              : actualPosition === 'right' ? 'translate(0, -50%)'
              : 'none',
            ...getVariantStyles()
          }}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={tooltipVariants[animation]}
          transition={{ duration: 0.2 }}
          onMouseEnter={() => interactive && setIsVisible(true)}
          onMouseLeave={() => interactive && setIsVisible(false)}
        >
          <div className="relative px-3 py-2 text-sm rounded-lg whitespace-nowrap">
            {content}
            {arrow && <div style={getArrowStyles()} />}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <div
        ref={triggerRef}
        className={`inline-block ${className}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      >
        {children}
      </div>
      {typeof document !== 'undefined' && createPortal(tooltipContent, document.body)}
    </>
  );
};