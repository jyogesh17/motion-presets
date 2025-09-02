import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface ToggleOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

export interface ToggleProps {
  options: ToggleOption[];
  value?: string;
  onChange?: (value: string) => void;
  variant?: 'default' | 'pills' | 'underline' | 'gradient' | 'neon' | 'glass' | 'elastic' | 'magnetic';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
  animation?: 'slide' | 'morph' | 'fade' | 'spring' | 'elastic' | 'smooth';
}

export const Toggle: React.FC<ToggleProps> = ({
  options,
  value,
  onChange,
  variant = 'default',
  size = 'md',
  className = '',
  disabled = false,
  animation = 'slide'
}) => {
  const [selectedValue, setSelectedValue] = useState(value || options[0]?.value);
  const selectedIndex = options.findIndex(opt => opt.value === selectedValue);

  const handleSelect = (optionValue: string) => {
    if (!disabled) {
      setSelectedValue(optionValue);
      onChange?.(optionValue);
    }
  };

  const sizes = {
    sm: { height: 32, fontSize: 14, padding: '6px 12px' },
    md: { height: 40, fontSize: 16, padding: '8px 16px' },
    lg: { height: 48, fontSize: 18, padding: '10px 20px' }
  };

  const currentSize = sizes[size];

  const getVariantStyles = () => {
    switch (variant) {
      case 'pills':
        return {
          containerStyle: {
            background: '#f3f4f6',
            borderRadius: '9999px',
            padding: '4px'
          },
          optionStyle: {
            borderRadius: '9999px',
            transition: 'all 0.3s ease',
            color: '#374151'
          },
          selectedStyle: {
            color: '#111827',
            fontWeight: '600'
          },
          indicatorStyle: {
            background: 'white',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            borderRadius: '9999px'
          }
        };
      case 'underline':
        return {
          containerStyle: {
            borderBottom: '2px solid #e5e7eb',
            padding: '4px'
          },
          optionStyle: {
            paddingBottom: '8px',
            transition: 'all 0.3s ease',
            color: '#6b7280'
          },
          selectedStyle: {
            color: '#2563eb',
            fontWeight: '600'
          },
          indicatorStyle: {
            height: '2px',
            background: '#2563eb',
            borderRadius: '2px'
          }
        };
      case 'gradient':
        return {
          containerStyle: {
            background: '#f3f4f6',
            borderRadius: '8px',
            padding: '4px'
          },
          optionStyle: {
            borderRadius: '6px',
            transition: 'all 0.3s ease',
            color: '#374151'
          },
          selectedStyle: {
            color: 'white',
            fontWeight: '600'
          },
          indicatorStyle: {
            background: 'linear-gradient(to right, #8b5cf6, #ec4899, #ef4444)',
            borderRadius: '6px',
            boxShadow: '0 10px 15px -3px rgba(139, 92, 246, 0.3)'
          }
        };
      case 'neon':
        return {
          containerStyle: {
            background: '#111827',
            borderRadius: '8px',
            padding: '4px',
            border: '1px solid #374151'
          },
          optionStyle: {
            borderRadius: '6px',
            transition: 'all 0.3s ease',
            color: '#9ca3af'
          },
          selectedStyle: {
            color: '#06b6d4',
            fontWeight: '600'
          },
          indicatorStyle: {
            background: '#1f2937',
            border: '1px solid #06b6d4',
            borderRadius: '6px',
            boxShadow: '0 0 20px rgba(6, 182, 212, 0.5)'
          }
        };
      case 'glass':
        return {
          containerStyle: {
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(12px)',
            borderRadius: '8px',
            padding: '4px',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          },
          optionStyle: {
            borderRadius: '6px',
            transition: 'all 0.3s ease',
            color: 'rgba(255, 255, 255, 0.9)'
          },
          selectedStyle: {
            color: 'white',
            fontWeight: '600'
          },
          indicatorStyle: {
            background: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(8px)',
            borderRadius: '6px',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
          }
        };
      case 'elastic':
        return {
          containerStyle: {
            background: 'linear-gradient(to bottom right, #fafafa, #f3f4f6)',
            borderRadius: '16px',
            padding: '6px',
            boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)'
          },
          optionStyle: {
            borderRadius: '12px',
            transition: 'all 0.3s ease',
            color: '#4b5563'
          },
          selectedStyle: {
            color: 'white',
            fontWeight: '600'
          },
          indicatorStyle: {
            background: 'linear-gradient(to bottom right, #3b82f6, #8b5cf6)',
            borderRadius: '12px',
            boxShadow: '0 20px 25px -5px rgba(59, 130, 246, 0.4)'
          }
        };
      case 'magnetic':
        return {
          containerStyle: {
            background: '#000000',
            borderRadius: '16px',
            padding: '4px',
            border: '1px solid #374151'
          },
          optionStyle: {
            borderRadius: '12px',
            transition: 'all 0.3s ease',
            color: '#6b7280'
          },
          selectedStyle: {
            color: 'white',
            fontWeight: '700'
          },
          indicatorStyle: {
            background: 'linear-gradient(to bottom right, #ef4444, #f97316, #eab308)',
            borderRadius: '12px',
            boxShadow: '0 20px 25px -5px rgba(239, 68, 68, 0.5)'
          }
        };
      default:
        return {
          containerStyle: {
            background: '#e5e7eb',
            borderRadius: '8px',
            padding: '4px'
          },
          optionStyle: {
            borderRadius: '6px',
            transition: 'all 0.3s ease',
            color: '#4b5563'
          },
          selectedStyle: {
            color: 'white',
            fontWeight: '500'
          },
          indicatorStyle: {
            background: '#3b82f6',
            borderRadius: '6px',
            boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.3)'
          }
        };
    }
  };

  const styles = getVariantStyles();

  const getAnimationVariants = () => {
    switch (animation) {
      case 'morph':
        return {
          initial: { opacity: 0, scale: 0.8, filter: 'blur(10px)' },
          animate: { opacity: 1, scale: 1, filter: 'blur(0px)' },
          exit: { opacity: 0, scale: 0.8, filter: 'blur(10px)' },
          transition: { 
            type: 'spring', 
            stiffness: 400, 
            damping: 25,
            mass: 0.4
          }
        };
      case 'fade':
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }
        };
      case 'elastic':
        return {
          initial: false,
          animate: true,
          transition: { 
            type: 'spring', 
            stiffness: 200, 
            damping: 15,
            mass: 0.8,
            velocity: 2
          }
        };
      case 'smooth':
        return {
          initial: false,
          animate: true,
          transition: { 
            duration: 0.4,
            ease: [0.16, 1, 0.3, 1]
          }
        };
      case 'spring':
        return {
          initial: false,
          animate: true,
          transition: { 
            type: 'spring', 
            stiffness: 350, 
            damping: 22, 
            mass: 0.5
          }
        };
      default: // slide
        return {
          initial: false,
          animate: true,
          transition: { 
            type: 'spring', 
            stiffness: 500, 
            damping: 28,
            mass: 0.3
          }
        };
    }
  };

  const animationVariants = getAnimationVariants();

  return (
    <div 
      className={className}
      style={{ 
        display: 'inline-flex',
        position: 'relative',
        ...styles.containerStyle,
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? 'not-allowed' : 'default'
      }}
    >
      {/* Animated indicator */}
      {variant !== 'underline' && (
        <motion.div
          style={{
            position: 'absolute',
            ...styles.indicatorStyle,
            height: currentSize.height - 8,
            width: `${100 / options.length}%`,
            top: 4
          }}
          animate={{
            x: `${selectedIndex * 100}%`
          }}
          {...animationVariants}
        />
      )}

      {/* Options */}
      <div style={{ 
        position: 'relative', 
        display: 'flex', 
        width: '100%' 
      }}>
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => handleSelect(option.value)}
            style={{
              flex: 1,
              position: 'relative',
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              border: 'none',
              background: 'transparent',
              ...styles.optionStyle,
              ...(selectedValue === option.value ? styles.selectedStyle : {}),
              height: currentSize.height - (variant === 'underline' ? 0 : 8),
              fontSize: currentSize.fontSize,
              padding: currentSize.padding,
              cursor: disabled ? 'not-allowed' : 'pointer'
            }}
            disabled={disabled}
          >
            {option.icon && (
              <motion.span
                animate={{
                  scale: selectedValue === option.value ? [1, 1.2, 1.1] : 1,
                  rotate: selectedValue === option.value ? [0, -10, 360] : 0,
                  y: selectedValue === option.value ? [0, -2, 0] : 0
                }}
                transition={{ 
                  type: 'spring', 
                  stiffness: 400, 
                  damping: 20,
                  mass: 0.4
                }}
                style={{
                  display: 'inline-block'
                }}
              >
                {option.icon}
              </motion.span>
            )}
            <span>{option.label}</span>
          </button>
        ))}
      </div>

      {/* Underline indicator */}
      {variant === 'underline' && (
        <motion.div
          style={{
            position: 'absolute',
            bottom: 0,
            ...styles.indicatorStyle,
            width: `${100 / options.length}%`
          }}
          animate={{
            x: `${selectedIndex * 100}%`
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        />
      )}
    </div>
  );
};

// Multi-toggle with animated selection
export const MultiToggle: React.FC<{
  options: ToggleOption[];
  values: string[];
  onChange?: (values: string[]) => void;
  className?: string;
  variant?: 'chips' | 'buttons' | 'cards';
}> = ({
  options,
  values = [],
  onChange,
  className = '',
  variant = 'chips'
}) => {
  const handleToggle = (value: string) => {
    const newValues = values.includes(value)
      ? values.filter(v => v !== value)
      : [...values, value];
    onChange?.(newValues);
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'buttons':
        return {
          container: 'flex flex-wrap gap-2',
          option: 'px-4 py-2 rounded-lg border-2 transition-all',
          selected: 'bg-blue-500 text-white border-blue-500',
          unselected: 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
        };
      case 'cards':
        return {
          container: 'grid grid-cols-2 md:grid-cols-3 gap-4',
          option: 'p-4 rounded-xl border-2 transition-all text-center',
          selected: 'bg-gradient-to-br from-purple-500 to-pink-500 text-white border-transparent shadow-lg',
          unselected: 'bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:shadow-md'
        };
      default: // chips
        return {
          container: 'flex flex-wrap gap-2',
          option: 'px-3 py-1.5 rounded-full text-sm transition-all',
          selected: 'bg-blue-100 text-blue-700 ring-2 ring-blue-500 ring-offset-2',
          unselected: 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <div className={`${styles.container} ${className}`}>
      {options.map((option) => {
        const isSelected = values.includes(option.value);
        
        return (
          <motion.button
            key={option.value}
            onClick={() => handleToggle(option.value)}
            className={`
              ${styles.option}
              ${isSelected ? styles.selected : styles.unselected}
            `}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              scale: isSelected ? [1, 1.1, 1] : 1
            }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            <AnimatePresence mode="wait">
              {option.icon && (
                <motion.span
                  key={isSelected ? 'selected' : 'unselected'}
                  initial={{ rotate: -180, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 180, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="inline-block mr-2"
                >
                  {option.icon}
                </motion.span>
              )}
            </AnimatePresence>
            {option.label}
          </motion.button>
        );
      })}
    </div>
  );
};