import { loadState, saveState, getDefaultState } from './storage.js';
import { getTodayDateString, shuffleArray, escapeRegExp } from '../utils/helpers.js';
const PASS_THRESHOLD = 0.7;
const MIN_QUIZ_SIZE = 3;
const MAX_QUIZ_SIZE = 5;
/**
 * Main application store
 * Encapsulates all state management and business logic
 */
export class IdiomStore {
    constructor() {
        this.idioms = [];
        this.listeners = new Set();
        this.state = loadState();
    }
    // ─────────────────────────────────────────────
    // Initialization
    // ─────────────────────────────────────────────
    initialize(idioms) {
        this.idioms = idioms;
        this.ensureTodayHasIdiom();
        this.notifyListeners();
    }
    // ─────────────────────────────────────────────
    // Subscriptions (for UI reactivity)
    // ─────────────────────────────────────────────
    subscribe(listener) {
        this.listeners.add(listener);
        return () => this.listeners.delete(listener);
    }
    notifyListeners() {
        this.listeners.forEach((listener) => listener());
    }
    persist() {
        saveState(this.state);
        this.notifyListeners();
    }
    // ─────────────────────────────────────────────
    // Getters
    // ─────────────────────────────────────────────
    getAppState() {
        const today = getTodayDateString();
        const dailyLog = this.getDailyLog(today);
        const todayIdioms = dailyLog.seen
            .map((id) => this.getIdiomById(id))
            .filter((i) => i !== null);
        const learnedIdiomIds = this.getLearnedIdiomIds();
        const seenIdiomIds = Object.keys(this.state.idiomMeta);
        // Quiz is required if user has learned idioms AND tries to get next
        // This is checked when button is clicked, not continuously
        const quizRequired = learnedIdiomIds.length > 0;
        // Get quiz questions, generating them if not stored (backward compatibility)
        let quizQuestions = [];
        if (this.state.quizInProgress) {
            if (this.state.quizInProgress.questions) {
                quizQuestions = this.state.quizInProgress.questions;
            }
            else {
                // Backward compatibility: generate and store questions if missing
                quizQuestions = this.buildQuizQuestions(this.state.quizInProgress.idiomIds);
                this.state.quizInProgress.questions = quizQuestions;
            }
        }
        return {
            currentDate: today,
            todayIdioms,
            allIdioms: this.idioms,
            learnedIdiomIds,
            seenIdiomIds,
            quizRequired,
            quizState: this.state.quizInProgress,
            quizQuestions,
            quizResult: null,
            newlyUnlockedIdiom: null,
        };
    }
    getIdiomById(id) {
        return this.idioms.find((i) => i.id === id) ?? null;
    }
    getIdiomMeta(id) {
        return this.state.idiomMeta[id] ?? null;
    }
    getDailyLog(date) {
        return this.state.daily[date] ?? { seen: [], learned: [] };
    }
    getSeenIdiomIds() {
        return Object.keys(this.state.idiomMeta);
    }
    getLearnedIdiomIds() {
        return Object.entries(this.state.idiomMeta)
            .filter(([_, meta]) => meta.dateLearned)
            .map(([id]) => id);
    }
    getLearnedIdiomsWithMeta() {
        return Object.entries(this.state.idiomMeta)
            .filter(([_, meta]) => meta.dateLearned)
            .map(([id, meta]) => ({
            idiom: this.getIdiomById(id),
            meta,
        }))
            .filter((item) => item.idiom !== null);
    }
    hasQuizInProgress() {
        return this.state.quizInProgress !== null && this.state.quizInProgress.started;
    }
    // ─────────────────────────────────────────────
    // Date & Idiom-of-the-Day Logic
    // ─────────────────────────────────────────────
    ensureTodayHasIdiom() {
        const today = getTodayDateString();
        const dailyLog = this.getDailyLog(today);
        if (dailyLog.seen.length === 0) {
            this.assignNewIdiomForDate(today);
        }
    }
    assignNewIdiomForDate(date) {
        if (this.state.nextIdiomIndex >= this.idioms.length) {
            console.warn('All idioms exhausted');
            return null;
        }
        const idiom = this.idioms[this.state.nextIdiomIndex];
        // Update metadata
        this.state.idiomMeta[idiom.id] = {
            idiomId: idiom.id,
            dateSeen: date,
        };
        // Update daily log - add new idioms at the start
        const dailyLog = this.getDailyLog(date);
        dailyLog.seen.unshift(idiom.id);
        this.state.daily[date] = dailyLog;
        // Increment index
        this.state.nextIdiomIndex++;
        this.persist();
        return idiom;
    }
    // ─────────────────────────────────────────────
    // Next Idiom Logic
    // ─────────────────────────────────────────────
    /**
     * Attempt to unlock the next idiom
     * Returns { needsQuiz: true } if quiz required first
     * Returns { idiom: Idiom } if immediately available
     */
    requestNextIdiom() {
        const today = getTodayDateString();
        const seenIds = this.getSeenIdiomIds();
        // Only the very first idiom ever is free (no idioms to quiz yet)
        if (seenIds.length === 0) {
            const idiom = this.assignNewIdiomForDate(today);
            return { needsQuiz: false, idiom };
        }
        // Quiz required for all subsequent idioms
        this.startQuiz();
        return { needsQuiz: true, idiom: null };
    }
    // ─────────────────────────────────────────────
    // Quiz Logic
    // ─────────────────────────────────────────────
    startPracticeQuiz() {
        this.startQuiz(10, true);
    }
    startQuiz(forcedSize, isPracticeMode = false) {
        // Get all seen idioms with metadata
        const seenIds = this.getSeenIdiomIds();
        const seenWithMeta = seenIds
            .map((id) => ({
            idiom: this.getIdiomById(id),
            meta: this.state.idiomMeta[id],
        }))
            .filter((item) => item.idiom !== null);
        // Separate into seen-not-learned and learned
        const notLearnedYet = seenWithMeta.filter((item) => !item.meta.dateLearned);
        const learned = seenWithMeta.filter((item) => item.meta.dateLearned);
        // Sort by priority:
        // 1. Prefer un-quizzed idioms (those with no quizHistory or empty quizHistory)
        // 2. Secondary: prefer older-learned idioms
        const sortByPriority = (items) => {
            return items.sort((a, b) => {
                const aQuizCount = a.meta.quizHistory?.length ?? 0;
                const bQuizCount = b.meta.quizHistory?.length ?? 0;
                // Prefer un-quizzed (fewer quiz attempts)
                if (aQuizCount !== bQuizCount) {
                    return aQuizCount - bQuizCount;
                }
                // Secondary: older-learned (only applies to learned idioms)
                const dateA = a.meta.dateLearned ?? a.meta.dateSeen;
                const dateB = b.meta.dateLearned ?? b.meta.dateSeen;
                return dateA.localeCompare(dateB);
            });
        };
        // Combine with priority: not-learned first, then learned
        const prioritizedPool = [
            ...sortByPriority(notLearnedYet),
            ...sortByPriority(learned),
        ];
        // Determine quiz size
        let quizSize;
        if (forcedSize) {
            quizSize = Math.min(forcedSize, prioritizedPool.length);
        }
        else {
            // Random quiz size: 1 to 5 questions, capped by available idioms
            const maxSize = Math.min(5, prioritizedPool.length);
            quizSize = Math.floor(Math.random() * maxSize) + 1;
        }
        // Select idioms from prioritized pool
        const selectedIds = prioritizedPool
            .slice(0, quizSize)
            .map((item) => item.idiom.id);
        const shuffledIds = shuffleArray(selectedIds);
        // Generate questions once and store them to preserve option order
        const questions = this.buildQuizQuestions(shuffledIds);
        // Initialize feedback array for immediate validation
        const feedback = new Array(shuffledIds.length).fill(null).map(() => ({
            answered: false,
            submitted: false,
            isCorrect: null,
            selectedAnswer: null,
        }));
        this.state.quizInProgress = {
            idiomIds: shuffledIds,
            currentIndex: 0,
            answers: new Array(shuffledIds.length).fill(null),
            started: false,
            questions,
            feedback,
            isPracticeMode,
        };
        this.persist();
    }
    hasUnseenIdioms() {
        return this.state.nextIdiomIndex < this.idioms.length;
    }
    buildQuizQuestions(idiomIds) {
        return idiomIds.map((id) => {
            const idiom = this.getIdiomById(id);
            // Randomly select a quiz type for this question
            const quizTypes = ['standard-mcq', 'reverse-mcq', 'cloze', 'usage-identification', 'true-false'];
            // Add word-order only if idiom has multiple words
            if (idiom.idiom.split(/\s+/).length >= 2) {
                quizTypes.push('word-order');
            }
            const randomType = quizTypes[Math.floor(Math.random() * quizTypes.length)];
            switch (randomType) {
                case 'standard-mcq':
                    return this.generateStandardMCQ(idiom);
                case 'reverse-mcq':
                    return this.generateReverseMCQ(idiom);
                case 'cloze':
                    return this.generateClozeQuestion(idiom);
                case 'usage-identification':
                    return this.generateUsageIdentification(idiom);
                case 'true-false':
                    return this.generateTrueFalse(idiom);
                case 'word-order':
                    return this.generateWordOrder(idiom);
                default:
                    return this.generateStandardMCQ(idiom);
            }
        });
    }
    generateStandardMCQ(idiom) {
        const seenIds = this.getSeenIdiomIds();
        const otherSeenIds = seenIds.filter((otherId) => otherId !== idiom.id);
        let wrongOptions = shuffleArray(otherSeenIds)
            .slice(0, 3)
            .map((otherId) => this.getIdiomById(otherId).definition);
        if (wrongOptions.length < 3) {
            const unseenIdioms = this.idioms.filter((i) => !seenIds.includes(i.id) && i.id !== idiom.id);
            const additionalOptions = shuffleArray(unseenIdioms)
                .slice(0, 3 - wrongOptions.length)
                .map((i) => i.definition);
            wrongOptions = [...wrongOptions, ...additionalOptions];
        }
        while (wrongOptions.length < 3) {
            wrongOptions.push('(No other definition available)');
        }
        const options = shuffleArray([idiom.definition, ...wrongOptions]);
        return {
            type: 'standard-mcq',
            idiomId: idiom.id,
            idiom: idiom.idiom,
            correctAnswer: idiom.definition,
            options,
        };
    }
    generateReverseMCQ(idiom) {
        const seenIds = this.getSeenIdiomIds();
        const otherSeenIds = seenIds.filter((otherId) => otherId !== idiom.id);
        let wrongIdioms = shuffleArray(otherSeenIds)
            .slice(0, 3)
            .map((otherId) => this.getIdiomById(otherId).idiom);
        if (wrongIdioms.length < 3) {
            const unseenIdioms = this.idioms.filter((i) => !seenIds.includes(i.id) && i.id !== idiom.id);
            const additionalOptions = shuffleArray(unseenIdioms)
                .slice(0, 3 - wrongIdioms.length)
                .map((i) => i.idiom);
            wrongIdioms = [...wrongIdioms, ...additionalOptions];
        }
        while (wrongIdioms.length < 3) {
            wrongIdioms.push('(No other idiom available)');
        }
        const options = shuffleArray([idiom.idiom, ...wrongIdioms]);
        return {
            type: 'reverse-mcq',
            idiomId: idiom.id,
            idiom: idiom.idiom,
            correctAnswer: idiom.idiom,
            definition: idiom.definition,
            options,
        };
    }
    generateClozeQuestion(idiom) {
        // Try to find an example that actually contains the idiom (case-insensitive)
        const shuffledExamples = shuffleArray(idiom.examples);
        let sentence = '';
        let usedExample = '';
        let foundMatch = false;
        for (const example of shuffledExamples) {
            // Use usedIdiom if available, otherwise fall back to the original idiom
            const idiomToReplace = example.usedIdiom ?? idiom.idiom;
            const escapedIdiom = escapeRegExp(idiomToReplace);
            const regex = new RegExp(escapedIdiom, 'gi');
            const replaced = example.sentence.replace(regex, '____');
            if (replaced !== example.sentence) {
                sentence = replaced;
                usedExample = example.sentence;
                foundMatch = true;
                break;
            }
        }
        // Fallback if no example matches the idiom string (e.g. due to conjugation)
        if (!foundMatch) {
            return this.generateStandardMCQ(idiom);
        }
        // Generate MCQ options
        const seenIds = this.getSeenIdiomIds();
        const otherSeenIds = seenIds.filter((otherId) => otherId !== idiom.id);
        let wrongIdioms = shuffleArray(otherSeenIds)
            .slice(0, 3)
            .map((otherId) => this.getIdiomById(otherId).idiom);
        if (wrongIdioms.length < 3) {
            const unseenIdioms = this.idioms.filter((i) => !seenIds.includes(i.id) && i.id !== idiom.id);
            const additionalOptions = shuffleArray(unseenIdioms)
                .slice(0, 3 - wrongIdioms.length)
                .map((i) => i.idiom);
            wrongIdioms = [...wrongIdioms, ...additionalOptions];
        }
        while (wrongIdioms.length < 3) {
            wrongIdioms.push('(placeholder)');
        }
        const options = shuffleArray([idiom.idiom, ...wrongIdioms]);
        return {
            type: 'cloze',
            idiomId: idiom.id,
            idiom: idiom.idiom,
            correctAnswer: idiom.idiom,
            sentence,
            options,
        };
    }
    generateUsageIdentification(idiom) {
        const randomExample = idiom.examples[Math.floor(Math.random() * idiom.examples.length)];
        const correctSentence = randomExample.sentence;
        const sentences = [correctSentence];
        // Use 2-3 wrong examples from the idiom's wrongExamples array
        const numWrong = Math.min(2 + Math.floor(Math.random() * 2), idiom.wrongExamples.length);
        const shuffledWrong = shuffleArray([...idiom.wrongExamples]);
        for (let i = 0; i < numWrong; i++) {
            sentences.push(shuffledWrong[i]);
        }
        // Shuffle and find correct index
        const shuffled = shuffleArray(sentences);
        const correctIndex = shuffled.indexOf(correctSentence);
        return {
            type: 'usage-identification',
            idiomId: idiom.id,
            idiom: idiom.idiom,
            correctAnswer: correctSentence,
            sentences: shuffled,
            correctIndex,
        };
    }
    generateTrueFalse(idiom) {
        const isTrue = Math.random() < 0.5;
        let statement;
        if (isTrue) {
            // True statement: use actual definition
            statement = `"${idiom.idiom}" means: ${idiom.definition}`;
        }
        else {
            // False statement: use another idiom's definition
            const seenIds = this.getSeenIdiomIds();
            const otherSeenIds = seenIds.filter((otherId) => otherId !== idiom.id);
            if (otherSeenIds.length > 0) {
                const wrongId = otherSeenIds[Math.floor(Math.random() * otherSeenIds.length)];
                const wrongDefinition = this.getIdiomById(wrongId).definition;
                statement = `"${idiom.idiom}" means: ${wrongDefinition}`;
            }
            else {
                // Fallback: alter the definition slightly
                statement = `"${idiom.idiom}" means: This idiom has an incorrect definition.`;
            }
        }
        return {
            type: 'true-false',
            idiomId: idiom.id,
            idiom: idiom.idiom,
            correctAnswer: isTrue ? 'true' : 'false',
            statement,
            isTrue,
        };
    }
    generateWordOrder(idiom) {
        // Split only on spaces to get clean word array
        const words = idiom.idiom.split(' ');
        const correctOrder = [...words];
        let shuffled = shuffleArray([...words]);
        // Ensure it's not already in correct order
        let attempts = 0;
        while (shuffled.join(' ') === correctOrder.join(' ') && attempts < 10) {
            shuffled = shuffleArray([...words]);
            attempts++;
        }
        return {
            type: 'word-order',
            idiomId: idiom.id,
            idiom: idiom.idiom,
            correctAnswer: idiom.idiom,
            shuffledWords: shuffled,
            correctOrder,
        };
    }
    submitQuizAnswer(questionIndex, answer) {
        if (!this.state.quizInProgress)
            return;
        const quiz = this.state.quizInProgress;
        const questions = quiz.questions ?? this.buildQuizQuestions(quiz.idiomIds);
        const question = questions[questionIndex];
        // Store the answer
        quiz.answers[questionIndex] = answer;
        quiz.started = true;
        // Validate immediately and store feedback
        const isCorrect = this.validateAnswer(answer, question);
        if (quiz.feedback) {
            quiz.feedback[questionIndex] = {
                answered: true,
                submitted: true,
                isCorrect,
                selectedAnswer: answer,
            };
        }
        // Don't advance to next question yet - UI will handle that after showing feedback
        this.persist();
    }
    validateAnswer(answer, question) {
        // Normalize for comparison (trim whitespace, handle case for true/false)
        const normalizedAnswer = answer.trim();
        const normalizedCorrect = question.correctAnswer.trim();
        // For true/false, normalize to lowercase
        if (question.type === 'true-false') {
            return normalizedAnswer.toLowerCase() === normalizedCorrect.toLowerCase();
        }
        // For word-order, compare arrays instead of strings
        if (question.type === 'word-order') {
            // Answer is stored as comma-separated words in the UI
            const userWords = answer.split(',').filter(w => w.length > 0);
            const correctWords = question.correctOrder || question.correctAnswer.split(' ');
            // Compare arrays
            if (userWords.length !== correctWords.length)
                return false;
            return userWords.every((word, i) => word === correctWords[i]);
        }
        // For other types, exact match
        return normalizedAnswer === normalizedCorrect;
    }
    advanceToNextQuestion() {
        if (!this.state.quizInProgress)
            return;
        const quiz = this.state.quizInProgress;
        quiz.currentIndex = Math.min(quiz.currentIndex + 1, quiz.idiomIds.length);
        this.persist();
    }
    getQuestionFeedback(questionIndex) {
        if (!this.state.quizInProgress?.feedback)
            return null;
        return this.state.quizInProgress.feedback[questionIndex] ?? null;
    }
    completeQuiz() {
        if (!this.state.quizInProgress) {
            return { score: 0, total: 0, passed: false, newIdiom: null };
        }
        const quiz = this.state.quizInProgress;
        // Use stored questions to ensure consistency
        const questions = quiz.questions ?? this.buildQuizQuestions(quiz.idiomIds);
        const today = getTodayDateString();
        // Use stored feedback instead of re-validating
        let correct = 0;
        if (quiz.feedback) {
            // Safety check: only count feedback up to questions.length to prevent counting old feedback
            const feedbackToCount = quiz.feedback.slice(0, questions.length);
            feedbackToCount.forEach((feedback) => {
                if (feedback.isCorrect) {
                    correct++;
                }
            });
        }
        else {
            // Fallback for old quiz states without feedback
            questions.forEach((q, i) => {
                if (quiz.answers[i] === q.correctAnswer) {
                    correct++;
                }
            });
        }
        const total = questions.length;
        const score = correct;
        const passed = correct / total >= PASS_THRESHOLD;
        // Record quiz attempt for each idiom
        quiz.idiomIds.forEach((id) => {
            const meta = this.state.idiomMeta[id];
            if (meta) {
                if (!meta.quizHistory)
                    meta.quizHistory = [];
                meta.quizHistory.push({
                    timestamp: Date.now(),
                    score: correct,
                    numQuestions: total,
                });
            }
        });
        let newIdiom = null;
        if (passed) {
            // Mark quizzed idioms as learned if answered correctly
            const dailyLog = this.getDailyLog(today);
            questions.forEach((q, i) => {
                // Use validated feedback instead of direct string comparison
                const isCorrect = quiz.feedback?.[i]?.isCorrect ?? (quiz.answers[i] === q.correctAnswer);
                if (isCorrect) {
                    const meta = this.state.idiomMeta[q.idiomId];
                    if (meta && !meta.dateLearned) {
                        meta.dateLearned = today;
                        if (!dailyLog.learned.includes(q.idiomId)) {
                            dailyLog.learned.push(q.idiomId);
                        }
                    }
                }
            });
            this.state.daily[today] = dailyLog;
            // Clear quiz state
            this.state.quizInProgress = null;
            // Unlock new idiom
            newIdiom = this.assignNewIdiomForDate(today);
        }
        else {
            // Reset quiz for retry (keep same idioms, regenerate questions with new shuffle)
            const shuffledIds = shuffleArray(quiz.idiomIds);
            const questions = this.buildQuizQuestions(shuffledIds);
            // Initialize feedback array for immediate validation
            const feedback = new Array(shuffledIds.length).fill(null).map(() => ({
                answered: false,
                submitted: false,
                isCorrect: null,
                selectedAnswer: null,
            }));
            this.state.quizInProgress = {
                idiomIds: shuffledIds,
                currentIndex: 0,
                answers: new Array(shuffledIds.length).fill(null),
                started: false,
                questions,
                feedback,
                isPracticeMode: quiz.isPracticeMode, // Preserve practice mode flag
            };
        }
        this.persist();
        return { score, total, passed, newIdiom };
    }
    cancelQuiz() {
        if (this.state.quizInProgress && !this.state.quizInProgress.started) {
            this.state.quizInProgress = null;
            this.persist();
        }
    }
    // ─────────────────────────────────────────────
    // Debug / Reset
    // ─────────────────────────────────────────────
    reset() {
        this.state = getDefaultState();
        this.persist();
        this.ensureTodayHasIdiom();
    }
}
// Singleton instance
export const store = new IdiomStore();
//# sourceMappingURL=index.js.map