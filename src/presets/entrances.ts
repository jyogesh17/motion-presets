import type { AnimationPreset } from '../types';

// Customization options for entrance animations
export interface FadeOptions {
  initialOpacity?: number;
  targetOpacity?: number;
  duration?: number;
  ease?: string;
}

export interface SlideOptions {
  distance?: number;
  initialOpacity?: number;
  targetOpacity?: number;
  duration?: number;
  ease?: string;
}

export interface ZoomOptions {
  initialScale?: number;
  targetScale?: number;
  initialOpacity?: number;
  targetOpacity?: number;
  duration?: number;
  ease?: string;
}

// Fade animations
export const fadeIn = (options?: FadeOptions): AnimationPreset => ({
  initial: { opacity: options?.initialOpacity ?? 0 },
  animate: { opacity: options?.targetOpacity ?? 1 },
  exit: { opacity: options?.initialOpacity ?? 0 },
  transition: { duration: options?.duration ?? 0.5, ease: options?.ease ?? 'easeOut' },
});

export const fadeInUp = (options?: SlideOptions): AnimationPreset => ({
  initial: { opacity: options?.initialOpacity ?? 0, y: options?.distance ?? 20 },
  animate: { opacity: options?.targetOpacity ?? 1, y: 0 },
  exit: { opacity: options?.initialOpacity ?? 0, y: options?.distance ?? 20 },
  transition: { duration: options?.duration ?? 0.5, ease: options?.ease ?? 'easeOut' },
});

export const fadeInDown = (options?: SlideOptions): AnimationPreset => ({
  initial: { opacity: options?.initialOpacity ?? 0, y: -(options?.distance ?? 20) },
  animate: { opacity: options?.targetOpacity ?? 1, y: 0 },
  exit: { opacity: options?.initialOpacity ?? 0, y: -(options?.distance ?? 20) },
  transition: { duration: options?.duration ?? 0.5, ease: options?.ease ?? 'easeOut' },
});

export const fadeInLeft = (options?: SlideOptions): AnimationPreset => ({
  initial: { opacity: options?.initialOpacity ?? 0, x: -(options?.distance ?? 20) },
  animate: { opacity: options?.targetOpacity ?? 1, x: 0 },
  exit: { opacity: options?.initialOpacity ?? 0, x: -(options?.distance ?? 20) },
  transition: { duration: options?.duration ?? 0.5, ease: options?.ease ?? 'easeOut' },
});

export const fadeInRight = (options?: SlideOptions): AnimationPreset => ({
  initial: { opacity: options?.initialOpacity ?? 0, x: options?.distance ?? 20 },
  animate: { opacity: options?.targetOpacity ?? 1, x: 0 },
  exit: { opacity: options?.initialOpacity ?? 0, x: options?.distance ?? 20 },
  transition: { duration: options?.duration ?? 0.5, ease: options?.ease ?? 'easeOut' },
});

// Slide animations
export const slideIn = (options?: SlideOptions): AnimationPreset => ({
  initial: { x: -(options?.distance ?? 100), opacity: options?.initialOpacity ?? 0 },
  animate: { x: 0, opacity: options?.targetOpacity ?? 1 },
  exit: { x: options?.distance ?? 100, opacity: options?.initialOpacity ?? 0 },
  transition: { duration: options?.duration ?? 0.5, ease: options?.ease ?? 'easeInOut' },
});

export const slideInUp = (options?: SlideOptions): AnimationPreset => ({
  initial: { y: options?.distance ?? 100, opacity: options?.initialOpacity ?? 0 },
  animate: { y: 0, opacity: options?.targetOpacity ?? 1 },
  exit: { y: options?.distance ?? 100, opacity: options?.initialOpacity ?? 0 },
  transition: { duration: options?.duration ?? 0.5, ease: options?.ease ?? 'easeInOut' },
});

export const slideInDown = (options?: SlideOptions): AnimationPreset => ({
  initial: { y: -(options?.distance ?? 100), opacity: options?.initialOpacity ?? 0 },
  animate: { y: 0, opacity: options?.targetOpacity ?? 1 },
  exit: { y: -(options?.distance ?? 100), opacity: options?.initialOpacity ?? 0 },
  transition: { duration: options?.duration ?? 0.5, ease: options?.ease ?? 'easeInOut' },
});

export const slideInLeft = (options?: SlideOptions): AnimationPreset => ({
  initial: { x: -(options?.distance ?? 100), opacity: options?.initialOpacity ?? 0 },
  animate: { x: 0, opacity: options?.targetOpacity ?? 1 },
  exit: { x: -(options?.distance ?? 100), opacity: options?.initialOpacity ?? 0 },
  transition: { duration: options?.duration ?? 0.5, ease: options?.ease ?? 'easeInOut' },
});

export const slideInRight = (options?: SlideOptions): AnimationPreset => ({
  initial: { x: options?.distance ?? 100, opacity: options?.initialOpacity ?? 0 },
  animate: { x: 0, opacity: options?.targetOpacity ?? 1 },
  exit: { x: options?.distance ?? 100, opacity: options?.initialOpacity ?? 0 },
  transition: { duration: options?.duration ?? 0.5, ease: options?.ease ?? 'easeInOut' },
});

// Zoom animations
export const zoomIn = (options?: ZoomOptions): AnimationPreset => ({
  initial: { scale: options?.initialScale ?? 0, opacity: options?.initialOpacity ?? 0 },
  animate: { scale: options?.targetScale ?? 1, opacity: options?.targetOpacity ?? 1 },
  exit: { scale: options?.initialScale ?? 0, opacity: options?.initialOpacity ?? 0 },
  transition: { duration: options?.duration ?? 0.5, ease: options?.ease ?? 'easeOut' },
});

export const zoomInUp = (options?: ZoomOptions & { distance?: number }): AnimationPreset => ({
  initial: { scale: options?.initialScale ?? 0.8, y: options?.distance ?? 100, opacity: options?.initialOpacity ?? 0 },
  animate: { scale: options?.targetScale ?? 1, y: 0, opacity: options?.targetOpacity ?? 1 },
  exit: { scale: options?.initialScale ?? 0.8, y: options?.distance ?? 100, opacity: options?.initialOpacity ?? 0 },
  transition: { duration: options?.duration ?? 0.5, ease: options?.ease ?? 'easeOut' },
});

export const zoomInDown = (options?: ZoomOptions & { distance?: number }): AnimationPreset => ({
  initial: { scale: options?.initialScale ?? 0.8, y: -(options?.distance ?? 100), opacity: options?.initialOpacity ?? 0 },
  animate: { scale: options?.targetScale ?? 1, y: 0, opacity: options?.targetOpacity ?? 1 },
  exit: { scale: options?.initialScale ?? 0.8, y: -(options?.distance ?? 100), opacity: options?.initialOpacity ?? 0 },
  transition: { duration: options?.duration ?? 0.5, ease: options?.ease ?? 'easeOut' },
});