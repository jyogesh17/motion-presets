import type { AnimationPreset } from '../types';

// Customization options for attention animations
export interface RotateOptions {
  initialRotation?: number;
  targetRotation?: number;
  exitRotation?: number;
  initialScale?: number;
  targetScale?: number;
  initialOpacity?: number;
  targetOpacity?: number;
  duration?: number;
  ease?: string;
}

export interface FlipOptions {
  initialRotation?: number;
  targetRotation?: number;
  exitRotation?: number;
  initialOpacity?: number;
  targetOpacity?: number;
  duration?: number;
  ease?: string;
  axis?: 'x' | 'y';
}

export interface BounceOptions {
  initialY?: number;
  targetY?: number;
  hoverY?: number;
  initialOpacity?: number;
  targetOpacity?: number;
  bounce?: number;
  duration?: number;
  springStiffness?: number;
}

export interface PulseOptions {
  baseScale?: number;
  hoverScale?: number;
  duration?: number;
  repeat?: number | 'Infinity';
}

export interface ShakeOptions {
  amplitude?: number;
  duration?: number;
  oscillations?: number;
}

export interface SwingOptions {
  amplitude?: number;
  duration?: number;
  oscillations?: number;
}

// Rotation animations
export const rotate = (options?: RotateOptions): AnimationPreset => ({
  initial: { rotate: options?.initialRotation ?? -180, opacity: options?.initialOpacity ?? 0 },
  animate: { rotate: options?.targetRotation ?? 0, opacity: options?.targetOpacity ?? 1 },
  exit: { rotate: options?.exitRotation ?? 180, opacity: options?.initialOpacity ?? 0 },
  transition: { duration: options?.duration ?? 0.6, ease: options?.ease ?? 'easeInOut' },
});

export const rotateIn = (options?: RotateOptions): AnimationPreset => ({
  initial: { 
    rotate: options?.initialRotation ?? -90, 
    scale: options?.initialScale ?? 0.8, 
    opacity: options?.initialOpacity ?? 0 
  },
  animate: { 
    rotate: options?.targetRotation ?? 0, 
    scale: options?.targetScale ?? 1, 
    opacity: options?.targetOpacity ?? 1 
  },
  exit: { 
    rotate: options?.exitRotation ?? 90, 
    scale: options?.initialScale ?? 0.8, 
    opacity: options?.initialOpacity ?? 0 
  },
  transition: { duration: options?.duration ?? 0.5, ease: options?.ease ?? 'easeOut' },
});

// Flip animations
export const flip = (options?: FlipOptions): AnimationPreset => ({
  initial: { rotateY: options?.initialRotation ?? 90, opacity: options?.initialOpacity ?? 0 },
  animate: { rotateY: options?.targetRotation ?? 0, opacity: options?.targetOpacity ?? 1 },
  exit: { rotateY: options?.exitRotation ?? -90, opacity: options?.initialOpacity ?? 0 },
  transition: { duration: options?.duration ?? 0.6, ease: options?.ease ?? 'easeInOut' },
});

export const flipX = (options?: FlipOptions): AnimationPreset => ({
  initial: { rotateX: options?.initialRotation ?? 90, opacity: options?.initialOpacity ?? 0 },
  animate: { rotateX: options?.targetRotation ?? 0, opacity: options?.targetOpacity ?? 1 },
  exit: { rotateX: options?.exitRotation ?? -90, opacity: options?.initialOpacity ?? 0 },
  transition: { duration: options?.duration ?? 0.6, ease: options?.ease ?? 'easeInOut' },
});

export const flipY = (options?: FlipOptions): AnimationPreset => ({
  initial: { rotateY: options?.initialRotation ?? 90, opacity: options?.initialOpacity ?? 0 },
  animate: { rotateY: options?.targetRotation ?? 0, opacity: options?.targetOpacity ?? 1 },
  exit: { rotateY: options?.exitRotation ?? -90, opacity: options?.initialOpacity ?? 0 },
  transition: { duration: options?.duration ?? 0.6, ease: options?.ease ?? 'easeInOut' },
});

// Bounce animation
export const bounce = (options?: BounceOptions): AnimationPreset => ({
  initial: { y: options?.initialY ?? -100, opacity: options?.initialOpacity ?? 0 },
  animate: { 
    y: options?.targetY ?? 0, 
    opacity: options?.targetOpacity ?? 1,
    transition: {
      type: 'spring',
      bounce: options?.bounce ?? 0.4,
      duration: options?.duration ?? 0.8,
    }
  },
  whileHover: {
    y: options?.hoverY ?? -10,
    transition: { type: 'spring', stiffness: options?.springStiffness ?? 400 }
  },
});

// Pulse animation
export const pulse = (options?: PulseOptions): AnimationPreset => ({
  initial: { scale: options?.baseScale ?? 1 },
  animate: { 
    scale: options?.baseScale ?? 1,
  },
  whileHover: {
    scale: [
      options?.baseScale ?? 1, 
      options?.hoverScale ?? 1.05, 
      options?.baseScale ?? 1
    ],
    transition: {
      duration: options?.duration ?? 0.3,
      repeat: options?.repeat === 'Infinity' ? Infinity : (options?.repeat ?? Infinity),
      repeatType: 'reverse',
    }
  },
});

// Shake animation
export const shake = (options?: ShakeOptions): AnimationPreset => {
  const amplitude = options?.amplitude ?? 5;
  const oscillations = options?.oscillations ?? 4;
  const pattern: number[] = [];
  
  for (let i = 0; i < oscillations; i++) {
    pattern.push(-amplitude, amplitude);
  }
  pattern.push(0);
  
  return {
    initial: { x: 0 },
    animate: { x: 0 },
    whileHover: {
      x: pattern,
      transition: {
        duration: options?.duration ?? 0.4,
      }
    },
  };
};

// Swing animation
export const swing = (options?: SwingOptions): AnimationPreset => {
  const amplitude = options?.amplitude ?? 10;
  const oscillations = options?.oscillations ?? 2;
  const pattern: number[] = [0];
  
  for (let i = 0; i < oscillations; i++) {
    pattern.push(amplitude, -amplitude);
  }
  pattern.push(0);
  
  return {
    initial: { rotate: 0 },
    animate: { rotate: 0 },
    whileHover: {
      rotate: pattern,
      transition: {
        duration: options?.duration ?? 0.5,
      }
    },
  };
};