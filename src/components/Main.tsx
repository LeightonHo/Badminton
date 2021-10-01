import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import Box from "@material-ui/core/Box";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Configuration from "./Configuration";
import RoundRobin, { IRound } from "./RoundRobin";
import Scoreboard from "./Scoreboard";
import { IConfig } from "./Configuration";
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import Lobby from "./Lobby";

export interface IState {
  config: IConfig,
  gameData: IRound[]
}

const useStickyState = (defaultValue: (IRound[] | IConfig), key: string) => {
  const [value, setValue] = useState(() => {
    const stickyValue = window.localStorage.getItem(key);

    return stickyValue !== null
      ? JSON.parse(stickyValue)
      : defaultValue
  });

  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

// socket.addEventListener("open", () => {
//   console.log("WebSocket is connected");
// });

// socket.addEventListener("close", (e) => {
//   console.log(e);
//   console.log("WebSocket is closed");
// });

// socket.addEventListener("error", (e) => {
//   console.log(e);
//   console.log("WebSocket is in error");
// });

// socket.addEventListener("message", (e: MessageEvent<any>) => {
//   console.log(e.data);
//   console.log(`Response from server: ${JSON.parse(e.data).message}`);
// });

// setTimeout(() => {
//   const payload: any = {
//     action: "session",
//     method: "create",
//     sessionId: "ABC12345"
//   }

//   console.log(payload);
  
//   socket.send(JSON.stringify(payload));
// }, 1000);

const socket = new WebSocket("wss://n3ko2em1n4.execute-api.ap-southeast-2.amazonaws.com/production");




socket.addEventListener("open", () => {
  console.log("WebSocket is connected");
});

socket.addEventListener("close", (e) => {
  console.log(e);
  console.log("WebSocket is closed");
});

const Main = () => {
  const history = useHistory();
  const handleNavigation = (path: string) => {
    history.push(path);
  }

  const onMessage = (ev: MessageEvent<any>) => {
    const data = JSON.parse(ev.data);
    console.log(data.action);
    
    if (data.action === "syncGameState") {
      const gameState = JSON.parse(data.gameState);
      console.log("Syncing game state...", gameState);

      setGameData([...gameState]);
    }
  }
  
  socket.onmessage = onMessage;

  const [gameState, setGameState] = useState([]);
  const [gameData, setGameData] = useStickyState([], "badminton-game-data");

  // Default values
  const [config, setConfig] = useStickyState({
    rounds: 10,
    winningScore: 21,
    courts: [],
    players: []
  }, "badminton-config");

  const useStyles = makeStyles((theme) => ({
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
  }));

  const BuildNavBar = () => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleMobileMenuClose = () => {
      setMobileMoreAnchorEl(null);
    };

    const handleMobileMenuOpen = (event: any) => {
      setMobileMoreAnchorEl(event.currentTarget);
    };

    const handleNavigation = (path: string) => {
      handleMobileMenuClose();
      history.push(path);
    }

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
        <MenuItem>
          <IconButton color="inherit" onClick={(() => { handleNavigation("/round-robin") })}>
            <Typography>Games</Typography>
          </IconButton>
        </MenuItem>
        <MenuItem>
          <IconButton color="inherit" onClick={(() => { handleNavigation("/scoreboard") })}>
            <Typography>Scoreboard</Typography>
          </IconButton>
        </MenuItem>
        <MenuItem>
          <IconButton color="inherit" onClick={(() => { handleNavigation("/configuration") })}>
            <Typography>Config</Typography>
          </IconButton>
        </MenuItem>
      </Menu>
    );

    return (
      <div className={classes.grow}>
        <AppBar position="sticky">
          <Toolbar>
            <Typography className={classes.title} variant="h5" noWrap>
              Sunday Badminton
            </Typography>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton color="inherit" onClick={(() => { handleNavigation("/round-robin") })}>
                <Typography>Games</Typography>
              </IconButton>
              <IconButton color="inherit" onClick={(() => { handleNavigation("/scoreboard") })}>
                <Typography>Scoreboard</Typography>
              </IconButton>
              <IconButton color="inherit" onClick={(() => { handleNavigation("/configuration") })}>
                <Typography>Config</Typography>
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
      </div>
    );
  }

  return (
    <Box className="App">
      {BuildNavBar()}

      <Switch>
        <Route
          exact
          path="/"
          render={() => {
            return (
              gameData.length == 0 ? <Redirect to="/configuration" /> : <Redirect to="/round-robin" />
            );
          }}
        />
        <Route path="/lobby">
          <Lobby socket={socket} gameData={gameData} />
        </Route>
        <Route path="/round-robin">
          <RoundRobin config={config} gameData={gameData} setGameData={setGameData} />
        </Route>
        <Route path="/scoreboard">
          <Scoreboard config={config} gameData={gameData} />
        </Route>
        <Route path="/configuration">
          <Configuration config={config} setConfig={setConfig} gameData={gameData} setGameData={setGameData} />
        </Route>
      </Switch>
    </Box>
  );
}

export default Main;