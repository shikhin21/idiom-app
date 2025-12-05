const STORAGE_KEY = 'idiom_app_data';
const CURRENT_VERSION = 1;
/**
 * Storage abstraction layer
 * Designed for easy future migration to cloud sync
 */
export function getDefaultState() {
    return {
        idiomMeta: {},
        daily: {},
        quizInProgress: null,
        nextIdiomIndex: 0,
        version: CURRENT_VERSION,
    };
}
export function loadState() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) {
            return getDefaultState();
        }
        const parsed = JSON.parse(raw);
        // Version migration could happen here
        if (parsed.version !== CURRENT_VERSION) {
            // Future: handle migrations
            parsed.version = CURRENT_VERSION;
        }
        return parsed;
    }
    catch (error) {
        console.error('Failed to load state:', error);
        return getDefaultState();
    }
}
export function saveState(state) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
    catch (error) {
        console.error('Failed to save state:', error);
    }
}
export function clearState() {
    localStorage.removeItem(STORAGE_KEY);
}
/**
 * Update state with a partial update
 * Returns the new full state
 */
export function updateState(updates) {
    const current = loadState();
    const newState = { ...current, ...updates };
    saveState(newState);
    return newState;
}
//# sourceMappingURL=storage.js.map