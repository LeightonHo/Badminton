import store from "../redux/Store";
import { setToken } from "../redux/General";

const AuthHandler = () => {
    let token = store.getState().general.token;

    const isLoggedIn = () => {
        // console.log("Parsing token:", parseJwt(token));
        console.log(token);
        
        if (token) {
            return true;
        }

		return trySaveToken();
	}

    const redirectToCognito = () => {
        // window.location.replace(`${process.env.REACT_APP_COGNITO_URL}`);
        window.location.replace("https://auth.crosscourt.net/oauth2/authorize?client_id=6g3fg592vf0bcj26gopo56lkdi&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=https%3A%2F%2Flocalhost%3A3000");
    };

    const saveToken = (token: string) => {
        store.dispatch(setToken(token));
    }

    const trySaveToken = (): boolean => {
        const params = new URLSearchParams(window.location.hash);
        
        if (params.get("id_token")) {
            store.dispatch(setToken(params.get("id_token")));
            // token = store.getState().general.token;

            return true;
        }

        return false;
    }

    const parseJwt = (token: string) => {
        if (!token) {
            return;
        }
        
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(atob(base64).split("").map(function(c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(""));

        return JSON.parse(jsonPayload);
    };

    return {
        isLoggedIn: isLoggedIn,
        redirectToCognito: redirectToCognito,
        saveToken: saveToken,
        trySaveToken: trySaveToken
    };
}

export default AuthHandler;