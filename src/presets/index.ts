// Re-export all presets
export * from './entrances';
export * from './attention';
export * from './physics';
export * from './three-d';
export * from './morph';
export * from './spring';
export * from './drag';
export * from './enter-exit';
export * from './gestures';
export * from './bounce';

// Create a combined presets object for easy access
import * as entrances from './entrances';
import * as attention from './attention';
import * as physics from './physics';
import * as threeD from './three-d';
import * as morph from './morph';
import * as spring from './spring';
import * as drag from './drag';
import * as enterExit from './enter-exit';
import * as gestures from './gestures';
import * as bounce from './bounce';

// Include all presets - both functions and direct objects
export const presets = {
  ...entrances,
  ...attention,
  ...physics,
  ...threeD,
  ...morph,
  ...spring,
  ...drag,
  ...enterExit,
  ...gestures,
  ...bounce,
};

export type PresetName = keyof typeof presets;