import "./App.css";
import { useState } from "react";
import Main from "./components/Main";
import Login from "./components/Login";
import { HashRouter } from "react-router-dom";
import { IUser } from "./types";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<IUser>({
    userId: "",
    name: "",
    email: "",
    avatarUrl: ""
  });

  return (
    <>
      {
        isLoggedIn
        ? <>
          <HashRouter>
            <Main user={user} />
          </HashRouter>
        </>
        : <Login setIsLoggedIn={setIsLoggedIn} setUser={setUser} />
      }
    </>
  );
}

export default App;