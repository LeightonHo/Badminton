import React, { useEffect } from "react";
import { Redirect, Route, Switch, useHistory, useLocation } from "react-router-dom";
import Box from "@material-ui/core/Box";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import RoundRobin from "./RoundRobin";
import Scoreboard from "./Scoreboard";
import { IUser } from "../types";
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
import { setIsGuest, setSessionId, setUserId, setIsMobile, setNavigation } from "../redux/General";
import Disconnected from "./Disconnected";

interface Prop {
	user: IUser
}

const Main: React.FC<Prop> = ({ user }) => {
	const dispatch = useDispatch();
	const location = useLocation();
	const history = useHistory();
	const { isConnected, isLoading, joinedSession, navigation, sessionId, isMobile } = useSelector((state: RootState) => state.general);
	const { rounds } = useSelector((state: RootState) => state.gameState);

	const handleNavigation = (path: string) => {
		history.replace(path);
		window.scrollTo({ top: 0, behavior: "smooth" });
	}

	window.addEventListener("resize", () => {
		if (window.innerWidth <= 600) {
			dispatch(setIsMobile(true));
		} else {
			dispatch(setIsMobile(false));
		}
	});

	useEffect(() => {
		if (!user.userId) {
			return;
		}

		console.log(user);

		dispatch(setNavigation(location.pathname.replace("/", "")));
		dispatch(setUserId(user.userId));
		dispatch(setSessionId(user.currentSessionId));
		dispatch(setIsGuest(user.isGuest));
		dispatch(setIsMobile(window.innerWidth <= 600 ? true : false));
		initSocket();
	}, [user]);

	const renderNavBar = () => {
		return (
			<AppBar 
				position="fixed" 
				style={{
					height: isMobile ? "50px" :  "64px",
					zIndex: 1
				}}
			>
				<Toolbar>
					{
						isMobile
						? <Box 
							style={{
								display: "flex",
								flexDirection: "row",
								alignItems: "center",
								justifyContent: "space-between",
								width: "100%"
							}}
						>
							<Typography
								style={{
									padding: "12px"
								}}
							>
								{sessionId}
							</Typography>
							<IconButton
								color="inherit"
								// onClick={() => { handleNavigation("/profile"); }}
							>
								<Avatar style={{
									height: "30px",
									width: "30px"
								}}>
									<img 
										src={user.avatarUrl} 
										alt="avatar image" 
										height="30px"
										width="30px"
									/>
								</Avatar>
							</IconButton>
						</Box>
						: <>
							<Typography variant="h5" noWrap>
								Cross Court
							</Typography>
							<Box style={{
								display: "flex",
								justifyContent: "flex-end",
								flexGrow: 1
							}}>
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
								<IconButton 
									color="inherit" 
									// onClick={(() => { handleNavigation("/profile") })}
								>
									<Avatar>
										<img 
											src={user.avatarUrl} 
											alt="avatar image"
										/>
									</Avatar>
								</IconButton>
							</Box>
						</>
					}
				</Toolbar>
			</AppBar>
		);
	}

	const handleNavigationChange = (event: any, newValue: any) => {
		dispatch(setNavigation(newValue));
		handleNavigation(`/${newValue}`);
	}

	return (
		<>
			{
				!isConnected
				? <Disconnected />
				: ""
			}

			<Box className="App">
				{renderNavBar()}

				{
					isLoading
					? <Progress />
					: ""
				}

				<Box style={{
					position: "absolute",
					overflow: "auto",
					top: isMobile ? "54px" : "64px",
					left: "0px",
					right: "0px",
					paddingBottom: isMobile ? "56px" : "15px",
					backgroundColor: "#f5f5f5"
				}}>
					<Box style={{ position: "relative" }}>
						<Switch>
							<Route
								exact
								path="/"
								render={() => {
									return (
										!joinedSession || (joinedSession && !rounds)
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

				<Paper className="bottom-navigation" style={{ position: "fixed", bottom: 0, left: 0, right: 0 }} elevation={1}>
					<BottomNavigation
						showLabels
						value={navigation}
						onChange={handleNavigationChange}
					>
						<BottomNavigationAction
							label="Scoreboard"
							value="scoreboard"
							icon={<EmojiEventsIcon />}
							disabled={!joinedSession || !rounds.length}
						/>
						<BottomNavigationAction
							label="Games"
							value="round-robin"
							icon={<FavoriteIcon />}
							disabled={!joinedSession || !rounds.length}
						/>
						<BottomNavigationAction
							label="Lobby"
							value="lobby"
							icon={<SettingsIcon />}
						/>
					</BottomNavigation>
				</Paper>
			</Box>
		</>
	);
}

export default Main;