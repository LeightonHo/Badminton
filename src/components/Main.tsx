import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import Box from "@material-ui/core/Box";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import RoundRobin, { IRound } from "./RoundRobin";
import Scoreboard from "./Scoreboard";
import { IConfig, IUser } from "../types";
import Lobby from "./Lobby";
import { 
  getSocket, 
  initSocket, 
  setCallback_SetGameState, 
  setCallback_SetJoinedSession, 
  setCallback_SetConfig, 
  setCallback_SetSessionId, 
  setCallback_SetIsConnected,
  setCallback_SetIsHost,
  setCallback_AddPlayer
} from "../helpers/Socket";
import Profile from "./Profile";
import { Avatar, BottomNavigation, BottomNavigationAction, Paper } from "@material-ui/core";
import SettingsIcon from "@mui/icons-material/Settings";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

interface Prop {
  user: IUser
}

export interface IState {
  config: IConfig,
  gameState: IRound[]
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

const Main: React.FC<Prop> = ({ user }) => {
  
  const history = useHistory();
  const handleNavigation = (path: string) => {
    history.push(path);
  }
  
  const [counter, setCounter] = useState(0);
  const [navigation, setNavigation] = useState<string>();
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isHost, setIsHost] = useState<boolean>(false);
  const [sessionId, setSessionId] = useStickyState("", "badminton-session-code");
  const [joinedSession, setJoinedSession] = useState<boolean>(false);
  const [gameState, setGameState] = useState<IState["gameState"]>([]);
  const [config, setConfig] = useState<IConfig>({
    courts: [],
    players: []
  });
  const socket: WebSocket = getSocket();

  useEffect(() => {
    if (!user.userId) {
      return;
    }
    
    setCallback_SetGameState(setGameState);
    setCallback_SetJoinedSession(setJoinedSession);
    setCallback_SetConfig(setConfig)
    setCallback_AddPlayer((player) => {
      console.log(`Adding ${player.userId} to the config.`);
      console.log(config);

      setConfig({
        ...config,
        players: [...config.players, player]
      });
    });
    setCallback_SetSessionId(setSessionId);
    setCallback_SetIsConnected(setIsConnected);
    setCallback_SetIsHost(setIsHost);

    initSocket(user.userId, sessionId);
  }, [user]);

  useEffect(() => {
    console.log("Force re-render")
    setCounter(counter + 1);
  }, [config]);

  const useStyles = makeStyles((theme) => ({
    grow: {
      flexGrow: 1,
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'flex',
      },
    }
  }));

  const BuildNavBar = () => {
    const classes = useStyles();

    const handleNavigation = (path: string) => {
      history.push(path);
    }

    return (
      <div className={classes.grow}>
        <AppBar position="sticky">
          <Toolbar>
            <Typography className={classes.title} variant="h5" noWrap>
              Sunday Badminton
            </Typography>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              {
                joinedSession
                ? <>
                  {
                    gameState.length > 0
                    ? <>
                      <IconButton color="inherit" onClick={(() => { handleNavigation("/round-robin") })}>
                        <Typography>Games</Typography>
                      </IconButton>
                      <IconButton color="inherit" onClick={(() => { handleNavigation("/scoreboard") })}>
                        <Typography>Scoreboard</Typography>
                      </IconButton>
                    </>
                    : ""
                  }
                </>
                : ""
              }
              <IconButton color="inherit" onClick={(() => { handleNavigation("/lobby") })}>
                <Typography>Lobby</Typography>
              </IconButton>
              <IconButton color="inherit" onClick={(() => { handleNavigation("/profile") })}>
                <Avatar>
                  <img src={user.avatarUrl} />
                </Avatar>
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }

  const handleNavigationChange = (event: any, newValue: any) => {
    setNavigation(newValue);
    handleNavigation(`/${newValue}`);
  }

  return (
    <Box className="App">
      {BuildNavBar()}

      <Box className={"app-body" + ` ${counter}`}>
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              return (
                !joinedSession 
                ? <Redirect to="/lobby" />
                : <Redirect to="/round-robin" />
              );
            }}
          />
          <Route path="/lobby">
            <Lobby 
              gameState={gameState}
              setGameState={setGameState} 
              config={config}
              setConfig={setConfig} 
              sessionId={sessionId} 
              setSessionId={setSessionId} 
              joinedSession={joinedSession} 
              setJoinedSession={setJoinedSession} 
              isHost={isHost}
            />
          </Route>
          <Route path="/round-robin">
            <RoundRobin config={config} gameState={gameState} sessionId={sessionId} isHost={isHost} isConnected={isConnected} />
          </Route>
          <Route path="/scoreboard">
            <Scoreboard config={config} gameState={gameState} />
          </Route>
          <Route path="/profile">
            <Profile user={user} />
          </Route>
        </Switch>
      </Box>
      {
        joinedSession && gameState.length
        ? <Paper className="bottom-navigation" style={{ position: "fixed", bottom: 0, left: 0, right: 0}} elevation={1}>
          <BottomNavigation
            showLabels
            value={navigation}
            onChange={handleNavigationChange}
          >
            <BottomNavigationAction 
              label="Scoreboard" 
              value="scoreboard"
              icon={<EmojiEventsIcon />}
            />
            <BottomNavigationAction 
              label="Games"
              value="round-robin"
              icon={<FavoriteIcon />}
            />
            <BottomNavigationAction 
              label="Lobby"
              value="lobby"
              icon={<SettingsIcon />}
            />
          </BottomNavigation>
        </Paper>
        : ""
      }
      
    </Box>
  );
}

export default Main;