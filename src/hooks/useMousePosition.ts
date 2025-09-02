import { useState, useEffect, useCallback, useRef } from 'react';
import { useMotionValue, MotionValue } from 'framer-motion';

export interface MousePosition {
  x: number;
  y: number;
  elementX?: number;
  elementY?: number;
  velocityX?: number;
  velocityY?: number;
}

interface UseMousePositionOptions {
  includeVelocity?: boolean;
  throttle?: number;
  relative?: boolean;
}

export function useMousePosition(
  options: UseMousePositionOptions = {}
): {
  position: MousePosition;
  motionX: MotionValue<number>;
  motionY: MotionValue<number>;
} {
  const { includeVelocity = false, throttle = 0, relative = false } = options;
  
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 });
  const motionX = useMotionValue(0);
  const motionY = useMotionValue(0);
  const lastPosition = useRef({ x: 0, y: 0 });
  const lastTime = useRef(Date.now());
  const frameId = useRef<number>();
  const lastUpdate = useRef(0);

  const updatePosition = useCallback((e: MouseEvent) => {
    if (throttle > 0) {
      const now = Date.now();
      if (now - lastUpdate.current < throttle) {
        return;
      }
      lastUpdate.current = now;
    }

    if (frameId.current) {
      cancelAnimationFrame(frameId.current);
    }

    frameId.current = requestAnimationFrame(() => {
      const newPosition: MousePosition = {
        x: e.clientX,
        y: e.clientY,
      };

      if (relative && e.target instanceof HTMLElement) {
        const rect = e.target.getBoundingClientRect();
        newPosition.elementX = e.clientX - rect.left;
        newPosition.elementY = e.clientY - rect.top;
      }

      if (includeVelocity) {
        const now = Date.now();
        const dt = now - lastTime.current;
        if (dt > 0) {
          newPosition.velocityX = (e.clientX - lastPosition.current.x) / dt * 1000;
          newPosition.velocityY = (e.clientY - lastPosition.current.y) / dt * 1000;
        }
        lastTime.current = now;
        lastPosition.current = { x: e.clientX, y: e.clientY };
      }

      setPosition(newPosition);
      motionX.set(e.clientX);
      motionY.set(e.clientY);
    });
  }, [throttle, relative, includeVelocity, motionX, motionY]);

  useEffect(() => {
    window.addEventListener('mousemove', updatePosition);
    return () => {
      window.removeEventListener('mousemove', updatePosition);
      if (frameId.current) {
        cancelAnimationFrame(frameId.current);
      }
    };
  }, [updatePosition]);

  return { position, motionX, motionY };
}

export function useMouseVelocity() {
  const { position } = useMousePosition({ includeVelocity: true });
  return {
    velocityX: position.velocityX || 0,
    velocityY: position.velocityY || 0,
    velocity: Math.sqrt(
      (position.velocityX || 0) ** 2 + (position.velocityY || 0) ** 2
    ),
  };
}