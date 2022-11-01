import { AnyAction, CaseReducer } from '@reduxjs/toolkit';
import { BaseSliceState } from './base.types';

export const baseSliceLoadingReducer: CaseReducer = <T extends BaseSliceState<T>>(state: T) => {
    state.loading = true;
    state.error = null;
};

export const baseSliceErrorReducer: CaseReducer = <T extends BaseSliceState<T>, A extends AnyAction>(state: T, action: A) => {
    state.loading = false;
    state.error = action.error;
};
