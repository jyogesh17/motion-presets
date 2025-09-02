import type { AnimationPreset } from '../types';

// Shape Morphing Presets
export const morphCircleToSquare: AnimationPreset = {
  initial: { 
    borderRadius: '50%',
    rotate: 0
  },
  animate: {
    borderRadius: '0%',
    rotate: 180,
    transition: {
      duration: 1,
      ease: 'easeInOut'
    }
  },
  whileHover: {
    borderRadius: '25%',
    rotate: 90
  }
};

export const morphBlob: AnimationPreset = {
  initial: {
    borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%'
  },
  animate: {
    borderRadius: [
      '60% 40% 30% 70% / 60% 30% 70% 40%',
      '30% 60% 70% 40% / 50% 60% 30% 60%',
      '40% 60% 60% 40% / 70% 30% 40% 60%',
      '60% 40% 30% 70% / 60% 30% 70% 40%'
    ],
    transition: {
      duration: 4,
      ease: 'easeInOut',
      repeat: Infinity
    }
  }
};

// SVG Path Morphing
export const pathMorph: AnimationPreset = {
  initial: {
    pathLength: 0,
    opacity: 0
  },
  animate: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: {
        duration: 2,
        ease: 'easeInOut'
      },
      opacity: {
        duration: 0.5
      }
    }
  }
};

export const pathDraw: AnimationPreset = {
  initial: {
    pathLength: 0,
    pathOffset: 0
  },
  animate: {
    pathLength: 1,
    pathOffset: 0,
    transition: {
      duration: 1.5,
      ease: 'easeInOut'
    }
  },
  exit: {
    pathLength: 0,
    pathOffset: 1,
    transition: {
      duration: 1
    }
  }
};

// Text Morphing Effects
export const textScramble: AnimationPreset = {
  initial: {
    opacity: 0,
    filter: 'blur(10px)',
    letterSpacing: '0.5em'
  },
  animate: {
    opacity: 1,
    filter: 'blur(0px)',
    letterSpacing: '0em',
    transition: {
      duration: 0.8,
      ease: 'easeOut'
    }
  }
};

export const textReveal: AnimationPreset = {
  initial: {
    clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)'
  },
  animate: {
    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
    transition: {
      duration: 0.8,
      ease: [0.77, 0, 0.175, 1]
    }
  }
};

// Liquid/Fluid Morphing
export const liquidMorph: AnimationPreset = {
  initial: {
    scale: 0,
    borderRadius: '100%',
    filter: 'blur(20px)'
  },
  animate: {
    scale: 1,
    borderRadius: '0%',
    filter: 'blur(0px)',
    transition: {
      scale: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      },
      borderRadius: {
        duration: 0.8,
        ease: 'easeInOut'
      },
      filter: {
        duration: 0.6
      }
    }
  }
};

export const dropletMorph: AnimationPreset = {
  initial: {
    borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
    scale: 0
  },
  animate: {
    borderRadius: [
      '50% 50% 50% 50% / 60% 60% 40% 40%',
      '50% 50% 80% 20% / 50% 50% 50% 50%',
      '50% 50% 50% 50% / 60% 60% 40% 40%'
    ],
    scale: 1,
    transition: {
      duration: 1.5,
      ease: 'easeInOut'
    }
  }
};

// Gradient Morphing
export const gradientShift: AnimationPreset = {
  initial: {
    backgroundPosition: '0% 50%'
  },
  animate: {
    backgroundPosition: '100% 50%',
    transition: {
      duration: 5,
      ease: 'linear',
      repeat: Infinity,
      repeatType: 'reverse'
    }
  }
};

// Mesh Gradient Morph
export const meshGradient: AnimationPreset = {
  initial: {
    opacity: 0,
    scale: 0.9
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: 'easeOut'
    }
  }
};

// Clip Path Morphing
export const clipReveal: AnimationPreset = {
  initial: {
    clipPath: 'circle(0% at 50% 50%)'
  },
  animate: {
    clipPath: 'circle(100% at 50% 50%)',
    transition: {
      duration: 0.8,
      ease: 'easeOut'
    }
  },
  exit: {
    clipPath: 'circle(0% at 50% 50%)',
    transition: {
      duration: 0.6
    }
  }
};

export const diagonalReveal: AnimationPreset = {
  initial: {
    clipPath: 'polygon(0 0, 0 0, 0 0, 0 0)'
  },
  animate: {
    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
    transition: {
      duration: 0.8,
      ease: [0.42, 0, 0.58, 1]
    }
  }
};

// Transform Origin Morphing
export const pivotMorph: AnimationPreset = {
  initial: {
    rotate: -180,
    scale: 0,
    transformOrigin: '0% 0%'
  },
  animate: {
    rotate: 0,
    scale: 1,
    transformOrigin: '50% 50%',
    transition: {
      duration: 1,
      ease: 'easeOut'
    }
  }
};

// Skeleton to Content Morph
export const skeletonMorph: AnimationPreset = {
  initial: {
    background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
    backgroundSize: '200% 100%',
    backgroundPosition: '0% 0%',
    opacity: 0.5
  },
  animate: {
    backgroundPosition: '100% 0%',
    opacity: 1,
    transition: {
      backgroundPosition: {
        duration: 1.5,
        ease: 'linear',
        repeat: Infinity
      },
      opacity: {
        duration: 0.5
      }
    }
  }
};