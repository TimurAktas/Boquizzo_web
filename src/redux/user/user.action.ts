import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from '../../config/config';

export const getUserWithAccessToken = createAsyncThunk('quiz/getUserWithAccessToken', async (_, thunkApi)  => {
    const userAccessToken = sessionStorage.getItem("accessToken")
    console.log("Session Access Token: ",userAccessToken)

    try{
        if(userAccessToken) { 
            console.log("get User Information")
            const userId = JSON.parse(atob(userAccessToken.split('.')[1])).user
            const response = await fetch('http://localhost:3001/users/'+ userId);
            const json = await response.json();
            console.log("User gefunden: ",json)
            return json;
        }
        else console.warn("Kein gültiger AccessToken")
        
    }
    catch(error: any){
        console.warn('Error in getAllQuizzes', error.response)
    }

    return Promise.reject();
})