import { alpha, makeStyles } from '@material-ui/core/styles';
import React, { useState } from "react";
import { Route, NavLink, HashRouter, useHistory, BrowserRouter } from "react-router-dom";
import Box from "@material-ui/core/Box";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Configuration from "./Configuration";
import RoundRobin from "./RoundRobin";

import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';

export interface IState {
    matches: number,
    courts: string[],
    players: {
      name: string,
      win: number,
      loss: number
    }[]
}

const Main = () => {
    const history = useHistory();

    const handleNavigation = (path: string) => {
        history.push(path);
    }

    // Default values
    const [matches, setMatches] = useState<IState["matches"]>(10);
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
        search: {
          position: 'relative',
          borderRadius: theme.shape.borderRadius,
          backgroundColor: alpha(theme.palette.common.white, 0.15),
          '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
          },
          marginRight: theme.spacing(2),
          marginLeft: 0,
          width: '100%',
          [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
          },
        },
        searchIcon: {
          padding: theme.spacing(0, 2),
          height: '100%',
          position: 'absolute',
          pointerEvents: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        inputRoot: {
          color: 'inherit',
        },
        inputInput: {
          padding: theme.spacing(1, 1, 1, 0),
          // vertical padding + font size from searchIcon
          paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
          transition: theme.transitions.create('width'),
          width: '100%',
          [theme.breakpoints.up('md')]: {
            width: '20ch',
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
      
        const isMenuOpen = Boolean(anchorEl);
        const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
      
        const handleProfileMenuOpen = (event: any) => {
          setAnchorEl(event.currentTarget);
        };
      
        const handleMobileMenuClose = () => {
          setMobileMoreAnchorEl(null);
        };
      
        const handleMenuClose = () => {
          setAnchorEl(null);
          handleMobileMenuClose();
        };
      
        const handleMobileMenuOpen = (event: any) => {
          setMobileMoreAnchorEl(event.currentTarget);
        };
      
        const menuId = 'primary-search-account-menu';
      
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
                    <span>Round Robin</span>
                </IconButton>
            </MenuItem>
            <MenuItem>
                <IconButton color="inherit" onClick={(() => { handleNavigation("/scoreboard") })}>
                    <span>Scoreboard</span>
                </IconButton>
            </MenuItem>
            <MenuItem>
                <IconButton color="inherit" onClick={(() => { handleNavigation("/configuration") })}>
                    <span>Config</span>
                </IconButton>
            </MenuItem>
          </Menu>
        );
      
        return (
          <div className={classes.grow}>
            <AppBar position="sticky">
              <Toolbar>
                <IconButton
                  edge="start"
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="open drawer"
                >
                  <MenuIcon />
                </IconButton>
                <Typography className={classes.title} variant="h6" noWrap>
                  Sunday Badminton
                </Typography>
                <div className={classes.grow} />
                <div className={classes.sectionDesktop}>
                  <IconButton color="inherit" onClick={(() => { handleNavigation("/round-robin") })}>
                    <span>Round Robin</span>
                  </IconButton>
                  <IconButton color="inherit" onClick={(() => { handleNavigation("/scoreboard") })}>
                    <span>Scoreboard</span>
                  </IconButton>
                  <IconButton color="inherit" onClick={(() => { handleNavigation("/configuration") })}>
                    <span>Config</span>
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

        // return (
        //     <AppBar position="sticky">
        //         <Toolbar>
        //             <IconButton edge="start" color="inherit" aria-label="menu">
        //             <MenuIcon />
        //             </IconButton>
        //             <Typography variant="h6">Sunday Badminton</Typography>
        //         </Toolbar>
        //     </AppBar>
        // );
    }

    return (
        <Box className="App">
            { BuildNavBar() }

            <Box className="content">
                <Route path="/configuration">
                    <Configuration matches={matches} courts={courts} players={players} setMatches={setMatches} setCourts={setCourts} setPlayers={setPlayers} />
                </Route>
                <Route path="/round-robin">
                    <RoundRobin courts={courts} players={players} setPlayers={setPlayers} />
                </Route>
            </Box>
        </Box>
    );
}

export default Main;