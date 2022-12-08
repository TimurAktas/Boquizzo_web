import { BaseSliceState } from '../base.types';

export type QuizzesType = {
    _id: number,
    participants: [],
    currentPageIndex: number,
    active: boolean,
    creatorId: string,
    quizId: number,
    questions: QuizzieType[],
};

export type QuizzieType = {
    type: String,
    question: String,
    secondsToAnswer: Number,
    selectImage: String,
    options: OptionType[],
    userAnswers: UserAnswerType[]
};

export type UserAnswerType = {
    userId: String,
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
    value:string, 
    isRightAnswer:boolean
}

export type QuizState = BaseSliceState<QuizzesType>;