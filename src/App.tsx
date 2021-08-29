import React, { useState } from 'react';
import './App.css';
import PlayerForm from './components/PlayerForm';
import PlayerList from "./components/PlayerList";
import RoundRobin from './components/RoundRobin';

export interface IState {
  players: {
    name: string,
    win: number,
    loss: number,
    games: number
  }[]
}

function App() {

  const [players, setPlayers] = useState<IState["players"]>([
    {
      name: "Leighton",
      win: 0,
      loss: 0,
      games: 0
    }
  ]);

  return (
    <div className="App">
      <h1>Players</h1>
      <PlayerForm players={players} setPlayers={setPlayers}/>
      <PlayerList players={players} />
      <RoundRobin />
    </div>
  );
}

export default App;