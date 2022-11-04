import { BaseSliceState } from '../base.types';

export type AuthType = {
    token: string,
};

export type AuthState = BaseSliceState<null | AuthType>;