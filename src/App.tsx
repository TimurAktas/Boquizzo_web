import * as React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { render } from 'react-dom';
import { HomeScreen } from './screens/HomeScreen';
import Navbar from './navigation/Navbar';
import { NewQuizScreen } from './screens/NewQuizScreen';
import { LoginScreen } from './screens/LoginScreen';
import { Provider } from 'react-redux';
import { store } from './redux/store'

export const App: React.FC = () => {
  const [userLoggedIn, setUserLoggedIn] = React.useState(false)

  const loginUser = () => {
    setUserLoggedIn(true)
  }

  return (
    <Provider store={store}>
    <Router>
      {userLoggedIn?
        <div>
        <Navbar/>
        <Routes>
          <Route path="/" element={<HomeScreen/>} />
          <Route path="/newQuiz" element={<NewQuizScreen/>} />
        </Routes>
      </div>
      :
      <div>
        <LoginScreen loginUser={loginUser}/>
      </div>
      }
    </Router>
    </Provider>
  );
}


render(<App />, document.getElementById('root'));
