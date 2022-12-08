import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from '../../config/config';
import jwtDecode, { JwtPayload } from "jwt-decode";

type AccessTokenType = {
    user: string
}

export const getUserWithAccessToken = createAsyncThunk('quiz/getUserWithAccessToken', async (_, thunkApi)  => {
    const userAccessToken = localStorage.getItem("accessToken")
    const userApiUrl = BASE_URL + 'api/quizzes'

    try{
        if(userAccessToken) { 
            const userId = jwtDecode<AccessTokenType>(userAccessToken).user;
            
            const response = await fetch('http://localhost:3001/users/'+ userId);
            const json = await response.json();
            console.log("User gefunden: ",json)
            return json;
        }
        else console.warn("Kein gültiger AccessToken")
        
    }
    catch(error: any){
        console.warn('Error in getUserWithAccessToken', error.response)
    }

    return Promise.reject();
})