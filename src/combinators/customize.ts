import type { AnimationPreset, AnimationOverrides, CustomizablePreset } from '../types';
import { mergeVariants } from './combine';

/**
 * Applies custom overrides to an animation preset
 */
export function applyOverrides(
  preset: AnimationPreset,
  overrides: AnimationOverrides
): AnimationPreset {
  const result: AnimationPreset = { ...preset };

  // Apply overrides to each animation state
  if (overrides.initial) {
    result.initial = mergeVariants(preset.initial, overrides.initial, 'merge');
  }

  if (overrides.animate) {
    result.animate = mergeVariants(preset.animate, overrides.animate, 'merge');
  }

  if (overrides.exit) {
    result.exit = mergeVariants(preset.exit, overrides.exit, 'merge');
  }

  if (overrides.whileHover) {
    result.whileHover = mergeVariants(preset.whileHover, overrides.whileHover, 'merge');
  }

  if (overrides.whileTap) {
    result.whileTap = mergeVariants(preset.whileTap, overrides.whileTap, 'merge');
  }

  if (overrides.whileInView) {
    result.whileInView = mergeVariants(preset.whileInView, overrides.whileInView, 'merge');
  }

  if (overrides.whileDrag) {
    result.whileDrag = mergeVariants(preset.whileDrag, overrides.whileDrag, 'merge');
  }

  if (overrides.whileFocus) {
    result.whileFocus = mergeVariants(preset.whileFocus, overrides.whileFocus, 'merge');
  }

  // Merge transition overrides
  if (overrides.transition) {
    result.transition = {
      ...preset.transition,
      ...overrides.transition
    };
  }

  return result;
}

/**
 * Higher-order function to create customizable presets
 */
export function withCustomization<T extends AnimationPreset>(
  presetFactory: (options?: any) => T
): (options?: any, overrides?: AnimationOverrides) => AnimationPreset {
  return (options?: any, overrides?: AnimationOverrides) => {
    const basePreset = presetFactory(options);
    
    if (overrides) {
      return applyOverrides(basePreset, overrides);
    }
    
    return basePreset;
  };
}

/**
 * Creates a preset builder with fluent API
 */
export class PresetBuilder {
  private preset: AnimationPreset = {};

  initial(variant: AnimationPreset['initial']): this {
    this.preset.initial = variant;
    return this;
  }

  animate(variant: AnimationPreset['animate']): this {
    this.preset.animate = variant;
    return this;
  }

  exit(variant: AnimationPreset['exit']): this {
    this.preset.exit = variant;
    return this;
  }

  whileHover(variant: AnimationPreset['whileHover']): this {
    this.preset.whileHover = variant;
    return this;
  }

  whileTap(variant: AnimationPreset['whileTap']): this {
    this.preset.whileTap = variant;
    return this;
  }

  whileInView(variant: AnimationPreset['whileInView']): this {
    this.preset.whileInView = variant;
    return this;
  }

  whileDrag(variant: AnimationPreset['whileDrag']): this {
    this.preset.whileDrag = variant;
    return this;
  }

  whileFocus(variant: AnimationPreset['whileFocus']): this {
    this.preset.whileFocus = variant;
    return this;
  }

  transition(config: AnimationPreset['transition']): this {
    this.preset.transition = config;
    return this;
  }

  spring(stiffness = 260, damping = 20, mass = 1): this {
    this.preset.transition = {
      type: 'spring',
      stiffness,
      damping,
      mass
    };
    return this;
  }

  duration(duration: number, ease: string | number[] = 'easeOut'): this {
    this.preset.transition = {
      duration,
      ease
    };
    return this;
  }

  delay(delay: number): this {
    this.preset.transition = {
      ...this.preset.transition,
      delay
    };
    return this;
  }

  build(): AnimationPreset {
    return { ...this.preset };
  }

  buildCustomizable(defaults?: AnimationOverrides): CustomizablePreset {
    return createCustomizablePreset(this.preset, defaults);
  }
}

/**
 * Factory function for creating customizable presets
 */
export function createCustomizablePreset(
  basePreset: AnimationPreset,
  defaults?: AnimationOverrides
): CustomizablePreset {
  const preset: CustomizablePreset = {
    ...basePreset,
    defaults,
    customize: (overrides: AnimationOverrides) => {
      return applyOverrides(basePreset, overrides);
    }
  };

  // Apply defaults if provided
  if (defaults) {
    return {
      ...applyOverrides(basePreset, defaults),
      defaults,
      customize: preset.customize
    };
  }

  return preset;
}

/**
 * Creates a preset with responsive behavior
 */
export function createResponsivePreset(
  mobilePreset: AnimationPreset,
  tabletPreset: AnimationPreset,
  desktopPreset: AnimationPreset
): (screenWidth: number) => AnimationPreset {
  return (screenWidth: number) => {
    if (screenWidth < 768) {
      return mobilePreset;
    } else if (screenWidth < 1024) {
      return tabletPreset;
    } else {
      return desktopPreset;
    }
  };
}