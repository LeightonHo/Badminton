import React, { useState } from "react";
import { Route, NavLink, HashRouter } from "react-router-dom";
import Box from "@material-ui/core/Box";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Configuration from "./Configuration";
import RoundRobin from "./RoundRobin";

export interface IState {
    courts: string[],
    players: {
      name: string,
      win: number,
      loss: number
    }[]
}

const Main = () => {
    const [courts, setCourts] = useState<IState["courts"]>([
        "10",
        "12"
      ]);
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
        <HashRouter>
            {/* <AppBar position="sticky">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                    <MenuIcon />
                    </IconButton>
                    <Typography variant="h6">Sunday Badminton</Typography>
                </Toolbar>
            </AppBar> */}
            <ul className="header">
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/configuration">Configuration</NavLink></li>
                <li><NavLink to="/round-robin">Round Robin</NavLink></li>
            </ul>

            <Box className="content">
                <Route path="/configuration">
                    <Configuration courts={courts} players={players} setCourts={setCourts} setPlayers={setPlayers} />
                </Route>
                <Route path="/round-robin">
                    <RoundRobin courts={courts} players={players} setPlayers={setPlayers} />
                </Route>
            </Box>
        </HashRouter>
    );
}

export default Main;