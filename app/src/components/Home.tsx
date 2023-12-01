import { useEffect } from "react";
import { Route, useNavigate, Routes } from "react-router-dom";
import Box from "@material-ui/core/Box";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import RoundRobin from "../features/games/RoundRobin";
import Scoreboard from "../features/scoreboard/Scoreboard";
import Lobby from "../features/lobby/Lobby";
import Profile from "../features/profile/Profile";
import { BottomNavigation, BottomNavigationAction, Paper } from "@material-ui/core";
import PeopleIcon from "@mui/icons-material/People";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { RootState } from "../redux/Store";
import { useDispatch, useSelector } from "react-redux";
import Progress from "./Progress";
import { setIsGuest, setIsMobile, setNavigation, setSessionId, setUserId } from "../redux/General";
import Disconnected from "./Disconnected";
import PlayerAvatar from "./PlayerAvatar";
import { initSocket } from "../helpers/Socket";

const Home = () => {
	const MOBILE_TOP_NAVBAR_HEIGHT = 50;
	const MOBILE_BOTTOM_NAVBAR_HEIGHT = 56;
	const DESKTOP_TOP_NAVBAR_HEIGHT = 64;
	const DESKTOP_BOTTOM_NAVBAR_HEIGHT = 15;
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { user, userId, isConnected, isLoading, joinedSession, navigation, sessionId, isMobile } = useSelector((state: RootState) => state.general);
	const { rounds } = useSelector((state: RootState) => state.gameState);

	const handleNavigation = (path: string) => {
		navigate(path);
		document.getElementById("home")?.scrollTo({ top: 0, behavior: "smooth" });
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

		dispatch(setUserId(user.userId));
		dispatch(setSessionId(user.currentSessionId));
		dispatch(setIsGuest(user.isGuest));
		dispatch(setIsMobile(window.innerWidth <= 600));
		initSocket();
	}, [user, dispatch]);

	const renderNavBar = () => {
		return (
			<AppBar
				position="fixed"
				style={{
					height: isMobile ? "50px" : "64px",
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
								width: "100%",
								marginBottom: "8px"
							}}
						>
							<Typography style={{ marginLeft: "10px" }}>{sessionId}</Typography>
							<IconButton
								color="inherit"
								onClick={() => { dispatch(setNavigation("profile")); }}
								style={{
									paddingRight: "10px"
								}}
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
							<Typography 
								variant="h5" 
								onClick={() => { window.open("https://crosscourt.net/", "_blank"); }} 
								noWrap 
								style={{
									cursor: "pointer"
								}}
							>
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
											<IconButton color="inherit" onClick={(() => { handleNavigation("/games"); })}>
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

	const renderBottomNavBar = () => {
		return (
			<Paper className="bottom-navigation" style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 2 }} elevation={1}>
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
						value="games"
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
		);
	}

	/* eslint-disable  @typescript-eslint/no-explicit-any */
	const handleNavigationChange = (event: React.ChangeEvent<any>, newValue: any) => {
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

			<Box>
				{renderNavBar()}

				{
					isLoading
					? <Progress />
					: ""
				}

				<Routes>
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
							<Route path="/games">
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
				</Routes>

				{renderBottomNavBar()}
			</Box>
		</>
	);
}

export default Home;