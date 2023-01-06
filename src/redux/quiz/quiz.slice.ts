import { createSlice } from '@reduxjs/toolkit';
import { getAllQuizzesFromUser, getQuizData } from './quiz.action';
import { QuizState, QuizStoreType } from './quiz.types';


const initialQuiz: QuizStoreType  = {
    currentQuiz: {
        _id: 0,
        participants: [],
        title: '',
        currentPageIndex: 0,
        active: true,
        creatorId: '0',
        quizId: 0,
        questions: [],
        leaderboard: []
    },
    allQuizzesFromUser: []
};


const initialState: QuizState = {
    data: initialQuiz,
    loading: false,
    error: null,
};

export const quizSlice = createSlice({
    name: 'quiz',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getQuizData.fulfilled, (state, action) => {
            console.log("Im Slicer GetQuizData: ", action.payload)
            state.data!.currentQuiz = action.payload;
        });

        builder.addCase(getAllQuizzesFromUser.fulfilled, (state, action) => {
            console.log("Befinde mich im slicer", action.payload)
               state.data!.allQuizzesFromUser = action.payload;
        });
    },
});