import type { AnimationPreset } from '../types';
import type { ParallelOptions } from './types';
import { combinePresets } from './combine';

/**
 * Creates parallel animations that run simultaneously
 */
export function createParallel(
  presets: AnimationPreset[],
  options: ParallelOptions = {}
): AnimationPreset {
  const {
    stagger = 0,
    delayPattern = 'linear',
    syncTransitions = false
  } = options;

  if (presets.length === 0) {
    return {};
  }

  // Apply stagger delays if specified
  const staggeredPresets = presets.map((preset, index) => {
    if (stagger === 0) return preset;

    const delay = calculateDelay(index, stagger, delayPattern);
    
    return {
      ...preset,
      transition: {
        ...preset.transition,
        delay: (preset.transition?.delay || 0) + delay
      }
    };
  });

  // Synchronize transition durations if requested
  if (syncTransitions) {
    const maxDuration = Math.max(
      ...staggeredPresets.map(p => 
        (p.transition as any)?.duration || 0.5
      )
    );

    staggeredPresets.forEach(preset => {
      if (preset.transition) {
        (preset.transition as any).duration = maxDuration;
      }
    });
  }

  // Combine all presets to run in parallel
  return combinePresets(staggeredPresets, { mode: 'merge' });
}

/**
 * Calculates delay based on pattern
 */
function calculateDelay(
  index: number,
  baseDelay: number,
  pattern: ParallelOptions['delayPattern']
): number {
  if (typeof pattern === 'function') {
    return pattern(index);
  }

  switch (pattern) {
    case 'exponential':
      return baseDelay * Math.pow(1.5, index);
    case 'random':
      return baseDelay * Math.random() * (index + 1);
    case 'linear':
    default:
      return baseDelay * index;
  }
}

/**
 * Creates a wave animation effect
 */
export function createWave(
  preset: AnimationPreset,
  count: number,
  waveDelay: number = 0.05
): AnimationPreset[] {
  return Array.from({ length: count }, (_, i) => ({
    ...preset,
    transition: {
      ...preset.transition,
      delay: (preset.transition?.delay || 0) + (i * waveDelay)
    }
  }));
}

/**
 * Creates a radial/ripple animation effect
 */
export function createRipple(
  preset: AnimationPreset,
  rows: number,
  cols: number,
  centerX: number = 0.5,
  centerY: number = 0.5,
  speed: number = 0.1
): AnimationPreset[][] {
  const result: AnimationPreset[][] = [];

  for (let row = 0; row < rows; row++) {
    const rowPresets: AnimationPreset[] = [];
    
    for (let col = 0; col < cols; col++) {
      const normalizedX = col / (cols - 1);
      const normalizedY = row / (rows - 1);
      
      const distance = Math.sqrt(
        Math.pow(normalizedX - centerX, 2) + 
        Math.pow(normalizedY - centerY, 2)
      );
      
      const delay = distance * speed;
      
      rowPresets.push({
        ...preset,
        transition: {
          ...preset.transition,
          delay: (preset.transition?.delay || 0) + delay
        }
      });
    }
    
    result.push(rowPresets);
  }

  return result;
}