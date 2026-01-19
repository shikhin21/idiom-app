import type { PersistedState } from '../types/index.js';

const STORAGE_KEY = 'idiom_app_data';
const CURRENT_VERSION = 2; // v2: chunk-based loading

/**
 * Storage abstraction layer
 * Designed for easy future migration to cloud sync
 */

export function getDefaultState(): PersistedState {
  return {
    idiomMeta: {},
    daily: {},
    quizInProgress: null,
    nextIdiomIndex: 0, // Deprecated but kept for migration
    currentChunkIndex: 0,
    currentChunkOffset: 0,
    version: CURRENT_VERSION,
  };
}

export function loadState(): PersistedState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return getDefaultState();
    }

    const parsed = JSON.parse(raw) as PersistedState;

    // Version migration
    if (parsed.version !== CURRENT_VERSION) {
      console.log(`Migrating from version ${parsed.version} to ${CURRENT_VERSION}`);

      if (parsed.version === 1) {
        // Migration from v1 to v2: Reset to chunk-based system
        console.log('Resetting progress to chunk-based system (keeping learned/seen data)');
        parsed.currentChunkIndex = 0;
        parsed.currentChunkOffset = 0;
        // Keep idiomMeta and daily data (user's learning history)
        // Reset nextIdiomIndex (will be recalculated from chunk position)
        parsed.nextIdiomIndex = 0;
      }

      parsed.version = CURRENT_VERSION;
      saveState(parsed); // Persist migration
    }

    // Ensure new fields exist (for robustness)
    if (parsed.currentChunkIndex === undefined) {
      parsed.currentChunkIndex = 0;
    }
    if (parsed.currentChunkOffset === undefined) {
      parsed.currentChunkOffset = 0;
    }

    return parsed;
  } catch (error) {
    console.error('Failed to load state:', error);
    return getDefaultState();
  }
}

export function saveState(state: PersistedState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Failed to save state:', error);
  }
}

export function clearState(): void {
  localStorage.removeItem(STORAGE_KEY);
}

/**
 * Update state with a partial update
 * Returns the new full state
 */
export function updateState(updates: Partial<PersistedState>): PersistedState {
  const current = loadState();
  const newState = { ...current, ...updates };
  saveState(newState);
  return newState;
}
