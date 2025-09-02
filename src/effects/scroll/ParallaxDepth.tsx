import React, { useRef, ReactNode } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface ParallaxDepthProps {
  children: ReactNode;
  offset?: number;
  className?: string;
  layers?: Array<{
    content: ReactNode;
    speed: number;
    opacity?: [number, number];
    scale?: [number, number];
    blur?: [number, number];
    zIndex?: number;
  }>;
  sticky?: boolean;
  fadeEdges?: boolean;
}

/**
 * Multi-layered parallax with depth perception
 * Creates cinematic depth-of-field effects on scroll
 */
export const ParallaxDepth: React.FC<ParallaxDepthProps> = ({
  children,
  offset = 50,
  className = '',
  layers = [],
  sticky = false,
  fadeEdges = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  
  // Create transforms for main content
  const y = useTransform(smoothProgress, [0, 1], [offset, -offset]);
  const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);
  const scale = useTransform(smoothProgress, [0, 0.5, 1], [0.95, 1, 0.95]);
  
  return (
    <div
      ref={containerRef}
      className={`parallax-depth-container ${className}`}
      style={{
        position: 'relative',
        overflow: 'hidden',
        minHeight: '100vh',
      }}
    >
      {/* Background layers with different parallax speeds */}
      {layers.map((layer, index) => {
        const layerY = useTransform(
          smoothProgress,
          [0, 1],
          [offset * layer.speed, -offset * layer.speed]
        );
        
        const layerOpacity = layer.opacity
          ? useTransform(smoothProgress, [0, 1], layer.opacity)
          : undefined;
        
        const layerScale = layer.scale
          ? useTransform(smoothProgress, [0, 1], layer.scale)
          : undefined;
        
        const layerBlur = layer.blur
          ? useTransform(
              smoothProgress,
              [0, 1],
              layer.blur.map(b => `blur(${b}px)`)
            )
          : undefined;
        
        return (
          <motion.div
            key={index}
            className={`parallax-layer layer-${index}`}
            style={{
              position: sticky ? 'sticky' : 'absolute',
              top: sticky ? 0 : '50%',
              left: 0,
              right: 0,
              y: layerY,
              opacity: layerOpacity,
              scale: layerScale,
              filter: layerBlur,
              zIndex: layer.zIndex || index,
              transform: 'translateY(-50%)',
            }}
          >
            {layer.content}
          </motion.div>
        );
      })}
      
      {/* Main content */}
      <motion.div
        className="parallax-content"
        style={{
          position: 'relative',
          y,
          opacity,
          scale,
          zIndex: layers.length + 1,
        }}
      >
        {children}
      </motion.div>
      
      {/* Depth fog effect */}
      {fadeEdges && (
        <>
          <motion.div
            className="depth-fog-top"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '30%',
              background: 'linear-gradient(to bottom, rgba(255,255,255,0.9), transparent)',
              opacity: useTransform(smoothProgress, [0, 0.3], [1, 0]),
              pointerEvents: 'none',
              zIndex: 100,
            }}
          />
          <motion.div
            className="depth-fog-bottom"
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '30%',
              background: 'linear-gradient(to top, rgba(255,255,255,0.9), transparent)',
              opacity: useTransform(smoothProgress, [0.7, 1], [0, 1]),
              pointerEvents: 'none',
              zIndex: 100,
            }}
          />
        </>
      )}
      
      {/* Cinematic bars for dramatic effect */}
      <motion.div
        className="cinematic-bars"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none',
          zIndex: 200,
        }}
      >
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: useTransform(smoothProgress, [0, 0.2, 0.8, 1], ['10%', '0%', '0%', '10%']),
            background: 'black',
          }}
        />
        <motion.div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: useTransform(smoothProgress, [0, 0.2, 0.8, 1], ['10%', '0%', '0%', '10%']),
            background: 'black',
          }}
        />
      </motion.div>
    </div>
  );
};