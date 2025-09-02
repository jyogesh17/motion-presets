import { motion, AnimatePresence } from 'framer-motion';
import { forwardRef, useMemo } from 'react';
import type { MultiAnimationProps, AnimationPreset } from '../types';
import { presets } from '../presets';
import { combinePresets } from '../combinators/combine';
import { createParallel } from '../combinators/parallel';
import { applyOverrides } from '../combinators/customize';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { getAnimationProps } from '../utils/animation';

export const MultiAnimation = forwardRef<HTMLDivElement, MultiAnimationProps>(
  (
    {
      children,
      animations,
      className,
      disabled = false,
      respectReducedMotion = true,
      once = false,
      amount = 0.3,
      combinationOptions,
      ...motionProps
    },
    ref
  ) => {
    const prefersReducedMotion = useReducedMotion();
    const shouldAnimate = !disabled && !(respectReducedMotion && prefersReducedMotion);

    // Resolve and combine all animations
    const combinedAnimation = useMemo(() => {
      if (!shouldAnimate || !animations || animations.length === 0) {
        return {};
      }

      // Resolve preset names to actual presets
      const resolvedAnimations = animations.map(anim => {
        let preset: AnimationPreset;
        
        if (typeof anim.preset === 'string') {
          const presetValue = presets[anim.preset as keyof typeof presets] as any;
          preset = typeof presetValue === 'function' 
            ? presetValue() 
            : presetValue || (presets.fadeIn as any)();
        } else {
          preset = anim.preset;
        }

        // Apply individual customizations
        if (anim.customize) {
          preset = applyOverrides(preset, anim.customize);
        }

        // Apply individual timing
        return getAnimationProps(preset, {
          delay: anim.delay,
          duration: anim.duration
        });
      });

      // Combine based on mode
      const mode = combinationOptions?.mode || 'parallel';
      
      if (mode === 'parallel') {
        return createParallel(resolvedAnimations, {
          stagger: combinationOptions?.staggerDelay,
          syncTransitions: true
        });
      } else if (mode === 'sequence') {
        // For sequence mode, we need to adjust delays
        let accumulatedDelay = 0;
        const sequencedAnimations = resolvedAnimations.map((anim) => {
          const duration = (anim.transition as any)?.duration || 0.5;
          const animWithDelay = {
            ...anim,
            transition: {
              ...anim.transition,
              delay: accumulatedDelay
            }
          };
          accumulatedDelay += duration + (combinationOptions?.staggerDelay || 0.1);
          return animWithDelay;
        });
        
        return combinePresets(sequencedAnimations, { mode: 'merge' });
      } else {
        // Stagger mode
        const staggerDelay = combinationOptions?.staggerDelay || 0.1;
        const staggeredAnimations = resolvedAnimations.map((anim, index) => ({
          ...anim,
          transition: {
            ...anim.transition,
            delay: (anim.transition?.delay || 0) + (index * staggerDelay)
          }
        }));
        
        return combinePresets(staggeredAnimations, { mode: 'merge' });
      }
    }, [animations, shouldAnimate, combinationOptions]);

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
          initial={combinedAnimation.initial as any}
          animate={combinedAnimation.animate as any}
          exit={combinedAnimation.exit as any}
          transition={combinedAnimation.transition}
          whileHover={combinedAnimation.whileHover as any}
          whileTap={combinedAnimation.whileTap as any}
          whileInView={combinedAnimation.whileInView as any}
          whileDrag={combinedAnimation.whileDrag as any}
          whileFocus={combinedAnimation.whileFocus as any}
          viewport={viewportProps}
          {...motionProps}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    );
  }
);

MultiAnimation.displayName = 'MultiAnimation';