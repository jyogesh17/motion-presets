
/**
 * Configuration for custom stack effects
 */
export interface StackEffectConfig {
  layout?: 'stack' | 'spread' | 'circle' | 'spiral' | 'grid' | 'custom';
  cardTransform?: (index: number, progress: number, total: number) => {
    x?: number;
    y?: number;
    z?: number;
    scale?: number;
    rotate?: number;
    rotateX?: number;
    rotateY?: number;
    rotateZ?: number;
    opacity?: number;
  };
  interaction?: 'hover' | 'click' | 'drag' | 'scroll' | 'auto';
  physics?: {
    stiffness?: number;
    damping?: number;
    mass?: number;
  };
  timing?: {
    stagger?: number;
    duration?: number;
    delay?: number;
  };
}

/**
 * Factory to create custom stack effects
 */
export function createStackEffect(config: StackEffectConfig) {
  const defaultConfig: StackEffectConfig = {
    layout: 'stack',
    interaction: 'hover',
    physics: {
      stiffness: 200,
      damping: 20,
      mass: 1
    },
    timing: {
      stagger: 0.1,
      duration: 0.5,
      delay: 0
    }
  };
  
  const mergedConfig = { ...defaultConfig, ...config };
  
  return (cards: any[]) => {
    const getCardPosition = (index: number, progress: number) => {
      const total = cards.length;
      
      // Use custom transform if provided
      if (mergedConfig.cardTransform) {
        return mergedConfig.cardTransform(index, progress, total);
      }
      
      // Built-in layouts
      switch (mergedConfig.layout) {
        case 'spread':
          return {
            x: (index - total / 2) * 100 * progress,
            y: index * 20,
            rotate: (index - total / 2) * 5 * progress,
            scale: 1 - index * 0.05
          };
          
        case 'circle':
          const angle = (index / total) * Math.PI * 2;
          return {
            x: Math.cos(angle) * 200 * progress,
            y: Math.sin(angle) * 200 * progress,
            rotate: (angle * 180) / Math.PI,
            scale: 1 - index * 0.05
          };
          
        case 'spiral':
          const spiralAngle = (index / total) * Math.PI * 4;
          const radius = 50 + index * 30;
          return {
            x: Math.cos(spiralAngle) * radius * progress,
            y: Math.sin(spiralAngle) * radius * progress,
            z: index * 20,
            rotate: spiralAngle * 180 / Math.PI,
            scale: 1 - index * 0.05
          };
          
        case 'grid':
          const cols = Math.ceil(Math.sqrt(total));
          const row = Math.floor(index / cols);
          const col = index % cols;
          return {
            x: (col - cols / 2) * 150 * progress,
            y: (row - Math.ceil(total / cols) / 2) * 150 * progress,
            scale: 1 - (progress > 0 ? 0 : index * 0.05)
          };
          
        default: // stack
          return {
            x: 0,
            y: index * 30,
            scale: 1 - index * 0.05,
            opacity: 1 - index * 0.1
          };
      }
    };
    
    return {
      config: mergedConfig,
      getCardPosition,
      cards
    };
  };
}

/**
 * Create a deck of cards effect
 */
export function createDeckEffect(options?: {
  spreadRadius?: number;
  rotationRange?: number;
  flipOnClick?: boolean;
}) {
  return createStackEffect({
    layout: 'custom',
    cardTransform: (index, progress, total) => ({
      x: Math.sin((index / total) * Math.PI) * (options?.spreadRadius || 100) * progress,
      y: index * 5,
      rotate: ((index - total / 2) / total) * (options?.rotationRange || 30) * progress,
      scale: 1 - index * 0.02
    }),
    interaction: options?.flipOnClick ? 'click' : 'hover'
  });
}

/**
 * Create a carousel stack effect
 */
export function createCarouselStackEffect(options?: {
  visibleCards?: number;
  spacing?: number;
  perspective?: number;
}) {
  const visible = options?.visibleCards || 3;
  const spacing = options?.spacing || 100;
  
  return createStackEffect({
    layout: 'custom',
    cardTransform: (index, progress, total) => {
      const position = (index - progress * total) % total;
      const isVisible = position < visible;
      
      return {
        x: isVisible ? position * spacing : 0,
        y: isVisible ? 0 : 100,
        z: -position * 50,
        rotateY: position * -10,
        scale: isVisible ? 1 - position * 0.1 : 0.5,
        opacity: isVisible ? 1 : 0
      };
    },
    interaction: 'auto'
  });
}

/**
 * Create a 3D stack effect
 */
export function create3DStackEffect(options?: {
  depth?: number;
  tilt?: number;
  perspective?: number;
}) {
  return createStackEffect({
    layout: 'custom',
    cardTransform: (index, progress, _total) => ({
      x: 0,
      y: index * 10,
      z: -index * (options?.depth || 50),
      rotateX: (options?.tilt || 10) * progress,
      rotateY: Math.sin(progress * Math.PI) * 20,
      scale: 1 - index * 0.05,
      opacity: 1 - index * 0.15
    }),
    interaction: 'hover',
    physics: {
      stiffness: 150,
      damping: 15
    }
  });
}

/**
 * Create a fan stack effect
 */
export function createFanStackEffect(options?: {
  spread?: number;
  direction?: 'left' | 'right' | 'up' | 'down';
}) {
  const spread = options?.spread || 100;
  const direction = options?.direction || 'right';
  
  return createStackEffect({
    layout: 'custom',
    cardTransform: (index, progress, total) => {
      const angle = ((index - total / 2) / total) * Math.PI / 2;
      
      switch (direction) {
        case 'left':
          return {
            x: -Math.abs(Math.sin(angle)) * spread * progress,
            y: Math.cos(angle) * spread * progress,
            rotate: -angle * 180 / Math.PI * progress
          };
        case 'up':
          return {
            x: Math.sin(angle) * spread * progress,
            y: -Math.abs(Math.cos(angle)) * spread * progress,
            rotate: angle * 180 / Math.PI * progress
          };
        case 'down':
          return {
            x: Math.sin(angle) * spread * progress,
            y: Math.abs(Math.cos(angle)) * spread * progress,
            rotate: -angle * 180 / Math.PI * progress
          };
        default: // right
          return {
            x: Math.abs(Math.sin(angle)) * spread * progress,
            y: Math.cos(angle) * spread * progress,
            rotate: angle * 180 / Math.PI * progress
          };
      }
    },
    interaction: 'hover'
  });
}

/**
 * Create a shuffle stack effect
 */
export function createShuffleStackEffect() {
  let shuffleOrder: number[] = [];
  
  return createStackEffect({
    layout: 'custom',
    cardTransform: (index, progress, total) => {
      // Initialize shuffle order
      if (shuffleOrder.length !== total) {
        shuffleOrder = Array.from({ length: total }, (_, i) => i);
      }
      
      // Shuffle on progress change
      if (progress === 1) {
        shuffleOrder = shuffleOrder.sort(() => Math.random() - 0.5);
      }
      
      const targetIndex = shuffleOrder[index];
      const lerpIndex = index + (targetIndex - index) * progress;
      
      return {
        x: (lerpIndex - index) * 50,
        y: lerpIndex * 30,
        rotate: (targetIndex - index) * 10 * progress,
        scale: 1 - lerpIndex * 0.05,
        opacity: 1
      };
    },
    interaction: 'click',
    physics: {
      stiffness: 100,
      damping: 20
    }
  });
}