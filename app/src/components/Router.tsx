import { HashRouter, Redirect, Route, Switch } from "react-router-dom";
import Home from "./Home";
import NotFound from "./NotFound";
import PrivacyPolicy from "./PrivacyPolicy";
import AuthHandler from "../helpers/AuthHandler";
import Login from "../features/login/Login";

const Router = () => {
    const auth = AuthHandler();

    return (
        <HashRouter>
            <Switch>
                <Route path="/privacy">
                    <PrivacyPolicy />
                </Route>
                <Route path="/404">
                    <NotFound />
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
                <Route exact path={["/lobby", "/games", "/scoreboard", "/profile"]}>
                    {
                        auth.isLoggedIn()
                        ? <Home />
                        : <Redirect to="/login" />
                    }
                </Route>
                <Route path ="/*">
                    { 
                        auth.isLoggedIn()
                        ? <Redirect to="/lobby" /> 
                        : <Redirect to="/login" />
                    }
                </Route>
            </Switch>
        </HashRouter>
    );
}

export default Router;