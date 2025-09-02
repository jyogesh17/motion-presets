import { motion, AnimatePresence, useAnimationControls } from 'framer-motion';
import { forwardRef, useEffect, useState, useMemo } from 'react';
import type { AnimationSequenceProps } from '../types';
import { presets } from '../presets';
import { createSequence } from '../combinators/sequence';
import { applyOverrides } from '../combinators/customize';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { getAnimationProps } from '../utils/animation';

export const AnimationSequence = forwardRef<HTMLDivElement, AnimationSequenceProps>(
  (
    {
      children,
      presets: presetList,
      interval = 0.5,
      loop = false,
      autoPlay = true,
      delay = 0,
      duration,
      className,
      disabled = false,
      respectReducedMotion = true,
      once = false,
      amount = 0.3,
      customize,
      ...motionProps
    },
    ref
  ) => {
    const controls = useAnimationControls();
    const [currentIndex, setCurrentIndex] = useState(0);
    const prefersReducedMotion = useReducedMotion();
    const shouldAnimate = !disabled && !(respectReducedMotion && prefersReducedMotion);

    // Resolve presets from strings or objects
    const resolvedPresets = useMemo(() => {
      return presetList.map(p => {
        if (typeof p === 'string') {
          const presetValue = presets[p as keyof typeof presets];
          return typeof presetValue === 'function' 
            ? presetValue() 
            : presetValue || presets.fadeIn();
        } else if (Array.isArray(p)) {
          // Handle array of preset names
          return createSequence(
            p.map(name => {
              if (typeof name === 'string') {
                const presetValue = presets[name as keyof typeof presets];
                return typeof presetValue === 'function' 
                  ? presetValue() 
                  : presetValue || presets.fadeIn();
              }
              return name;
            }),
            { interval }
          );
        }
        return p;
      });
    }, [presetList, interval]);

    // Apply customizations if provided
    const animationPreset = useMemo(() => {
      const preset = resolvedPresets[currentIndex];
      if (!preset) return {};
      
      let finalPreset = preset;
      if (customize) {
        finalPreset = applyOverrides(preset as any, customize);
      }
      
      return getAnimationProps(finalPreset as any, { delay, duration });
    }, [resolvedPresets, currentIndex, customize, delay, duration]);

    useEffect(() => {
      if (!shouldAnimate || !autoPlay) return;

      const runSequence = async () => {
        for (let i = 0; i < resolvedPresets.length; i++) {
          setCurrentIndex(i);
          const preset = resolvedPresets[i];
          
          // Animate to the current preset
          await controls.start((preset as any).animate || {});
          
          // Wait for interval before next animation
          if (i < resolvedPresets.length - 1) {
            await new Promise(resolve => setTimeout(resolve, interval * 1000));
          }
        }

        // Loop if enabled
        if (loop) {
          setCurrentIndex(0);
          runSequence();
        }
      };

      // Start with delay
      const timer = setTimeout(() => {
        runSequence();
      }, delay * 1000);

      return () => clearTimeout(timer);
    }, [shouldAnimate, autoPlay, resolvedPresets, controls, interval, loop, delay]);

    if (!shouldAnimate) {
      return (
        <div ref={ref} className={className}>
          {children}
        </div>
      );
    }

    const viewportProps = once
      ? { once: true, amount }
      : { amount };

    return (
      <AnimatePresence mode="wait">
        <motion.div
          ref={ref}
          className={className}
          initial={animationPreset.initial as any}
          animate={controls}
          exit={animationPreset.exit as any}
          transition={animationPreset.transition}
          whileHover={animationPreset.whileHover as any}
          whileTap={animationPreset.whileTap as any}
          whileInView={animationPreset.whileInView as any}
          viewport={viewportProps}
          {...motionProps}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    );
  }
);

AnimationSequence.displayName = 'AnimationSequence';