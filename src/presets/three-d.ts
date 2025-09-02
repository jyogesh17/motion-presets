import type { AnimationPreset } from '../types';

// 3D Rotation Presets
export const rotate3D: AnimationPreset = {
  initial: { 
    rotateX: 0, 
    rotateY: 0, 
    rotateZ: 0,
    opacity: 0
  },
  animate: {
    rotateX: 360,
    rotateY: 360,
    rotateZ: 360,
    opacity: 1,
    transition: {
      duration: 2,
      ease: 'easeInOut'
    }
  }
};

export const flip3D: AnimationPreset = {
  initial: { 
    rotateY: -180,
    opacity: 0,
    scale: 0.8
  },
  animate: {
    rotateY: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.645, 0.045, 0.355, 1]
    }
  },
  exit: {
    rotateY: 180,
    opacity: 0,
    scale: 0.8
  }
};

export const card3D: AnimationPreset = {
  initial: { 
    rotateY: 0,
    scale: 1,
    z: 0
  },
  whileHover: {
    rotateY: 180,
    scale: 1.1,
    z: 50,
    transition: {
      duration: 0.6,
      ease: 'easeOut'
    }
  },
  whileTap: {
    scale: 0.95,
    rotateY: 180
  }
};

// Perspective Animations
export const perspectiveLeft: AnimationPreset = {
  initial: {
    rotateY: 35,
    rotateX: 10,
    opacity: 0,
    x: -100,
    scale: 0.9
  },
  animate: {
    rotateY: 0,
    rotateX: 0,
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.42, 0, 0.58, 1]
    }
  }
};

export const perspectiveRight: AnimationPreset = {
  initial: {
    rotateY: -35,
    rotateX: 10,
    opacity: 0,
    x: 100,
    scale: 0.9
  },
  animate: {
    rotateY: 0,
    rotateX: 0,
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.42, 0, 0.58, 1]
    }
  }
};

export const perspectiveDown: AnimationPreset = {
  initial: {
    rotateX: -35,
    opacity: 0,
    y: -50,
    scale: 0.9,
    z: -100
  },
  animate: {
    rotateX: 0,
    opacity: 1,
    y: 0,
    scale: 1,
    z: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut'
    }
  }
};

// Cube Rotations
export const cubeRotateIn: AnimationPreset = {
  initial: {
    rotateX: -90,
    opacity: 0,
    y: 100
  },
  animate: {
    rotateX: 0,
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut'
    }
  }
};

export const cubeRotateOut: AnimationPreset = {
  initial: {
    rotateX: 0,
    opacity: 1,
    y: 0
  },
  exit: {
    rotateX: 90,
    opacity: 0,
    y: -100,
    transition: {
      duration: 0.6,
      ease: 'easeIn'
    }
  }
};

// 3D Carousel Effect
export const carousel3D: AnimationPreset = {
  initial: {
    rotateY: -45,
    x: -200,
    z: -200,
    opacity: 0.5,
    scale: 0.8
  },
  animate: {
    rotateY: 0,
    x: 0,
    z: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: 'easeInOut'
    }
  },
  exit: {
    rotateY: 45,
    x: 200,
    z: -200,
    opacity: 0.5,
    scale: 0.8
  }
};

// 3D Door Effect
export const door3D: AnimationPreset = {
  initial: {
    rotateY: -90,
    transformOrigin: 'left center',
    opacity: 0
  },
  animate: {
    rotateY: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.645, 0.045, 0.355, 1]
    }
  },
  exit: {
    rotateY: 90,
    opacity: 0,
    transition: {
      duration: 0.6
    }
  }
};

// 3D Book/Page Turn
export const pageTurn3D: AnimationPreset = {
  initial: {
    rotateY: -180,
    transformOrigin: 'center left',
    opacity: 0,
    x: -50
  },
  animate: {
    rotateY: 0,
    opacity: 1,
    x: 0,
    transition: {
      duration: 1,
      ease: 'easeOut'
    }
  }
};

// 3D Unfold
export const unfold3D: AnimationPreset = {
  initial: {
    rotateX: -90,
    rotateY: -90,
    opacity: 0,
    scale: 0.5
  },
  animate: {
    rotateX: 0,
    rotateY: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

// 3D Helix/Spiral
export const helix3D: AnimationPreset = {
  initial: {
    rotateY: -180,
    rotateZ: -180,
    scale: 0,
    opacity: 0
  },
  animate: {
    rotateY: 0,
    rotateZ: 0,
    scale: 1,
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: 'easeOut'
    }
  }
};

// 3D Parallax Layers
export const parallax3D: AnimationPreset = {
  initial: {
    z: -200,
    opacity: 0,
    scale: 1.2
  },
  animate: {
    z: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1,
      ease: 'easeOut'
    }
  },
  whileInView: {
    z: 50,
    transition: {
      duration: 0.5
    }
  }
};

// 3D Tilt Effect
export const tilt3D: AnimationPreset = {
  initial: {
    rotateX: 0,
    rotateY: 0
  },
  whileHover: {
    rotateX: -10,
    rotateY: 10,
    scale: 1.05,
    transition: {
      duration: 0.3,
      ease: 'easeOut'
    }
  }
};

// 3D Box Shadow Lift
export const lift3D: AnimationPreset = {
  initial: {
    y: 0,
    scale: 1,
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  whileHover: {
    y: -10,
    scale: 1.02,
    boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
    transition: {
      duration: 0.3,
      ease: 'easeOut'
    }
  },
  whileTap: {
    y: 0,
    scale: 0.98,
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  }
};