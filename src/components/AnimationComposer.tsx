import { motion, AnimatePresence, useAnimationControls } from 'framer-motion';
import { forwardRef, useEffect, useMemo } from 'react';
import type { AnimationComposerProps, AnimationPreset } from '../types';
import { presets } from '../presets';
import { applyOverrides } from '../combinators/customize';
import { useReducedMotion } from '../hooks/useReducedMotion';

export const AnimationComposer = forwardRef<HTMLDivElement, AnimationComposerProps>(
  (
    {
      children,
      timeline = [],
      totalDuration = 5,
      ...motionProps
    },
    ref
  ) => {
    const controls = useAnimationControls();
    const prefersReducedMotion = useReducedMotion();
    const shouldAnimate = !prefersReducedMotion;

    // Build the complete animation timeline
    const composedAnimation = useMemo(() => {
      if (!shouldAnimate || timeline.length === 0) {
        return {};
      }

      // Create keyframes for each property across the timeline
      const keyframes: Record<string, any[]> = {};
      const times: number[] = [];
      
      // Collect all unique properties from all presets
      const allProperties = new Set<string>();
      
      timeline.forEach(({ preset, customize }) => {
        let resolvedPreset: AnimationPreset;
        
        if (typeof preset === 'string') {
          const presetValue = presets[preset as keyof typeof presets] as any;
          resolvedPreset = typeof presetValue === 'function' 
            ? presetValue() 
            : presetValue || (presets.fadeIn as any)();
        } else {
          resolvedPreset = preset;
        }

        if (customize) {
          resolvedPreset = applyOverrides(resolvedPreset, customize);
        }

        // Collect properties from animate variant
        if (resolvedPreset.animate && typeof resolvedPreset.animate === 'object') {
          Object.keys(resolvedPreset.animate).forEach(key => allProperties.add(key));
        }
      });

      // Build keyframes for each property
      allProperties.forEach(prop => {
        const values: any[] = [];
        const propTimes: number[] = [];
        
        timeline.forEach(({ preset, start, duration = 1, customize }) => {
          let resolvedPreset: AnimationPreset;
          
          if (typeof preset === 'string') {
            const presetValue = presets[preset as keyof typeof presets] as any;
            resolvedPreset = typeof presetValue === 'function' 
              ? presetValue() 
              : presetValue || (presets.fadeIn as any)();
          } else {
            resolvedPreset = preset;
          }

          if (customize) {
            resolvedPreset = applyOverrides(resolvedPreset, customize);
          }

          const animateValue = resolvedPreset.animate?.[prop as keyof typeof resolvedPreset.animate];
          
          if (animateValue !== undefined) {
            // Add initial value at start time
            const startTime = start / totalDuration;
            
            // Handle initial value
            if (values.length === 0 && resolvedPreset.initial) {
              const initialValue = resolvedPreset.initial[prop as keyof typeof resolvedPreset.initial];
              if (initialValue !== undefined) {
                values.push(initialValue);
              } else {
                values.push(animateValue);
              }
              propTimes.push(startTime);
            } else {
              values.push(animateValue);
              propTimes.push(startTime);
            }

            // Add end value if duration extends beyond start
            if (duration > 0) {
              const endTime = Math.min((start + duration) / totalDuration, 1);
              if (endTime > startTime) {
                values.push(animateValue);
                propTimes.push(endTime);
              }
            }
          }
        });

        if (values.length > 0) {
          // Sort times and corresponding values to ensure monotonic increase
          const sortedIndices = propTimes
            .map((_, i) => i)
            .sort((a, b) => propTimes[a] - propTimes[b]);
          
          keyframes[prop] = sortedIndices.map(i => values[i]);
          const sortedTimes = sortedIndices.map(i => propTimes[i]);
          
          // Remove duplicate times while keeping last value
          const uniqueTimes: number[] = [];
          const uniqueValues: any[] = [];
          for (let i = 0; i < sortedTimes.length; i++) {
            if (i === sortedTimes.length - 1 || sortedTimes[i] !== sortedTimes[i + 1]) {
              uniqueTimes.push(sortedTimes[i]);
              uniqueValues.push(keyframes[prop][i]);
            }
          }
          
          keyframes[prop] = uniqueValues;
          if (times.length === 0) {
            times.push(...uniqueTimes);
          }
        }
      });

      // Build the final animation object
      return {
        animate: keyframes,
        transition: {
          duration: totalDuration,
          times: times.length > 0 ? times : undefined,
          ease: 'easeInOut'
        }
      };
    }, [timeline, totalDuration, shouldAnimate]);

    useEffect(() => {
      if (!shouldAnimate) return;

      // Start the composed animation
      controls.start(composedAnimation.animate);
    }, [controls, composedAnimation, shouldAnimate]);

    if (!shouldAnimate) {
      return (
        <div ref={ref}>
          {children}
        </div>
      );
    }

    return (
      <AnimatePresence mode="wait">
        <motion.div
          ref={ref}
          animate={controls}
          transition={composedAnimation.transition}
          {...motionProps}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    );
  }
);

AnimationComposer.displayName = 'AnimationComposer';