import { motion, AnimatePresence } from 'framer-motion';
import { forwardRef, useMemo } from 'react';
import type { BaseComponentProps, AnimationPreset } from '../types';
import { presets } from '../presets';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { getAnimationProps } from '../utils/animation';
import { combinePresets } from '../combinators/combine';
import { applyOverrides } from '../combinators/customize';
import { createSequence } from '../combinators/sequence';

export const Reveal = forwardRef<HTMLDivElement, BaseComponentProps>(
  (
    {
      children,
      preset = 'fadeIn',
      delay = 0,
      duration,
      className,
      disabled = false,
      respectReducedMotion = true,
      once = false,
      amount = 0.3,
      customize,
      combinationOptions
    },
    ref
  ) => {
    const prefersReducedMotion = useReducedMotion();
    const shouldAnimate = !disabled && !(respectReducedMotion && prefersReducedMotion);

    const animationProps = useMemo(() => {
      if (!shouldAnimate) {
        return {};
      }

      let selectedPreset: AnimationPreset;

      // Handle different preset types
      if (typeof preset === 'string') {
        const presetValue = presets[preset as keyof typeof presets] as any;
        selectedPreset = typeof presetValue === 'function' 
          ? presetValue() 
          : presetValue || (presets.fadeIn as any)();
      } else if (Array.isArray(preset)) {
        // Handle array of presets
        const resolvedPresets = preset.map(p => {
          if (typeof p === 'string') {
            const presetValue = presets[p as keyof typeof presets] as any;
            return typeof presetValue === 'function' 
              ? presetValue() 
              : presetValue || (presets.fadeIn as any)();
          }
          return p;
        });

        // Combine based on options
        if (combinationOptions?.mode === 'sequence') {
          selectedPreset = createSequence(resolvedPresets, {
            interval: combinationOptions.staggerDelay || 0.3,
            overlap: combinationOptions.overlap || 0
          });
        } else {
          selectedPreset = combinePresets(resolvedPresets, {
            mode: combinationOptions?.mode === 'parallel' ? 'merge' : 'merge'
          });
        }
      } else {
        selectedPreset = preset;
      }

      // Apply customizations if provided
      if (customize) {
        selectedPreset = applyOverrides(selectedPreset, customize);
      }

      return getAnimationProps(selectedPreset, { delay, duration });
    }, [shouldAnimate, preset, delay, duration, customize, combinationOptions]);

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
          initial={animationProps.initial as any}
          animate={animationProps.animate as any}
          exit={animationProps.exit as any}
          transition={animationProps.transition}
          whileHover={animationProps.whileHover as any}
          whileTap={animationProps.whileTap as any}
          whileInView={animationProps.whileInView as any}
          viewport={viewportProps}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    );
  }
);

Reveal.displayName = 'Reveal';