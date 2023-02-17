import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../config/config';

export const authUser = createAsyncThunk('auth/authUser', async (data:{nickname:string,password:string}, thunkApi) => {
    try{
        const loginuser = await axios.post(`${API_URL}/auth/login`, {  
            nickname: data.nickname.toLowerCase(),
            password: data.password.toLowerCase()
        })

        console.log(loginuser)
        if(loginuser) localStorage.setItem("accessToken", loginuser.data.token);
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