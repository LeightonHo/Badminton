import { Box, LinearProgress, Paper, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { IUser } from "../types";
import FacebookLogin, { ReactFacebookLoginInfo } from "react-facebook-login";
import axios from "axios";
import crypto from "crypto";

interface Props {
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>,
    setUser: React.Dispatch<React.SetStateAction<IUser>>,
}

const Login: React.FC<Props> = ({ setIsLoggedIn, setUser }) => {

    const [isLoggingIn, setIsLoggingIn] = useState<boolean>(true);

    const responseFacebook = (response: ReactFacebookLoginInfo) => {
        console.log(response);

        if (response.accessToken) {
            // Check or create login.
            const payload = {
                facebookUserId: response.userID,
                name: response.name,
                email: response.email,
                avatarUrl: response.picture?.data.url,
            };

            axios.post<any>("https://n4x7vjzngg.execute-api.ap-southeast-2.amazonaws.com/production", payload).then(
                ({ data }) => {
                    setIsLoggingIn(false);
                    const userData = JSON.parse(data.body);

                    if (data.statusCode === 200) {
                        setIsLoggingIn(false);
                        setIsLoggedIn(true);
                        setUser({
                            userId: userData.UserId,
                            email: userData.Email,
                            name: userData.Name,
                            avatarUrl: userData.AvatarUrl,
                            currentSessionId: userData.CurrentSessionId,
                            isGuest: false
                        });
                    } else {
                        setIsLoggedIn(false);
                    }
                }
            );
        }
    }

    const handleFacebookClick = () => {
        setIsLoggingIn(true);
    }

    const handleGuestClick = () => {
        setIsLoggingIn(true);
        setUser({
            userId: crypto.randomBytes(16).toString("hex"),
            email: "",
            name: "Guest ",
            avatarUrl: "",
            currentSessionId: "",
            isGuest: true
        });
        setIsLoggedIn(true);
    }

    const styles = {
        paperContainer: {
            height: "100vh",
            width: "100%",
            backgroundImage: `url(${Image})`,
            backgroundSize: "contain",
            filter: "brightness(50%)"
        },
        subtitle: {
            "margin-bottom": "20px"
        }
    }

    return (
        <Box className="login-screen">
            {/* <Box style={styles.paperContainer} /> */}
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
                        ? <LinearProgress
                            className="login-progress"
                            // classes={{
                            //     colorPrimary: classes.colorPrimary,
                            //     bar: classes.bar
                            // }}
                        />
                        : ""
                }
                <Box className="login-body">
                    <FacebookLogin
                        appId="190285126563993"
                        textButton="Continue with Facebook"
                        autoLoad={true}
                        fields="name,email,picture"
                        scope="public_profile"
                        callback={responseFacebook}
                        icon="fa-facebook"
                        isDisabled={isLoggingIn}
                        onClick={handleFacebookClick}
                    />
                </Box>

                <Box className="login-footer" onClick={handleGuestClick}>
                    <Typography 
                        className="login-guest-button"
                        variant="overline"
                    >
                        Continue as guest
                    </Typography>
                </Box>
            </Paper>
        </Box>
    );
}

export default Login;