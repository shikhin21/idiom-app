/**
 * Chunk file metadata configuration
 * Defines all 19 idiom chunk files with their ranges and locations
 */
export const CHUNK_FILES = [
    { index: 0, file: 'data/idioms/idioms-1-500.json', startId: 1, endId: 500, count: 500 },
    { index: 1, file: 'data/idioms/idioms-501-1000.json', startId: 501, endId: 1000, count: 500 },
    { index: 2, file: 'data/idioms/idioms-1001-1500.json', startId: 1001, endId: 1500, count: 500 },
    { index: 3, file: 'data/idioms/idioms-1501-2000.json', startId: 1501, endId: 2000, count: 500 },
    { index: 4, file: 'data/idioms/idioms-2001-2500.json', startId: 2001, endId: 2500, count: 500 },
    { index: 5, file: 'data/idioms/idioms-2501-3000.json', startId: 2501, endId: 3000, count: 500 },
    { index: 6, file: 'data/idioms/idioms-3001-3500.json', startId: 3001, endId: 3500, count: 500 },
    { index: 7, file: 'data/idioms/idioms-3501-4000.json', startId: 3501, endId: 4000, count: 500 },
    { index: 8, file: 'data/idioms/idioms-4001-4500.json', startId: 4001, endId: 4500, count: 500 },
    { index: 9, file: 'data/idioms/idioms-4501-5000.json', startId: 4501, endId: 5000, count: 500 },
    { index: 10, file: 'data/idioms/idioms-5001-5500.json', startId: 5001, endId: 5500, count: 500 },
    { index: 11, file: 'data/idioms/idioms-5501-6000.json', startId: 5501, endId: 6000, count: 500 },
    { index: 12, file: 'data/idioms/idioms-6001-6500.json', startId: 6001, endId: 6500, count: 500 },
    { index: 13, file: 'data/idioms/idioms-6501-7000.json', startId: 6501, endId: 7000, count: 500 },
    { index: 14, file: 'data/idioms/idioms-7001-7500.json', startId: 7001, endId: 7500, count: 500 },
    { index: 15, file: 'data/idioms/idioms-7501-8000.json', startId: 7501, endId: 8000, count: 500 },
    { index: 16, file: 'data/idioms/idioms-8001-8500.json', startId: 8001, endId: 8500, count: 500 },
    { index: 17, file: 'data/idioms/idioms-8501-9000.json', startId: 8501, endId: 9000, count: 500 },
    { index: 18, file: 'data/idioms/idioms-9001-9154.json', startId: 9001, endId: 9154, count: 154 },
];
export const TOTAL_IDIOMS = 9154;
export const PRELOAD_THRESHOLD = 0.8; // Preload next chunk at 80%
/**
 * Calculate which chunk and offset a global index falls into
 */
export function getChunkAndOffset(globalIndex) {
    if (globalIndex < 0 || globalIndex >= TOTAL_IDIOMS) {
        return null;
    }
    let accumulatedCount = 0;
    for (const chunk of CHUNK_FILES) {
        if (globalIndex < accumulatedCount + chunk.count) {
            return {
                chunkIndex: chunk.index,
                offset: globalIndex - accumulatedCount,
            };
        }
        accumulatedCount += chunk.count;
    }
    return null;
}
/**
 * Calculate global index from chunk and offset
 */
export function getGlobalIndex(chunkIndex, offset) {
    let globalIndex = 0;
    for (let i = 0; i < chunkIndex; i++) {
        globalIndex += CHUNK_FILES[i].count;
    }
    return globalIndex + offset;
}
//# sourceMappingURL=chunks.js.map