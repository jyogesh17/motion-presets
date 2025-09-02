import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

export interface AccordionItem {
  id: string;
  title: React.ReactNode;
  content: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface AccordionProps {
  items: AccordionItem[];
  defaultOpen?: string | string[];
  multiple?: boolean;
  variant?: 'default' | 'bordered' | 'shadow' | 'gradient' | 'neon' | 'minimal';
  animation?: 'height' | 'fade' | 'slide' | 'rotate' | 'spring';
  className?: string;
  iconPosition?: 'left' | 'right';
  expandIcon?: React.ReactNode;
  collapseIcon?: React.ReactNode;
}

const contentVariants: Record<string, Variants> = {
  height: {
    closed: { height: 0, opacity: 0 },
    open: { 
      height: 'auto', 
      opacity: 1,
      transition: {
        height: { type: 'spring', stiffness: 500, damping: 30 },
        opacity: { duration: 0.2 }
      }
    }
  },
  fade: {
    closed: { opacity: 0, height: 0 },
    open: { 
      opacity: 1, 
      height: 'auto',
      transition: { duration: 0.3 }
    }
  },
  slide: {
    closed: { height: 0, opacity: 0, y: -10 },
    open: { 
      height: 'auto', 
      opacity: 1, 
      y: 0,
      transition: {
        height: { type: 'spring', stiffness: 400, damping: 30 },
        opacity: { duration: 0.2 },
        y: { duration: 0.2 }
      }
    }
  },
  rotate: {
    closed: { 
      height: 0, 
      opacity: 0, 
      rotateX: -90,
      transformOrigin: 'top'
    },
    open: { 
      height: 'auto', 
      opacity: 1, 
      rotateX: 0,
      transition: {
        height: { type: 'spring', stiffness: 500, damping: 30 },
        opacity: { duration: 0.2 },
        rotateX: { duration: 0.3 }
      }
    }
  },
  spring: {
    closed: { 
      height: 0, 
      opacity: 0,
      scale: 0.95
    },
    open: { 
      height: 'auto', 
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 25,
        mass: 0.5
      }
    }
  }
};

export const Accordion: React.FC<AccordionProps> = ({
  items,
  defaultOpen = [],
  multiple = false,
  variant = 'default',
  animation = 'height',
  className = '',
  iconPosition = 'right',
  expandIcon = (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  collapseIcon
}) => {
  const initialOpen = Array.isArray(defaultOpen) ? defaultOpen : [defaultOpen];
  const [openItems, setOpenItems] = useState<string[]>(initialOpen);

  const toggleItem = (itemId: string) => {
    if (multiple) {
      setOpenItems(prev => 
        prev.includes(itemId) 
          ? prev.filter(id => id !== itemId)
          : [...prev, itemId]
      );
    } else {
      setOpenItems(prev => 
        prev.includes(itemId) ? [] : [itemId]
      );
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'bordered':
        return {
          container: 'border border-gray-200 rounded-lg overflow-hidden',
          item: 'border-b border-gray-200 last:border-b-0',
          header: 'bg-white hover:bg-gray-50',
          content: 'bg-gray-50'
        };
      case 'shadow':
        return {
          container: 'space-y-2',
          item: 'shadow-md rounded-lg overflow-hidden',
          header: 'bg-white hover:bg-gray-50',
          content: 'bg-white'
        };
      case 'gradient':
        return {
          container: 'space-y-2',
          item: 'rounded-lg overflow-hidden bg-gradient-to-r from-purple-50 to-pink-50',
          header: 'hover:from-purple-100 hover:to-pink-100',
          content: 'bg-white'
        };
      case 'neon':
        return {
          container: 'space-y-2',
          item: 'rounded-lg overflow-hidden bg-gray-900 border border-gray-800',
          header: 'hover:bg-gray-800 text-gray-300',
          content: 'bg-gray-850 text-gray-400 border-t border-gray-800'
        };
      case 'minimal':
        return {
          container: 'space-y-0',
          item: '',
          header: 'hover:bg-gray-50',
          content: 'pl-4'
        };
      default:
        return {
          container: 'bg-white rounded-lg shadow-sm',
          item: 'border-b border-gray-100 last:border-b-0',
          header: 'hover:bg-gray-50',
          content: 'bg-gray-50'
        };
    }
  };

  const styles = getVariantStyles();
  const currentVariant = contentVariants[animation];

  return (
    <div className={`${styles.container} ${className}`}>
      {items.map((item) => {
        const isOpen = openItems.includes(item.id);
        
        return (
          <div key={item.id} className={styles.item}>
            <motion.button
              onClick={() => !item.disabled && toggleItem(item.id)}
              className={`
                w-full px-4 py-3 flex items-center justify-between text-left
                ${styles.header}
                ${item.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              `}
              whileHover={!item.disabled ? { scale: 1.01 } : {}}
              whileTap={!item.disabled ? { scale: 0.99 } : {}}
            >
              <div className="flex items-center gap-3 flex-1">
                {item.icon && iconPosition === 'left' && (
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {item.icon}
                  </motion.span>
                )}
                <span className="font-medium">{item.title}</span>
              </div>
              
              <motion.span
                animate={{ 
                  rotate: isOpen ? 180 : 0,
                  scale: isOpen ? 1.1 : 1
                }}
                transition={{ 
                  type: 'spring', 
                  stiffness: 400, 
                  damping: 25 
                }}
                className={iconPosition === 'right' ? '' : 'order-first mr-3'}
              >
                {collapseIcon && isOpen ? collapseIcon : expandIcon}
              </motion.span>
            </motion.button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial="closed"
                  animate="open"
                  exit="closed"
                  variants={currentVariant}
                  className="overflow-hidden"
                >
                  <div className={`px-4 py-3 ${styles.content}`}>
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {variant === 'neon' && isOpen && (
              <motion.div
                className="h-px"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
                style={{
                  background: 'linear-gradient(90deg, transparent, #667eea, transparent)',
                  transformOrigin: 'left'
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

// Fancy accordion with stagger animation
export const StaggeredAccordion: React.FC<AccordionProps> = (props) => {
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={props.className}>
      {props.items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={mounted ? { opacity: 0, x: -50 } : false}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            delay: index * 0.1,
            type: 'spring',
            stiffness: 300,
            damping: 25
          }}
        >
          <Accordion
            {...props}
            items={[item]}
            className="mb-2"
          />
        </motion.div>
      ))}
    </div>
  );
};