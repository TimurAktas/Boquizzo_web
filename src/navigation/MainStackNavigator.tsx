import React from 'react'
import { useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { HomeScreen } from "../screens/HomeScreen"
import { LoginScreen } from "../screens/LoginScreen"
import { NewQuizScreen } from "../screens/NewQuizScreen"
import Navbar from "./Navbar"

export const MainStackNavigator: React.FC = () => {
    const [token, setToken] = React.useState('')
    
    const setAccessToken = () => {
        const userAccessToken = sessionStorage.getItem("accessToken")
        if(userAccessToken) setToken(userAccessToken)
    } 

    useEffect(() => {
       const userAccessToken = sessionStorage.getItem("accessToken")
       if(userAccessToken) setToken(userAccessToken)
    })

    return(
        <Router>
        {token?
          <div>
          <Navbar/>
          <Routes>
            <Route path="/" element={<HomeScreen/>} />
            <Route path="/newQuiz" element={<NewQuizScreen/>} />
          </Routes>
        </div>
        :<div>
          <LoginScreen setAccessToken={() => setAccessToken()}/>
          </div>
        }
      </Router>
    )
}
