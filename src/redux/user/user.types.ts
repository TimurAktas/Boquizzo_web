import { BaseSliceState } from '../base.types';

export type UserType = {
    id: string,
    nickname: string,
    name: string,
    surname:string,
    password: string
    accessToken: string
    semester: number
    uni:string
    quizPoints: number
};

export type UserState = BaseSliceState<UserType | null>;