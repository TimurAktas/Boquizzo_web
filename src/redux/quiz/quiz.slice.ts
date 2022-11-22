import { createSlice } from '@reduxjs/toolkit';
import { getQuizData } from './quiz.action';
import { QuizState } from './quiz.types';

const initialState: QuizState = {
    data: undefined,
    loading: false,
    error: null,
};

export const quizSlice = createSlice({
    name: 'quiz',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getQuizData.fulfilled, (state, action) => {
            state.data = action.payload;
        });
    },
});