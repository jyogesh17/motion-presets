import type { AnimationPreset } from '../types';

// Customization options for physics animations
export interface SpringOptions {
  initialScale?: number;
  targetScale?: number;
  initialOpacity?: number;
  targetOpacity?: number;
  stiffness?: number;
  damping?: number;
  mass?: number;
  velocity?: number;
  restDelta?: number;
}

export interface WobbleOptions {
  amplitude?: number;
  oscillations?: number;
  stiffness?: number;
  damping?: number;
  mass?: number;
}

export interface ElasticOptions {
  distance?: number;
  initialScale?: number;
  targetScale?: number;
  initialOpacity?: number;
  targetOpacity?: number;
  stiffness?: number;
  damping?: number;
  mass?: number;
  restDelta?: number;
}

export interface InertiaOptions {
  distance?: number;
  initialOpacity?: number;
  targetOpacity?: number;
  velocity?: number;
  power?: number;
  timeConstant?: number;
  restDelta?: number;
}

export interface GravityOptions {
  height?: number;
  initialOpacity?: number;
  targetOpacity?: number;
  stiffness?: number;
  damping?: number;
  mass?: number;
  velocity?: number;
  bounceCount?: number;
}

export interface PendulumOptions {
  initialAngle?: number;
  swings?: number;
  duration?: number;
  ease?: string;
}

export interface JelloOptions {
  intensity?: number;
  duration?: number;
  ease?: string;
}

export interface FloatOptions {
  amplitude?: number;
  duration?: number;
  ease?: string;
  repeat?: number | 'Infinity';
}

export interface ShakePhysicsOptions {
  amplitude?: number;
  duration?: number;
  oscillations?: number;
}

// Spring Physics Presets
export const springBounce = (options?: SpringOptions): AnimationPreset => ({
  initial: { scale: options?.initialScale ?? 0, opacity: options?.initialOpacity ?? 0 },
  animate: { 
    scale: options?.targetScale ?? 1, 
    opacity: options?.targetOpacity ?? 1,
    transition: {
      type: 'spring',
      stiffness: options?.stiffness ?? 500,
      damping: options?.damping ?? 15,
      mass: options?.mass ?? 1,
      velocity: options?.velocity ?? 0
    }
  },
  exit: { scale: options?.initialScale ?? 0, opacity: options?.initialOpacity ?? 0 }
});

export const springWobble = (options?: WobbleOptions): AnimationPreset => {
  const amplitude = options?.amplitude ?? 10;
  const oscillations = options?.oscillations ?? 5;
  const pattern: number[] = [0];
  
  for (let i = 0; i < oscillations; i++) {
    const factor = Math.pow(0.7, i);
    pattern.push(amplitude * factor, -amplitude * factor);
  }
  pattern.push(0);
  
  return {
    initial: { rotate: 0 },
    animate: {
      rotate: pattern,
      transition: {
        type: 'spring',
        stiffness: options?.stiffness ?? 200,
        damping: options?.damping ?? 10,
        mass: options?.mass ?? 0.5
      }
    }
  };
};

export const elasticIn = (options?: ElasticOptions): AnimationPreset => ({
  initial: { 
    x: -(options?.distance ?? 100), 
    opacity: options?.initialOpacity ?? 0 
  },
  animate: {
    x: 0,
    opacity: options?.targetOpacity ?? 1,
    transition: {
      type: 'spring',
      stiffness: options?.stiffness ?? 100,
      damping: options?.damping ?? 8,
      mass: options?.mass ?? 0.8,
      restDelta: options?.restDelta ?? 0.001
    }
  },
  exit: { 
    x: options?.distance ?? 100, 
    opacity: options?.initialOpacity ?? 0 
  }
});

export const elasticOut = (options?: ElasticOptions): AnimationPreset => ({
  initial: { 
    scale: options?.initialScale ?? 1.2, 
    opacity: options?.initialOpacity ?? 0 
  },
  animate: {
    scale: options?.targetScale ?? 1,
    opacity: options?.targetOpacity ?? 1,
    transition: {
      type: 'spring',
      stiffness: options?.stiffness ?? 150,
      damping: options?.damping ?? 12,
      mass: options?.mass ?? 0.6
    }
  },
  exit: { 
    scale: options?.initialScale ?? 0.8, 
    opacity: options?.initialOpacity ?? 0 
  }
});

// Inertia/Momentum Presets
export const inertiaScroll = (options?: InertiaOptions): AnimationPreset => ({
  initial: { y: options?.distance ?? 100 },
  animate: {
    y: 0,
    transition: {
      type: 'inertia',
      velocity: options?.velocity ?? 50,
      power: options?.power ?? 0.8,
      timeConstant: options?.timeConstant ?? 700,
      restDelta: options?.restDelta ?? 0.5
    }
  }
});

export const momentumSwipe = (options?: InertiaOptions): AnimationPreset => ({
  initial: { 
    x: -(options?.distance ?? 300), 
    opacity: options?.initialOpacity ?? 0 
  },
  animate: {
    x: 0,
    opacity: options?.targetOpacity ?? 1,
    transition: {
      type: 'inertia',
      velocity: options?.velocity ?? 100,
      power: options?.power ?? 0.9,
      timeConstant: options?.timeConstant ?? 500
    }
  },
  exit: {
    x: options?.distance ?? 300,
    opacity: options?.initialOpacity ?? 0,
    transition: {
      type: 'inertia',
      velocity: -(options?.velocity ?? 100)
    }
  }
});

// Gravity Simulation
export const gravityFall = (options?: GravityOptions): AnimationPreset => ({
  initial: { 
    y: -(options?.height ?? 200), 
    opacity: options?.initialOpacity ?? 0 
  },
  animate: {
    y: 0,
    opacity: options?.targetOpacity ?? 1,
    transition: {
      y: {
        type: 'spring',
        stiffness: options?.stiffness ?? 50,
        damping: options?.damping ?? 20,
        mass: options?.mass ?? 2,
        velocity: options?.velocity ?? 200
      },
      opacity: {
        duration: 0.3
      }
    }
  }
});

export const gravityBounce = (options?: GravityOptions): AnimationPreset => {
  const height = options?.height ?? 300;
  const bounceCount = options?.bounceCount ?? 4;
  const bounces: number[] = [];
  const times: number[] = [];
  
  for (let i = 0; i < bounceCount; i++) {
    const bounceHeight = height * Math.pow(0.5, i);
    bounces.push(0, -bounceHeight, 0);
    const baseTime = i * 0.3;
    times.push(baseTime, baseTime + 0.1, baseTime + 0.2);
  }
  
  return {
    initial: { y: -height },
    animate: {
      y: bounces,
      transition: {
        duration: bounceCount * 0.3,
        times: times,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };
};

// Pendulum Motion
export const pendulumSwing = (options?: PendulumOptions): AnimationPreset => {
  const angle = options?.initialAngle ?? 30;
  const swings = options?.swings ?? 5;
  const pattern: number[] = [];
  const times: number[] = [];
  
  for (let i = 0; i < swings; i++) {
    const swingAngle = angle * Math.pow(0.8, i);
    pattern.push(i % 2 === 0 ? swingAngle : -swingAngle);
    times.push(i / swings);
  }
  pattern.push(0);
  times.push(1);
  
  return {
    initial: { rotate: -angle },
    animate: {
      rotate: pattern,
      transition: {
        duration: options?.duration ?? 2,
        ease: options?.ease ?? 'easeInOut',
        times: times
      }
    }
  };
};

// Jello Effect
export const jello = (options?: JelloOptions): AnimationPreset => {
  const intensity = options?.intensity ?? 0.25;
  
  return {
    initial: { scaleX: 1, scaleY: 1 },
    animate: {
      scaleX: [
        1, 
        1 + intensity, 
        1 - intensity, 
        1 + intensity * 0.6, 
        1 - intensity * 0.2, 
        1 + intensity * 0.2, 
        1
      ],
      scaleY: [
        1, 
        1 - intensity, 
        1 + intensity, 
        1 - intensity * 0.6, 
        1 + intensity * 0.2, 
        1 - intensity * 0.2, 
        1
      ],
      transition: {
        duration: options?.duration ?? 1,
        ease: options?.ease ?? 'easeInOut'
      }
    }
  };
};

// Pulse with Physics
export const physicsPulse = (options?: SpringOptions & { repeat?: number | 'Infinity' }): AnimationPreset => ({
  initial: { scale: options?.initialScale ?? 1 },
  animate: {
    scale: [
      options?.initialScale ?? 1, 
      options?.targetScale ?? 1.1, 
      options?.initialScale ?? 1
    ],
    transition: {
      type: 'spring',
      stiffness: options?.stiffness ?? 300,
      damping: options?.damping ?? 10,
      repeat: options?.repeat === 'Infinity' ? Infinity : (options?.repeat ?? Infinity),
      repeatType: 'reverse',
      duration: 1
    }
  }
});

// Magnetic Attraction
export const magneticPull = (options?: SpringOptions & { initialX?: number; initialY?: number }): AnimationPreset => ({
  initial: { 
    x: options?.initialX ?? 100, 
    y: options?.initialY ?? 100, 
    scale: options?.initialScale ?? 0.5 
  },
  animate: {
    x: 0,
    y: 0,
    scale: options?.targetScale ?? 1,
    transition: {
      type: 'spring',
      stiffness: options?.stiffness ?? 80,
      damping: options?.damping ?? 15,
      mass: options?.mass ?? 1.5,
      restDelta: options?.restDelta ?? 0.001
    }
  },
  whileHover: {
    scale: (options?.targetScale ?? 1) * 1.05,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 10
    }
  }
});

// Float Effect
export const float = (options?: FloatOptions): AnimationPreset => ({
  initial: { y: 0 },
  animate: {
    y: [
      -(options?.amplitude ?? 10), 
      options?.amplitude ?? 10, 
      -(options?.amplitude ?? 10)
    ],
    transition: {
      duration: options?.duration ?? 3,
      ease: options?.ease ?? 'easeInOut',
      repeat: options?.repeat === 'Infinity' ? Infinity : (options?.repeat ?? Infinity),
      repeatType: 'reverse'
    }
  }
});

// Shake Effect with Physics
export const shakePhysics = (options?: ShakePhysicsOptions): AnimationPreset => {
  const amplitude = options?.amplitude ?? 10;
  const oscillations = options?.oscillations ?? 5;
  const pattern: number[] = [];
  
  for (let i = 0; i < oscillations; i++) {
    const factor = 1 - (i / oscillations);
    pattern.push(-amplitude * factor, amplitude * factor);
  }
  pattern.push(0);
  
  return {
    initial: { x: 0 },
    animate: {
      x: pattern,
      transition: {
        duration: options?.duration ?? 0.5,
        ease: 'linear'
      }
    }
  };
};

// Rubber Band Snap
export const rubberBandSnap = (options?: ElasticOptions): AnimationPreset => ({
  initial: { 
    scaleX: options?.initialScale ?? 0.3, 
    opacity: options?.initialOpacity ?? 0 
  },
  animate: {
    scaleX: [
      options?.initialScale ?? 0.3, 
      1.3, 
      0.9, 
      1.05, 
      0.98, 
      options?.targetScale ?? 1
    ],
    opacity: options?.targetOpacity ?? 1,
    transition: {
      scaleX: {
        type: 'spring',
        stiffness: options?.stiffness ?? 600,
        damping: options?.damping ?? 12,
        mass: options?.mass ?? 0.8
      },
      opacity: {
        duration: 0.2
      }
    }
  }
});