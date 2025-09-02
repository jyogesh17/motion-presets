import { Variants } from 'framer-motion';

// Tap gestures
export const tapScale: Variants = {
  idle: {
    scale: 1
  },
  tap: {
    scale: 0.95,
    transition: {
      duration: 0.1,
      ease: 'easeInOut'
    }
  }
};

export const tapRotate: Variants = {
  idle: {
    rotate: 0
  },
  tap: {
    rotate: [0, -5, 5, 0],
    transition: {
      duration: 0.3
    }
  }
};

export const tapGlow: Variants = {
  idle: {
    boxShadow: '0 0 0 rgba(102, 126, 234, 0)'
  },
  tap: {
    boxShadow: '0 0 20px rgba(102, 126, 234, 0.5)',
    transition: {
      duration: 0.2
    }
  }
};

// Hover gestures
export const hoverScale: Variants = {
  idle: {
    scale: 1
  },
  hover: {
    scale: 1.05,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 25
    }
  }
};

export const hoverRotate: Variants = {
  idle: {
    rotate: 0
  },
  hover: {
    rotate: 5,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 20
    }
  }
};

export const hoverLift: Variants = {
  idle: {
    y: 0,
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  },
  hover: {
    y: -5,
    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 25
    }
  }
};

export const hoverShine: Variants = {
  idle: {
    background: 'linear-gradient(90deg, #fff 0%, #fff 100%)'
  },
  hover: {
    background: [
      'linear-gradient(90deg, #fff 0%, #f0f0f0 50%, #fff 100%)',
      'linear-gradient(90deg, #f0f0f0 0%, #fff 50%, #f0f0f0 100%)',
      'linear-gradient(90deg, #fff 0%, #f0f0f0 50%, #fff 100%)'
    ],
    transition: {
      duration: 1.5,
      repeat: Infinity
    }
  }
};

// Focus gestures
export const focusGlow: Variants = {
  idle: {
    boxShadow: '0 0 0 0 rgba(102, 126, 234, 0)'
  },
  focus: {
    boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.3)',
    transition: {
      duration: 0.2
    }
  }
};

export const focusScale: Variants = {
  idle: {
    scale: 1,
    borderWidth: 2
  },
  focus: {
    scale: 1.02,
    borderWidth: 3,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 30
    }
  }
};

// Combined gestures
export const buttonGestures = {
  whileHover: {
    scale: 1.05,
    boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 25
    }
  },
  whileTap: {
    scale: 0.95,
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  },
  whileFocus: {
    boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.3)'
  }
};

export const cardGestures = {
  whileHover: {
    y: -10,
    scale: 1.02,
    boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 20
    }
  },
  whileTap: {
    scale: 0.98,
    y: 0
  }
};

// Magnetic effect
export const magneticGestures = {
  onHoverStart: (_e: MouseEvent, info: any) => ({
    x: info.point.x * 0.1,
    y: info.point.y * 0.1,
    transition: {
      type: 'spring',
      stiffness: 150,
      damping: 15
    }
  }),
  onHoverEnd: () => ({
    x: 0,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 150,
      damping: 15
    }
  })
};

// Tilt effect
export const tiltGestures = {
  whileHover: {
    rotateX: -5,
    rotateY: 5,
    scale: 1.05,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 30
    }
  }
};

// Pulse effect
export const pulseGestures: Variants = {
  idle: {
    scale: 1
  },
  pulse: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

// Shake effect
export const shakeGestures: Variants = {
  idle: {
    x: 0
  },
  shake: {
    x: [-10, 10, -10, 10, -5, 5, 0],
    transition: {
      duration: 0.5
    }
  }
};

// Ripple effect
export const rippleGestures = {
  whileTap: {
    scale: [1, 0.95, 1.05, 1],
    transition: {
      duration: 0.3
    }
  }
};

// Long press gestures
export const longPressGestures = {
  whileTap: {
    scale: [1, 0.95],
    transition: {
      duration: 0.5,
      times: [0, 1]
    }
  },
  onTapStart: () => console.log('Long press started'),
  onTap: () => console.log('Long press completed')
};