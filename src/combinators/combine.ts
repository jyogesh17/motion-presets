import type { AnimationPreset, AnimationOverrides, CustomizablePreset } from '../types';
import type { Variant } from 'framer-motion';
import type { CombinatorOptions } from './types';

/**
 * Deep merges two variants, handling arrays and objects
 */
export function mergeVariants(
  base: Variant | undefined,
  override: Variant | undefined,
  mode: 'merge' | 'override' | 'blend' = 'merge'
): Variant | undefined {
  if (!base) return override;
  if (!override) return base;
  
  if (mode === 'override') {
    return override;
  }

  const result: any = { ...base };

  for (const key in override) {
    const baseValue = (base as any)[key];
    const overrideValue = (override as any)[key];

    if (mode === 'blend' && typeof baseValue === 'number' && typeof overrideValue === 'number') {
      // Blend numeric values (average)
      result[key] = (baseValue + overrideValue) / 2;
    } else if (Array.isArray(overrideValue)) {
      // Handle array values (keyframes)
      if (Array.isArray(baseValue)) {
        result[key] = mode === 'merge' 
          ? [...baseValue, ...overrideValue]
          : overrideValue;
      } else {
        result[key] = overrideValue;
      }
    } else if (typeof overrideValue === 'object' && overrideValue !== null) {
      // Recursively merge objects
      if (typeof baseValue === 'object' && baseValue !== null) {
        result[key] = mergeVariants(baseValue, overrideValue, mode);
      } else {
        result[key] = overrideValue;
      }
    } else {
      // Direct assignment for primitives
      result[key] = overrideValue;
    }
  }

  return result;
}

/**
 * Combines multiple animation presets into a single preset
 */
export function combinePresets(
  presets: AnimationPreset[],
  options: CombinatorOptions = {}
): AnimationPreset {
  const { mode = 'merge', priority = 'last' } = options;

  if (presets.length === 0) {
    return {};
  }

  if (presets.length === 1) {
    return presets[0];
  }

  // Determine processing order based on priority
  let orderedPresets = [...presets];
  if (priority === 'first') {
    orderedPresets = orderedPresets.reverse();
  } else if (priority === 'custom' && options.customPriority) {
    orderedPresets = options.customPriority.map(i => presets[i]).filter(Boolean);
  }

  // Combine all presets
  const combined: AnimationPreset = orderedPresets.reduce((acc, preset) => {
    return {
      initial: mergeVariants(acc.initial, preset.initial, mode),
      animate: mergeVariants(acc.animate, preset.animate, mode),
      exit: mergeVariants(acc.exit, preset.exit, mode),
      whileHover: mergeVariants(acc.whileHover, preset.whileHover, mode),
      whileTap: mergeVariants(acc.whileTap, preset.whileTap, mode),
      whileInView: mergeVariants(acc.whileInView, preset.whileInView, mode),
      whileDrag: mergeVariants(acc.whileDrag, preset.whileDrag, mode),
      whileFocus: mergeVariants(acc.whileFocus, preset.whileFocus, mode),
      transition: mergeTransitions(acc.transition, preset.transition),
    };
  }, {} as AnimationPreset);

  return combined;
}

/**
 * Merges transition configurations
 */
function mergeTransitions(
  base: any,
  override: any
): any {
  if (!base) return override;
  if (!override) return base;

  // Handle different transition types
  const result = { ...base };

  // Merge duration, delay, and other common properties
  if (override.duration !== undefined) result.duration = override.duration;
  if (override.delay !== undefined) result.delay = (base.delay || 0) + override.delay;
  if (override.ease !== undefined) result.ease = override.ease;
  
  // Handle spring-specific properties
  if (override.type === 'spring' || base.type === 'spring') {
    result.type = 'spring';
    if (override.stiffness !== undefined) result.stiffness = override.stiffness;
    if (override.damping !== undefined) result.damping = override.damping;
    if (override.mass !== undefined) result.mass = override.mass;
    if (override.velocity !== undefined) result.velocity = override.velocity;
  }

  // Handle keyframe-specific properties
  if (override.times !== undefined) result.times = override.times;
  if (override.repeat !== undefined) result.repeat = override.repeat;
  if (override.repeatType !== undefined) result.repeatType = override.repeatType;
  if (override.repeatDelay !== undefined) result.repeatDelay = override.repeatDelay;

  return result;
}

/**
 * Creates a preset that can be easily customized
 */
export function createCustomizablePreset(
  basePreset: AnimationPreset,
  defaults?: AnimationOverrides
): CustomizablePreset {
  const preset: CustomizablePreset = {
    ...basePreset,
    defaults,
    customize: (overrides: AnimationOverrides) => {
      return combinePresets([basePreset, overrides as AnimationPreset], { mode: 'merge' });
    }
  };

  // Apply defaults if provided
  if (defaults) {
    return {
      ...combinePresets([basePreset, defaults as AnimationPreset], { mode: 'merge' }),
      defaults,
      customize: preset.customize
    };
  }

  return preset;
}