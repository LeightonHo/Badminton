import "./App.css";
import store from "./redux/Store";
import { Provider } from "react-redux";
import Router from "./components/Router";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createTheme({
	palette: {
		primary: {
			main: "#023047",
		},
		secondary: {
			main: "#219EBC"
		}
	},
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

function App() {
	return (
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<Router />
			</ThemeProvider>
		</Provider>
	);
}

export default App;