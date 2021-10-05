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
import { joinSession } from "../helpers/SocketHelper";
import { getSocket, initSocket, setCallback_GameState, setCallback_JoinedSession, setCallback_SetConfig, setCallback_SetSessionId, setCallback_SetIsConnected } from "../helpers/Socket";

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

const Main = () => {
  
  const history = useHistory();
  const handleNavigation = (path: string) => {
    history.push(path);
  }
  
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isHost, setIsHost] = useState<boolean>(false);
  const [sessionId, setSessionId] = useStickyState("", "badminton-session-code");
  const [joinedSession, setJoinedSession] = useState<boolean>(false);
  const [gameState, setGameState] = useState<IState["gameState"]>([]);
  const [config, setConfig] = useState<IConfig>({
    rounds: 15,
    winningScore: 21,
    courts: [],
    players: []
  });
  const socket: WebSocket = getSocket();

  useEffect(() => {
    setCallback_GameState(setGameState);
    setCallback_JoinedSession(setJoinedSession);
    setCallback_SetConfig(setConfig)
    setCallback_SetSessionId(setSessionId);
    setCallback_SetIsConnected(setIsConnected);
  
    initSocket(sessionId);
  }, []);

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
        {joinedSession 
        ? <>
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
        </>
        : ""
        }
        
      </Menu>
    );

    return (
      <div className={classes.grow}>
        <AppBar position="sticky">
          <Toolbar>
            <Typography className={classes.title} variant="h5" noWrap>
              Sunday Badminton {isConnected.toString()}
            </Typography>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton color="inherit" onClick={(() => { handleNavigation("/lobby") })}>
                <Typography>Lobby</Typography>
              </IconButton>
              {joinedSession
              ? <>
                <IconButton color="inherit" onClick={(() => { handleNavigation("/round-robin") })}>
                  <Typography>Games</Typography>
                </IconButton>
                <IconButton color="inherit" onClick={(() => { handleNavigation("/scoreboard") })}>
                  <Typography>Scoreboard</Typography>
                </IconButton>
                <IconButton color="inherit" onClick={(() => { handleNavigation("/configuration") })}>
                  <Typography>Config</Typography>
                </IconButton>
              </>
              : ""
              }
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
          <RoundRobin config={config} gameState={gameState} socket={socket} sessionId={sessionId} isHost={isHost} />
        </Route>
        <Route path="/scoreboard">
          <Scoreboard config={config} gameState={gameState} />
        </Route>
        <Route path="/configuration">
          <Configuration config={config} setConfig={setConfig} gameState={gameState} socket={socket} sessionId={sessionId} />
        </Route>
      </Switch>
    </Box>
  );
}

export default Main;