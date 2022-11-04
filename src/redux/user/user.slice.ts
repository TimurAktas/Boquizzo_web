import { createSlice } from '@reduxjs/toolkit';
import { getUserWithAccessToken } from './user.action';
import { UserState } from './user.types';

const initialState: UserState = {
    data: null,
    loading: false,
    error: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUserWithAccessToken.fulfilled, (state, action) => {
            state.data = action.payload;
        });
    },
});