import { CHUNK_FILES, getChunkAndOffset, PRELOAD_THRESHOLD, TOTAL_IDIOMS } from '../config/chunks.js';
/**
 * ChunkManager handles lazy loading and caching of idiom chunk files
 */
export class ChunkManager {
    constructor() {
        this.loadedChunks = new Map();
        this.loadingPromises = new Map();
        this.preloadedChunks = new Set();
    }
    /**
     * Load a chunk file and cache it in memory
     */
    async loadChunk(chunkIndex) {
        // Return cached chunk if already loaded
        if (this.loadedChunks.has(chunkIndex)) {
            return this.loadedChunks.get(chunkIndex);
        }
        // Return existing promise if already loading
        if (this.loadingPromises.has(chunkIndex)) {
            return this.loadingPromises.get(chunkIndex);
        }
        // Validate chunk index
        if (chunkIndex < 0 || chunkIndex >= CHUNK_FILES.length) {
            throw new Error(`Invalid chunk index: ${chunkIndex}`);
        }
        const chunkMeta = CHUNK_FILES[chunkIndex];
        // Start loading
        const loadPromise = (async () => {
            try {
                console.log(`Loading chunk ${chunkIndex}: ${chunkMeta.file}`);
                const response = await fetch(chunkMeta.file);
                if (!response.ok) {
                    throw new Error(`Failed to load chunk ${chunkIndex}: ${response.status}`);
                }
                const idioms = await response.json();
                // Validate loaded data
                if (!Array.isArray(idioms) || idioms.length !== chunkMeta.count) {
                    console.warn(`Chunk ${chunkIndex} size mismatch: expected ${chunkMeta.count}, got ${idioms.length}`);
                }
                // Cache the loaded chunk
                this.loadedChunks.set(chunkIndex, idioms);
                this.loadingPromises.delete(chunkIndex);
                console.log(`Chunk ${chunkIndex} loaded: ${idioms.length} idioms`);
                return idioms;
            }
            catch (error) {
                this.loadingPromises.delete(chunkIndex);
                throw error;
            }
        })();
        this.loadingPromises.set(chunkIndex, loadPromise);
        return loadPromise;
    }
    /**
     * Get an idiom by its global index (0-9153)
     */
    async getIdiomAtGlobalIndex(globalIndex) {
        const location = getChunkAndOffset(globalIndex);
        if (!location) {
            console.warn(`Global index ${globalIndex} out of range (0-${TOTAL_IDIOMS - 1})`);
            return null;
        }
        const { chunkIndex, offset } = location;
        const chunk = await this.loadChunk(chunkIndex);
        if (offset >= chunk.length) {
            console.error(`Offset ${offset} exceeds chunk ${chunkIndex} size ${chunk.length}`);
            return null;
        }
        return chunk[offset];
    }
    /**
     * Get multiple idioms by their IDs (for practice mode)
     * Loads only the chunks needed for these specific idioms
     */
    async getIdiomsByIds(idiomIds) {
        // Build a map of chunks we need to load
        const neededChunks = new Set();
        const idiomMap = new Map();
        // First, check already loaded chunks
        for (const [chunkIndex, chunk] of this.loadedChunks.entries()) {
            for (const idiom of chunk) {
                if (idiomIds.includes(idiom.id)) {
                    idiomMap.set(idiom.id, idiom);
                }
            }
        }
        // Find which chunks we still need
        // We need to search through chunk files to find idioms by ID
        // This is less efficient but necessary since IDs don't follow predictable pattern
        for (const idiomId of idiomIds) {
            if (idiomMap.has(idiomId))
                continue;
            // Extract numeric part from ID (e.g., "idiom_001" -> 1)
            const match = idiomId.match(/idiom_(\d+)/);
            if (!match)
                continue;
            const idiomNumber = parseInt(match[1], 10);
            // Find which chunk this idiom should be in based on number
            for (const chunkMeta of CHUNK_FILES) {
                if (idiomNumber >= chunkMeta.startId && idiomNumber <= chunkMeta.endId) {
                    neededChunks.add(chunkMeta.index);
                    break;
                }
            }
        }
        // Load needed chunks in parallel
        await Promise.all(Array.from(neededChunks).map(chunkIndex => this.loadChunk(chunkIndex)));
        // Collect idioms from newly loaded chunks
        for (const chunkIndex of neededChunks) {
            const chunk = this.loadedChunks.get(chunkIndex);
            if (!chunk)
                continue;
            for (const idiom of chunk) {
                if (idiomIds.includes(idiom.id)) {
                    idiomMap.set(idiom.id, idiom);
                }
            }
        }
        // Return idioms in the order requested
        return idiomIds
            .map(id => idiomMap.get(id))
            .filter((idiom) => idiom !== undefined);
    }
    /**
     * Preload the next chunk in the background (non-blocking)
     */
    preloadNextChunk(currentChunkIndex) {
        const nextChunkIndex = currentChunkIndex + 1;
        if (nextChunkIndex >= CHUNK_FILES.length) {
            return; // No more chunks to preload
        }
        // Don't preload if already loaded or loading
        if (this.loadedChunks.has(nextChunkIndex) ||
            this.loadingPromises.has(nextChunkIndex) ||
            this.preloadedChunks.has(nextChunkIndex)) {
            return;
        }
        this.preloadedChunks.add(nextChunkIndex);
        console.log(`Preloading chunk ${nextChunkIndex} in background`);
        this.loadChunk(nextChunkIndex).catch(error => {
            console.error(`Failed to preload chunk ${nextChunkIndex}:`, error);
            this.preloadedChunks.delete(nextChunkIndex);
        });
    }
    /**
     * Check if we should preload the next chunk based on current progress
     */
    shouldPreloadNext(currentChunkIndex, currentOffset) {
        const chunkMeta = CHUNK_FILES[currentChunkIndex];
        if (!chunkMeta)
            return false;
        const progress = currentOffset / chunkMeta.count;
        return progress >= PRELOAD_THRESHOLD;
    }
    /**
     * Get current cache statistics (for debugging)
     */
    getCacheStats() {
        let loadedIdioms = 0;
        for (const chunk of this.loadedChunks.values()) {
            loadedIdioms += chunk.length;
        }
        return {
            loadedChunks: this.loadedChunks.size,
            totalChunks: CHUNK_FILES.length,
            loadedIdioms,
        };
    }
    /**
     * Clear all cached chunks (for memory management if needed)
     */
    clearCache() {
        this.loadedChunks.clear();
        this.loadingPromises.clear();
        this.preloadedChunks.clear();
        console.log('Chunk cache cleared');
    }
}
//# sourceMappingURL=chunkManager.js.map