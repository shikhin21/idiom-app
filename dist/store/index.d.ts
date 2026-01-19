import type { Idiom, IdiomMeta, DailyLog, QuizQuestion, QuizResult, QuestionFeedback, AppState } from '../types/index.js';
/**
 * Main application store
 * Encapsulates all state management and business logic
 */
export declare class IdiomStore {
    private state;
    private idioms;
    private listeners;
    constructor();
    initialize(idioms: Idiom[]): void;
    subscribe(listener: () => void): () => void;
    private notifyListeners;
    private persist;
    getAppState(): AppState;
    getIdiomById(id: string): Idiom | null;
    getIdiomMeta(id: string): IdiomMeta | null;
    getDailyLog(date: string): DailyLog;
    getSeenIdiomIds(): string[];
    getLearnedIdiomIds(): string[];
    getLearnedIdiomsWithMeta(): Array<{
        idiom: Idiom;
        meta: IdiomMeta;
    }>;
    hasQuizInProgress(): boolean;
    private ensureTodayHasIdiom;
    private assignNewIdiomForDate;
    /**
     * Attempt to unlock the next idiom
     * Returns { needsQuiz: true } if quiz required first
     * Returns { idiom: Idiom } if immediately available
     */
    requestNextIdiom(): {
        needsQuiz: boolean;
        idiom: Idiom | null;
    };
    startPracticeQuiz(): void;
    private startQuiz;
    hasUnseenIdioms(): boolean;
    buildQuizQuestions(idiomIds: string[]): QuizQuestion[];
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
    completeQuiz(): QuizResult & {
        newIdiom: Idiom | null;
    };
    cancelQuiz(): void;
    reset(): void;
}
export declare const store: IdiomStore;
//# sourceMappingURL=index.d.ts.map