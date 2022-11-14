import { BaseSliceState } from '../base.types';

export type QuizzesType = {
    Quizzes: QuizzieType[]
};


export type QuizzieType = {
    type: String,
    question: String,
    secondsToAnswer: Number,
    selectImage: String,
    options: OptionType[]
};

export type OptionType = {
    index: number,
    value:string, 
    isRightAnswer:boolean
}

export type QuizState = BaseSliceState<QuizzesType | null>;