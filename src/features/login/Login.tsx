import { Box, LinearProgress, Paper, Typography } from "@material-ui/core";
import { useState } from "react";
import FacebookLogin, { ReactFacebookLoginInfo } from "react-facebook-login";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setIsLoggedIn, setUser } from "../../redux/General";
import { useHistory } from "react-router";
import generatedGitInfo from "../../generatedGitInfo.json";

const Login = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);

    const responseFacebook = (response: ReactFacebookLoginInfo) => {
        if (response.accessToken) {
            // Check or create login.
            const payload = {
                facebookUserId: response.userID,
                name: response.name,
                alias: getDefaultAlias(response.name),
                email: response.email
            };

            axios.post<any>(`${process.env.REACT_APP_API_URL}/login`, payload).then(({ data }) => {
                setIsLoggingIn(false);
                const userData = JSON.parse(data.body);

                if (data.statusCode === 200) {
                    setIsLoggingIn(false);
                    dispatch(setIsLoggedIn(true));

                    const user = {
                        userId: userData.UserId,
                        email: userData.Email,
                        name: userData.Name,
                        alias: userData.Alias,
                        currentSessionId: userData.CurrentSessionId,
                        isGuest: false,
                        avatarUrl: userData.AvatarUrl
                    };

                    dispatch(setUser(user));
                    history.push("/home");
                    localStorage.setItem("crosscourt_user", JSON.stringify(user));
                } else {
                    dispatch(setIsLoggedIn(false));
                }
            });
        }
    }

    const getDefaultAlias = (name: any): string => {
        const indexOfSpace = name?.indexOf(" ");

        if (indexOfSpace === -1) {
            return name;
        }

        return name.substring(0, indexOfSpace);
    }

    const handleFacebookClick = () => {
        setIsLoggingIn(true);
    }

    return (
        <Box className="login-screen">
            <Paper className="login-card">
                <Box className="login-header">
                    <Typography variant="h5">
                        Cross Court
                    </Typography>
                    <Typography variant="subtitle2">
                        Welcome! Please sign in.
                    </Typography>
                </Box>
                {
                    isLoggingIn
                        ? <LinearProgress className="login-progress" />
                        : ""
                }
                <Box className="login-body">
                    <FacebookLogin
                        appId={`${process.env.REACT_APP_FACEBOOK_APP_ID}`}
                        textButton="Continue with Facebook"
                        autoLoad={false}
                        fields="name,email,picture"
                        scope="public_profile"
                        callback={responseFacebook}
                        icon="fa-facebook"
                        isDisabled={isLoggingIn}
                        onClick={handleFacebookClick}
                        isMobile={false}
                    />
                </Box>

                <Box className="login-footer" />

                <span id="git-commit-hash" style={{ display: "none" }}>{generatedGitInfo.gitCommitHash}</span>
            </Paper>
        </Box>
    );
}

export default Login;