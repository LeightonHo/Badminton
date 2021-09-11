import './App.css';
import Main from './components/Main';
import { BrowserRouter } from 'react-router-dom';

export interface IState {
  courts: string[],
  players: {
    name: string,
    win: number,
    loss: number
  }[]
}

function App() {
  return (
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  );
}

export default App;