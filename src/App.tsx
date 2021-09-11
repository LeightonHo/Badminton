import { Box } from '@material-ui/core';
import { useState } from 'react';
import CourtForm from './components/CourtForm';
import CourtList from './components/CourtList';
import PlayerForm from './components/PlayerForm';
import PlayerList from './components/PlayerList';
import RoundRobin from './components/RoundRobin';
import Main from './components/Main';
import './App.css';
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