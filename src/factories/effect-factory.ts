import type { MotionValue } from 'framer-motion';

// Note: These would need to be imported in the component using the effect
// import { useMotionValue, useTransform } from 'framer-motion';

/**
 * Custom Effect Configuration
 */
export interface CustomEffectConfig<T = any> {
  name: string;
  defaultOptions?: T;
  setup?: (options: T) => {
    motionValues?: Record<string, MotionValue>;
    cleanup?: () => void;
  };
  animate?: (progress: number, options: T) => any;
  variants?: {
    initial?: any;
    animate?: any;
    exit?: any;
    hover?: any;
    tap?: any;
  };
  transition?: any;
}

/**
 * Factory to create custom animation effects
 */
export function createCustomEffect<T = any>(config: CustomEffectConfig<T>) {
  return (options?: Partial<T>) => {
    const mergedOptions = { ...config.defaultOptions, ...options } as T;
    
    // Create the effect hook
    const useEffect = () => {
      const setupResult = config.setup?.(mergedOptions);
      const motionValues = setupResult?.motionValues || {};
      
      // Note: cleanup would be handled by the component using this effect
      
      return {
        motionValues,
        variants: config.variants,
        transition: config.transition,
        animate: (progress: number) => config.animate?.(progress, mergedOptions)
      };
    };
    
    return {
      name: config.name,
      options: mergedOptions,
      useEffect,
      variants: config.variants,
      transition: config.transition
    };
  };
}

/**
 * Create a 3D effect factory
 */
export function create3DEffect(config: {
  rotateX?: number | MotionValue<number>;
  rotateY?: number | MotionValue<number>;
  rotateZ?: number | MotionValue<number>;
  perspective?: number;
  transformStyle?: 'flat' | 'preserve-3d';
}) {
  return createCustomEffect({
    name: '3d-effect',
    defaultOptions: {
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,
      perspective: 1000,
      transformStyle: 'preserve-3d' as const
    },
    setup: (_options: any) => {
      // In actual usage, these would be created with:
      // const mouseX = useMotionValue(0);
      // const mouseY = useMotionValue(0);
      // const rotateX = useTransform(mouseY, [-300, 300], [-30, 30]);
      // const rotateY = useTransform(mouseX, [-300, 300], [30, -30]);
      
      return {
        motionValues: {}
      };
    },
    variants: {
      initial: {
        rotateX: 0,
        rotateY: 0,
        transformPerspective: config.perspective
      },
      animate: {
        transformStyle: config.transformStyle
      }
    }
  });
}

/**
 * Create a parallax effect factory
 */
export function createParallaxEffect(_config: {
  speed?: number;
  offset?: number;
  direction?: 'vertical' | 'horizontal';
}) {
  return createCustomEffect({
    name: 'parallax-effect',
    defaultOptions: {
      speed: 0.5,
      offset: 0,
      direction: 'vertical' as const
    },
    setup: (_options: any) => {
      // In actual usage:
      // const scrollY = useMotionValue(0);
      // const y = useTransform(scrollY, [0, 1000], [0, options.speed! * 1000]);
      
      return {
        motionValues: {}
      };
    }
  });
}

/**
 * Create a morph effect factory
 */
export function createMorphEffect(config: {
  shapes: string[];
  duration?: number;
  ease?: string;
}) {
  let currentIndex = 0;
  
  return createCustomEffect({
    name: 'morph-effect',
    defaultOptions: {
      shapes: config.shapes,
      duration: 1,
      ease: 'easeInOut'
    },
    animate: (progress) => {
      const nextIndex = Math.floor(progress * config.shapes.length);
      if (nextIndex !== currentIndex) {
        currentIndex = nextIndex;
        return {
          d: config.shapes[currentIndex]
        };
      }
    },
    transition: {
      duration: config.duration,
      ease: config.ease
    }
  });
}

/**
 * Create a physics-based effect
 */
export function createPhysicsEffect(config: {
  mass?: number;
  stiffness?: number;
  damping?: number;
  velocity?: number;
}) {
  return createCustomEffect({
    name: 'physics-effect',
    defaultOptions: {
      mass: 1,
      stiffness: 100,
      damping: 10,
      velocity: 0
    },
    variants: {
      initial: {
        x: 0,
        y: 0
      },
      animate: {
        x: [0, 100, 0],
        y: [0, -50, 0]
      }
    },
    transition: {
      type: 'spring',
      mass: config.mass,
      stiffness: config.stiffness,
      damping: config.damping,
      velocity: config.velocity
    }
  });
}

/**
 * Create a glitch effect factory
 */
export function createGlitchEffect(config: {
  intensity?: number;
  duration?: number;
  colors?: string[];
}) {
  return createCustomEffect({
    name: 'glitch-effect',
    defaultOptions: {
      intensity: 5,
      duration: 0.5,
      colors: ['#ff0000', '#00ff00', '#0000ff']
    },
    animate: (progress, options) => {
      const glitchAmount = Math.sin(progress * Math.PI * 10) * options.intensity!;
      return {
        x: glitchAmount,
        filter: `hue-rotate(${glitchAmount * 10}deg)`,
        opacity: 0.8 + Math.random() * 0.2
      };
    },
    transition: {
      duration: config.duration,
      repeat: Infinity,
      repeatType: 'reverse'
    }
  });
}