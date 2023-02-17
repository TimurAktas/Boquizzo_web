import { BaseSliceState } from '../base.types';

export type QuizStoreType = {
    currentQuiz?: QuizzesType,
    allQuizzesFromUser?: QuizzesType[]
}

export type QuizzesType = {
    _id: number,
    participants: [],
    title: string,
    currentPageIndex: number,
    active: boolean,
    creatorId: string,
    quizId: number,
    questions: QuizzieType[],
    leaderboard: LeaderBoardType[]
};

export type QuizzieType = {
    type: String,
    question: String,
    secondsToAnswer: number,
    selectImage: String,
    options: OptionType[],
    userAnswers: UserAnswerType[]
};

export type UserAnswerType = {
    userId: string,
    answer: OptionType
}

export type QuizType = {
    _id: number,
    participants: number,
    active: boolean,
    questions: QuizzieType[],
}  

export type OptionType = {
    index: number,
    value: string, 
    isRightAnswer: boolean
}

export type LeaderBoardType = {
    userId: string,
    points: number,
}

export type QuizState = BaseSliceState<QuizStoreType | null>;