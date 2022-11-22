import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../config/config';
import { QuizType, QuizzieType } from './quiz.types';

export const getAllQuizzes = createAsyncThunk('quiz/getAllQuizzes', async () => {
    const quizzoApiUrl = BASE_URL + 'api/quizzes'

    try{
        console.log("GET QUIZZES")
        const response = await fetch('http://localhost:3001/api/quizzes');
        const json = await response.json();
        console.log("RESULT: ",json)
        return json;
    }
    catch(error: any){
        console.warn('Error in getAllQuizzes', error.response)
    }

    return Promise.reject();
})


export const getQuizWithId = createAsyncThunk('quiz/getQuizWithId', async (quizId:String, thunkApi) => {
    const quizzoApiUrl = BASE_URL + 'api/quizzes'
    try{
        const response = await fetch('http://localhost:3001/api/quizzes/'+quizId);
        const json = await response.json();

        return json;
    }
    catch(error: any){
        console.warn('Error in getAllQuizzes', error.response)
    }

    return Promise.reject();
})



export const createNewQuizzie = createAsyncThunk('quiz/createNewQuizzie', async (quizzie: QuizzieType[], thunkApi) => {
    const createNewQuizzie = await axios.post('http://localhost:3001/api/quizzes', quizzie)
    return createNewQuizzie.data.quizId
})