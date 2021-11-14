import { useEffect, useState } from "react";
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
import { BottomNavigation, BottomNavigationAction, Paper } from "@material-ui/core";
import PeopleIcon from "@mui/icons-material/People";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { RootState } from "../redux/Store";
import { useDispatch, useSelector } from "react-redux";
import Progress from "./Progress";
import { setIsGuest, setSessionId, setUserId, setIsMobile, setNavigation } from "../redux/General";
import Disconnected from "./Disconnected";
import Login from "./Login";
import PlayerAvatar from "./PlayerAvatar";

const Home = () => {
	const MOBILE_TOP_NAVBAR_HEIGHT = 50;
	const MOBILE_BOTTOM_NAVBAR_HEIGHT = 56;
	const DESKTOP_TOP_NAVBAR_HEIGHT = 64;
	const DESKTOP_BOTTOM_NAVBAR_HEIGHT = 15;
	const dispatch = useDispatch();
	const location = useLocation();
	const history = useHistory();
	const { userId, isConnected, isLoading, joinedSession, navigation, sessionId, isMobile } = useSelector((state: RootState) => state.general);
	const { rounds } = useSelector((state: RootState) => state.gameState);

	const handleNavigation = (path: string) => {
		history.push(path);
		document.getElementById("home")?.scrollTo({ top: 0, behavior: "smooth" });
	}

	window.addEventListener("resize", () => {
		if (window.innerWidth <= 600) {
			dispatch(setIsMobile(true));
		} else {
			dispatch(setIsMobile(false));
		}
	});

	const { isLoggedIn } = useSelector((state: RootState) => state.general);
	const [user, setUser] = useState<IUser>(() => {
		const user = localStorage.getItem("crosscourt_user");

		if (user) {
			return JSON.parse(user);
		} else {
			return {
				userId: "",
				name: "",
				email: "",
				avatarUrl: "",
				currentSessionId: "",
				isGuest: true
			}
		}
	});

	useEffect(() => {
		if (!user.userId) {
			return;
		}

		dispatch(setNavigation(location.pathname.replace("/", "")));
		dispatch(setUserId(user.userId));
		dispatch(setSessionId(user.currentSessionId));
		dispatch(setIsGuest(user.isGuest));
		dispatch(setIsMobile(window.innerWidth <= 600 ? true : false));
		initSocket();
	}, [user, dispatch, location.pathname, isLoggedIn]);

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
								onClick={() => { dispatch(setNavigation("profile")); }}
							>
								<PlayerAvatar
									id={userId}
									src={user.avatarUrl}
									style={{
										height: "30px",
										width: "30px"
									}}
								/>
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
										<IconButton color="inherit" onClick={(() => { handleNavigation("/round-robin"); })}>
											<Typography>Games</Typography>
										</IconButton>
										<IconButton color="inherit" onClick={(() => { handleNavigation("/scoreboard"); })}>
											<Typography>Scoreboard</Typography>
										</IconButton>
									</>
									: ""
								}
								<IconButton color="inherit" onClick={(() => { handleNavigation("/lobby"); })}>
									<Typography>Lobby</Typography>
								</IconButton>
								<IconButton
									onClick={() => { dispatch(setNavigation("profile")); }}
								>
									<PlayerAvatar
										id={userId}
										src={user.avatarUrl}
									/>
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
				isLoggedIn && !isConnected
				? <Disconnected />
				: ""
			}

			<Box>
				{
					isLoggedIn
					? renderNavBar()
					: ""
				}

				{
					isLoading
					? <Progress />
					: ""
				}

				<Switch>
					<Route path="/login">
						<Login setUser={setUser} />
					</Route>
					<Route
						exact
						path={["/", "/login", "/home"]}
						render={() => {
							if (!isLoggedIn) {
								return (
									<Redirect to="/login" />
								);
							} else 
							if (!joinedSession || (joinedSession && !rounds.length)) {
								dispatch(setNavigation("lobby"));

								history.push("/lobby");
								return (
									<Redirect to="/lobby" />
								);
							} else {
								dispatch(setNavigation("round-robin"));

								return (
									<Redirect to="/round-robin" />
								);
							}
						}}
					/>
					<Box 
						id="home"
						style={{
							position: "relative",
							overflow: "auto",
							top: isMobile ? "50px" : "64px",
							left: "0px",
							right: "0px",
							height: isMobile ? window.innerHeight - (MOBILE_TOP_NAVBAR_HEIGHT + MOBILE_BOTTOM_NAVBAR_HEIGHT) : window.innerHeight - (DESKTOP_TOP_NAVBAR_HEIGHT + DESKTOP_BOTTOM_NAVBAR_HEIGHT),
							paddingBottom: isMobile ? "56px" : "15px",
							backgroundColor: "#f5f5f5"
						}}
					>
						<Box style={{ position: "relative" }}>
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
								<Profile />
							</Route>
						</Box>
					</Box>
				</Switch>

				{
					isLoggedIn
					? <Paper className="bottom-navigation" style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 99 }} elevation={1}>
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
								icon={<PeopleIcon />}
							/>
						</BottomNavigation>
					</Paper>
					: ""
				}
			</Box>
		</>
	);
}

export default Home;