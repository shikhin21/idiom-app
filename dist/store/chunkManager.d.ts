import { Idiom } from '../types/index.js';
/**
 * ChunkManager handles lazy loading and caching of idiom chunk files
 */
export declare class ChunkManager {
    private loadedChunks;
    private loadingPromises;
    private preloadedChunks;
    /**
     * Load a chunk file and cache it in memory
     */
    loadChunk(chunkIndex: number): Promise<Idiom[]>;
    /**
     * Get an idiom by its global index (0-9153)
     */
    getIdiomAtGlobalIndex(globalIndex: number): Promise<Idiom | null>;
    /**
     * Get multiple idioms by their IDs (for practice mode)
     * Loads only the chunks needed for these specific idioms
     */
    getIdiomsByIds(idiomIds: string[]): Promise<Idiom[]>;
    /**
     * Preload the next chunk in the background (non-blocking)
     */
    preloadNextChunk(currentChunkIndex: number): void;
    /**
     * Check if we should preload the next chunk based on current progress
     */
    shouldPreloadNext(currentChunkIndex: number, currentOffset: number): boolean;
    /**
     * Get current cache statistics (for debugging)
     */
    getCacheStats(): {
        loadedChunks: number;
        totalChunks: number;
        loadedIdioms: number;
    };
    /**
     * Clear all cached chunks (for memory management if needed)
     */
    clearCache(): void;
}
//# sourceMappingURL=chunkManager.d.ts.map