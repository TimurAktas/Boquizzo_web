import { createSlice } from '@reduxjs/toolkit';
import { createNewQuizzie, getAllQuizzes } from './quiz.action';
import { QuizState, QuizzesType } from './quiz.types';

const initialState: QuizState = {
    data: null,
    loading: false,
    error: null,
};

export const quizSlice = createSlice({
    name: 'quiz',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllQuizzes.fulfilled, (state, action) => {
            state.data = action.payload;
        });
    },
});