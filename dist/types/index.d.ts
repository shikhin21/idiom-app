export interface Idiom {
    id: string;
    idiom: string;
    definition: string;
    examples: Array<{
        sentence: string;
        usedIdiom?: string;
    }>;
    wrongExamples: string[];
}
export interface IdiomMeta {
    idiomId: string;
    dateSeen: string;
    dateLearned?: string;
    quizHistory?: QuizAttempt[];
}
export interface QuizAttempt {
    timestamp: number;
    score: number;
    numQuestions: number;
}
export interface DailyLog {
    seen: string[];
    learned: string[];
}
export interface QuestionFeedback {
    answered: boolean;
    submitted: boolean;
    isCorrect: boolean | null;
    selectedAnswer: string | null;
}
export interface QuizState {
    idiomIds: string[];
    currentIndex: number;
    answers: (string | null)[];
    started: boolean;
    questions?: QuizQuestion[];
    feedback?: QuestionFeedback[];
    isPracticeMode?: boolean;
}
export type QuizQuestionType = 'standard-mcq' | 'reverse-mcq' | 'cloze' | 'usage-identification' | 'true-false' | 'word-order';
export interface BaseQuizQuestion {
    type: QuizQuestionType;
    idiomId: string;
    idiom: string;
    correctAnswer: string;
}
export interface StandardMCQQuestion extends BaseQuizQuestion {
    type: 'standard-mcq';
    options: string[];
}
export interface ReverseMCQQuestion extends BaseQuizQuestion {
    type: 'reverse-mcq';
    definition: string;
    options: string[];
}
export interface ClozeQuestion extends BaseQuizQuestion {
    type: 'cloze';
    sentence: string;
    options?: string[];
}
export interface UsageIdentificationQuestion extends BaseQuizQuestion {
    type: 'usage-identification';
    sentences: string[];
    correctIndex: number;
}
export interface TrueFalseQuestion extends BaseQuizQuestion {
    type: 'true-false';
    statement: string;
    isTrue: boolean;
}
export interface WordOrderQuestion extends BaseQuizQuestion {
    type: 'word-order';
    shuffledWords: string[];
    correctOrder: string[];
}
export type QuizQuestion = StandardMCQQuestion | ReverseMCQQuestion | ClozeQuestion | UsageIdentificationQuestion | TrueFalseQuestion | WordOrderQuestion;
export interface PersistedState {
    idiomMeta: Record<string, IdiomMeta>;
    daily: Record<string, DailyLog>;
    quizInProgress: QuizState | null;
    nextIdiomIndex: number;
    version: number;
}
export interface AppState {
    currentDate: string;
    todayIdioms: Idiom[];
    allIdioms: Idiom[];
    learnedIdiomIds: string[];
    seenIdiomIds: string[];
    quizRequired: boolean;
    quizState: QuizState | null;
    quizQuestions: QuizQuestion[];
    quizResult: QuizResult | null;
    newlyUnlockedIdiom: Idiom | null;
}
export interface QuizResult {
    score: number;
    total: number;
    passed: boolean;
}
//# sourceMappingURL=index.d.ts.map