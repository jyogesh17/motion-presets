import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';

export interface SliderProps {
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  onChange?: (value: number) => void;
  variant?: 'default' | 'gradient' | 'neon' | 'glass' | 'minimal' | 'rounded';
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  formatValue?: (value: number) => string;
  marks?: Array<{ value: number; label?: string }>;
  disabled?: boolean;
  className?: string;
  color?: string;
  animation?: 'smooth' | 'spring' | 'magnetic';
}

export const Slider: React.FC<SliderProps> = ({
  min = 0,
  max = 100,
  step = 1,
  value = 0,
  onChange,
  variant = 'default',
  size = 'md',
  showValue = false,
  formatValue,
  marks,
  disabled = false,
  className = '',
  color = '#667eea',
  animation = 'smooth'
}) => {
  const [currentValue, setCurrentValue] = useState(value);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  
  const sizes = {
    sm: { height: 4, thumbSize: 16 },
    md: { height: 6, thumbSize: 20 },
    lg: { height: 8, thumbSize: 24 }
  };

  const currentSize = sizes[size];
  const percentage = ((currentValue - min) / (max - min)) * 100;

  const handleDrag = () => {
    if (!sliderRef.current || disabled) return;
    
    const rect = sliderRef.current.getBoundingClientRect();
    const newX = Math.max(0, Math.min(x.get(), rect.width));
    const newValue = Math.round((newX / rect.width) * (max - min) / step) * step + min;
    
    if (newValue !== currentValue) {
      setCurrentValue(newValue);
      onChange?.(newValue);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    if (!sliderRef.current || disabled || isDragging) return;
    
    const rect = sliderRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newValue = Math.round((clickX / rect.width) * (max - min) / step) * step + min;
    
    setCurrentValue(newValue);
    onChange?.(newValue);
    
    // Animate thumb to new position
    const newX = ((newValue - min) / (max - min)) * rect.width;
    animate(x, newX, {
      type: animation === 'spring' ? 'spring' : 'tween',
      stiffness: 400,
      damping: 30
    });
  };

  useEffect(() => {
    if (sliderRef.current) {
      const newX = ((currentValue - min) / (max - min)) * sliderRef.current.getBoundingClientRect().width;
      x.set(newX);
    }
  }, [currentValue, min, max, x]);

  const getVariantStyles = () => {
    switch (variant) {
      case 'gradient':
        return {
          track: {
            background: 'linear-gradient(to right, #e2e8f0, ' + color + ')',
            borderRadius: currentSize.height / 2
          },
          fill: {
            background: `linear-gradient(to right, ${color}, ${adjustColor(color, 30)})`,
            borderRadius: currentSize.height / 2
          },
          thumb: {
            background: 'white',
            border: `2px solid ${color}`,
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
          }
        };
      case 'neon':
        return {
          track: {
            background: '#222',
            borderRadius: currentSize.height / 2,
            border: '1px solid #444'
          },
          fill: {
            background: color,
            borderRadius: currentSize.height / 2,
            boxShadow: `0 0 10px ${color}40`
          },
          thumb: {
            background: color,
            boxShadow: `0 0 15px ${color}, 0 0 30px ${color}80`,
            border: 'none'
          }
        };
      case 'glass':
        return {
          track: {
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: currentSize.height / 2,
            border: '1px solid rgba(255, 255, 255, 0.2)'
          },
          fill: {
            background: 'rgba(255, 255, 255, 0.3)',
            borderRadius: currentSize.height / 2
          },
          thumb: {
            background: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.3)'
          }
        };
      case 'minimal':
        return {
          track: {
            background: '#f0f0f0',
            borderRadius: 0
          },
          fill: {
            background: color,
            borderRadius: 0
          },
          thumb: {
            background: color,
            borderRadius: '2px'
          }
        };
      case 'rounded':
        return {
          track: {
            background: '#e2e8f0',
            borderRadius: '999px'
          },
          fill: {
            background: color,
            borderRadius: '999px'
          },
          thumb: {
            background: 'white',
            border: `3px solid ${color}`,
            borderRadius: '50%'
          }
        };
      default:
        return {
          track: {
            background: '#e2e8f0',
            borderRadius: currentSize.height / 2
          },
          fill: {
            background: color,
            borderRadius: currentSize.height / 2
          },
          thumb: {
            background: 'white',
            border: `2px solid ${color}`,
            borderRadius: '50%'
          }
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <div className={className} style={{ position: 'relative' }}>
      {showValue && (
        <div style={{ 
          marginBottom: '8px', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center' 
        }}>
          <span style={{ fontSize: '14px', color: '#6b7280' }}>
            {formatValue ? formatValue(currentValue) : currentValue}
          </span>
        </div>
      )}
      
      <div
        ref={sliderRef}
        style={{
          position: 'relative',
          cursor: 'pointer',
          height: currentSize.height,
          opacity: disabled ? 0.5 : 1,
          ...styles.track
        }}
        onClick={handleClick}
      >
        {/* Progress fill */}
        <motion.div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            height: '100%',
            width: `${percentage}%`,
            ...styles.fill
          }}
          animate={{
            width: `${percentage}%`
          }}
          transition={{
            type: animation === 'spring' ? 'spring' : 'tween',
            stiffness: 400,
            damping: 30
          }}
        />
        
        {/* Marks */}
        {marks && marks.map((mark) => {
          const markPercentage = ((mark.value - min) / (max - min)) * 100;
          return (
            <div
              key={mark.value}
              style={{
                position: 'absolute',
                top: '50%',
                left: `${markPercentage}%`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              <div 
                style={{
                  width: currentSize.height / 2,
                  height: currentSize.height / 2,
                  borderRadius: '50%',
                  background: '#9ca3af'
                }}
              />
              {mark.label && (
                <span style={{
                  position: 'absolute',
                  top: '100%',
                  marginTop: '4px',
                  fontSize: '12px',
                  color: '#6b7280',
                  whiteSpace: 'nowrap'
                }}>
                  {mark.label}
                </span>
              )}
            </div>
          );
        })}
        
        {/* Draggable thumb */}
        <motion.div
          style={{
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            cursor: isDragging ? 'grabbing' : 'grab',
            width: currentSize.thumbSize,
            height: currentSize.thumbSize,
            x,
            borderRadius: '50%',
            ...styles.thumb
          }}
          drag="x"
          dragConstraints={sliderRef}
          dragElastic={0}
          dragMomentum={false}
          onDrag={handleDrag}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            scale: isDragging ? 1.15 : 1
          }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 25
          }}
        >
          {variant === 'neon' && isDragging && (
            <motion.div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: '50%',
                background: color,
                filter: 'blur(8px)'
              }}
              animate={{
                opacity: [0.5, 0],
                scale: [1, 1.5]
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity
              }}
            />
          )}
        </motion.div>
      </div>
    </div>
  );
};

// Range slider with two handles
export const RangeSlider: React.FC<SliderProps & {
  minValue?: number;
  maxValue?: number;
  onRangeChange?: (min: number, max: number) => void;
}> = ({
  min = 0,
  max = 100,
  minValue = 25,
  maxValue = 75,
  onRangeChange,
  ...props
}) => {
  const [range, setRange] = useState({ min: minValue, max: maxValue });
  
  const handleMinChange = (value: number) => {
    const newRange = { ...range, min: Math.min(value, range.max - 1) };
    setRange(newRange);
    onRangeChange?.(newRange.min, newRange.max);
  };
  
  const handleMaxChange = (value: number) => {
    const newRange = { ...range, max: Math.max(value, range.min + 1) };
    setRange(newRange);
    onRangeChange?.(newRange.min, newRange.max);
  };

  return (
    <div className="relative">
      <Slider {...props} value={range.min} onChange={handleMinChange} />
      <Slider {...props} value={range.max} onChange={handleMaxChange} />
      <div className="mt-2 flex justify-between text-sm text-gray-600">
        <span>{range.min}</span>
        <span>{range.max}</span>
      </div>
    </div>
  );
};

// Helper function
function adjustColor(color: string, percent: number): string {
  const num = parseInt(color.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = (num >> 8 & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;
  return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
    (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
    (B < 255 ? B < 1 ? 0 : B : 255))
    .toString(16).slice(1);
}