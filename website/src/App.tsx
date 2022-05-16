import ContentItem from "./components/ContentItem";
import Footer from "./components/Footer";
import { Box, Typography, Button } from "@material-ui/core";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const primaryColor = "#023047";
const secondaryColor = "#FFB703";

const theme = createTheme({
	typography: {
		fontFamily: [
			"Rubik",
			"Roboto", 
			"Helvetica", 
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
				flexDirection: "column"
			}}>
				<Box boxShadow={12} style={{
					paddingBottom: "20px",
					backgroundColor: primaryColor,
					color: "white"
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
						paddingTop: "60px",
						paddingBottom: "30px"
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
								Cross Court
							</Typography>
							<Typography variant="h6" style={{
								padding: "0 10px 20px 10px",
								fontSize: "1.1rem"
							}}>
								An interactive way of organising your badminton sessions.
							</Typography>
							<Button 
								variant="contained"
								size="large"
								onClick={() => { window.open("https://app.crosscourt.net/", "_blank"); }}
								style={{
									fontFamily: "Rubik",
									fontSize: "1.2rem",
									backgroundColor: secondaryColor,
									color: primaryColor
							}}>
								Launch App 🚀
							</Button>
						</Box>
					</Box>
				</Box>

				<Box style={{
					flex: "1 0 auto",
					backgroundColor: "#f8f9f9"
				}}>
					<Carousel
						autoPlay={true}
						interval={8000}
						showThumbs={false} 
						stopOnHover={true}
						preventMovementUntilSwipeScrollTolerance={true}
						swipeScrollTolerance={30}
						emulateTouch={true}
						transitionTime={500}
						infiniteLoop={true}
					>
						<ContentItem 
							title="Customisable"
							imageDescription="Configuration screen"
							imageFilename="config_iphone.png" 
							body={[
								"Join a session using the unique four letter code, or create a session and share the code with your friends.",
								"Control who's included in the next auto-generated matchup by managing the active players."
						]} />

						<ContentItem 
							title="Auto-generated matchups"
							imageDescription="Games screen"
							imageFilename="games_iphone.png" 
							body={[
								"Player matchups are generated based on previous rounds to maximise variety within the session.",
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
							imageFilename="session_history_iphone.png" 
							body={[
								"Scroll through your match history to track your progress.",
								"Records are expandable to see the final results of the session.",
								"Session data can be exported from the app."
						]} />
					</Carousel>
				</Box>

				<Footer />
			</Box>
		</ThemeProvider>
	);
}

export default App;
