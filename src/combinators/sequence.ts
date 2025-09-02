import type { AnimationPreset } from '../types';
import type { SequenceOptions } from './types';

/**
 * Creates a sequential animation from multiple presets
 */
export function createSequence(
  presets: AnimationPreset[],
  options: SequenceOptions = {}
): AnimationPreset {
  const {
    interval = 0.3,
    overlap = 0,
    loop = false,
    reverse = false,
    ease = 'easeInOut'
  } = options;

  if (presets.length === 0) {
    return {};
  }

  const orderedPresets = reverse ? [...presets].reverse() : presets;

  // Build keyframe animations for sequential execution
  const sequentialPreset: AnimationPreset = {
    initial: orderedPresets[0]?.initial,
    animate: {},
    exit: orderedPresets[orderedPresets.length - 1]?.exit,
  };

  // Combine all animation properties into keyframes
  const keyframeProperties = new Set<string>();
  orderedPresets.forEach(preset => {
    if (preset.animate && typeof preset.animate === 'object') {
      Object.keys(preset.animate).forEach(key => keyframeProperties.add(key));
    }
  });

  // Build keyframe arrays for each property
  const animateKeyframes: any = {};
  const times: number[] = [];
  
  keyframeProperties.forEach(prop => {
    const values: any[] = [];
    let currentTime = 0;

    orderedPresets.forEach((preset, index) => {
      const value = preset.animate?.[prop as keyof typeof preset.animate];
      if (value !== undefined) {
        values.push(value);
        
        if (times.length <= index) {
          times.push(currentTime);
        }
        
        currentTime += interval - overlap;
      }
    });

    if (values.length > 0) {
      animateKeyframes[prop] = values;
    }
  });

  // Calculate total duration
  const totalDuration = Math.max(0, (orderedPresets.length * interval) - ((orderedPresets.length - 1) * overlap));

  sequentialPreset.animate = animateKeyframes;
  sequentialPreset.transition = {
    duration: totalDuration,
    ease,
    times: times.map(t => t / totalDuration), // Normalize times to 0-1
    ...(loop && { repeat: Infinity, repeatType: 'loop' })
  };

  // Handle hover, tap, and other interaction states
  if (orderedPresets.some(p => p.whileHover)) {
    sequentialPreset.whileHover = orderedPresets[orderedPresets.length - 1].whileHover;
  }
  
  if (orderedPresets.some(p => p.whileTap)) {
    sequentialPreset.whileTap = orderedPresets[orderedPresets.length - 1].whileTap;
  }

  return sequentialPreset;
}

/**
 * Creates a staggered sequence with overlapping animations
 */
export function createStaggeredSequence(
  presets: AnimationPreset[],
  staggerDelay: number = 0.1
): AnimationPreset[] {
  return presets.map((preset, index) => ({
    ...preset,
    transition: {
      ...preset.transition,
      delay: (preset.transition?.delay || 0) + (index * staggerDelay)
    }
  }));
}