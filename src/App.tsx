import "./App.css";
import { useState } from "react";
import Main from "./components/Main";
import Login from "./components/Login";
import { HashRouter } from "react-router-dom";
import { IUser } from "./types";
import store from "./redux/Store";
import { Provider } from "react-redux";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<IUser>({
    userId: "",
    name: "",
    email: "",
    avatarUrl: "",
    currentSessionId: "",
    isGuest: true
  });

  return (
    <Provider store={store}>
      {
        isLoggedIn
        ? <>
          <HashRouter>
            <Main user={user} />
          </HashRouter>
        </>
        : <Login setIsLoggedIn={setIsLoggedIn} setUser={setUser} />
      }
    </Provider>
  );
}

export default App;