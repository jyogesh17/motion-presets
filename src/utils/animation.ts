import type { AnimationPreset } from '../types';

interface AnimationOptions {
  delay?: number;
  duration?: number;
}

export function getAnimationProps(
  preset: AnimationPreset,
  options: AnimationOptions = {}
): AnimationPreset {
  const { delay = 0, duration } = options;

  // Clone the preset to avoid mutation
  const animationProps = { ...preset };

  // Apply custom transition options
  if (animationProps.transition || delay || duration) {
    animationProps.transition = {
      ...animationProps.transition,
      ...(delay && { delay }),
      ...(duration && { duration }),
    };
  }

  // Apply delay to animate transition if it exists
  if (animationProps.animate && typeof animationProps.animate === 'object' && 'transition' in animationProps.animate) {
    animationProps.animate = {
      ...animationProps.animate,
      transition: {
        ...(animationProps.animate.transition as object),
        ...(delay && { delay }),
        ...(duration && { duration }),
      },
    };
  }

  return animationProps;
}

export function combineClassNames(...classes: (string | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function isServer(): boolean {
  return typeof window === 'undefined';
}