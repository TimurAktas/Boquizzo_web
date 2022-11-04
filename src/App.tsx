import * as React from 'react'
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store'
import { MainStackNavigator } from './navigation/MainStackNavigator';

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <MainStackNavigator />
    </Provider>
  );
}


render(<App />, document.getElementById('root'));
