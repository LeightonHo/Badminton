import { Box, Grid } from '@material-ui/core';
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
    loss: number
  }[]
}

function App() {
  const [courts, setCourts] = useState<IState["courts"]>(2);
  const [players, setPlayers] = useState<IState["players"]>([
    {
      name: "Leighton",
      win: 0,
      loss: 0
    },
    {
      name: "Seth",
      win: 0,
      loss: 0
    },{
      name: "Blake",
      win: 0,
      loss: 0
    },{
      name: "JB",
      win: 0,
      loss: 0
    },{
      name: "Ains",
      win: 0,
      loss: 0
    },{
      name: "Kaia",
      win: 0,
      loss: 0
    },{
      name: "Kris",
      win: 0,
      loss: 0
    },{
      name: "Jerry",
      win: 0,
      loss: 0
    },{
      name: "Jenny",
      win: 0,
      loss: 0
    },{
      name: "Ace",
      win: 0,
      loss: 0
    }
  ]);


  return (
    <Box className="App">
      <h1>Courts ({courts})</h1>
      <CourtForm courts={courts} setCourts={setCourts} />

      <Box>
        <h1>Players ({players.length})</h1>
        <PlayerForm players={players} setPlayers={setPlayers}/>
        <PlayerList players={players} />
      </Box>

      <h1>Games</h1>
      <RoundRobin courts={courts} players={players}/>
    </Box>
  );
}

export default App;