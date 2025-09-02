import type { HTMLMotionProps, Variant, TargetAndTransition, Spring, Tween, Keyframes } from 'framer-motion';
import type { ReactNode } from 'react';

export interface AnimationPreset {
  initial?: Variant;
  animate?: Variant;
  exit?: Variant;
  whileHover?: Variant;
  whileTap?: Variant;
  whileInView?: Variant;
  whileDrag?: Variant;
  whileFocus?: Variant;
  transition?: TargetAndTransition['transition'];
}

export type TransitionConfig = Spring | Tween | Keyframes;

export interface AnimationOverrides {
  initial?: Partial<Variant>;
  animate?: Partial<Variant>;
  exit?: Partial<Variant>;
  whileHover?: Partial<Variant>;
  whileTap?: Partial<Variant>;
  whileInView?: Partial<Variant>;
  whileDrag?: Partial<Variant>;
  whileFocus?: Partial<Variant>;
  transition?: Partial<TransitionConfig>;
}

export interface CustomizablePreset extends AnimationPreset {
  customize?: (overrides: AnimationOverrides) => AnimationPreset;
  defaults?: AnimationOverrides;
}

export type PresetCombination = string | string[] | AnimationPreset | AnimationPreset[];

export interface CombinationOptions {
  mode?: 'parallel' | 'sequence' | 'stagger';
  staggerDelay?: number;
  overlap?: number;
  reverse?: boolean;
}

export interface BaseComponentProps extends Omit<HTMLMotionProps<'div'>, 'initial' | 'animate' | 'exit'> {
  children: ReactNode;
  preset?: PresetCombination;
  delay?: number;
  duration?: number;
  className?: string;
  disabled?: boolean;
  responsive?: boolean;
  respectReducedMotion?: boolean;
  once?: boolean;
  amount?: number | 'some' | 'all';
  customize?: AnimationOverrides;
  combinationOptions?: CombinationOptions;
}

export interface StaggerProps extends BaseComponentProps {
  staggerChildren?: number;
  delayChildren?: number;
}

export interface TextAnimationProps extends Omit<BaseComponentProps, 'children'> {
  text: string;
  splitBy?: 'words' | 'characters' | 'lines';
  staggerDelay?: number;
}

export interface AnimationSequenceProps extends Omit<BaseComponentProps, 'preset'> {
  presets: PresetCombination[];
  interval?: number;
  loop?: boolean;
  autoPlay?: boolean;
}

export interface MultiAnimationProps extends BaseComponentProps {
  animations: Array<{
    preset: string | AnimationPreset;
    delay?: number;
    duration?: number;
    customize?: AnimationOverrides;
  }>;
}

export interface AnimationComposerProps {
  children: ReactNode;
  timeline?: Array<{
    preset: string | AnimationPreset;
    start: number;
    duration?: number;
    customize?: AnimationOverrides;
  }>;
  totalDuration?: number;
}