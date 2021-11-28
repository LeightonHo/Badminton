import { useSelector } from "react-redux";
import { HashRouter, Redirect, Route, Switch } from "react-router-dom";
import { RootState } from "../redux/Store";
import Home from "./Home";
import Login from "./Login";
import NotFound from "./NotFound";

const Router = () => {
    const { user } = useSelector((state: RootState) => state.general);

    const isLoggedIn = () => {
		return user?.userId?.length > 0;
	}

    console.log(isLoggedIn());

    return (
        <HashRouter>
            <Switch>
                <Route exact path="/login">
                    <Login />
                </Route>
                <Route exact path={["/lobby", "/games", "/scoreboard", "/profile"]}>
                    {
                        isLoggedIn()
                        ? <Home />
                        : <Redirect to="/login" />
                    }
                </Route>
                <Route path="/404">
                    <NotFound />
                </Route>
                <Route path ="/*">
                    { 
                        isLoggedIn()
                        ? <Redirect to="/lobby" /> 
                        : <Redirect to="/login" /> 
                    }
                </Route>
            </Switch>
        </HashRouter>
    );
}

export default Router;