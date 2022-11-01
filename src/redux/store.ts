
import { configureStore } from '@reduxjs/toolkit'
import { quizSlice } from './quiz/quiz.slice'

export const store = configureStore({
  reducer: {
      quiz: quizSlice.reducer
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch