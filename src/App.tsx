import "./App.css";
import store from "./redux/Store";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import Home from "./components/Home";

function App() {
	return (
		<Provider store={store}>
			<HashRouter>
				<Home />
			</HashRouter>
		</Provider>
	);
}

export default App;