import type { Idiom, IdiomMeta, DailyLog, QuizQuestion, QuizResult, QuestionFeedback, AppState } from '../types/index.js';
import { ChunkManager } from './chunkManager.js';
/**
 * Main application store
 * Encapsulates all state management and business logic
 */
export declare class IdiomStore {
    private state;
    private chunkManager;
    private listeners;
    constructor(chunkManager: ChunkManager);
    initialize(): Promise<void>;
    subscribe(listener: () => void): () => void;
    private notifyListeners;
    private persist;
    getAppState(): Promise<AppState>;
    getIdiomById(id: string): Promise<Idiom | null>;
    getIdiomsByIds(ids: string[]): Promise<Idiom[]>;
    getIdiomMeta(id: string): IdiomMeta | null;
    getDailyLog(date: string): DailyLog;
    getSeenIdiomIds(): string[];
    getLearnedIdiomIds(): string[];
    getLearnedIdiomsWithMeta(): Promise<Array<{
        idiom: Idiom;
        meta: IdiomMeta;
    }>>;
    hasQuizInProgress(): boolean;
    private ensureTodayHasIdiom;
    private assignNewIdiomForDate;
    /**
     * Attempt to unlock the next idiom
     * Returns { needsQuiz: true } if quiz required first
     * Returns { idiom: Idiom } if immediately available
     */
    requestNextIdiom(): Promise<{
        needsQuiz: boolean;
        idiom: Idiom | null;
    }>;
    startPracticeQuiz(): Promise<void>;
    private startQuiz;
    hasUnseenIdioms(): boolean;
    buildQuizQuestions(idiomIds: string[]): Promise<QuizQuestion[]>;
    private generateStandardMCQ;
    private generateReverseMCQ;
    private generateClozeQuestion;
    private generateUsageIdentification;
    private generateTrueFalse;
    private generateWordOrder;
    submitQuizAnswer(questionIndex: number, answer: string): void;
    private validateAnswer;
    advanceToNextQuestion(): void;
    getQuestionFeedback(questionIndex: number): QuestionFeedback | null;
    completeQuiz(): Promise<QuizResult & {
        newIdiom: Idiom | null;
    }>;
    cancelQuiz(): void;
    reset(): void;
}
//# sourceMappingURL=index.d.ts.map