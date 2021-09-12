import React, { useState } from "react";
import { alpha, makeStyles } from '@material-ui/core/styles';
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

const Main = () => {
    const history = useHistory();

    const handleNavigation = (path: string) => {
        history.push(path);
    }
    const [gameData, setGameData] = useState<IState["gameData"]>([]);

    // Default values
    const [config, setConfig] = useState<IState["config"]>({
      rounds: 10,
      winningScore: 21,
      courts: ["10", "12"],
      players: [
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
      ]
    });

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
        const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
      
        const handleMobileMenuClose = () => {
          setMobileMoreAnchorEl(null);
        };
      
        const handleMobileMenuOpen = (event: any) => {
          setMobileMoreAnchorEl(event.currentTarget);
        };
      
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
                    <span>Games</span>
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
                        <Typography className={classes.title} variant="h6" noWrap>
                            Sunday Badminton
                        </Typography>
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        <IconButton color="inherit" onClick={(() => { handleNavigation("/round-robin") })}>
                            <span>Games</span>
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
    }

    return (
        <Box className="App">
            { BuildNavBar() }

            <Box className="content">
                <Route path="/round-robin">
                    <RoundRobin config={config} gameData={gameData} setGameData={setGameData} />
                </Route>
                <Route path="/scoreboard">
                    <Scoreboard config={config} gameData={gameData} />
                </Route>
                <Route path="/configuration">
                    <Configuration config={config} setConfig={setConfig} />
                </Route>
            </Box>
        </Box>
    );
}

export default Main;