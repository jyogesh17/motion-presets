import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

export interface CheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'rounded' | 'neon' | 'elastic' | 'morphing' | 'gradient';
  color?: string;
  label?: string;
  labelPosition?: 'left' | 'right';
  className?: string;
  animation?: 'check' | 'scale' | 'rotate' | 'draw' | 'bounce';
}

const checkmarkVariants: Record<string, Variants> = {
  check: {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      transition: {
        pathLength: { type: 'spring', duration: 0.5, bounce: 0 },
        opacity: { duration: 0.1 }
      }
    }
  },
  scale: {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 500, damping: 30 }
    }
  },
  rotate: {
    hidden: { rotate: -180, opacity: 0 },
    visible: { 
      rotate: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 200, damping: 20 }
    }
  },
  bounce: {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: [0, 1.2, 1], 
      opacity: 1,
      transition: { 
        scale: { times: [0, 0.6, 1], duration: 0.4 },
        opacity: { duration: 0.1 }
      }
    }
  }
};

export const Checkbox: React.FC<CheckboxProps> = ({
  checked = false,
  onChange,
  disabled = false,
  size = 'md',
  variant = 'default',
  color = '#667eea',
  label,
  labelPosition = 'right',
  className = '',
  animation = 'check'
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
    sm: { box: 16, stroke: 2 },
    md: { box: 20, stroke: 2.5 },
    lg: { box: 24, stroke: 3 }
  };

  const currentSize = sizes[size];

  const getVariantStyles = () => {
    switch (variant) {
      case 'rounded':
        return {
          borderRadius: '50%',
          background: isChecked ? color : 'transparent',
          border: `2px solid ${isChecked ? color : '#d1d5db'}`
        };
      case 'neon':
        return {
          background: isChecked ? '#111' : 'transparent',
          border: `2px solid ${isChecked ? color : '#555'}`,
          boxShadow: isChecked 
            ? `0 0 10px ${color}, inset 0 0 5px ${color}40`
            : 'none'
        };
      case 'elastic':
        return {
          background: isChecked ? `${color}10` : 'transparent',
          border: `2px solid ${isChecked ? color : '#d1d5db'}`,
          borderRadius: '4px'
        };
      case 'morphing':
        return {
          background: isChecked 
            ? `linear-gradient(135deg, ${color} 0%, ${adjustColor(color, 20)} 100%)`
            : 'transparent',
          border: `2px solid ${isChecked ? color : '#d1d5db'}`,
          borderRadius: isChecked ? '30% 70% 70% 30% / 30% 30% 70% 70%' : '4px'
        };
      case 'gradient':
        return {
          background: isChecked 
            ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            : 'transparent',
          border: `2px solid ${isChecked ? 'transparent' : '#d1d5db'}`,
          borderRadius: '6px'
        };
      default:
        return {
          background: isChecked ? color : 'transparent',
          border: `2px solid ${isChecked ? color : '#d1d5db'}`,
          borderRadius: '4px'
        };
    }
  };

  const boxStyles = getVariantStyles();

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
        className="relative flex items-center justify-center"
        style={{
          width: currentSize.box,
          height: currentSize.box,
          ...boxStyles
        }}
        animate={{
          scale: variant === 'elastic' && isChecked ? [1, 0.8, 1.1, 1] : 1,
          rotate: variant === 'morphing' && isChecked ? 360 : 0
        }}
        transition={{ 
          type: 'spring', 
          stiffness: 400, 
          damping: 25,
          duration: 0.3
        }}
        whileTap={{ scale: 0.9 }}
      >
        <AnimatePresence mode="wait">
          {isChecked && (
            <>
              {animation === 'draw' ? (
                <motion.svg
                  width={currentSize.box - 4}
                  height={currentSize.box - 4}
                  viewBox="0 0 24 24"
                  fill="none"
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={checkmarkVariants.check}
                >
                  <motion.path
                    d="M5 12L10 17L19 8"
                    stroke={variant === 'gradient' || variant === 'neon' ? '#fff' : color}
                    strokeWidth={currentSize.stroke}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    variants={checkmarkVariants.check}
                  />
                </motion.svg>
              ) : (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={checkmarkVariants[animation] || checkmarkVariants.scale}
                >
                  <svg
                    width={currentSize.box - 4}
                    height={currentSize.box - 4}
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M5 12L10 17L19 8"
                      stroke={variant === 'gradient' || variant === 'neon' ? '#fff' : color}
                      strokeWidth={currentSize.stroke}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.div>
              )}
              
              {variant === 'neon' && (
                <motion.div
                  className="absolute inset-0 rounded"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.5, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                  style={{
                    background: color,
                    filter: 'blur(8px)',
                    pointerEvents: 'none'
                  }}
                />
              )}
            </>
          )}
        </AnimatePresence>
      </motion.div>
      
      {label && labelPosition === 'right' && (
        <span className="select-none">{label}</span>
      )}
    </div>
  );
};

// Animated checkbox group
export const CheckboxGroup: React.FC<{
  options: Array<{ value: string; label: string; disabled?: boolean }>;
  values: string[];
  onChange?: (values: string[]) => void;
  variant?: CheckboxProps['variant'];
  animation?: CheckboxProps['animation'];
  className?: string;
  orientation?: 'horizontal' | 'vertical';
}> = ({
  options,
  values = [],
  onChange,
  variant = 'default',
  animation = 'check',
  className = '',
  orientation = 'vertical'
}) => {
  const handleToggle = (value: string) => {
    const newValues = values.includes(value)
      ? values.filter(v => v !== value)
      : [...values, value];
    onChange?.(newValues);
  };

  return (
    <div 
      className={`
        flex gap-3
        ${orientation === 'vertical' ? 'flex-col' : 'flex-row flex-wrap'}
        ${className}
      `}
    >
      {options.map((option, index) => (
        <motion.div
          key={option.value}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <Checkbox
            checked={values.includes(option.value)}
            onChange={() => handleToggle(option.value)}
            disabled={option.disabled}
            label={option.label}
            variant={variant}
            animation={animation}
          />
        </motion.div>
      ))}
    </div>
  );
};

// Helper function to adjust color brightness
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