/**
 * Utility functions - pure, no side effects
 */
/**
 * Get current local date in YYYY-MM-DD format
 */
export declare function getTodayDateString(): string;
/**
 * Format a Date object to YYYY-MM-DD
 */
export declare function formatDate(date: Date): string;
/**
 * Parse a YYYY-MM-DD string to Date
 */
export declare function parseDate(dateStr: string): Date;
/**
 * Shuffle an array using Fisher-Yates algorithm
 */
export declare function shuffleArray<T>(array: T[]): T[];
/**
 * Pick n random items from an array
 */
export declare function pickRandom<T>(array: T[], n: number): T[];
/**
 * Clamp a number between min and max
 */
export declare function clamp(value: number, min: number, max: number): number;
/**
 * Escape special characters for RegExp
 */
export declare function escapeRegExp(string: string): string;
//# sourceMappingURL=helpers.d.ts.map