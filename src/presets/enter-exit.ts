import { Variants } from 'framer-motion';

// Fade enter/exit pairs
export const fadeInOut: Variants = {
  enter: {
    opacity: 0
  },
  center: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: 'easeOut'
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: 'easeIn'
    }
  }
};

// Slide enter/exit pairs
export const slideInOut: Variants = {
  enter: (direction: number = 1) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30
    }
  },
  exit: (direction: number = 1) => ({
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: 'easeInOut'
    }
  })
};

// Scale enter/exit pairs
export const scaleInOut: Variants = {
  enter: {
    scale: 0,
    opacity: 0
  },
  center: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 25
    }
  },
  exit: {
    scale: 0,
    opacity: 0,
    transition: {
      duration: 0.2
    }
  }
};

// Rotate enter/exit pairs
export const rotateInOut: Variants = {
  enter: {
    rotate: -180,
    scale: 0,
    opacity: 0
  },
  center: {
    rotate: 0,
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 20
    }
  },
  exit: {
    rotate: 180,
    scale: 0,
    opacity: 0,
    transition: {
      duration: 0.3
    }
  }
};

// Flip enter/exit pairs
export const flipInOut: Variants = {
  enter: {
    rotateY: 90,
    opacity: 0
  },
  center: {
    rotateY: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 25
    }
  },
  exit: {
    rotateY: -90,
    opacity: 0,
    transition: {
      duration: 0.2
    }
  }
};

// Zoom enter/exit pairs
export const zoomInOut: Variants = {
  enter: {
    scale: 0.5,
    opacity: 0,
    filter: 'blur(10px)'
  },
  center: {
    scale: 1,
    opacity: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  },
  exit: {
    scale: 1.5,
    opacity: 0,
    filter: 'blur(10px)',
    transition: {
      duration: 0.2
    }
  }
};

// Blur enter/exit pairs
export const blurInOut: Variants = {
  enter: {
    opacity: 0,
    filter: 'blur(20px)'
  },
  center: {
    opacity: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.4
    }
  },
  exit: {
    opacity: 0,
    filter: 'blur(20px)',
    transition: {
      duration: 0.3
    }
  }
};

// Drop enter/exit pairs
export const dropInOut: Variants = {
  enter: {
    y: -1000,
    opacity: 0
  },
  center: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
      mass: 0.5
    }
  },
  exit: {
    y: 1000,
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: 'easeIn'
    }
  }
};

// Newspaper effect
export const newspaperInOut: Variants = {
  enter: {
    scale: 0,
    rotate: -720,
    opacity: 0
  },
  center: {
    scale: 1,
    rotate: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut'
    }
  },
  exit: {
    scale: 0,
    rotate: 720,
    opacity: 0,
    transition: {
      duration: 0.3
    }
  }
};

// 3D flip enter/exit
export const flip3DInOut: Variants = {
  enter: {
    rotateX: -90,
    opacity: 0,
    transformPerspective: 1000
  },
  center: {
    rotateX: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 20
    }
  },
  exit: {
    rotateX: 90,
    opacity: 0,
    transition: {
      duration: 0.3
    }
  }
};

// Curtain effect
export const curtainInOut: Variants = {
  enter: {
    scaleY: 0,
    originY: 0,
    opacity: 0
  },
  center: {
    scaleY: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 25
    }
  },
  exit: {
    scaleY: 0,
    originY: 1,
    opacity: 0,
    transition: {
      duration: 0.3
    }
  }
};

// Unfold effect
export const unfoldInOut: Variants = {
  enter: {
    scaleX: 0,
    scaleY: 0.1,
    opacity: 0
  },
  center: {
    scaleX: 1,
    scaleY: 1,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  },
  exit: {
    scaleX: 0,
    scaleY: 0.1,
    opacity: 0,
    transition: {
      duration: 0.3
    }
  }
};