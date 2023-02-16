import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL, BASE_URL } from '../../config/config';
import { RootState } from '../store';
import { socket } from '../utils/socket';
import { QuizType, QuizzieType } from './quiz.types';


export const getQuizData = createAsyncThunk('quiz/getQuizData', async (quizId:String, thunkApi) => {
    try{
        const response = await fetch(`${API_URL}/api/quizzes/`+quizId);
        const json = await response.json();
        return json;
    }
    catch(error: any){
        console.warn('Error in getQuizData', error.response)
    }
})



export const createNewQuizzie = createAsyncThunk('quiz/createNewQuizzie', async (quizzie: {title:string,quizzies: QuizzieType[]}, thunkApi) => {
    const rootState = thunkApi.getState() as RootState;
    const userId = rootState.user.data?.id
    
    const Quiz = {
        creatorId: userId,
        title: quizzie.title,
        questions: quizzie.quizzies
    }

    const createNewQuizzie = await axios.post(`${API_URL}/api/quizzes`, Quiz)

    return createNewQuizzie.data.quizId
})

export const getAllQuizzesFromUser = createAsyncThunk('quiz/getAllQuizzesFromUser', async(_, thunkApi) => {
    const rootState = thunkApi.getState() as RootState;
    const userId = rootState.user?.data?.id
    console.log("userId", userId)

    try{
        const response = await fetch(`${API_URL}/api/quizzes/${userId}/allQuizzesFromCreator`);
        const json = await response.json();
        console.log("GET ALL QUIZZES FROM CURRENT USER: ", json)
        return json;
    }
    catch(error: any){
        console.warn('Error in getAllQuizzesFromUser', error.response)
    }
})