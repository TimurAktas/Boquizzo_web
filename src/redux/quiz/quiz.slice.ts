import { createSlice } from '@reduxjs/toolkit';
import { createNewQuizzie, getAllQuizzes, getQuizWithId } from './quiz.action';
import { QuizState, QuizzesType } from './quiz.types';

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
        builder.addCase(getAllQuizzes.fulfilled, (state, action) => {

        });
        builder.addCase(getQuizWithId.fulfilled, (state, action) => {
            state.data = action.payload;
        });
    },
});