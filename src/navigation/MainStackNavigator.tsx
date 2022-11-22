import React from 'react'
import { useEffect } from 'react'
import { BrowserRouter, BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom'
import { HomeScreen } from "../screens/HomeScreen"
import { LoginScreen } from "../screens/LoginScreen"
import { NewQuizScreen } from "../screens/NewQuizScreen"
import { QuizScreen } from '../screens/QuizScreen'
import Navbar from "./Navbar"
import { io } from "socket.io-client";
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { connectSocket } from '../redux/socket/socket.action'

const Protected = ({ children }:any) => {
  const accessToken = useSelector((state: RootState) => state.auth.data?.token);
  const userAccessToken = localStorage.getItem("accessToken")

  if(children.type.name === 'LoginScreen'){
    if(accessToken || userAccessToken) {
      return <Navigate to="/" replace />
    }
    else  return children;
  }else{
    if (accessToken || userAccessToken) {
      return children;
    }
    return <Navigate to="/login" replace />; 
  }
};

export const MainStackNavigator: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  React.useEffect(() => {
    dispatch(connectSocket())
  },[])
  
  return(
    <BrowserRouter>
    <div>
      <Navbar />
      <Routes>
        <Route path='/' 
          element={
            <Protected isLoggedIn>
              <HomeScreen />
            </Protected>
          } />
        <Route path='/newQuiz'
          element={
            <Protected isLoggedIn>
              <NewQuizScreen />
            </Protected>
          }
        />
        <Route path ='/quiz/:id' 
          element={
            <Protected isLoggedIn>
              <QuizScreen />
            </Protected>
          } />
        <Route path ='/login'  
          element={
            <Protected isLoggedIn>
              <LoginScreen />
            </Protected>
          }/>
      </Routes>
    </div>
  </BrowserRouter>
  )
}