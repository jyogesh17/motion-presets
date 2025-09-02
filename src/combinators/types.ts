export interface CombinatorOptions {
  mode?: 'merge' | 'override' | 'blend';
  priority?: 'first' | 'last' | 'custom';
  customPriority?: number[];
}

export interface SequenceOptions {
  interval?: number;
  overlap?: number;
  loop?: boolean;
  reverse?: boolean;
  ease?: string | number[];
}

export interface ParallelOptions {
  stagger?: number;
  delayPattern?: 'linear' | 'exponential' | 'random' | ((index: number) => number);
  syncTransitions?: boolean;
}