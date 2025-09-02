import { Variants } from 'framer-motion';

// Bounce entrance animations
export const bounceIn: Variants = {
  initial: {
    opacity: 0,
    scale: 0.3
  },
  animate: {
    opacity: 1,
    scale: [0.3, 1.1, 0.9, 1.03, 1],
    transition: {
      duration: 0.6,
      times: [0, 0.2, 0.4, 0.6, 1]
    }
  }
};

export const bounceInUp: Variants = {
  initial: {
    opacity: 0,
    y: 100
  },
  animate: {
    opacity: 1,
    y: [100, -20, 10, -5, 0],
    transition: {
      duration: 0.8,
      times: [0, 0.4, 0.6, 0.8, 1],
      ease: 'easeOut'
    }
  }
};

export const bounceInDown: Variants = {
  initial: {
    opacity: 0,
    y: -100
  },
  animate: {
    opacity: 1,
    y: [-100, 20, -10, 5, 0],
    transition: {
      duration: 0.8,
      times: [0, 0.4, 0.6, 0.8, 1],
      ease: 'easeOut'
    }
  }
};

export const bounceInLeft: Variants = {
  initial: {
    opacity: 0,
    x: -100
  },
  animate: {
    opacity: 1,
    x: [-100, 20, -10, 5, 0],
    transition: {
      duration: 0.8,
      times: [0, 0.4, 0.6, 0.8, 1],
      ease: 'easeOut'
    }
  }
};

export const bounceInRight: Variants = {
  initial: {
    opacity: 0,
    x: 100
  },
  animate: {
    opacity: 1,
    x: [100, -20, 10, -5, 0],
    transition: {
      duration: 0.8,
      times: [0, 0.4, 0.6, 0.8, 1],
      ease: 'easeOut'
    }
  }
};

// Bounce exit animations
export const bounceOut: Variants = {
  initial: {
    opacity: 1,
    scale: 1
  },
  exit: {
    opacity: 0,
    scale: [1, 1.03, 0.9, 1.1, 0.3],
    transition: {
      duration: 0.6,
      times: [0, 0.2, 0.4, 0.6, 1]
    }
  }
};

// Rubber band bounce effect
export const rubberBandBounce: Variants = {
  initial: {
    scaleX: 1,
    scaleY: 1
  },
  animate: {
    scaleX: [1, 1.25, 0.75, 1.15, 0.95, 1.05, 1],
    scaleY: [1, 0.75, 1.25, 0.85, 1.05, 0.95, 1],
    transition: {
      duration: 1,
      times: [0, 0.3, 0.4, 0.5, 0.65, 0.75, 1]
    }
  }
};

// Jello bounce effect
export const jelloBounce: Variants = {
  initial: {
    skewX: 0,
    skewY: 0
  },
  animate: {
    skewX: [0, -12.5, 6.25, -3.125, 1.5625, -0.78125, 0],
    skewY: [0, -12.5, 6.25, -3.125, 1.5625, -0.78125, 0],
    transition: {
      duration: 1,
      times: [0, 0.22, 0.33, 0.44, 0.55, 0.77, 1]
    }
  }
};

// Boing effect
export const boing: Variants = {
  initial: {
    scale: 1
  },
  animate: {
    scale: [1, 1.2, 0.8, 1.1, 0.95, 1.02, 1],
    rotate: [0, -5, 3, -2, 1, 0],
    transition: {
      duration: 0.8,
      ease: 'easeInOut'
    }
  }
};

// Elastic bounce entrance
export const elasticBounceIn: Variants = {
  initial: {
    opacity: 0,
    scaleX: 0,
    scaleY: 1.5
  },
  animate: {
    opacity: 1,
    scaleX: [0, 1.1, 0.95, 1.05, 1],
    scaleY: [1.5, 0.9, 1.05, 0.98, 1],
    transition: {
      duration: 0.8,
      ease: 'easeOut'
    }
  }
};

// Bounce with rotation
export const bounceRotate: Variants = {
  initial: {
    opacity: 0,
    scale: 0.5,
    rotate: -180
  },
  animate: {
    opacity: 1,
    scale: [0.5, 1.2, 0.9, 1.05, 1],
    rotate: [-180, 10, -5, 2, 0],
    transition: {
      duration: 1,
      times: [0, 0.3, 0.5, 0.7, 1]
    }
  }
};

// Bounce configurations
export const bounceConfigs = {
  soft: {
    type: 'spring',
    stiffness: 100,
    damping: 10,
    mass: 0.5
  },
  medium: {
    type: 'spring',
    stiffness: 200,
    damping: 15,
    mass: 0.8
  },
  hard: {
    type: 'spring',
    stiffness: 400,
    damping: 20,
    mass: 1
  },
  elastic: {
    type: 'spring',
    stiffness: 600,
    damping: 10,
    mass: 0.3
  }
};

// Bounce sequence for children
export const bounceSequence: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const bounceChild: Variants = {
  initial: { 
    opacity: 0,
    y: 20
  },
  animate: { 
    opacity: 1,
    y: [20, -10, 5, 0],
    transition: {
      duration: 0.5,
      ease: 'easeOut'
    }
  }
};