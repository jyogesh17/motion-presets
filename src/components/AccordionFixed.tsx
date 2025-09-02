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

export const AccordionFixed: React.FC<AccordionProps> = ({
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
          containerStyle: {
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            overflow: 'hidden'
          },
          itemStyle: {
            borderBottom: '1px solid #e5e7eb'
          },
          headerStyle: {
            background: 'white',
            padding: '16px',
            cursor: 'pointer',
            transition: 'background 0.2s ease'
          },
          headerHoverStyle: {
            background: '#f9fafb'
          },
          contentStyle: {
            background: '#f9fafb',
            padding: '16px'
          }
        };
      case 'shadow':
        return {
          containerStyle: {
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          },
          itemStyle: {
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
            overflow: 'hidden'
          },
          headerStyle: {
            background: 'white',
            padding: '16px',
            cursor: 'pointer',
            transition: 'background 0.2s ease'
          },
          headerHoverStyle: {
            background: '#f9fafb'
          },
          contentStyle: {
            background: 'white',
            padding: '16px'
          }
        };
      case 'gradient':
        return {
          containerStyle: {
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          },
          itemStyle: {
            borderRadius: '8px',
            overflow: 'hidden',
            background: 'linear-gradient(to right, #fdf4ff, #fce7f3)'
          },
          headerStyle: {
            padding: '16px',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          },
          headerHoverStyle: {
            background: 'linear-gradient(to right, #f9f0ff, #fae8f7)'
          },
          contentStyle: {
            background: 'white',
            padding: '16px'
          }
        };
      case 'neon':
        return {
          containerStyle: {
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            background: '#111827',
            padding: '16px',
            borderRadius: '12px'
          },
          itemStyle: {
            border: '1px solid #374151',
            borderRadius: '8px',
            overflow: 'hidden',
            background: '#1f2937'
          },
          headerStyle: {
            padding: '16px',
            cursor: 'pointer',
            color: '#9ca3af',
            transition: 'all 0.2s ease'
          },
          headerHoverStyle: {
            color: '#06b6d4',
            background: '#111827',
            boxShadow: '0 0 10px rgba(6, 182, 212, 0.3)'
          },
          contentStyle: {
            background: '#111827',
            padding: '16px',
            color: '#9ca3af'
          }
        };
      case 'minimal':
        return {
          containerStyle: {},
          itemStyle: {
            borderTop: '1px solid #e5e7eb'
          },
          headerStyle: {
            padding: '16px 0',
            cursor: 'pointer',
            transition: 'color 0.2s ease'
          },
          headerHoverStyle: {
            color: '#667eea'
          },
          contentStyle: {
            padding: '16px 0',
            color: '#6b7280'
          }
        };
      default:
        return {
          containerStyle: {},
          itemStyle: {
            borderBottom: '1px solid #e5e7eb'
          },
          headerStyle: {
            padding: '16px 0',
            cursor: 'pointer',
            transition: 'background 0.2s ease'
          },
          headerHoverStyle: {
            background: '#f9fafb'
          },
          contentStyle: {
            padding: '16px 0'
          }
        };
    }
  };

  const styles = getVariantStyles();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <div className={className} style={styles.containerStyle as React.CSSProperties}>
      {items.map((item, index) => {
        const isOpen = openItems.includes(item.id);
        const isHovered = hoveredItem === item.id;
        const isLastItem = index === items.length - 1;

        return (
          <div 
            key={item.id} 
            style={{
              ...styles.itemStyle,
              ...(isLastItem ? { borderBottom: 'none' } : {})
            } as React.CSSProperties}
          >
            <motion.button
              onClick={() => !item.disabled && toggleItem(item.id)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                border: 'none',
                background: 'transparent',
                textAlign: 'left',
                opacity: item.disabled ? 0.5 : 1,
                cursor: item.disabled ? 'not-allowed' : 'pointer',
                ...styles.headerStyle,
                ...(isHovered && !item.disabled ? styles.headerHoverStyle : {})
              } as React.CSSProperties}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              whileTap={!item.disabled ? { scale: 0.98 } : {}}
            >
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '12px',
                flex: 1
              }}>
                {item.icon && iconPosition === 'left' && (
                  <span>{item.icon}</span>
                )}
                <span style={{ fontSize: '16px', fontWeight: '500' }}>
                  {item.title}
                </span>
                {item.icon && iconPosition === 'right' && !expandIcon && (
                  <span>{item.icon}</span>
                )}
              </div>
              
              {expandIcon && (
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  {isOpen && collapseIcon ? collapseIcon : expandIcon}
                </motion.div>
              )}
            </motion.button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  variants={contentVariants[animation]}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  style={{
                    overflow: 'hidden',
                    ...styles.contentStyle
                  } as React.CSSProperties}
                >
                  <div>{item.content}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

// Staggered Accordion with sequential opening
export const StaggeredAccordion: React.FC<AccordionProps> = (props) => {
  return <AccordionFixed {...props} />;
};