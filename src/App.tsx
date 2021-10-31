import "./App.css";
import store from "./redux/Store";
import { Provider } from "react-redux";
import Wrapper from "./components/Wrapper";

function App() {
	return (
		<Provider store={store}>
			<Wrapper />
		</Provider>
	);
}

export default App;