import { Variants } from 'framer-motion';

// Drag interaction configurations
export const dragConfigs = {
  free: {
    drag: true,
    dragMomentum: true,
    dragElastic: 0.2,
    dragTransition: { bounceStiffness: 600, bounceDamping: 20 }
  },
  constrained: {
    drag: true,
    dragConstraints: { left: -100, right: 100, top: -100, bottom: 100 },
    dragElastic: 0.5,
    dragMomentum: true
  },
  horizontal: {
    drag: 'x',
    dragConstraints: { left: -200, right: 200 },
    dragElastic: 0.3,
    dragMomentum: true
  },
  vertical: {
    drag: 'y',
    dragConstraints: { top: -200, bottom: 200 },
    dragElastic: 0.3,
    dragMomentum: true
  },
  magnetic: {
    drag: true,
    dragElastic: 1,
    dragConstraints: { left: 0, right: 0, top: 0, bottom: 0 },
    dragTransition: { 
      bounceStiffness: 100, 
      bounceDamping: 10,
      power: 0.2,
      timeConstant: 200
    }
  },
  smooth: {
    drag: true,
    dragMomentum: false,
    dragElastic: 0,
    dragTransition: {
      power: 0,
      timeConstant: 500
    }
  },
  snap: {
    drag: true,
    dragConstraints: { left: -100, right: 100, top: -100, bottom: 100 },
    dragElastic: 0,
    dragMomentum: false,
    dragSnapToOrigin: true
  }
};

// Draggable card animations
export const draggableCard: Variants = {
  idle: {
    scale: 1,
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  },
  drag: {
    scale: 1.05,
    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
    cursor: 'grabbing'
  }
};

// Swipeable card animations (like Tinder)
export const swipeCard: Variants = {
  center: {
    x: 0,
    y: 0,
    rotate: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    y: 0,
    rotate: direction > 0 ? 20 : -20,
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: 'easeOut'
    }
  })
};

// Drag to reveal animations
export const dragReveal: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 25
    }
  }
};

// Elastic drag animations
export const elasticDrag: Variants = {
  initial: {
    scale: 1
  },
  drag: {
    scale: [1, 1.2, 1.1],
    transition: {
      duration: 0.3
    }
  },
  dragEnd: {
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 25
    }
  }
};

// Drag with rotation
export const dragRotate: Variants = {
  drag: (info: any) => ({
    rotate: info?.offset?.x ? info.offset.x * 0.1 : 0
  })
};

// Throw physics
export const throwable = {
  drag: true,
  dragMomentum: true,
  dragElastic: 0,
  dragTransition: {
    power: 0.3,
    timeConstant: 200,
    modifyTarget: (target: number) => Math.round(target / 50) * 50
  }
};

// Pull to refresh animation
export const pullToRefresh: Variants = {
  idle: {
    y: 0
  },
  pulling: {
    y: 80,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 40
    }
  },
  release: {
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 40
    }
  }
};

// Draggable list item
export const draggableListItem = {
  drag: 'y',
  dragConstraints: { top: 0, bottom: 0 },
  dragElastic: 1,
  dragMomentum: false,
  layout: true,
  whileDrag: {
    scale: 1.02,
    boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
    zIndex: 1
  }
};

// Rubber band drag effect
export const rubberBandDrag = {
  drag: true,
  dragConstraints: { left: -50, right: 50, top: -50, bottom: 50 },
  dragElastic: 1.5,
  dragTransition: {
    bounceStiffness: 600,
    bounceDamping: 10
  },
  whileDrag: {
    scale: 0.95
  }
};