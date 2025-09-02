import { motion, AnimatePresence } from 'framer-motion';
import { Children, forwardRef, useMemo } from 'react';
import type { StaggerProps } from '../types';
import { presets } from '../presets';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { getAnimationProps } from '../utils/animation';
import { applyOverrides } from '../combinators/customize';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: (custom: { staggerChildren: number; delayChildren: number }) => ({
    opacity: 1,
    transition: {
      staggerChildren: custom.staggerChildren,
      delayChildren: custom.delayChildren,
    },
  }),
};

export const Stagger = forwardRef<HTMLDivElement, StaggerProps>(
  (
    {
      children,
      preset = 'fadeInUp',
      delay = 0,
      duration,
      staggerChildren = 0.1,
      delayChildren = 0,
      className,
      disabled = false,
      respectReducedMotion = true,
      once = false,
      amount = 0.3,
      customize,
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
        : presetValue || presets.fadeInUp();
      
      // Apply customizations if provided
      if (customize && typeof selectedPreset === 'object' && ('initial' in selectedPreset || 'animate' in selectedPreset)) {
        selectedPreset = applyOverrides(selectedPreset as any, customize);
      }
      
      const animProps = typeof selectedPreset === 'object' && ('initial' in selectedPreset || 'animate' in selectedPreset) 
        ? getAnimationProps(selectedPreset as any, { delay, duration })
        : selectedPreset;

      return {
        hidden: (animProps as any).initial || {},
        visible: {
          ...((animProps as any).animate || {}),
          transition: (animProps as any).transition,
        },
      };
    }, [shouldAnimate, preset, delay, duration, customize]);

    const viewportProps = once
      ? { once: true, amount }
      : { amount };

    if (!shouldAnimate) {
      return (
        <div ref={ref} className={className}>
          {children}
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
          custom={{ staggerChildren, delayChildren: delayChildren + delay }}
          viewport={viewportProps}
        >
          {Children.map(children, (child, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              custom={index}
            >
              {child}
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    );
  }
);

Stagger.displayName = 'Stagger';