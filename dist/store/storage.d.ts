import type { PersistedState } from '../types/index.js';
/**
 * Storage abstraction layer
 * Designed for easy future migration to cloud sync
 */
export declare function getDefaultState(): PersistedState;
export declare function loadState(): PersistedState;
export declare function saveState(state: PersistedState): void;
export declare function clearState(): void;
/**
 * Update state with a partial update
 * Returns the new full state
 */
export declare function updateState(updates: Partial<PersistedState>): PersistedState;
//# sourceMappingURL=storage.d.ts.map