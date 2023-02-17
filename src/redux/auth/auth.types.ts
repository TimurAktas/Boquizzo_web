import { BaseSliceState } from '../base.types';

export type AuthType = {
    token: string,
    refreshToken:  string,
    idToken: string
};

export type AuthState = BaseSliceState<null | AuthType>;