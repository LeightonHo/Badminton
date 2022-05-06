import "./App.css";
import store from "./redux/Store";
import { Provider } from "react-redux";
import Router from "./components/Router";

function App() {
	return (
		<Provider store={store}>
			<Router />
		</Provider>
	);
}

export default App;