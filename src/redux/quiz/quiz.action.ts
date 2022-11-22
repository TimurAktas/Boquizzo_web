import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../config/config';
import { RootState } from '../store';
import { socket } from '../utils/socket';
import { QuizType, QuizzieType } from './quiz.types';


export const getQuizData = createAsyncThunk('quiz/getQuizData', async (quizId:String, thunkApi) => {
    try{
        const response = await fetch('http://localhost:3001/api/quizzes/'+quizId);
        const json = await response.json();
        return json;
    }
    catch(error: any){
        console.warn('Error in getQuizData', error.response)
    }
})



export const createNewQuizzie = createAsyncThunk('quiz/createNewQuizzie', async (quizzie: QuizzieType[], thunkApi) => {
    const rootState = thunkApi.getState() as RootState;
    const Matrikelnummer = rootState.user.data?.matrikelnummer
    
    const Quiz = {
        creatorId: Matrikelnummer,
        questions: quizzie
    }

    const createNewQuizzie = await axios.post('http://localhost:3001/api/quizzes', Quiz)
    
    socket.emit("startNewQuiz")

    return createNewQuizzie.data.quizId
})