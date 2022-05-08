import { useSelector } from "react-redux";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { RootState } from "../redux/Store";
import Home from "./Home";
import NotFound from "./NotFound";
import PrivacyPolicy from "./PrivacyPolicy";
import queryString from "query-string";
import { useDispatch } from "react-redux";
import { setToken } from "../redux/General";

const Router = () => {
    const dispatch = useDispatch();
    const { user, token } = useSelector((state: RootState) => state.general);

    const isLoggedIn = () => {
		return !!token;
	}

    const redirectToCognito = () => {
        // window.location.replace(`${process.env.REACT_APP_COGNITO_URL}`);
        window.location.replace("https://auth.crosscourt.net/oauth2/authorize?client_id=6g3fg592vf0bcj26gopo56lkdi&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=https%3A%2F%2Flocalhost%3A3000%2Fauthorised");
    }

    const saveToken = () => {
        const params = new URLSearchParams(window.location.hash);
        
        console.log(params.get("id_token"));

        if (params.get("id_token")) {
            dispatch(setToken(params.get("id_token")));
        }
    }

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/login" 
                    component={() => { 
                        redirectToCognito(); 
                        return null; 
                    }}
                />
                <Route exact path="/authorised" 
                    component={() => { 
                        saveToken(); 
                        return <Home />; 
                    }}
                />
                <Route path="/privacy">
                    <PrivacyPolicy />
                </Route>
                <Route path="/404">
                    <NotFound />
                </Route>
                <Route exact path={["/lobby", "/games", "/scoreboard", "/profile"]}>
                    {
                        isLoggedIn()
                        ? <Home />
                        : <Redirect to="/login" />
                    }
                </Route>
                <Route path ="/*">
                    { 
                        isLoggedIn()
                        ? <Redirect to="/lobby" /> 
                        : <Redirect to="/login" /> 
                    }
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default Router;