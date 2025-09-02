/**
 * Core Animation Utilities
 * Export Framer Motion primitives and utilities for users to create custom effects
 */

// Motion values
export {
  useMotionValue,
  useTransform,
  useSpring,
  useVelocity,
  useMotionValueEvent,
  useAnimation,
  useAnimationControls,
  useScroll,
  useViewportScroll,
  useElementScroll,
  useDragControls,
  useInView,
  useIsPresent,
  animate,
  animateValue,
  AnimatePresence,
  LayoutGroup,
  useReducedMotion as useFramerReducedMotion,
  useMotionTemplate,
  transform,
} from 'framer-motion';

// Export types separately
export type {
  AnimationControls,
  PanInfo,
  MotionValue,
  Spring,
  Tween,
  Keyframes,
  Variant,
  Variants,
  TargetAndTransition,
  AnimationProps,
  MotionProps,
} from 'framer-motion';

// Re-export our enhanced utilities
export { useReducedMotion } from '../hooks/useReducedMotion';
export { useMousePosition, useMouseVelocity } from '../hooks/useMousePosition';

import type { Spring, Easing } from 'framer-motion';

/**
 * Helper to create spring configs
 */
export function createSpringConfig(
  stiffness = 100, 
  damping = 10, 
  mass = 1
): Spring {
  return {
    type: 'spring',
    stiffness,
    damping,
    mass
  };
}

/**
 * Helper to create tween configs
 */
export function createTweenConfig(
  duration = 0.3,
  ease: Easing | Easing[] = 'easeOut',
  delay = 0
): any {
  return {
    type: 'tween',
    duration,
    ease,
    delay
  };
}