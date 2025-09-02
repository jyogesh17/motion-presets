import type { AnimationPreset } from '../types';

/**
 * Effect Composition System
 * Allows users to compose multiple effects together
 */

export interface ComposableEffect {
  apply: (base: AnimationPreset) => AnimationPreset;
  priority?: number;
}

/**
 * Compose multiple effects into a single animation
 */
export function composeEffects(
  baseEffect: AnimationPreset,
  ...effects: ComposableEffect[]
): AnimationPreset {
  // Sort effects by priority (higher priority applies last)
  const sortedEffects = effects.sort((a, b) => (a.priority || 0) - (b.priority || 0));
  
  // Apply each effect in order
  return sortedEffects.reduce((acc, effect) => effect.apply(acc), baseEffect);
}

/**
 * Create a hover effect modifier
 */
export function withHoverEffect(config: {
  scale?: number;
  rotate?: number;
  x?: number;
  y?: number;
  brightness?: number;
  blur?: number;
}): ComposableEffect {
  return {
    apply: (base) => ({
      ...base,
      whileHover: {
        scale: config.scale,
        rotate: config.rotate,
        x: config.x,
        y: config.y,
        filter: config.brightness 
          ? `brightness(${config.brightness})` 
          : config.blur 
          ? `blur(${config.blur}px)` 
          : undefined
      }
    }),
    priority: 10
  };
}

/**
 * Create a scroll trigger modifier
 */
export function withScrollTrigger(config: {
  threshold?: number;
  once?: boolean;
  amount?: number | 'all' | 'some';
  margin?: string;
}): ComposableEffect {
  return {
    apply: (base) => ({
      ...base,
      whileInView: base.animate,
      viewport: {
        once: config.once ?? true,
        amount: config.amount ?? 0.5,
        margin: config.margin
      }
    }),
    priority: 5
  };
}

/**
 * Create custom physics modifier
 */
export function withCustomPhysics(config: {
  stiffness?: number;
  damping?: number;
  mass?: number;
  velocity?: number;
  restSpeed?: number;
  restDelta?: number;
}): ComposableEffect {
  return {
    apply: (base) => ({
      ...base,
      transition: {
        ...base.transition,
        type: 'spring',
        stiffness: config.stiffness ?? 100,
        damping: config.damping ?? 10,
        mass: config.mass ?? 1,
        velocity: config.velocity,
        restSpeed: config.restSpeed,
        restDelta: config.restDelta
      }
    }),
    priority: 20
  };
}

/**
 * Create a delay modifier
 */
export function withDelay(delay: number): ComposableEffect {
  return {
    apply: (base) => ({
      ...base,
      transition: {
        ...base.transition,
        delay
      }
    }),
    priority: 15
  };
}

/**
 * Create a loop modifier
 */
export function withLoop(config?: {
  repeat?: number | 'infinity';
  repeatType?: 'loop' | 'reverse' | 'mirror';
  repeatDelay?: number;
}): ComposableEffect {
  return {
    apply: (base) => ({
      ...base,
      transition: {
        ...base.transition,
        repeat: config?.repeat === 'infinity' ? Infinity : config?.repeat,
        repeatType: config?.repeatType ?? 'loop',
        repeatDelay: config?.repeatDelay
      }
    }),
    priority: 18
  };
}

/**
 * Create a 3D transform modifier
 */
export function with3DTransform(config: {
  rotateX?: number;
  rotateY?: number;
  rotateZ?: number;
  perspective?: number;
  transformStyle?: 'flat' | 'preserve-3d';
}): ComposableEffect {
  return {
    apply: (base) => {
      const transform3D = {
        rotateX: config.rotateX,
        rotateY: config.rotateY,
        rotateZ: config.rotateZ,
        transformPerspective: config.perspective,
        transformStyle: config.transformStyle
      };
      
      return {
        ...base,
        initial: {
          ...base.initial,
          ...transform3D
        },
        animate: {
          ...base.animate,
          ...transform3D
        }
      };
    },
    priority: 8
  };
}

/**
 * Create a stagger children modifier
 */
export function withStagger(config: {
  staggerChildren?: number;
  delayChildren?: number;
  staggerDirection?: 1 | -1;
}): ComposableEffect {
  return {
    apply: (base) => ({
      ...base,
      transition: {
        ...base.transition,
        staggerChildren: config.staggerChildren ?? 0.1,
        delayChildren: config.delayChildren ?? 0,
        staggerDirection: config.staggerDirection ?? 1
      }
    }),
    priority: 12
  };
}

/**
 * Create a blur effect modifier
 */
export function withBlur(config: {
  initial?: number;
  animate?: number;
  exit?: number;
}): ComposableEffect {
  return {
    apply: (base) => ({
      ...base,
      initial: {
        ...base.initial,
        filter: config.initial ? `blur(${config.initial}px)` : undefined
      },
      animate: {
        ...base.animate,
        filter: config.animate ? `blur(${config.animate}px)` : 'blur(0px)'
      },
      exit: {
        ...base.exit,
        filter: config.exit ? `blur(${config.exit}px)` : undefined
      }
    }),
    priority: 7
  };
}

/**
 * Create a parallax modifier
 */
export function withParallax(config: {
  speed?: number;
  offset?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}): ComposableEffect {
  const speed = config.speed ?? 0.5;
  const offset = config.offset ?? 0;
  
  const getTransform = () => {
    switch (config.direction) {
      case 'up':
        return { y: -speed * 100 + offset };
      case 'down':
        return { y: speed * 100 + offset };
      case 'left':
        return { x: -speed * 100 + offset };
      case 'right':
        return { x: speed * 100 + offset };
      default:
        return { y: -speed * 100 + offset };
    }
  };
  
  return {
    apply: (base) => ({
      ...base,
      initial: {
        ...base.initial,
        ...getTransform()
      },
      animate: {
        ...base.animate,
        x: 0,
        y: 0
      }
    }),
    priority: 6
  };
}

/**
 * Create a morph modifier for SVG paths
 */
export function withMorph(config: {
  paths: string[];
  duration?: number;
  ease?: string;
}): ComposableEffect {
  return {
    apply: (base) => ({
      ...base,
      animate: {
        ...base.animate,
        d: config.paths
      },
      transition: {
        ...base.transition,
        duration: config.duration ?? 1,
        ease: config.ease ?? 'easeInOut'
      }
    }),
    priority: 9
  };
}

/**
 * Compose effects with builder pattern
 */
export class EffectComposer {
  private effects: ComposableEffect[] = [];
  private baseEffect: AnimationPreset = {};
  
  constructor(base?: AnimationPreset) {
    if (base) this.baseEffect = base;
  }
  
  add(effect: ComposableEffect): this {
    this.effects.push(effect);
    return this;
  }
  
  hover(config: Parameters<typeof withHoverEffect>[0]): this {
    return this.add(withHoverEffect(config));
  }
  
  scroll(config: Parameters<typeof withScrollTrigger>[0]): this {
    return this.add(withScrollTrigger(config));
  }
  
  physics(config: Parameters<typeof withCustomPhysics>[0]): this {
    return this.add(withCustomPhysics(config));
  }
  
  delay(ms: number): this {
    return this.add(withDelay(ms));
  }
  
  loop(config?: Parameters<typeof withLoop>[0]): this {
    return this.add(withLoop(config));
  }
  
  transform3D(config: Parameters<typeof with3DTransform>[0]): this {
    return this.add(with3DTransform(config));
  }
  
  stagger(config: Parameters<typeof withStagger>[0]): this {
    return this.add(withStagger(config));
  }
  
  blur(config: Parameters<typeof withBlur>[0]): this {
    return this.add(withBlur(config));
  }
  
  parallax(config: Parameters<typeof withParallax>[0]): this {
    return this.add(withParallax(config));
  }
  
  morph(config: Parameters<typeof withMorph>[0]): this {
    return this.add(withMorph(config));
  }
  
  build(): AnimationPreset {
    return composeEffects(this.baseEffect, ...this.effects);
  }
}