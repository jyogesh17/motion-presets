import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface SwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'ios' | 'material' | 'neon' | 'blob';
  color?: string;
  className?: string;
  label?: string;
  labelPosition?: 'left' | 'right';
}

export const Switch: React.FC<SwitchProps> = ({
  checked = false,
  onChange,
  disabled = false,
  size = 'md',
  variant = 'default',
  color = '#667eea',
  className = '',
  label,
  labelPosition = 'right'
}) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleToggle = () => {
    if (!disabled) {
      const newValue = !isChecked;
      setIsChecked(newValue);
      onChange?.(newValue);
    }
  };

  const sizes = {
    sm: { width: 36, height: 20, thumb: 16 },
    md: { width: 48, height: 26, thumb: 22 },
    lg: { width: 60, height: 32, thumb: 28 }
  };

  const currentSize = sizes[size];

  const variants = {
    default: {
      track: {
        backgroundColor: isChecked ? color : '#e2e8f0',
        transition: { duration: 0.3, ease: 'easeInOut' }
      },
      thumb: {
        x: isChecked ? currentSize.width - currentSize.thumb - 2 : 2,
        transition: { type: 'spring', stiffness: 500, damping: 30 }
      }
    },
    ios: {
      track: {
        backgroundColor: isChecked ? color : '#e2e8f0',
        scale: isChecked ? 1 : 0.95,
        transition: { duration: 0.3, ease: 'easeInOut' }
      },
      thumb: {
        x: isChecked ? currentSize.width - currentSize.thumb - 2 : 2,
        scale: isChecked ? 1.1 : 1,
        transition: { type: 'spring', stiffness: 700, damping: 25 }
      }
    },
    material: {
      track: {
        backgroundColor: isChecked ? `${color}40` : '#00000020',
        transition: { duration: 0.2 }
      },
      thumb: {
        x: isChecked ? currentSize.width - currentSize.thumb - 4 : 4,
        backgroundColor: isChecked ? color : '#ffffff',
        boxShadow: isChecked 
          ? '0 2px 8px rgba(0,0,0,0.3)' 
          : '0 2px 4px rgba(0,0,0,0.2)',
        transition: { type: 'spring', stiffness: 400, damping: 25 }
      }
    },
    neon: {
      track: {
        backgroundColor: isChecked ? '#111' : '#333',
        border: `2px solid ${isChecked ? color : '#555'}`,
        boxShadow: isChecked 
          ? `0 0 20px ${color}, inset 0 0 10px ${color}40`
          : 'none',
        transition: { duration: 0.4, ease: 'easeInOut' }
      },
      thumb: {
        x: isChecked ? currentSize.width - currentSize.thumb - 4 : 4,
        backgroundColor: isChecked ? color : '#666',
        boxShadow: isChecked 
          ? `0 0 15px ${color}, 0 0 30px ${color}80`
          : '0 0 5px rgba(0,0,0,0.3)',
        transition: { type: 'spring', stiffness: 300, damping: 20 }
      }
    },
    blob: {
      track: {
        backgroundColor: isChecked ? `${color}20` : '#f0f0f0',
        transition: { duration: 0.5, ease: 'easeInOut' }
      },
      thumb: {
        x: isChecked ? currentSize.width - currentSize.thumb - 3 : 3,
        backgroundColor: isChecked ? color : '#999',
        borderRadius: isChecked ? '30% 70% 70% 30% / 30% 30% 70% 70%' : '50%',
        rotate: isChecked ? 360 : 0,
        scale: isChecked ? [1, 1.2, 1] : 1,
        transition: { 
          type: 'spring', 
          stiffness: 260, 
          damping: 20,
          borderRadius: { duration: 0.6 }
        }
      }
    }
  };

  const currentVariant = variants[variant];

  return (
    <div 
      className={`inline-flex items-center gap-2 ${className}`}
      onClick={handleToggle}
      style={{ 
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1
      }}
    >
      {label && labelPosition === 'left' && (
        <span className="select-none">{label}</span>
      )}
      
      <motion.div
        className="relative"
        style={{
          width: currentSize.width,
          height: currentSize.height,
          borderRadius: currentSize.height / 2
        }}
        animate={currentVariant.track}
      >
        <motion.div
          className="absolute top-1/2 -translate-y-1/2"
          style={{
            width: currentSize.thumb,
            height: currentSize.thumb,
            borderRadius: variant === 'blob' && isChecked 
              ? '30% 70% 70% 30% / 30% 30% 70% 70%' 
              : '50%',
            backgroundColor: variant === 'material' 
              ? (isChecked ? color : '#ffffff')
              : '#ffffff'
          }}
          animate={currentVariant.thumb}
        />
        
        {variant === 'neon' && isChecked && (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: [0.5, 0], scale: [1, 1.5] }}
              transition={{ duration: 0.6, repeat: Infinity }}
              className="absolute"
              style={{
                width: currentSize.thumb,
                height: currentSize.thumb,
                borderRadius: '50%',
                backgroundColor: color,
                left: currentSize.width - currentSize.thumb - 4,
                top: '50%',
                transform: 'translateY(-50%)',
                pointerEvents: 'none'
              }}
            />
          </AnimatePresence>
        )}
      </motion.div>
      
      {label && labelPosition === 'right' && (
        <span className="select-none">{label}</span>
      )}
    </div>
  );
};