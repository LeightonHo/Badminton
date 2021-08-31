import React, { useState } from 'react';
import './App.css';
import CourtForm from './components/CourtForm';
import PlayerForm from './components/PlayerForm';
import PlayerList from "./components/PlayerList";
import RoundRobin from './components/RoundRobin';

export interface IState {
  courts: number,
  players: {
    name: string,
    win: number,
    loss: number,
    games: number
  }[]
}

function App() {
  const [courts, setCourts] = useState<IState["courts"]>(1);
  const [players, setPlayers] = useState<IState["players"]>([
    {
      name: "Leighton",
      win: 0,
      loss: 0,
      games: 0
    },
    {
      name: "Seth",
      win: 0,
      loss: 0,
      games: 0
    },{
      name: "JB",
      win: 0,
      loss: 0,
      games: 0
    },{
      name: "Blake",
      win: 0,
      loss: 0,
      games: 0
    },{
      name: "Ains",
      win: 0,
      loss: 0,
      games: 0
    }
  ]);


  return (
    <div className="App">
      <h1>Courts ({courts})</h1>
      <CourtForm courts={courts} setCourts={setCourts} />

      <h1>Players ({players.length})</h1>
      <PlayerForm players={players} setPlayers={setPlayers}/>
      <PlayerList players={players} />

      <h1>Round Robin</h1>
      <RoundRobin courts={courts} players={players}/>
    </div>
  );
}

export default App;