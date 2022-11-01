import { BaseSliceState } from '../base.types';

export type QuizType = {
    //TODO:Type noch überlegen
    title: string,
    participant: number,
    active: boolean,
    question: string,
    answer: string
};

export type QuizzesType = {
    Quizzes: QuizType[]
};

export type QuizState = BaseSliceState<QuizzesType | null>;