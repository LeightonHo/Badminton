import React from "react";
import { Box, Typography, Button } from "@material-ui/core";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import profileScreenshot from "./static/match_history_iphone.png";
import gamesScreenshot from "./static/games_iphone.png";
import configScreenshot from "./static/config_iphone.png";
import scoreboardScreenshot from "./static/scoreboard_iphone.png";
import ContentItem from "./components/ContentItem";

let theme = createTheme({
	typography: {
		fontFamily: [
			"Rubik",
			"Lora",
			"Roboto",
			"Arial",
			"sans-serif"
		].join(",")
	}
});

theme.typography.body1 = {
	fontSize: "1.3rem",
	[theme.breakpoints.up('xs')]: {
		fontSize: '1rem',
	},
	[theme.breakpoints.up('sm')]: {
		fontSize: '1.2rem',
	},
	[theme.breakpoints.up('md')]: {
		fontSize: '1.3rem',
	}
};

theme.typography.body2 = {
	fontSize: "1.2rem",
	[theme.breakpoints.up('xs')]: {
		fontSize: '0.9rem',
	},
	[theme.breakpoints.up('sm')]: {
		fontSize: '1.1rem',
	},
	[theme.breakpoints.up('md')]: {
		fontSize: '1.2rem',
	}
};

function App() {
	return (
		<ThemeProvider theme={theme}>
			<Box style={{
				minHeight: "100vh",
				display: "flex",
				flexDirection: "column"
			}}>
				<Box boxShadow={12} style={{
					paddingBottom: "40px",
					backgroundColor: "#03254E",
					color: "#ffffff",
				}}>
					<Box className="header" style={{
						height: "50px",
						padding: "20px"
					}}>
						<Box onClick={() => { window.location.href = "https://app.crosscourt.net/"; }} style={{
							cursor: "pointer",
							maxWidth: "200px"
						}}>
							<Typography style={{
								fontWeight: 700,
								fontSize: "1.8rem"
							}}>
								CROSS COURT
							</Typography>
						</Box>
					</Box>

					<Box style={{
						flex: 1,
						padding: "50px 20px 0 20px",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						gap: "20px",
						scrollSnapType: "y mandatory"
					}}>
						<Box style={{
							paddingBottom: "30px",
							scrollSnapAlign: "start"
						}}>
							<Box style={{
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								textAlign: "center",
								flexWrap: "wrap",
								gap: "15px"
							}}>
								<Typography style={{
									fontWeight: 700,
									fontSize: "4.5rem"
								}}>
									CROSS COURT
								</Typography>
								<Typography style={{
									fontSize: "1.5rem"
								}}>
									An interactive way to run your badminton sessions.
								</Typography>
								<Button 
									variant="contained"
									size="large"
									onClick={() => { window.location.href = "https://app.crosscourt.net/"; }}
									style={{
										marginTop: "50px",
										fontFamily: "Rubik",
										fontSize: "1.5rem",
										backgroundColor: "#FFA62B",
										color: "#03254E"
								}}>
									Open App
								</Button>
							</Box>
						</Box>
					</Box>
				</Box>
				<Box style={{
					padding: "50px 0 50px 0",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					backgroundColor: "white"
				}}>
					<ContentItem 
						imageOnLeft={true}
						imageFilename="config_iphone.png" 
						body={[
							"Create a session and invite your friends 👨‍👨‍👧‍👦",
							"Join using your own device or ask the host to add you 🤳",
							"Auto-generated player matchups 🔀"
					]} />

					<ContentItem 
						imageOnLeft={false}
						imageFilename="games_iphone.png" 
						body={[
							"Check out who's playing next on the Games screen 👀",
							"Players can submit and view results in real time ⚡"
					]} />

					<ContentItem 
						imageOnLeft={true}
						imageFilename="scoreboard_iphone.png" 
						body={[
							"See how you're placing on the live scoreboard 🥇"
					]} />

					<ContentItem 
						imageOnLeft={false}
						imageFilename="match_history_iphone.png" 
						body={[
							"Full access to your match history 👍",
							"Drill down to see the results 🥇"
					]} />
				</Box>
				<Box 
					className="footer" 
					boxShadow={3}
					style={{
						width: "100%",
						padding: "20px 0 20px 0",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						backgroundColor: "#009DDC",
						color: "white"
					}}>
					<Typography variant="body2">
						If you have any questions or suggestions, please feel free to contact us at <a href="mailto:crosscourtapp@gmail.com">crosscourtapp@gmail.com</a>
					</Typography>
				</Box>
			</Box>
		</ThemeProvider>
	);
}

export default App;
