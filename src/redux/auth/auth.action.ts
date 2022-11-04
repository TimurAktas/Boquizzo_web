import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const authUser = createAsyncThunk('auth/authUser', async (data:{matrikelnummer:string,password:string}, thunkApi) => {
    try{
        console.log(data.matrikelnummer, data.password)

        const loginuser = await axios.post('http://localhost:3001/auth/login', {  
          params: {
            matrikelnummer: data.matrikelnummer,
            password: data.password
          }})
        console.log("loginuser",loginuser)
        if(loginuser) sessionStorage.setItem("accessToken", loginuser.data.token);
        return loginuser.data
    }
    catch(error: any){
        console.warn('Error in authUser', error.response)
    }

    return Promise.reject();
})


export const logoutUser = createAsyncThunk('auth/logoutUser', async (_, thunkApi)  => {
    try{
        localStorage.removeItem("user");
    }
    catch(error: any){
        console.warn('Error in logout User', error.response)
    } 
  
  return Promise.reject();
})