import { motion, AnimatePresence } from 'framer-motion';
import { forwardRef, useMemo } from 'react';
import type { TextAnimationProps } from '../types';
import { presets } from '../presets';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { getAnimationProps } from '../utils/animation';
import { applyOverrides } from '../combinators/customize';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: (custom: { staggerDelay: number; delayChildren: number }) => ({
    opacity: 1,
    transition: {
      staggerChildren: custom.staggerDelay,
      delayChildren: custom.delayChildren,
    },
  }),
};

export const AnimateText = forwardRef<HTMLDivElement, TextAnimationProps>(
  (
    {
      text,
      splitBy = 'words',
      preset = 'fadeInUp',
      delay = 0,
      duration,
      staggerDelay = 0.05,
      className,
      disabled = false,
      respectReducedMotion = true,
      once = false,
      amount = 0.3,
      customize
    },
    ref
  ) => {
    const prefersReducedMotion = useReducedMotion();
    const shouldAnimate = !disabled && !(respectReducedMotion && prefersReducedMotion);

    const itemVariants = useMemo(() => {
      if (!shouldAnimate) return {};

      const presetValue = presets[preset as keyof typeof presets];
      let selectedPreset = typeof presetValue === 'function' 
        ? presetValue() 
        : presetValue || (presets.fadeInUp as any)();
      
      // Apply customizations if provided
      if (customize) {
        selectedPreset = applyOverrides(selectedPreset as any, customize);
      }
      
      const animProps = getAnimationProps(selectedPreset as any, { delay: 0, duration });

      return {
        hidden: animProps.initial || {},
        visible: {
          ...(animProps.animate || {}),
          transition: animProps.transition,
        },
      };
    }, [shouldAnimate, preset, duration, customize]);

    const textElements = useMemo(() => {
      if (splitBy === 'characters') {
        return text.split('').map((char, index) => ({
          content: char === ' ' ? '\u00A0' : char,
          key: `${char}-${index}`,
          needsSpace: false,
          isLine: false,
        }));
      } else if (splitBy === 'words') {
        return text.split(' ').map((word, index) => ({
          content: word,
          key: `${word}-${index}`,
          needsSpace: index < text.split(' ').length - 1,
          isLine: false,
        }));
      } else {
        // Split by lines
        return text.split('\n').map((line, index) => ({
          content: line,
          key: `${line}-${index}`,
          isLine: true,
          needsSpace: false,
        }));
      }
    }, [text, splitBy]);

    const viewportProps = once
      ? { once: true, amount }
      : { amount };

    if (!shouldAnimate) {
      return (
        <div ref={ref} className={className}>
          {text}
        </div>
      );
    }

    return (
      <AnimatePresence mode="wait">
        <motion.div
          ref={ref}
          className={className}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          custom={{ staggerDelay, delayChildren: delay }}
          viewport={viewportProps}
          style={{ display: 'inline-block' }}
        >
          {textElements.map((element) => (
            <motion.span
              key={element.key}
              variants={itemVariants}
              style={{
                display: element.isLine ? 'block' : 'inline-block',
                whiteSpace: 'pre',
              }}
            >
              {element.content}
              {element.needsSpace && '\u00A0'}
            </motion.span>
          ))}
        </motion.div>
      </AnimatePresence>
    );
  }
);

AnimateText.displayName = 'AnimateText';