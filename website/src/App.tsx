import React from "react";
import { Box, Typography, Button } from "@material-ui/core";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import profileScreenshot from "./static/match_history_iphone.png";
import gamesScreenshot from "./static/games_iphone.png";
import configScreenshot from "./static/config_iphone.png";
import scoreboardScreenshot from "./static/scoreboard_iphone.png";

let theme = createTheme({
	typography: {
		fontFamily: [
			"Lora",
			"Roboto",
			"Arial",
			"sans-serif"
		].join(",")
	}
});

theme.typography.body1 = {
	fontSize: "1.2rem",
	[theme.breakpoints.up('xs')]: {
		fontSize: '0.8rem',
	},
	[theme.breakpoints.up('sm')]: {
		fontSize: '1rem',
	},
	[theme.breakpoints.up('md')]: {
		fontSize: '1.2rem',
	}
}

function App() {
	return (
		<ThemeProvider theme={theme}>
			<Box style={{
				fontFamily: "Lora",
				minHeight: "100vh",
				display: "flex",
				flexDirection: "column",
			}}>
				<Box className="header" style={{
					height: "50px",
					padding: "20px"
				}}>
					<Box onClick={() => { window.location.href = "https://app.crosscourt.net/"; }} style={{
						cursor: "pointer"
					}}>
						<Typography style={{
							fontWeight: 700,
							fontStyle: "italic",
							fontSize: "2rem"
						}}>
							Cross Court
						</Typography>
					</Box>
				</Box>

				<Box style={{
					flex: 1,
					paddingTop: "50px",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					gap: "10px"
				}}>
					<ThemeProvider theme={theme}>
						<Box style={{
							paddingBottom: "30px"
						}}>
							<Box style={{
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								textAlign: "center",
								flexWrap: "wrap"
							}}>
								<Typography style={{
									fontWeight: 700,
									fontStyle: "italic",
									fontSize: "4rem"
								}}>
									Cross Court
								</Typography>
								<Typography style={{
									fontSize: "1.5rem"
								}}>
									An interactive way to run your badminton sessions.
								</Typography>
								<Button 
									variant="contained"
									size="large"
									color="primary"
									onClick={() => { window.location.href = "https://app.crosscourt.net/"; }}
									style={{
										marginTop: "50px",
										fontFamily: "Arial",
										fontSize: "1.4rem"
									}}><strong>Get Started</strong></Button>
							</Box>
						</Box>

						<Box style={{
							display: "flex",
							flexDirection: "row",
							alignItems: "center",
							flexWrap: "wrap",
							textAlign: "center"
						}}>
							<Box style={{
								maxWidth: "300px",
								margin: "auto"
							}}>
								<img src={configScreenshot} style={{
									height: "100%",
									width: "100%"
								}} />
							</Box>
							<Typography variant="body1" style={{
								maxWidth: "500px",
								margin: "auto"
							}}>
								Create a session and invite your friends 👨‍👨‍👧‍👦<br/><br/> 
								Join using your own device or ask the host to add you 🤳<br/><br/> 
								Sit back and let us decide who's playing who!
							</Typography>
						</Box>

						<Box style={{
							display: "flex",
							flexDirection: "row",
							alignItems: "center",
							flexWrap: "wrap",
							textAlign: "center"
						}}>
							<Typography variant="body1" style={{
								maxWidth: "500px",
								margin: "auto"
							}}>
								Check out who's playing next on the <i>Games</i> screen 👀<br/><br/> 
								Players can submit and view results in <strong>real time</strong> ⚡<br/><br/> 
							</Typography>
							<Box style={{
								maxWidth: "300px",
								margin: "auto"
							}}>
								<img src={gamesScreenshot} style={{
									height: "100%",
									width: "100%"
								}} />
							</Box>
						</Box>

						<Box style={{
							display: "flex",
							flexDirection: "row",
							alignItems: "center",
							flexWrap: "wrap",
							textAlign: "center"
						}}>
							<Box style={{
								maxWidth: "300px",
								margin: "auto"
							}}>
								<img src={scoreboardScreenshot} style={{
									height: "100%",
									width: "100%"
								}} />
							</Box>
							<Typography variant="body1" style={{
								maxWidth: "500px",
								margin: "auto"
							}}>
								See how you're placing on the <strong>live</strong> scoreboard 🥇<br/><br/> 
							</Typography>
						</Box>

						<Box style={{
							display: "flex",
							flexDirection: "row",
							alignItems: "center",
							flexWrap: "wrap",
							textAlign: "center"
						}}>
							<Typography variant="body1" style={{
								maxWidth: "600px",
								margin: "auto"
							}}>
								Look back on historic sessions in your match history ⏪<br/><br/> 
							</Typography>
							<Box style={{
								maxWidth: "300px",
								margin: "auto"
							}}>
								<img src={profileScreenshot} style={{
									height: "100%",
									width: "100%"
								}} />
							</Box>
						</Box>
					</ThemeProvider>
				</Box>
				<Box className="footer" style={{
					width: "100%",
					marginTop: "50px",
					padding: "20px 0 20px 0",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					backgroundColor: "#ebebeb"
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
