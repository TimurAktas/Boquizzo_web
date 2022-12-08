import { createAsyncThunk } from '@reduxjs/toolkit';
import { socket } from '../utils/socket';

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