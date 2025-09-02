import type { AnimationPreset } from '../types';

export interface GlobalAnimationConfig {
  defaultDuration?: number;
  defaultEase?: string;
  defaultDelay?: number;
  respectReducedMotion?: boolean;
  defaultOnce?: boolean;
  defaultAmount?: number;
  defaultStaggerChildren?: number;
  defaultSpring?: {
    stiffness?: number;
    damping?: number;
    mass?: number;
  };
  customPresets?: Record<string, AnimationPreset | (() => AnimationPreset)>;
  overrides?: {
    fadeIn?: Partial<AnimationPreset>;
    slideIn?: Partial<AnimationPreset>;
    zoomIn?: Partial<AnimationPreset>;
    [key: string]: Partial<AnimationPreset> | undefined;
  };
}

class AnimationConfigManager {
  private config: GlobalAnimationConfig = {
    defaultDuration: 0.5,
    defaultEase: 'easeOut',
    defaultDelay: 0,
    respectReducedMotion: true,
    defaultOnce: false,
    defaultAmount: 0.3,
    defaultStaggerChildren: 0.1,
    defaultSpring: {
      stiffness: 100,
      damping: 10,
      mass: 1,
    },
    customPresets: {},
    overrides: {},
  };

  /**
   * Get the current global configuration
   */
  getConfig(): GlobalAnimationConfig {
    return { ...this.config };
  }

  /**
   * Update the global configuration
   */
  setConfig(newConfig: Partial<GlobalAnimationConfig>): void {
    this.config = {
      ...this.config,
      ...newConfig,
      defaultSpring: {
        ...this.config.defaultSpring,
        ...newConfig.defaultSpring,
      },
      customPresets: {
        ...this.config.customPresets,
        ...newConfig.customPresets,
      },
      overrides: {
        ...this.config.overrides,
        ...newConfig.overrides,
      },
    };
  }

  /**
   * Reset configuration to defaults
   */
  resetConfig(): void {
    this.config = {
      defaultDuration: 0.5,
      defaultEase: 'easeOut',
      defaultDelay: 0,
      respectReducedMotion: true,
      defaultOnce: false,
      defaultAmount: 0.3,
      defaultStaggerChildren: 0.1,
      defaultSpring: {
        stiffness: 100,
        damping: 10,
        mass: 1,
      },
      customPresets: {},
      overrides: {},
    };
  }

  /**
   * Register a custom preset globally
   */
  registerPreset(name: string, preset: AnimationPreset | (() => AnimationPreset)): void {
    if (!this.config.customPresets) {
      this.config.customPresets = {};
    }
    this.config.customPresets[name] = preset;
  }

  /**
   * Register multiple custom presets
   */
  registerPresets(presets: Record<string, AnimationPreset | (() => AnimationPreset)>): void {
    if (!this.config.customPresets) {
      this.config.customPresets = {};
    }
    this.config.customPresets = {
      ...this.config.customPresets,
      ...presets,
    };
  }

  /**
   * Get a specific configuration value
   */
  get<K extends keyof GlobalAnimationConfig>(key: K): GlobalAnimationConfig[K] {
    return this.config[key];
  }

  /**
   * Apply global overrides to a preset
   */
  applyGlobalOverrides(presetName: string, preset: AnimationPreset): AnimationPreset {
    const override = this.config.overrides?.[presetName];
    if (!override) return preset;

    return {
      ...preset,
      ...override,
      initial: { ...preset.initial, ...override.initial },
      animate: { ...preset.animate, ...override.animate },
      exit: { ...preset.exit, ...override.exit },
      transition: { ...preset.transition, ...override.transition },
    };
  }
}

// Create singleton instance
export const animationConfig = new AnimationConfigManager();

// Configuration hook for React components
import { useEffect, useState } from 'react';

export function useAnimationConfig() {
  const [config, setConfig] = useState(animationConfig.getConfig());

  useEffect(() => {
    // Update local state when global config changes
    const interval = setInterval(() => {
      const currentConfig = animationConfig.getConfig();
      if (JSON.stringify(currentConfig) !== JSON.stringify(config)) {
        setConfig(currentConfig);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [config]);

  return {
    config,
    setConfig: (newConfig: Partial<GlobalAnimationConfig>) => {
      animationConfig.setConfig(newConfig);
      setConfig(animationConfig.getConfig());
    },
    resetConfig: () => {
      animationConfig.resetConfig();
      setConfig(animationConfig.getConfig());
    },
    registerPreset: (name: string, preset: AnimationPreset | (() => AnimationPreset)) => {
      animationConfig.registerPreset(name, preset);
      setConfig(animationConfig.getConfig());
    },
  };
}

// Export convenience functions
export const setGlobalAnimationConfig = (config: Partial<GlobalAnimationConfig>) => 
  animationConfig.setConfig(config);

export const registerGlobalPreset = (name: string, preset: AnimationPreset | (() => AnimationPreset)) => 
  animationConfig.registerPreset(name, preset);

export const registerGlobalPresets = (presets: Record<string, AnimationPreset | (() => AnimationPreset)>) => 
  animationConfig.registerPresets(presets);

export const getGlobalAnimationConfig = () => 
  animationConfig.getConfig();

export const resetGlobalAnimationConfig = () => 
  animationConfig.resetConfig();