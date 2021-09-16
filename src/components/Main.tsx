import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Route, useHistory } from "react-router-dom";
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

const Main = () => {
  const [firstLoad, setFirstLoad] = useState<boolean>(true);
  const history = useHistory();
  const handleNavigation = (path: string) => {
    history.push(path);
  }

  const [gameData, setGameData] = useStickyState([], "badminton-game-data");

  // Default values
  const [config, setConfig] = useStickyState({
    rounds: 10,
    winningScore: 21,
    courts: [],
    players: []
  }, "badminton-config");

  // const [config, setConfig] = useStickyState({
  //   rounds: 10,
  //   winningScore: 21,
  //   courts: ["9", "10"],
  //   players: [
  //     "Leighton",
  //     "Seth",
  //     "Blake",
  //     "Jenny",
  //     "Ace",
  //     "Kris D",
  //     "Kris P",
  //     "Ed",
  //     "Deborah",
  //     "Calvin",
  //     "Kyvin"
  //   ]
  // }, "badminton-config");

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
          <IconButton color="inherit" onClick={(() => { handleNavigation("/Badminton/round-robin") })}>
            <Typography>Games</Typography>
          </IconButton>
        </MenuItem>
        <MenuItem>
          <IconButton color="inherit" onClick={(() => { handleNavigation("/Badminton/scoreboard") })}>
            <Typography>Scoreboard</Typography>
          </IconButton>
        </MenuItem>
        <MenuItem>
          <IconButton color="inherit" onClick={(() => { handleNavigation("/Badminton/configuration") })}>
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
              <IconButton color="inherit" onClick={(() => { handleNavigation("/Badminton/round-robin") })}>
                <Typography>Games</Typography>
              </IconButton>
              <IconButton color="inherit" onClick={(() => { handleNavigation("/Badminton/scoreboard") })}>
                <Typography>Scoreboard</Typography>
              </IconButton>
              <IconButton color="inherit" onClick={(() => { handleNavigation("/Badminton/configuration") })}>
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

  const initialiseApp = () => {
    if (firstLoad) {
      handleNavigation("/Badminton/configuration")

      setFirstLoad(false);
    }
  }

  return (
    <Box className="App">
      {BuildNavBar()}
      {initialiseApp()}

      <Box className="content">
        <Route path="/Badminton/round-robin">
          <RoundRobin config={config} gameData={gameData} setGameData={setGameData} />
        </Route>
        <Route path="/Badminton/scoreboard">
          <Scoreboard config={config} gameData={gameData} />
        </Route>
        <Route path="/Badminton/configuration">
          <Configuration config={config} setConfig={setConfig} setGameData={setGameData} />
        </Route>
      </Box>
    </Box>
  );
}

export default Main;