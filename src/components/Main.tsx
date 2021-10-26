import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Redirect, Route, Switch, useHistory, useLocation } from "react-router-dom";
import Box from "@material-ui/core/Box";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import RoundRobin from "./RoundRobin";
import Scoreboard from "./Scoreboard";
import { IConfig, IUser, IRound } from "../types";
import Lobby from "./Lobby";
import { initSocket } from "../helpers/Socket";
import Profile from "./Profile";
import { Avatar, BottomNavigation, BottomNavigationAction, Paper } from "@material-ui/core";
import SettingsIcon from "@mui/icons-material/Settings";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { RootState } from "../redux/Store";
import { useDispatch, useSelector } from "react-redux";
import Progress from "./Progress";
import { setIsGuest, setSessionId, setUserId, setIsMobileView } from "../redux/General";

interface Prop {
	user: IUser
}

export interface IState {
	config: IConfig,
	gameState: IRound[]
}

const Main: React.FC<Prop> = ({ user }) => {
	const dispatch = useDispatch();
    const { isLoading, joinedSession } = useSelector((state: RootState) => state.general);
	const { rounds } = useSelector((state: RootState) => state.gameState);
	const location = useLocation();
	const history = useHistory();
	const handleNavigation = (path: string) => {
		history.replace(path);
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
	const [navigation, setNavigation] = useState<string>(location.pathname.replace("/", ""));

	window.addEventListener("resize", () => {
		if (window.innerWidth <= 600) {
			dispatch(setIsMobileView(true));
		} else {
			dispatch(setIsMobileView(false));
		}
	});

	useEffect(() => {
		if (!user.userId) {
			return;
		}
	
		dispatch(setUserId(user.userId));
		dispatch(setSessionId(user.currentSessionId));
		dispatch(setIsGuest(user.isGuest));
		dispatch(setIsMobileView(window.innerWidth <= 600 ? true : false));
		initSocket();
	}, [user]);

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
			history.replace(path);
			window.scrollTo({ top: 0, behavior: "smooth" });
		}

		return (
			<div className={classes.grow}>
				<AppBar position="fixed" >
					<Toolbar>
						<Typography className={classes.title} variant="h5" noWrap>
							Cross Court
						</Typography>
						<div className={classes.grow} />
						<div className={classes.sectionDesktop}>
							{
								joinedSession && rounds.length > 0
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

			{
				isLoading
				? <Progress />
				: ""
			}

			<Box className="app-body">
				<Box style={{ position: "relative" }}>
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
							<Lobby />
						</Route>
						<Route path="/round-robin">
							<RoundRobin />
						</Route>
						<Route path="/scoreboard">
							<Scoreboard />
						</Route>
						<Route path="/profile">
							<Profile user={user} />
						</Route>
					</Switch>
				</Box>
			</Box>

			{
				joinedSession && rounds.length
					? <Paper className="bottom-navigation" style={{ position: "fixed", bottom: 0, left: 0, right: 0 }} elevation={1}>
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