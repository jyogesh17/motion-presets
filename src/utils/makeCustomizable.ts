import type { AnimationPreset } from '../types';

export interface CustomizableOptions {
  initial?: Record<string, any>;
  animate?: Record<string, any>;
  exit?: Record<string, any>;
  transition?: Record<string, any>;
  whileHover?: Record<string, any>;
  whileTap?: Record<string, any>;
  whileInView?: Record<string, any>;
  whileDrag?: Record<string, any>;
  whileFocus?: Record<string, any>;
}

/**
 * Makes any animation preset customizable by wrapping it in a function
 * that accepts options to override any part of the animation
 */
export function makeCustomizable<T extends CustomizableOptions = CustomizableOptions>(
  basePreset: AnimationPreset | (() => AnimationPreset),
  defaultOptions?: T
) {
  return (options?: Partial<T>): AnimationPreset => {
    // Get the base preset (either static or from function)
    const preset = typeof basePreset === 'function' ? basePreset() : basePreset;
    
    // Merge options with defaults
    const mergedOptions = {
      ...defaultOptions,
      ...options,
    } as T;

    // Apply overrides to create customized preset
    return {
      initial: {
        ...preset.initial,
        ...mergedOptions.initial,
      },
      animate: {
        ...preset.animate,
        ...mergedOptions.animate,
      },
      exit: {
        ...preset.exit,
        ...mergedOptions.exit,
      },
      transition: {
        ...preset.transition,
        ...mergedOptions.transition,
      },
      whileHover: mergedOptions.whileHover ? {
        ...preset.whileHover,
        ...mergedOptions.whileHover,
      } : preset.whileHover,
      whileTap: mergedOptions.whileTap ? {
        ...preset.whileTap,
        ...mergedOptions.whileTap,
      } : preset.whileTap,
      whileInView: mergedOptions.whileInView ? {
        ...preset.whileInView,
        ...mergedOptions.whileInView,
      } : preset.whileInView,
      whileDrag: mergedOptions.whileDrag ? {
        ...preset.whileDrag,
        ...mergedOptions.whileDrag,
      } : preset.whileDrag,
      whileFocus: mergedOptions.whileFocus ? {
        ...preset.whileFocus,
        ...mergedOptions.whileFocus,
      } : preset.whileFocus,
    };
  };
}

/**
 * Create a preset factory with typed options
 */
export function createPresetFactory<T extends CustomizableOptions>(
  name: string,
  generator: (options?: T) => AnimationPreset,
  defaultOptions?: T
) {
  const factory = (options?: T) => generator({ ...defaultOptions, ...options });
  
  // Add metadata
  factory.presetName = name;
  factory.defaultOptions = defaultOptions;
  factory.generator = generator;
  
  // Add utility methods
  factory.withDefaults = (newDefaults: Partial<T>) => 
    createPresetFactory(name, generator, { ...defaultOptions, ...newDefaults });
  
  factory.extend = (extender: (preset: AnimationPreset) => AnimationPreset) =>
    createPresetFactory(
      `${name}-extended`,
      (options?: T) => extender(generator(options)),
      defaultOptions
    );
  
  factory.combine = (otherPreset: AnimationPreset | (() => AnimationPreset)) =>
    createPresetFactory(
      `${name}-combined`,
      (options?: T) => {
        const base = generator(options);
        const other = typeof otherPreset === 'function' ? otherPreset() : otherPreset;
        return {
          initial: { ...base.initial, ...other.initial },
          animate: { ...base.animate, ...other.animate },
          exit: { ...base.exit, ...other.exit },
          transition: { ...base.transition, ...other.transition },
          whileHover: { ...base.whileHover, ...other.whileHover },
          whileTap: { ...base.whileTap, ...other.whileTap },
          whileInView: { ...base.whileInView, ...other.whileInView },
          whileDrag: { ...base.whileDrag, ...other.whileDrag },
          whileFocus: { ...base.whileFocus, ...other.whileFocus },
        };
      },
      defaultOptions
    );
  
  return factory;
}

/**
 * Batch create customizable presets
 */
export function createCustomizablePresets<T extends Record<string, AnimationPreset>>(
  presets: T
): { [K in keyof T]: (options?: CustomizableOptions) => AnimationPreset } {
  const customizablePresets: any = {};
  
  for (const [name, preset] of Object.entries(presets)) {
    customizablePresets[name] = makeCustomizable(preset);
  }
  
  return customizablePresets;
}

/**
 * Create a preset variant system
 */
export interface VariantOptions<T extends string = string> {
  variant?: T;
  [key: string]: any;
}

export function createVariantPreset<T extends string>(
  variants: Record<T, AnimationPreset | ((options?: any) => AnimationPreset)>,
  defaultVariant: T
) {
  return (options?: VariantOptions<T>): AnimationPreset => {
    const variant = options?.variant ?? defaultVariant;
    const presetOrFactory = variants[variant];
    
    if (!presetOrFactory) {
      console.warn(`Unknown variant: ${variant}. Using default: ${defaultVariant}`);
      const defaultPreset = variants[defaultVariant];
      return typeof defaultPreset === 'function' ? defaultPreset(options) : defaultPreset;
    }
    
    return typeof presetOrFactory === 'function' ? presetOrFactory(options) : presetOrFactory;
  };
}

/**
 * Utility to chain multiple customizations
 */
export function chainCustomizations(
  ...customizers: Array<(preset: AnimationPreset) => AnimationPreset>
) {
  return (basePreset: AnimationPreset): AnimationPreset => {
    return customizers.reduce((preset, customizer) => customizer(preset), basePreset);
  };
}

/**
 * Create responsive variants
 */
export interface ResponsiveOptions {
  mobile?: Partial<AnimationPreset>;
  tablet?: Partial<AnimationPreset>;
  desktop?: Partial<AnimationPreset>;
  breakpoints?: {
    mobile?: number;
    tablet?: number;
  };
}

export function createResponsivePreset(
  basePreset: AnimationPreset,
  options: ResponsiveOptions
) {
  return (): AnimationPreset => {
    const width = typeof window !== 'undefined' ? window.innerWidth : 1024;
    const breakpoints = {
      mobile: options.breakpoints?.mobile ?? 640,
      tablet: options.breakpoints?.tablet ?? 1024,
    };
    
    let variant: keyof ResponsiveOptions = 'desktop';
    if (width <= breakpoints.mobile) {
      variant = 'mobile';
    } else if (width <= breakpoints.tablet) {
      variant = 'tablet';
    }
    
    const overrides = options[variant] || {};
    
    return {
      ...basePreset,
      ...overrides,
      initial: { ...basePreset.initial, ...overrides.initial },
      animate: { ...basePreset.animate, ...overrides.animate },
      exit: { ...basePreset.exit, ...overrides.exit },
      transition: { ...basePreset.transition, ...overrides.transition },
    };
  };
}