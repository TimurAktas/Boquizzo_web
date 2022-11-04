
import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth/auth.slice'
import { quizSlice } from './quiz/quiz.slice'
import { userSlice } from './user/user.slice'

export const store = configureStore({
  reducer: {
      quiz: quizSlice.reducer,
      auth: authSlice.reducer,
      user: userSlice.reducer
  },
  
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch