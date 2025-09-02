import { Variants } from 'framer-motion';

// Spring-based entrance animations
export const springIn: Variants = {
  initial: { 
    opacity: 0, 
    scale: 0.3 
  },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 20
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.3,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 30
    }
  }
};

export const springBounceIn: Variants = {
  initial: { 
    opacity: 0, 
    y: -100 
  },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 10,
      mass: 0.8
    }
  },
  exit: { 
    opacity: 0, 
    y: 100 
  }
};

export const springElasticIn: Variants = {
  initial: { 
    opacity: 0, 
    scale: 0 
  },
  animate: { 
    opacity: 1, 
    scale: [0, 1.2, 0.9, 1.05, 1],
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

export const springWobbleIn: Variants = {
  initial: { 
    opacity: 0,
    rotate: -5
  },
  animate: { 
    opacity: 1,
    rotate: [0, -5, 5, -3, 3, -1, 1, 0],
    transition: {
      duration: 0.8,
      ease: 'easeInOut'
    }
  }
};

export const springPop: Variants = {
  initial: { 
    opacity: 0,
    scale: 0.5
  },
  animate: { 
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      velocity: 10,
      stiffness: 500,
      damping: 15
    }
  }
};

export const springRotate: Variants = {
  initial: { 
    opacity: 0,
    rotate: -180,
    scale: 0.5
  },
  animate: { 
    opacity: 1,
    rotate: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 20
    }
  }
};

export const springSlide: Variants = {
  initial: { 
    x: -200,
    opacity: 0
  },
  animate: { 
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 25,
      mass: 1
    }
  }
};

export const springDrop: Variants = {
  initial: { 
    y: -500,
    opacity: 0,
    scale: 0.5
  },
  animate: { 
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 12,
      mass: 0.5
    }
  }
};

// Advanced spring configurations
export const springConfigs = {
  gentle: {
    type: 'spring',
    stiffness: 100,
    damping: 20
  },
  wobbly: {
    type: 'spring',
    stiffness: 180,
    damping: 10
  },
  stiff: {
    type: 'spring',
    stiffness: 400,
    damping: 30
  },
  slow: {
    type: 'spring',
    stiffness: 50,
    damping: 20
  },
  molasses: {
    type: 'spring',
    stiffness: 20,
    damping: 15
  },
  quick: {
    type: 'spring',
    stiffness: 500,
    damping: 40
  }
};

// Spring sequence animations
export const springSequence: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

export const springChild: Variants = {
  initial: { 
    opacity: 0,
    y: 20
  },
  animate: { 
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 24
    }
  }
};