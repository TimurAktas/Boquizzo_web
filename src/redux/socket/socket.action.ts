import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { io } from 'socket.io-client';
import { BASE_URL } from '../../config/config';
import { RootState } from '../store';
import { v4 as uuidv4 } from 'uuid';

export const connectSocket = createAsyncThunk('quiz/connectSocket', async (_, thunkApi) => {
    try{
        const socket = io("http://localhost:3001");
        const rootState = thunkApi.getState() as RootState;
        const socketData = rootState.socketState.data
     
        console.log(uuidv4())
        if(!socketData){
            socket.on('connect', async () => {
                console.log("Erfolgreich mit Socket server verbunden. ")
            });
        }
         
        console.log(socket)
        return true;
    }
    catch(error: any){
       return false
    }
})

export const joinQuizRoom = createAsyncThunk('quiz/joinQuizRoom', async (quizId:string, thunkApi) => {
    try{
        const socket = io("http://localhost:3001");
        
            // Connected, let's sign-up for to receive messages for this room
        console.log("Join Quiz Room: ", quizId)
        socket.emit('join room', quizId);

         
        socket.on('message', (msg) => {
            console.log('Incoming message innerhalb von JoinQuizRoom: ', msg);
        });
    }
    catch(error: any){
       return false
    }
})
