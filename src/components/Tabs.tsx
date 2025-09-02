import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface TabItem {
  id: string;
  label: React.ReactNode;
  content: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  items: TabItem[];
  defaultTab?: string;
  onChange?: (tabId: string) => void;
  variant?: 'default' | 'pills' | 'underline' | 'bordered' | 'gradient' | 'neon' | 'floating';
  animation?: 'slide' | 'fade' | 'scale' | 'morph' | 'glow';
  orientation?: 'horizontal' | 'vertical';
  className?: string;
  contentClassName?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  items,
  defaultTab,
  onChange,
  variant = 'default',
  animation = 'slide',
  orientation = 'horizontal',
  className = '',
  contentClassName = ''
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab || items[0]?.id);
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const tabRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    onChange?.(tabId);
  };

  useEffect(() => {
    const activeTabElement = tabRefs.current[activeTab];
    if (activeTabElement && (variant === 'underline' || variant === 'floating')) {
      const { offsetLeft, offsetTop, offsetWidth, offsetHeight } = activeTabElement;
      setIndicatorStyle({
        left: orientation === 'horizontal' ? offsetLeft : 0,
        top: orientation === 'vertical' ? offsetTop : 'auto',
        width: orientation === 'horizontal' ? offsetWidth : 3,
        height: orientation === 'vertical' ? offsetHeight : 3
      });
    }
  }, [activeTab, variant, orientation]);

  const getVariantStyles = () => {
    switch (variant) {
      case 'pills':
        return {
          container: 'bg-gray-100 p-1 rounded-lg',
          tabList: 'flex gap-1',
          tab: 'px-4 py-2 rounded-md transition-all',
          activeTab: 'bg-white shadow-md text-blue-600',
          inactiveTab: 'text-gray-600 hover:text-gray-900',
          indicator: 'hidden'
        };
      case 'underline':
        return {
          container: '',
          tabList: `flex ${orientation === 'vertical' ? 'flex-col' : ''} border-b-2 border-gray-200 relative`,
          tab: 'px-4 py-2 transition-colors',
          activeTab: 'text-blue-600 font-medium',
          inactiveTab: 'text-gray-600 hover:text-gray-900',
          indicator: 'absolute bottom-0 h-0.5 bg-blue-600 transition-all duration-300'
        };
      case 'bordered':
        return {
          container: 'border border-gray-200 rounded-lg',
          tabList: 'flex bg-gray-50 border-b border-gray-200',
          tab: 'px-4 py-3 transition-all',
          activeTab: 'bg-white border-b-2 border-blue-600 text-blue-600',
          inactiveTab: 'text-gray-600 hover:bg-gray-100',
          indicator: 'hidden'
        };
      case 'gradient':
        return {
          container: '',
          tabList: 'flex gap-2 p-1 bg-gray-100 rounded-lg',
          tab: 'px-4 py-2 rounded-md transition-all',
          activeTab: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg',
          inactiveTab: 'text-gray-600 hover:text-gray-900',
          indicator: 'hidden'
        };
      case 'neon':
        return {
          container: 'bg-gray-900 rounded-lg',
          tabList: 'flex gap-2 p-2',
          tab: 'px-4 py-2 rounded-md transition-all',
          activeTab: 'bg-gray-800 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.5)] border border-cyan-400',
          inactiveTab: 'text-gray-400 hover:text-gray-300 border border-transparent',
          indicator: 'hidden'
        };
      case 'floating':
        return {
          container: '',
          tabList: 'flex gap-4 relative',
          tab: 'px-4 py-2 transition-all relative z-10',
          activeTab: 'text-blue-600 font-medium',
          inactiveTab: 'text-gray-600 hover:text-gray-900',
          indicator: 'absolute bg-blue-100 rounded-lg transition-all duration-300'
        };
      default:
        return {
          container: '',
          tabList: 'flex gap-2 border-b border-gray-200',
          tab: 'px-4 py-2 transition-colors',
          activeTab: 'border-b-2 border-blue-600 text-blue-600 font-medium',
          inactiveTab: 'text-gray-600 hover:text-gray-900',
          indicator: 'hidden'
        };
    }
  };

  const getContentAnimation = () => {
    switch (animation) {
      case 'fade':
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          transition: { duration: 0.2 }
        };
      case 'scale':
        return {
          initial: { opacity: 0, scale: 0.95 },
          animate: { opacity: 1, scale: 1 },
          exit: { opacity: 0, scale: 0.95 },
          transition: { duration: 0.2 }
        };
      case 'morph':
        return {
          initial: { opacity: 0, rotateY: -90 },
          animate: { opacity: 1, rotateY: 0 },
          exit: { opacity: 0, rotateY: 90 },
          transition: { type: 'spring', stiffness: 300, damping: 25 }
        };
      case 'glow':
        return {
          initial: { opacity: 0, filter: 'blur(10px)' },
          animate: { opacity: 1, filter: 'blur(0px)' },
          exit: { opacity: 0, filter: 'blur(10px)' },
          transition: { duration: 0.3 }
        };
      default: // slide
        return {
          initial: { opacity: 0, x: 50 },
          animate: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: -50 },
          transition: { type: 'spring', stiffness: 400, damping: 30 }
        };
    }
  };

  const styles = getVariantStyles();
  const contentAnimation = getContentAnimation();
  const activeItem = items.find(item => item.id === activeTab);

  return (
    <div className={`${styles.container} ${className}`}>
      <div className={`${styles.tabList}`}>
        {variant === 'floating' && (
          <motion.div
            className={styles.indicator}
            style={indicatorStyle}
            layoutId="tab-indicator"
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          />
        )}
        
        {items.map((item) => (
          <motion.button
            key={item.id}
            ref={(el) => { tabRefs.current[item.id] = el; }}
            onClick={() => !item.disabled && handleTabChange(item.id)}
            className={`
              ${styles.tab}
              ${activeTab === item.id ? styles.activeTab : styles.inactiveTab}
              ${item.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
            whileHover={!item.disabled ? { scale: 1.05 } : {}}
            whileTap={!item.disabled ? { scale: 0.95 } : {}}
            disabled={item.disabled}
          >
            {item.icon && (
              <motion.span
                className="inline-block mr-2"
                animate={{
                  rotate: activeTab === item.id ? 360 : 0,
                  scale: activeTab === item.id ? 1.1 : 1
                }}
                transition={{ duration: 0.3 }}
              >
                {item.icon}
              </motion.span>
            )}
            {item.label}
            
            {variant === 'neon' && activeTab === item.id && (
              <motion.div
                className="absolute inset-0 rounded-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
                style={{
                  background: 'radial-gradient(circle, rgba(6,182,212,0.3) 0%, transparent 70%)',
                  pointerEvents: 'none'
                }}
              />
            )}
          </motion.button>
        ))}
        
        {variant === 'underline' && (
          <motion.div
            className={styles.indicator}
            style={indicatorStyle}
            layoutId="underline-indicator"
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          />
        )}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          className={`mt-4 ${contentClassName}`}
          {...contentAnimation}
        >
          {activeItem?.content}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// Vertical tabs variant
export const VerticalTabs: React.FC<TabsProps> = (props) => {
  return (
    <div className="flex gap-4">
      <Tabs {...props} orientation="vertical" className="w-48" />
    </div>
  );
};

// Animated tab with number indicators
export const NumberedTabs: React.FC<TabsProps> = (props) => {
  const enhancedItems = props.items.map((item, index) => ({
    ...item,
    label: (
      <span className="flex items-center gap-2">
        <motion.span
          className="w-6 h-6 rounded-full bg-current opacity-20 flex items-center justify-center text-xs font-bold"
          whileHover={{ scale: 1.2, opacity: 1 }}
        >
          {index + 1}
        </motion.span>
        {item.label}
      </span>
    )
  }));

  return <Tabs {...props} items={enhancedItems} />;
};