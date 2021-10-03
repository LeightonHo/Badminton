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
import { joinSession, leaveSession } from "../functions/SocketHelper";

export interface IState {
  config: IConfig,
  gameState: IRound[],
  socket: WebSocket
}

const useStickyState = (defaultValue: (IRound[] | IConfig | string), key: string) => {
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

const heartbeat = () => {
  console.log(`Heartbeat running.. ${new Date()}`);

  const payload: any = {
    action: "ping"
  }

  socket.send(JSON.stringify(payload));
  setTimeout(heartbeat, 60000);
}

const initSocket = (): WebSocket => {
  console.log("Initialising web socket.");
  let socket = new WebSocket("wss://op47bt7cik.execute-api.ap-southeast-2.amazonaws.com/test");

  socket.addEventListener("open", () => {
    console.log("WebSocket is connected.");
  });

  socket.addEventListener("close", (e) => {
    console.log(e);
    console.log("WebSocket is closed.");
  });

  socket.onclose = (ev: CloseEvent) => {
    console.log("On close fired:", ev);
  }

  return socket;
}

let socket: WebSocket = initSocket();

const Main = () => {
  const history = useHistory();
  const handleNavigation = (path: string) => {
    history.push(path);
  }

  socket.addEventListener("joinedSession", () => {
    console.log("Joined session custom event listener.");
  });

  socket.onopen = () => {
    joinSession(socket, sessionId);
    heartbeat();
  }

  socket.onmessage = (ev: MessageEvent<any>) => {
    const data = JSON.parse(ev.data);
    console.log(data);
    
    if (data.action === "pong") {
      console.log(data.message);
    }
    
    if (data.action === "syncGameState") {
      const gameState = JSON.parse(data.gameState);
      console.log("Syncing game state...", gameState);

      setGameState(gameState);
    }

    if (data.action === "createSession") {
      console.log(data.message);
      history.push("/configuration");
    }

    if (data.action === "joinedSession") {
      console.log(data.message);
      setJoinedSession(true);
      // If no game state is returned, then the game hasn't started yet, so show a loading screen until data is pushed.
      if (data.gameState.length > 0) {
        const gameState = JSON.parse(data.gameState);

        setGameState(gameState);
      }
    }

    if (data.action === "joinFailed") {
      setSessionId("");
      setJoinedSession(false);
    }
  }

  const [isHost, setIsHost] = useState<boolean>(false);
  const [createRoundRobin, setCreateRoundRobin] = useState<boolean>(false);
  const [sessionId, setSessionId] = useStickyState("", "badminton-session-code");
  const [joinedSession, setJoinedSession] = useState<boolean>(false);
  const [gameState, setGameState] = useState<IState["gameState"]>([]);
  // const [gameState, setGameState] = useStickyState([], "badminton-game-data");

  // Default values
  const [config, setConfig] = useStickyState({
    rounds: 15,
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
          <IconButton color="inherit" onClick={(() => { handleNavigation("/lobby") })}>
            <Typography>Lobby</Typography>
          </IconButton>
        </MenuItem>
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
              <IconButton color="inherit" onClick={(() => { handleNavigation("/lobby") })}>
                <Typography>Lobby</Typography>
              </IconButton>
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
              !joinedSession ? <Redirect to="/lobby" /> : <Redirect to="/round-robin" />
            );
          }}
        />
        <Route path="/lobby">
          <Lobby socket={socket} setGameState={setGameState} sessionId={sessionId} setSessionId={setSessionId} joinedSession={joinedSession} setJoinedSession={setJoinedSession} setIsHost={setIsHost} />
        </Route>
        <Route path="/round-robin">
          <RoundRobin config={config} gameState={gameState} setGameState={setGameState} socket={socket} sessionId={sessionId} createRoundRobin={createRoundRobin} isHost={isHost} />
        </Route>
        <Route path="/scoreboard">
          <Scoreboard config={config} gameState={gameState} />
        </Route>
        <Route path="/configuration">
          <Configuration config={config} setConfig={setConfig} gameState={gameState} setGameState={setGameState} socket={socket} sessionId={sessionId} setCreateRoundRobin={setCreateRoundRobin} />
        </Route>
      </Switch>
    </Box>
  );
}

export default Main;