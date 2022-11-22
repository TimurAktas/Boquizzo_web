import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from '../../config/config';
import { RootState } from '../store';
import { v4 as uuidv4 } from 'uuid';
import { socket } from '../utils/socket';
import { QuizzesType } from '../quiz/quiz.types';

export const connectSocket = createAsyncThunk('quiz/connectSocket', async (_, thunkApi) => {
    try{
        socket.on('connect', async () => {
            console.log("Erfolgreich mit Socket server verbunden. ")
        });
    
        return true;
    }
    catch(error: any){
       return false
    }
})

export const joinQuizRoom = createAsyncThunk('quiz/joinQuizRoom', async (quizId:string, thunkApi) => {
    try{

        socket.emit('join room', quizId);
 
        const blabla: QuizzesType = {
            _id: 0,
            participants: 0,
            active: false,
            creatorId: '',
            quizId: 0,
            questions: []
        }
        return blabla
    }
    catch(error: any){
       return false
    }
})
