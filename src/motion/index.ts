/**
 * Motion Primitives
 * Direct access to motion components and utilities for building custom animations
 */

import { motion, MotionProps } from 'framer-motion';
import React, { forwardRef } from 'react';

// Export motion components directly
export const MotionDiv = motion.div;
export const MotionSpan = motion.span;
export const MotionButton = motion.button;
export const MotionSection = motion.section;
export const MotionArticle = motion.article;
export const MotionHeader = motion.header;
export const MotionFooter = motion.footer;
export const MotionNav = motion.nav;
export const MotionAside = motion.aside;
export const MotionMain = motion.main;
export const MotionUl = motion.ul;
export const MotionLi = motion.li;
export const MotionImg = motion.img;
export const MotionSvg = motion.svg;
export const MotionPath = motion.path;
export const MotionCircle = motion.circle;
export const MotionRect = motion.rect;

// Export the motion factory for custom components
export { motion } from 'framer-motion';

/**
 * Create custom motion component with default props
 */
export function createMotionComponent(
  element: keyof JSX.IntrinsicElements,
  defaultProps?: Partial<MotionProps>
) {
  const MotionComponent = (motion as any)[element];
  
  return forwardRef<HTMLElement, MotionProps>((props, ref) => {
    return React.createElement(MotionComponent, { ref, ...defaultProps, ...props });
  });
}

/**
 * Create variants object helper
 */
export function createVariants<T extends Record<string, any>>(variants: T): T {
  return variants;
}

/**
 * Create animation timeline
 */
export function createTimeline(
  animations: Array<{
    target: string;
    animation: any;
    at?: number | string;
  }>
) {
  // Timeline logic here
  return animations;
}

/**
 * Create keyframes helper
 */
export function createKeyframes<T>(
  values: T[],
  options?: {
    times?: number[];
    ease?: string | string[];
    duration?: number;
  }
) {
  return {
    values,
    ...options
  };
}

/**
 * Create custom transition
 */
export function createTransition(config: {
  type?: 'spring' | 'tween' | 'inertia';
  duration?: number;
  delay?: number;
  stiffness?: number;
  damping?: number;
  mass?: number;
  ease?: string | number[];
  repeat?: number;
  repeatType?: 'loop' | 'reverse' | 'mirror';
  repeatDelay?: number;
}) {
  return config;
}

/**
 * Create gesture handlers
 */
export function createGestureHandlers(handlers: {
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
  onTapStart?: () => void;
  onTap?: () => void;
  onTapCancel?: () => void;
  onDragStart?: () => void;
  onDrag?: () => void;
  onDragEnd?: () => void;
  onPan?: () => void;
  onPanStart?: () => void;
  onPanEnd?: () => void;
}) {
  return handlers;
}