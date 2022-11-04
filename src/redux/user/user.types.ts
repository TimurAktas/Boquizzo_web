import { BaseSliceState } from '../base.types';

export type UserType = {
    //TODO:Type noch überlegen
    title: string,
    participant: number,
    active: boolean,
    question: string,
    answer: string
};

export type UserState = BaseSliceState<UserType | null>;