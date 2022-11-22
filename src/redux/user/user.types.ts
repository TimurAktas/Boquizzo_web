import { BaseSliceState } from '../base.types';

export type UserType = {
    matrikelnummer: string,
    name: string,
    surname:string,
    password: string
    accessToken: string
    semester: number
    uni:string
};

export type UserState = BaseSliceState<UserType | null>;