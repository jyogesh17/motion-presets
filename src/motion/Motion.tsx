import React, { forwardRef } from 'react';
import { motion, MotionProps as FramerMotionProps } from 'framer-motion';
import { AnimationPreset } from '../types';

/**
 * Enhanced Motion Component that wraps Framer Motion with our preset system
 * Users never need to import framer-motion directly
 */

export interface MotionPresetProps extends Omit<FramerMotionProps, 'initial' | 'animate' | 'exit'> {
  // Preset-based props
  preset?: string | AnimationPreset;
  effect?: string;
  
  // Quick animation props
  from?: any;
  to?: any;
  
  // Enhanced animation states
  initial?: any;
  animate?: any;
  exit?: any;
  
  // Simplified physics
  spring?: boolean | { stiffness?: number; damping?: number; mass?: number };
  duration?: number;
  delay?: number;
  ease?: string | number[];
  
  // Loop animations
  loop?: boolean | number;
  reverse?: boolean;
  yoyo?: boolean;
  
  // Stagger for children
  stagger?: number | { each?: number; from?: 'first' | 'last' | 'center' };
  
  // Viewport animations
  onView?: any;
  viewOptions?: { once?: boolean; amount?: number | 'all' | 'some'; margin?: string };
  
  // Scroll animations  
  onScroll?: (progress: number) => any;
  scrollOptions?: { target?: React.RefObject<Element>; offset?: string[] };
  
  // Gesture shortcuts
  hoverScale?: number;
  tapScale?: number;
  dragConstraints?: any;
  dragElastic?: number | boolean;
  
  // 3D transforms
  rotateX?: number | string;
  rotateY?: number | string;
  rotateZ?: number | string;
  perspective?: number;
  transformStyle?: 'flat' | 'preserve-3d';
  
  // Advanced
  variants?: any;
  custom?: any;
  
  // Component type
  as?: keyof JSX.IntrinsicElements;
}

/**
 * Universal Motion component that adapts to any HTML element
 */
export const Motion = forwardRef<HTMLElement, MotionPresetProps>(
  ({ 
    as = 'div',
    preset,
    effect,
    from,
    to,
    initial,
    animate,
    exit,
    spring,
    duration,
    delay,
    ease,
    loop,
    reverse,
    yoyo,
    stagger,
    onView,
    viewOptions,
    onScroll,
    scrollOptions,
    hoverScale,
    tapScale,
    dragConstraints,
    dragElastic,
    rotateX,
    rotateY,
    rotateZ,
    perspective,
    transformStyle,
    variants,
    custom,
    children,
    ...restProps
  }, ref) => {
    // Get the motion component for the specified element
    const MotionComponent = motion[as as keyof typeof motion] as any;
    
    // Build animation props from our simplified API
    const animationProps: FramerMotionProps = {
      ...restProps
    };
    
    // Handle preset
    if (preset) {
      const presetAnimation = typeof preset === 'string' 
        ? getPresetByName(preset)
        : preset;
      
      if (presetAnimation) {
        animationProps.initial = presetAnimation.initial as any;
        animationProps.animate = presetAnimation.animate as any;
        animationProps.exit = presetAnimation.exit as any;
        animationProps.transition = presetAnimation.transition;
      }
    }
    
    // Handle from/to shorthand
    if (from !== undefined) {
      animationProps.initial = from;
    }
    if (to !== undefined) {
      animationProps.animate = to;
    }
    
    // Override with explicit props
    if (initial !== undefined) animationProps.initial = initial;
    if (animate !== undefined) animationProps.animate = animate;
    if (exit !== undefined) animationProps.exit = exit;
    
    // Build transition
    const transition: any = {};
    
    if (spring) {
      if (typeof spring === 'boolean') {
        transition.type = 'spring';
      } else {
        transition.type = 'spring';
        transition.stiffness = spring.stiffness;
        transition.damping = spring.damping;
        transition.mass = spring.mass;
      }
    } else if (duration !== undefined) {
      transition.type = 'tween';
      transition.duration = duration;
      if (ease) transition.ease = ease;
    }
    
    if (delay !== undefined) transition.delay = delay;
    
    // Handle loop
    if (loop) {
      transition.repeat = typeof loop === 'number' ? loop : Infinity;
      if (reverse) transition.repeatType = 'reverse';
      if (yoyo) transition.repeatType = 'mirror';
    }
    
    // Handle stagger
    if (stagger !== undefined) {
      if (typeof stagger === 'number') {
        transition.staggerChildren = stagger;
      } else {
        transition.staggerChildren = stagger.each;
        transition.staggerDirection = stagger.from === 'last' ? -1 : 1;
      }
    }
    
    if (Object.keys(transition).length > 0) {
      animationProps.transition = transition;
    }
    
    // Handle viewport animations
    if (onView !== undefined) {
      animationProps.whileInView = onView;
      animationProps.viewport = viewOptions;
    }
    
    // Handle hover/tap scale shortcuts
    if (hoverScale !== undefined) {
      animationProps.whileHover = { scale: hoverScale };
    }
    if (tapScale !== undefined) {
      animationProps.whileTap = { scale: tapScale };
    }
    
    // Handle drag
    if (dragConstraints !== undefined) {
      animationProps.drag = true;
      animationProps.dragConstraints = dragConstraints;
      if (dragElastic !== undefined) {
        animationProps.dragElastic = dragElastic;
      }
    }
    
    // Handle 3D transforms
    if (rotateX !== undefined || rotateY !== undefined || rotateZ !== undefined) {
      const style: any = animationProps.style || {};
      if (rotateX !== undefined) style.rotateX = rotateX;
      if (rotateY !== undefined) style.rotateY = rotateY;
      if (rotateZ !== undefined) style.rotateZ = rotateZ;
      if (perspective !== undefined) style.perspective = perspective;
      if (transformStyle !== undefined) style.transformStyle = transformStyle;
      animationProps.style = style;
    }
    
    // Handle variants and custom
    if (variants !== undefined) animationProps.variants = variants;
    if (custom !== undefined) animationProps.custom = custom;
    
    return (
      <MotionComponent ref={ref} {...animationProps}>
        {children}
      </MotionComponent>
    );
  }
);

Motion.displayName = 'Motion';

// Preset registry (would be populated from presets)
function getPresetByName(_name: string): AnimationPreset | null {
  // This would look up from a registry of presets
  // For now, return null
  return null;
}

/**
 * Create specialized motion components with default props
 */
export function createMotion<P extends MotionPresetProps>(
  defaultProps: Partial<P>
) {
  return forwardRef<HTMLElement, P>((props, ref) => {
    return <Motion ref={ref} {...defaultProps} {...props} />;
  });
}

// Pre-configured Motion components for common elements
export const MotionDiv = createMotion({ as: 'div' });
export const MotionSpan = createMotion({ as: 'span' });
export const MotionButton = createMotion({ as: 'button' });
export const MotionSection = createMotion({ as: 'section' });
export const MotionArticle = createMotion({ as: 'article' });
export const MotionHeader = createMotion({ as: 'header' });
export const MotionFooter = createMotion({ as: 'footer' });
export const MotionNav = createMotion({ as: 'nav' });
export const MotionImg = createMotion({ as: 'img' });
export const MotionSvg = createMotion({ as: 'svg' });

// Specialized components with built-in effects
export const FadeIn = createMotion({ 
  from: { opacity: 0 },
  to: { opacity: 1 },
  duration: 0.5
});

export const SlideIn = createMotion({
  from: { x: -100, opacity: 0 },
  to: { x: 0, opacity: 1 },
  spring: true
});

export const ScaleIn = createMotion({
  from: { scale: 0, opacity: 0 },
  to: { scale: 1, opacity: 1 },
  spring: { stiffness: 200, damping: 20 }
});

export const RotateIn = createMotion({
  from: { rotate: -180, opacity: 0 },
  to: { rotate: 0, opacity: 1 },
  duration: 0.6
});