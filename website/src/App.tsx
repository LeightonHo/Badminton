import ContentItem from "./components/ContentItem";
import Footer from "./components/Footer";
import { Box, Typography, Button } from "@material-ui/core";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const theme = createTheme({
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

theme.typography.h2 = {
	fontSize: "3.8rem",
	[theme.breakpoints.up('xs')]: {
		fontSize: '3rem',
	},
	[theme.breakpoints.up('md')]: {
		fontSize: '3.8rem',
	}
};

theme.typography.body1 = {
	fontSize: "1.3rem",
	[theme.breakpoints.up('xs')]: {
		fontSize: '1rem',
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
	[theme.breakpoints.up('md')]: {
		fontSize: '1.2rem',
	}
};

function App() {
	return (
		<ThemeProvider theme={theme}>
			<Box style={{
				height: "100vh",
				display: "flex",
				flexDirection: "column",
				scrollSnapType: "y mandatory",
				overflowY: "scroll"
			}}>
				<Box boxShadow={12} style={{
					paddingBottom: "40px",
					backgroundColor: "#03254E",
					color: "#ffffff",
					scrollSnapAlign: "start"
				}}>
					{/* <Box style={{
						height: "50px",
						padding: "20px"
					}}>
						<Box onClick={() => { window.open("https://app.crosscourt.net/", "_blank"); }} style={{
							cursor: "pointer",
							maxWidth: "200px"
						}}>
							<Typography style={{
								fontWeight: 700,
								fontSize: "1.5rem"
							}}>
								
							</Typography>
						</Box>
					</Box> */}

					<Box style={{
						flex: 1,
						padding: "100px 20px 0 20px",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						gap: "20px",
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
								<Typography variant="h2">
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
									onClick={() => { window.open("https://app.crosscourt.net/", "_blank"); }}
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
					scrollSnapAlign: "start",
					position: "relative",
					height: "100vh", 
					paddingBottom: "20px"
				}}>
					<Carousel
						showThumbs={false} 
						interval={5000}
						showArrows={true}
						stopOnHover={true}
						swipeScrollTolerance={75}
						transitionTime={750}
						emulateTouch={true}
					>
						<ContentItem 
							title="Configuration"
							imageDescription="Configuration screen"
							imageFilename="config_iphone.png" 
							body={[
								"Create a session and share the unique code with your friends, or join an existing session.",
								"Each round generated can be customised by toggling active and inactive players."
						]} />

						<ContentItem 
							title="Auto-generated matchups"
							imageDescription="Games screen"
							imageFilename="games_iphone.png" 
							body={[
								"Player matchups are generated based on previous rounds to maximise variety in the session.",
								"Scores can be entered and viewed in real time by everyone in the session.",
								"Individual players can enable compact view mode which will only show their games."
						]} />

						<ContentItem 
							title="Live scoreboard"
							imageDescription="Scoreboard screen"
							imageFilename="scoreboard_iphone.png" 
							body={[
								"View the scoreboard to see how you stack up against your friends.",
								"Rankings are updated in real time for everyone in the session."
						]} />

						<ContentItem 
							title="Session history"
							imageDescription="Match history screen"
							imageFilename="match_history_iphone.png" 
							body={[
								"Scroll through your match history to track your progress.",
								"Records are expandable to see the final scoreboard of the session.",
								"Game data can be exported to load into external tracking systems."
						]} />
					</Carousel>
				</Box>
				
				<Footer />
			</Box>
		</ThemeProvider>
	);
}

export default App;
