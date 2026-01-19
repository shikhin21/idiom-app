/**
 * Chunk file metadata configuration
 * Defines all 19 idiom chunk files with their ranges and locations
 */
export interface ChunkMetadata {
    index: number;
    file: string;
    startId: number;
    endId: number;
    count: number;
}
export declare const CHUNK_FILES: ChunkMetadata[];
export declare const TOTAL_IDIOMS = 9154;
export declare const PRELOAD_THRESHOLD = 0.8;
/**
 * Calculate which chunk and offset a global index falls into
 */
export declare function getChunkAndOffset(globalIndex: number): {
    chunkIndex: number;
    offset: number;
} | null;
/**
 * Calculate global index from chunk and offset
 */
export declare function getGlobalIndex(chunkIndex: number, offset: number): number;
//# sourceMappingURL=chunks.d.ts.map